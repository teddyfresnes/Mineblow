# Détails Techniques - Meshing et Physique de l'Eau

**Document complémentaire** : Code détaillé du système de maillage des surfaces d'eau

---

## 🔷 System de Hauteur de Surface d'Eau

### Fichier : [src/render/ChunkMesher.ts](src/render/ChunkMesher.ts#L99-L118)

L'eau est rendue avec des **hauteurs de surface dynamiques** basées sur le niveau de flux :

```typescript
export const WATER_SURFACE_BASE_HEIGHT = 0.86;      // Eau source complète
export const WATER_SURFACE_MIN_HEIGHT = 0.125;      // Eau au niveau 7 (presque vide)
export const WATER_TOP_FLOW_MIN_MAGNITUDE = 0.03;   // Seuil pour animer UVs

// Convertit le niveau de flux (0-7) en hauteur de rendu (1.0 à 0.125)
export const waterLevelToSurfaceHeight = (level: number): number => {
  if (!Number.isFinite(level) || level <= 0) {
    return WATER_SURFACE_BASE_HEIGHT;  // 0.86
  }
  if (level >= WATER_FLOW_LEVEL_MAX) {
    return WATER_SURFACE_MIN_HEIGHT;   // 0.125
  }

  // Interpolation linéaire
  const step = (WATER_SURFACE_BASE_HEIGHT - WATER_SURFACE_MIN_HEIGHT) / WATER_FLOW_LEVEL_MAX;
  return WATER_SURFACE_BASE_HEIGHT - step * level;
};

// Exemple de calculs :
// level 0 (source) → 0.86
// level 1 → 0.766
// level 4 → 0.341
// level 7 → 0.125

// Formule = 0.86 - (0.735/7) * level = 0.86 - 0.105 * level
```

---

## 🌊 Lissage des Hauteurs d'Angle

### Fichier : [src/render/ChunkMesher.ts](src/render/ChunkMesher.ts#L120-L133)

Chaque angle de bloc d'eau emploie des **échantillons lisses** des blocs voisins :

```typescript
// Lisse la hauteur d'un coin en moyennant les hauteurs voisines
export const smoothWaterCornerHeight = (
  samples: Array<number | null>,
  fallbackHeight: number,
): number => {
  let sum = 0;
  let count = 0;
  
  // Parcourir les 4 échantillons (nulls ignorés)
  for (const sample of samples) {
    if (sample === null) {
      continue;  // Bloc non-eau
    }
    sum += sample;
    count += 1;
  }
  
  if (count === 0) {
    return fallbackHeight;  // Pas d'eau voisine
  }
  
  return sum / count;  // Moyenne
};

// Exemple : 4 coins = [1.0, 0.8, null, 0.6]
// → moyenne = (1.0 + 0.8 + 0.6) / 3 = 0.8 (angle lissé)
```

---

## 🔀 Calcul du Flux Directionnel de Surface

### Fichier : [src/render/ChunkMesher.ts](src/render/ChunkMesher.ts#L135-L152)

Basé sur les 4 hauteurs de coin, calcule un **vecteur de flux** pour rotation UV :

```typescript
export const computeWaterTopFlow = (
  cornerH00: number,
  cornerH10: number,
  cornerH11: number,
  cornerH01: number,
): WaterTopFlow => {
  // Vérifier que toutes hauteurs sont valides
  if (
    !Number.isFinite(cornerH00) ||
    !Number.isFinite(cornerH10) ||
    !Number.isFinite(cornerH11) ||
    !Number.isFinite(cornerH01)
  ) {
    return { x: 0, z: 0, magnitude: 0 };  // Flux nul
  }

  // Calculer gradients (pentes)
  const slopeX = ((cornerH10 + cornerH11) - (cornerH00 + cornerH01)) * 0.5;
  const slopeZ = ((cornerH01 + cornerH11) - (cornerH00 + cornerH10)) * 0.5;
  
  // Inverser pente pour flux descendant
  const x = -slopeX;
  const z = -slopeZ;
  
  // Magnitude (force du courant)
  const magnitude = Math.hypot(x, z);
  
  return { x, z, magnitude };
};

/* Schéma des 4 coins d'un bloc d'eau :
     z
     ↑
  cornerH01 -------- cornerH11
     |                   |
     |    bloc eau    |
     |     (x,y,z)    |
     |                   |
  cornerH00 -------- cornerH10  → x
*/
```

---

## 🔄 Construction des UVs avec Rotation par Flux

### Fichier : [src/render/ChunkMesher.ts](src/render/ChunkMesher.ts#L154-L175)

Les coordonnées UV de la texture d'eau sont **rotées selon la direction du flux** :

```typescript
const WATER_TOP_FLOW_UV_SCALE = 0.5;  // Zoom UV inset

const WATER_TOP_BASE_COORDS: Array<[number, number]> = [
  [0, 1],  // Coin bas-gauche
  [0, 0],  // Coin haut-gauche
  [1, 0],  // Coin haut-droit
  [1, 1],  // Coin bas-droit
];

export const buildWaterTopUvs = (
  rect: Rect,
  flow: WaterTopFlow,
): Array<[number, number]> => {
  // Si flux trop faible, utiliser UVs statiques
  if (flow.magnitude <= WATER_TOP_FLOW_MIN_MAGNITUDE) {
    return WATER_TOP_BASE_COORDS.map(([s, t]) => mapTopUvToRect(rect, s, t));
  }

  // Calculer angle de rotation depuis vecteur flux
  const angle = Math.atan2(flow.z, flow.x) - Math.PI / 2;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const scale = WATER_TOP_FLOW_UV_SCALE;

  // Appliquer rotation 2D + inset à chaque UV
  return WATER_TOP_BASE_COORDS.map(([s, t]) => {
    // Décaler vers centre avec inset
    const offsetS = (s - 0.5) * scale;
    const offsetT = (t - 0.5) * scale;
    
    // Matrice rotation 2D
    const rotatedS = 0.5 + offsetS * cos - offsetT * sin;
    const rotatedT = 0.5 + offsetS * sin + offsetT * cos;
    
    // Mapper aux coordonnées de la textureRect
    return mapTopUvToRect(rect, rotatedS, rotatedT);
  });
};

/* Visualisation rotation UV :
     Avant                    Après (flux vers →)
  (0,1)-----(1,1)    Texture pivotée + insetée
    |         |   →   
    |         |          Flux diagonal
  (0,0)-----(1,0)       ↘
*/
```

---

## 🧱 Gestion des Faces d'Eau par Bloc

### Fichier : [src/render/ChunkMesher.ts](src/render/ChunkMesher.ts#L340-L386)

Chaque bloc d'eau génère jusqu'à **5 faces** (haut + 4 côtés) si exposées :

```typescript
private static pushWaterBlock(
  positions: number[],
  normals: number[],
  uvs: number[],
  chunk: Chunk,
  world: World,
  atlas: TextureAtlas,
  originX: number,
  originZ: number,
  x: number,
  y: number,
  z: number,
  blockId: BlockId,
): void {
  // Récupérer textures pour chaque face
  const stillTopRect = ChunkMesher.getFaceTextureRect(blockId, 'top', atlas);    // eau_still
  const sideRect = ChunkMesher.getFaceTextureRect(blockId, 'side', atlas);       // eau_flow
  const bottomRect = ChunkMesher.getFaceTextureRect(blockId, 'bottom', atlas);   // eau_still

  // Bloc au-dessus / au-dessous
  const aboveId = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x, y + 1, z);
  const belowId = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x, y - 1, z);

  // Hauteur de surface basée sur niveau eau + block au-dessus
  const currentHeight = ChunkMesher.getRenderableWaterHeight(blockId, aboveId);

  // Calculer hauteurs lissées des 4 coins
  const cornerH00 = ChunkMesher.computeWaterCornerHeight(
    chunk, world, originX, originZ, x, y, z,
    [[0, 0], [-1, 0], [0, -1], [-1, -1]],  // Échantillons voisinage
    currentHeight,
  );
  const cornerH10 = ChunkMesher.computeWaterCornerHeight(
    chunk, world, originX, originZ, x, y, z,
    [[0, 0], [1, 0], [0, -1], [1, -1]],
    currentHeight,
  );
  const cornerH11 = ChunkMesher.computeWaterCornerHeight(
    chunk, world, originX, originZ, x, y, z,
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    currentHeight,
  );
  const cornerH01 = ChunkMesher.computeWaterCornerHeight(
    chunk, world, originX, originZ, x, y, z,
    [[0, 0], [-1, 0], [0, 1], [-1, 1]],
    currentHeight,
  );

  // Calculer flux et UVs de surface
  const topFlow = computeWaterTopFlow(cornerH00, cornerH10, cornerH11, cornerH01);
  const topRect = topFlow.magnitude > WATER_TOP_FLOW_MIN_MAGNITUDE ? sideRect : stillTopRect;
  const topUvs = buildWaterTopUvs(topRect, topFlow);

  // ═══════════════════════════════════════
  // 1️⃣ FACE SUPÉRIEURE (surface eau)
  // ═══════════════════════════════════════
  if (shouldRenderWaterTopFace(aboveId) && !ChunkMesher.isOpaqueOccluder(aboveId)) {
    ChunkMesher.pushQuad(
      positions, normals, uvs,
      [
        [x, y + cornerH01, z + 1],      // z+ côté
        [x + 1, y + cornerH11, z + 1],
        [x + 1, y + cornerH10, z],      // z- côté
        [x, y + cornerH00, z],
      ],
      [0, 1, 0],  // Normal vers haut
      topUvs,
    );
  }

  // ═══════════════════════════════════════
  // 2️⃣ FACE INFÉRIEURE (bottom du bloc)
  // ═══════════════════════════════════════
  if (!isWaterBlock(belowId) && !ChunkMesher.isOpaqueOccluder(belowId)) {
    ChunkMesher.pushQuad(
      positions, normals, uvs,
      [
        [x, y, z],
        [x + 1, y, z],
        [x + 1, y, z + 1],
        [x, y, z + 1],
      ],
      [0, -1, 0],
      [[bottomRect.u0, bottomRect.v1], /* UVs statiques */],
    );
  }

  // ═══════════════════════════════════════
  // 3️⃣ FACE +X (droite)
  // ═══════════════════════════════════════
  const plusX = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x + 1, y, z);
  if (!isWaterBlock(plusX) && !ChunkMesher.isOpaqueOccluder(plusX)) {
    ChunkMesher.pushQuad(
      positions, normals, uvs,
      [
        [x + 1, y, z],
        [x + 1, y + cornerH10, z],        // hauteur du coin
        [x + 1, y + cornerH11, z + 1],
        [x + 1, y, z + 1],
      ],
      [1, 0, 0],
      [
        [sideRect.u0, sideRect.v1],
        [sideRect.u0, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH10)],
        [sideRect.u1, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH11)],
        [sideRect.u1, sideRect.v1],
      ],
    );
  }

  // Similar pour -X, +Z, -Z...
}
```

---

## 📌 Schéma Complet d'Un Bloc Eau

```
┌─ Bloc Source (niveau 0)
│  │
│  ├─ Hauteur surface = 0.86 (presque plein)
│  └─ UV surface = encore UVs (eau calme)
│
├─ Bloc Flux 1 (niveau 1)
│  │
│  ├─ Hauteur surface = 0.766
│  └─ UVs rotées selon flux
│
└─ Bloc Flux 7 (niveau 7)
   │
   ├─ Hauteur surface = 0.125 (très peu d'eau)
   └─ UVs fortement animées

Faces générées par bloc :
  Top     : Avec hauteurs de coin lissées
  Bottom  : Si pas d'eau en-dessous
  +X,-X   : Si pas d'eau sur les côtés
  +Z,-Z   : Avec interpolation UV verticale
```

---

## 🔍 Exemple de Rendu de Chute d'Eau

```
Cascade de 4 blocs (haut → bas) :

Bloc Y+3  (source)    Height=0.86  Flow=(0,0,0)     Static UVs
├─ Top surface : ██████████ (haut rempli)
│
Bloc Y+2  (flux 1)    Height=0.766 Flow=(-0.1,0,0)  Rotated UVs
├─ Top surface : ███████═════ (moins rempli)
├─ 4 sides aussi visibles
│
Bloc Y+1  (flux 1)    Height=0.766 Flow=(0,0,-0.1)  Différente rotation
├─ Top surface : ══════════════
│
Bloc Y+0  (flux 2)    Height=0.656 Flow=(0,0,0)     Très peu d'eau
├─ Top surface : ═════════════ (presque vide)

Résultat visuel :
  ╔═══════════════╗  100%
  ║ eau calme     ║
  ╠═══════════╦═╗  80%
  ║ eau flux  ║cascad║
  ║  →        ║ e ↓  ║
  ╠═════════╬═════╣  60%
  ║ eau flux ║ v  ║
  ║  ↓       ║    ║
  ╠══════════════╣  30%
  ║ eau flux v   ║
  ╚════════════════╝   0%
```

---

## 🎮 Intégration dans le Pipeline de Chunk

[src/render/ChunkMesher.ts](src/render/ChunkMesher.ts#L216-L290) :

```typescript
export class ChunkMesher {
  static buildGeometry(chunk: Chunk, world: World, atlas: TextureAtlas): BufferGeometry {
    const solidPositions: number[] = [];   // Blocs solides
    const solidNormals: number[] = [];
    const solidUvs: number[] = [];
    
    const waterPositions: number[] = [];   // Blocs eau (géométrie séparée)
    const waterNormals: number[] = [];
    const waterUvs: number[] = [];

    // Parcourir tous blocs du chunk
    for (let y = 0; ...; for (let z = 0; ...; for (let x = 0; ...) {
      const blockId = chunk.getBlock(x, y, z);
      
      if (isWaterBlock(blockId)) {
        // ✅ Ajouter à géométrie eau
        ChunkMesher.pushWaterBlock(
          waterPositions, waterNormals, waterUvs,
          chunk, world, atlas,
          /*...params...*/
        );
      } else if (!isSolidBlock(blockId)) {
        // Voxel vide, ignorer
        continue;
      } else {
        // ✅ Ajouter à géométrie solide
        /* Face culling, génération faces, etc. */
      }
    }

    // ══════════════════════════════════════
    // Créer BufferGeometry avec 2 groupes
    // ══════════════════════════════════════
    const geometry = new BufferGeometry();
    const positions = solidPositions.concat(waterPositions);
    const normals = solidNormals.concat(waterNormals);
    const uvs = solidUvs.concat(waterUvs);

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

    const solidVertexCount = solidPositions.length / 3;
    const waterVertexCount = waterPositions.length / 3;

    if (solidVertexCount > 0) {
      geometry.addGroup(0, solidVertexCount, 0);  // Groupe 0 = matériau solide
    }
    if (waterVertexCount > 0) {
      geometry.addGroup(solidVertexCount, waterVertexCount, 1);  // Groupe 1 = matériau eau
    }

    geometry.computeBoundingSphere();
    return geometry;
  }
}

// Puis dans Renderer.upsertChunkMesh() :
const mesh = new Mesh(geometry, [this.atlas.material, this.waterMaterial]);
// ↑ Deux matériaux : atlas pour solides, waterMaterial pour l'eau
```

---

## ⚙️ Résumé des Étapes de Rendu

```
1. ChunkMesher.buildGeometry()
   ├─ Itère chaque bloc du chunk
   ├─ Pour chaque bloc eau : pushWaterBlock()
   │  ├─ Récupère hauteurs des 4 coins
   │  ├─ Calcule flux directionnel
   │  ├─ Génère face haut + 4 face Côtés
   │  └─ Ajoute à waterPositions/waterNormals/waterUvs
   └─ Retourne geometry avec 2 groupes

2. Renderer.upsertChunkMesh()
   ├─ Crée Mesh avec 2 matériaux
   │  ├─ Material[0] = atlas.material (solides)
   │  └─ Material[1] = waterMaterial (eau)
   └─ Ajoute à scene

3. Three.js Render Pass
   ├─ Vertex Shader : transfère positions/normals
   ├─ Fragment Shader (eau) :
   │  ├─ Applique teinte #2f5da8
   │  ├─ Calcule Fresnel effect
   │  ├─ Highlight surface (normal.y)
   │  └─ Output couleur + alpha
   └─ Compositing avec depth
```

---

## 📚 Références Clés

- **Water Flow Levels** : `WATER_FLOW_LEVEL_MAX = 7`
- **Height Interpolation** : Linéaire entre 0.86 et 0.125
- **Corner Smoothing** : Moyenne des 4 voisins
- **Flow Calculation** : Gradient de hauteur inversé
- **UV Rotation** : `atan2(z, x) - π/2` puis rotation 2D
- **Mesh Groups** : Groupe 0=solides, Groupe 1=eau

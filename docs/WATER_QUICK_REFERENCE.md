# Quick Reference - Chemins & Snippets

Accès rapide aux fichiers et code pertinent pour le rendu de l'eau.

---

## 📂 Fichiers Principaux

### Configuration Rendu
- **[src/render/Renderer.ts](src/render/Renderer.ts)** (650+ lignes)
  - Lignes 49-57 : Constantes eau
  - Lignes 175 : Initialisation fog
  - Lignes 183-225 : Configuration matériau eau + shaders
  - Lignes 272-281 : Contrôle caméra
  - Lignes 609-620 : Fonction render()

### Meshing Eau
- **[src/render/ChunkMesher.ts](src/render/ChunkMesher.ts)** (700+ lignes)
  - Lignes 99-118 : Fonction `waterLevelToSurfaceHeight()`
  - Lignes 120-133 : Fonction `smoothWaterCornerHeight()`
  - Lignes 135-152 : Fonction `computeWaterTopFlow()`
  - Lignes 154-175 : Fonction `buildWaterTopUvs()`
  - Lignes 340-475 : Méthode `pushWaterBlock()`
  - Lignes 216-330 : Méthode `buildGeometry()` (boucle principale)

### Blocs & Types
- **[src/world/BlockRegistry.ts](src/world/BlockRegistry.ts)**
  - Ligne 9 : `WATER_SOURCE_BLOCK_ID = 10`
  - Lignes 10-12 : Constants flux eau
  - Lignes 143-153 : Définition bloc "water"
  - Lignes 358-368 : Définitions `water_flow_1` à `water_flow_7`

### Textures
- **[src/render/TextureAtlas.ts](src/render/TextureAtlas.ts)**
  - Gère les textures eau dans l'atlas

---

## 🎨 Palettes de Constantes

### Couleurs Eau

```typescript
// Teinte générale
const WATER_TINT_COLOR = new Color('#2f5da8');           // Bleu Minecraft

// Fog atmosphérique
const AIR_FOG_COLOR = '#95b9dd';                         // Ciel
const UNDERWATER_FOG_COLOR = '#1a3d5c';                  // (non défini, suggestion)
```

### Distances Fog

```typescript
const AIR_FOG_NEAR = 60;         // Début brouillard en air
const AIR_FOG_FAR = 190;         // Fin brouillard en air
const UNDERWATER_FOG_NEAR = 15;  // (non défini, suggestion forte 15-20)
const UNDERWATER_FOG_FAR = 50;   // (non défini, suggestion forte 50-70)
```

### Opacité & Alpha

```typescript
const WATER_OPACITY = 0.82;                              // Alpha général
const WATER_TOP_ALPHA_BOOST = 0.1;                       // Surface face-on
const WATER_TOP_ALPHA_GRAZE_BOOST = 0.18;                // Surface angle rasant
```

### Hauteurs Surface Eau

```typescript
const WATER_SURFACE_BASE_HEIGHT = 0.86;                  // Bloc source
const WATER_SURFACE_MIN_HEIGHT = 0.125;                  // Bloc flux max (7)
const WATER_TOP_FLOW_MIN_MAGNITUDE = 0.03;               // Seuil animation UV
const WATER_FLOW_LEVEL_MAX = 7;                          // Niveaux (1-7)
```

---

## 🔍 Snippet : Déterminer Caméra Sous-Eau

**À implémenter** ([src/render/Renderer.ts](src/render/Renderer.ts)) :

```typescript
import { isWaterBlock } from '../world/BlockRegistry';

export class Renderer {
  private cameraSubmerged = false;

  // Appeler dans la boucle render avec la world
  checkCameraUnderwater(world: World): void {
    const cameraPos = this.camera.position;
    const blockX = Math.floor(cameraPos.x);
    const blockY = Math.floor(cameraPos.y);
    const blockZ = Math.floor(cameraPos.z);
    
    const blockId = world.getBlock(blockX, blockY, blockZ);
    this.cameraSubmerged = isWaterBlock(blockId);
    
    return this.cameraSubmerged;
  }

  // Mettre à jour fog progressivement
  updateWaterViewAtmosphere(): void {
    const airFog = { color: '#95b9dd', near: 60, far: 190 };
    const waterFog = { color: '#1a3d5c', near: 15, far: 50 };
    
    const targetFog = this.cameraSubmerged ? waterFog : airFog;
    const transitionSpeed = 4.0;  // par seconde
    const blend = Math.min(1, deltaTime * transitionSpeed);
    
    this.scene.fog.color.lerp(
      new Color(targetFog.color),
      blend,
    );
    this.scene.fog.near += (targetFog.near - this.scene.fog.near) * blend;
    this.scene.fog.far += (targetFog.far - this.scene.fog.far) * blend;
    
    // Ajuster aussi l'exposition si désiré
    if (this.cameraSubmerged) {
      this.renderer.toneMappingExposure = 0.8;  // Plus sombre sous-eau
    } else {
      this.renderer.toneMappingExposure = 1.03; // Normal en air
    }
  }
}
```

---

## 🔧 Snippet : Modifier Coloration Eau

Dans [src/render/Renderer.ts](src/render/Renderer.ts) ligne 183 :

```typescript
// Changer la teinte de l'eau
const WATER_TINT_COLOR = new Color('#154a84');  // Bleu plus foncé

// Changer l'opacité
const WATER_OPACITY = 0.75;  // Plus transparent

// Renforcer la surbrillance de surface
const WATER_TOP_TINT_BOOST = 0.4;  // Augmenter de 0.2 à 0.4

// Augmenter effet Fresnel
const WATER_TOP_ALPHA_GRAZE_BOOST = 0.28;  // Augmenter de 0.18 à 0.28
```

---

## 🌊 Snippet : Vitesse Animation Eau

La rotation des UVs est calculée par `computeWaterTopFlow()` selon le gradient de hauteur.  
Pour plus d'animation, augmenter le contraste des hauteurs ou diminuer le smoothing.

```typescript
// Dans [src/render/ChunkMesher.ts](src/render/ChunkMesher.ts) ligne 168
const WATER_TOP_FLOW_UV_SCALE = 0.5;  // Plus bas = plus de rotation visible
                                       // 0.3 = plus d'animation
                                       // 0.7 = moins d'animation
```

---

## 📊 Snippet : Vérifier si Bloc Eau

```typescript
import { isWaterBlock, getWaterLevel } from '../world/BlockRegistry';

const blockId = 10;  // Ou obtenu du world
if (isWaterBlock(blockId)) {
  console.log('C\'est de l\'eau');
  const level = getWaterLevel(blockId);
  console.log(`Niveau flux : ${level}`);  // 0-7, ou null
}
```

---

## 📈 Snippet : Calculer Hauteur Surface Eau

```typescript
import { waterLevelToSurfaceHeight } from '../render/ChunkMesher';

// Niveau flux d'eau (0-7)
for (let level = 0; level <= 7; level++) {
  const height = waterLevelToSurfaceHeight(level);
  console.log(`Level ${level} → Height ${height.toFixed(3)}`);
}

// Output:
// Level 0 → Height 0.860
// Level 1 → Height 0.755
// Level 2 → Height 0.650
// Level 3 → Height 0.545
// Level 4 → Height 0.440
// Level 5 → Height 0.335
// Level 6 → Height 0.230
// Level 7 → Height 0.125
```

---

## 🎬 Snippet : Accéder Matériau Eau

```typescript
// Dans Renderer si vous voulez modifier les shaders dynamiquement
const renderer = new Renderer(canvas);

// Modifier après initialisation
renderer['waterMaterial'].color.set(0x1a4d7a);
renderer['waterMaterial'].opacity = 0.7;

// Attention : les uniforms custom ne seront mis à jour que lors du prochain onBeforeCompile
```

---

## 🔗 Textures Eau

```
Localisation :
├─ assets/textures/blocks/water_still.png
├─ assets/textures/blocks/water_still.png.mcmeta
├─ assets/textures/blocks/water_flow.png
└─ assets/textures/blocks/water_flow.png.mcmeta

Atlas Mapping :
├─ 'water_still'  → Face top + bottom blocs source
├─ 'water_flow'   → Côtés eau + animations flux

Format PNG : 16x16 pixels (texture Minecraft classique)
```

---

## 🧪 Tests Unitaires

Voir [src/render/ChunkMesherWater.test.ts](src/render/ChunkMesherWater.test.ts) :

```typescript
import { describe, expect, it } from 'vitest';
import {
  waterLevelToSurfaceHeight,
  shouldRenderWaterTopFace,
  smoothWaterCornerHeight,
  computeWaterTopFlow,
  buildWaterTopUvs,
} from './ChunkMesher';

describe('ChunkMesher water helpers', () => {
  it('maps water levels to descending surface heights', () => {
    expect(waterLevelToSurfaceHeight(0)).toBeCloseTo(0.86, 6);
    expect(waterLevelToSurfaceHeight(7)).toBeCloseTo(0.125, 6);
  });

  it('hides top face when water is directly above', () => {
    expect(shouldRenderWaterTopFace(10)).toBe(false);  // Eau au-dessus
    expect(shouldRenderWaterTopFace(0)).toBe(true);    // Vide au-dessus
  });
});
```

---

## ⚙️ Configuration Recommandée Sous-Eau

Pour implémentation meilleure expérience sous-marine :

```typescript
// Constantes proposées
const UNDERWATER_FOG_COLOR = '#0d2a3d';        // Bleu très foncé
const UNDERWATER_FOG_NEAR = 10;                // Très peu de distance
const UNDERWATER_FOG_FAR = 40;                 // Courte portée

const UNDERWATER_EXPOSURE = 0.75;              // Moins lumineux

// Teinte eau additionnelle sous-eau
const UNDERWATER_TINT_STRENGTH = 0.5;          // Augmenter effet teinte
const UNDERWATER_TOP_TINT_BOOST = 0.5;         // Moins de détails surface
```

---

## 💡 Tips d'Optimisation

1. **Culling de faces** : Facet não rendu si occludé par autre bloc
   - [src/render/ChunkMesher.ts](src/render/ChunkMesher.ts#L289-L295)

2. **Groupes de géométrie** : Eau séparée des solides
   - Solides : `geometry.addGroup(0, solidCount, 0)`
   - Eau : `geometry.addGroup(solidCount, waterCount, 1)`

3. **depthWrite: false** : Important pour transparence correcte
   - Laisse pixels arrière être visibles
   - Évite artefacts de profondeur

4. **Normal caching** : Calcul une fois par bloc
   - `pushWaterBlock()` réutilise les normales

5. **Corner height smoothing** : Réduit bruit surface
   - Lisse les 4 coins de chaque bloc d'eau

---

## 🐛 Débogage

```typescript
// Visualiser hauteurs corner
console.log(cornerH00, cornerH10, cornerH11, cornerH01);

// Vérifier flux
const flow = computeWaterTopFlow(c00, c10, c11, c01);
console.log(`Flux magnitude: ${flow.magnitude}, direction: (${flow.x}, ${flow.z})`);

// Vérifier si caméra sous-eau
console.log(`Camera submerged: ${this.cameraSubmerged}`);
console.log(`Fog: color=${this.scene.fog.color.getHexString()}, near=${this.scene.fog.near}, far=${this.scene.fog.far}`);
```

---

## 📖 Références Three.js

- `MeshLambertMaterial` : Material Lambert avec lighting
- `Fog` : Fog exponential linéaire
- `onBeforeCompile` : Hook shader personnalisé
- `BufferGeometry.addGroup()` : Multi-material geometry
- `Float32BufferAttribute` : Vertex data layout

---

**Documentation complète** :
- [WATER_RENDERING_ANALYSIS.md](WATER_RENDERING_ANALYSIS.md) - Architecture et shaders
- [WATER_MESHING_DETAILS.md](WATER_MESHING_DETAILS.md) - Algorithmes mesh et hauteurs
- Cette page - Références rapides

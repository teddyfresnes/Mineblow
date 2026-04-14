# Analyse du Rendu de l'Eau - Mineblow (Minecraft TypeScript/WebGL)

## 📍 Architecture Générale

Le projet utilise **Three.js** comme moteur WebGL. L'eau est rendue comme une géométrie de mesh distincte avec des shaders personnalisés appliqués via une `MeshLambertMaterial`.

---

## 1️⃣ RENDU DE L'EAU - Configuration Actuelle

### Fichier : [src/render/Renderer.ts](src/render/Renderer.ts#L49-L205)

**Configuration des paramètres d'eau** (lignes 49-57) :
```typescript
const WATER_TINT_COLOR = new Color('#2f5da8');           // Bleu eau Minecraft
const WATER_OPACITY = 0.82;                              // Transparence
const WATER_TINT_STRENGTH = 0.32;                        // Force de la teinte
const WATER_TOP_TINT_BOOST = 0.2;                        // Boost teinte surface
const WATER_TOP_ALPHA_BOOST = 0.1;                       // Boost alpha surface
const WATER_TOP_ALPHA_GRAZE_BOOST = 0.18;                // Angle rasant
const WATER_LUMA_BLEND = 0.08;                           // Mélange luminosité
const WATER_CONTRAST = 0.97;                             // Contraste
const WATER_EMISSIVE_INTENSITY = 0.07;                   // Intensité émissive
```

**Création du matériau eau** ([src/render/Renderer.ts](src/render/Renderer.ts#L183-L195)) :
```typescript
this.waterMaterial = new MeshLambertMaterial({
  map: atlasMap,
  color: WATER_TINT_COLOR.clone(),
  emissive: WATER_TINT_COLOR.clone().multiplyScalar(0.24),
  emissiveIntensity: WATER_EMISSIVE_INTENSITY,
  transparent: true,
  opacity: WATER_OPACITY,
  depthWrite: false,    // ⚠️ Important: pas d'écriture profondeur
  alphaTest: 0.01,
});
```

---

## 2️⃣ SHADERS PERSONNALISÉS

### Fichier : [src/render/Renderer.ts](src/render/Renderer.ts#L196-L225)

Les shaders sont modifiés **dynamiquement** avant la compilation avec `onBeforeCompile` :

```typescript
this.waterMaterial.onBeforeCompile = (shader) => {
  // Ajouter les uniforms personnalisés
  shader.uniforms.uWaterTint = { value: WATER_TINT_COLOR.clone() };
  shader.uniforms.uWaterTintStrength = { value: WATER_TINT_STRENGTH };
  shader.uniforms.uWaterTopTintBoost = { value: WATER_TOP_TINT_BOOST };
  shader.uniforms.uWaterTopAlphaBoost = { value: WATER_TOP_ALPHA_BOOST };
  shader.uniforms.uWaterTopAlphaGrazeBoost = { value: WATER_TOP_ALPHA_GRAZE_BOOST };
  shader.uniforms.uWaterLumaBlend = { value: WATER_LUMA_BLEND };
  shader.uniforms.uWaterContrast = { value: WATER_CONTRAST };

  // Déclarer les uniforms dans le fragment shader
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `#include <common>
uniform vec3 uWaterTint;
uniform float uWaterTintStrength;
uniform float uWaterTopTintBoost;
uniform float uWaterTopAlphaBoost;
uniform float uWaterTopAlphaGrazeBoost;
uniform float uWaterLumaBlend;
uniform float uWaterContrast;
`,
  );

  // Appliquer les effets de shader sur la couleur et l'alpha
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <map_fragment>',
    `#include <map_fragment>
// Conversion en luminosité (teinte monochrome)
vec3 waterLuma = vec3(dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114)));
diffuseColor.rgb = mix(diffuseColor.rgb, waterLuma, uWaterLumaBlend);

// Appliquer teinte bleue générale
diffuseColor.rgb = mix(diffuseColor.rgb, uWaterTint, uWaterTintStrength);

// Surbrillance de surface (quand regarde de haut en bas)
float waterTopFaceMask = smoothstep(0.72, 0.95, normalize(vNormal).y);
diffuseColor.rgb = mix(diffuseColor.rgb, uWaterTint, waterTopFaceMask * uWaterTopTintBoost);

// Effet Fresnel (transparence augmente quand on regarde l'eau de biais)
float waterTopViewFacing = clamp(abs(dot(normalize(vNormal), normalize(vViewPosition))), 0.0, 1.0);
float waterTopSurfaceOpacity = waterTopFaceMask * (uWaterTopAlphaBoost + (1.0 - waterTopViewFacing) * uWaterTopAlphaGrazeBoost);

// Ajuster contraste et alpha
diffuseColor.rgb = mix(vec3(0.5), diffuseColor.rgb, uWaterContrast);
diffuseColor.a = min(1.0, diffuseColor.a + waterTopSurfaceOpacity);
`,
  );
};

// Clé de cache pour éviter les recompilations
this.waterMaterial.customProgramCacheKey = () => 'water-tint-filter-v3';
```

### 🔑 Points clés des shaders :
- **Fresnel effect** : Transparence varie selon l'angle de vue
- **Surface highlighting** : Surbrillance du haut de l'eau
- **Normal-based masking** : Utilise `vNormal.y` pour détecter faces supérieures
- **Luminosité mélangée** : Donne un aspect mat/réaliste

---

## 3️⃣ GESTION DE LA CAMÉRA ET FOG

### Configuration du Fog

**Fichier :** [src/render/Renderer.ts](src/render/Renderer.ts#L58-L60) et [src/render/Renderer.ts](src/render/Renderer.ts#L175)

```typescript
const AIR_FOG_COLOR = '#95b9dd';      // Bleu ciel léger
const AIR_FOG_NEAR = 60;              // Début du brouillard
const AIR_FOG_FAR = 190;              // Fin du brouillard

// Initialisation dans le constructeur
this.scene.fog = new Fog(new Color(AIR_FOG_COLOR), AIR_FOG_NEAR, AIR_FOG_FAR);
```

### Transformation de la caméra

**Fichier :** [src/render/Renderer.ts](src/render/Renderer.ts#L272-L281)

```typescript
setCameraTransform(
  position: { x: number; y: number; z: number },
  yaw: number,
  pitch: number,
): void {
  this.camera.position.set(position.x, position.y, position.z);
  this.camera.rotation.order = 'YXZ';
  this.camera.rotation.y = yaw;
  this.camera.rotation.x = pitch;
  this.sky.update(position.x, position.z);
  updateSunForCamera(this.lights, position.x, position.z);
}
```

---

## 4️⃣ SYSTÈME DE FOG EXISTANT

### ✅ Fog déjà implémenté
- **Type** : Three.js `Fog` (exponentiel linéaire)
- **Near distance** : 60 blocs
- **Far distance** : 190 blocs
- **Couleur** : `#95b9dd` (ciel)

### 📊 Code d'initialisation

[src/render/Renderer.ts](src/render/Renderer.ts#L175)
```typescript
this.scene.fog = new Fog(new Color(AIR_FOG_COLOR), AIR_FOG_NEAR, AIR_FOG_FAR);
```

### 💡 Extension possible pour sous l'eau

Le code compilé (`dist/assets/index-DTg_vC0m.js`) contient des références à :
- `underwaterFogColor`
- `cameraSubmerged`
- `updateWaterViewAtmosphere()`

Cela suggère qu'une implémentation **future/en développement** est prévue pour changer le fog quand la caméra est submergée.

---

## 5️⃣ DÉTERMINER SI LA CAMÉRA EST SOUS L'EAU

### ⚠️ Actuellement PAS implémenté dans le source

Basé sur le code compilé, voici comment l'implémenter :

**Approche recommandée** :

```typescript
// Dans Renderer.ts
private cameraSubmerged = false;

// Vérifier si caméra est dans l'eau
checkCameraUnderwater(world: World): void {
  const cameraPos = this.camera.position;
  const blockX = Math.floor(cameraPos.x);
  const blockY = Math.floor(cameraPos.y);
  const blockZ = Math.floor(cameraPos.z);
  
  const blockId = world.getBlock(blockX, blockY, blockZ);
  this.cameraSubmerged = isWaterBlock(blockId);
}

// Mettre à jour l'atmosphère
updateWaterViewAtmosphere(): void {
  const targetFog = this.cameraSubmerged ? 
    { color: underwaterFogColor, near: UNDERWATER_FOG_NEAR, far: UNDERWATER_FOG_FAR } :
    { color: airFogColor, near: AIR_FOG_NEAR, far: AIR_FOG_FAR };
  
  // Interpolation progressive
  this.sceneFog.color.lerp(new Color(targetFog.color), deltaTime * transitionSpeed);
  this.sceneFog.near += (targetFog.near - this.sceneFog.near) * deltaTime * transitionSpeed;
  this.sceneFog.far += (targetFog.far - this.sceneFog.far) * deltaTime * transitionSpeed;
}
```

---

## 📁 Fichiers Clés du Projet

| Fichier | Fonction |
|---------|----------|
| [src/render/Renderer.ts](src/render/Renderer.ts) | Configuration matériau eau, shaders, fog, caméra |
| [src/render/ChunkMesher.ts](src/render/ChunkMesher.ts) | Génération géométrie eau, calcul hauteurs, UVs |
| [src/world/BlockRegistry.ts](src/world/BlockRegistry.ts) | Définition blocs eau (ID 10, flux 26-32) |
| [src/render/TextureAtlas.ts](src/render/TextureAtlas.ts) | Gestion atlas textures (`water_still`, `water_flow`) |

---

## 🌊 Pipeline de Rendu de l'Eau

```
1. ChunkMesher.ts
   ├─ Charge hauteurs eau de blocs adjacents
   ├─ Lisse les hauteurs de coin (4 points)
   ├─ Calcule flux directionnel
   └─ Génère géométrie + UVs rotées selon flux

2. Renderer.ts
   ├─ Crée MeshLambertMaterial + shaders
   ├─ Ajoute géométrie à mesh (groupe 1)
   └─ Applique fog global

3. Three.js Render Pass
   ├─ Vertex shader : position + normale
   ├─ Fragment shader : couleur + teinte + Fresnel
   └─ Output : image avec eau rendue
```

---

## 📊 Constantes de Configuration Eau

```typescript
WATER_SURFACE_BASE_HEIGHT      = 0.86   // Hauteur surface (source)
WATER_SURFACE_MIN_HEIGHT       = 0.125  // Hauteur min (flux 7)
WATER_TOP_FLOW_MIN_MAGNITUDE   = 0.03   // Seuil rotation UV
WATER_FLOW_LEVEL_MAX           = 7      // Niveaux flux (1-7)
```

---

## 🎨 Résumé des Paramètres de Rendu

```
┌─────────────────────────────────────┐
│  Matériau Eau (MeshLambertMaterial) │
├─────────────────────────────────────┤
│ Couleur teinte  : #2f5da8 (bleu)   │
│ Opacité         : 82%               │
│ Émissive        : #0a1e29 (~24% de base)│
│ Émissive Intens.: 7%                │
│ Depth Write     : false             │ (important!)
│ Alpha Test      : 0.01              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Effets Shader Fragment             │
├─────────────────────────────────────┤
│ Fresnel Effect  : Angle rasant      │
│ Surface Glow    : +20% teinte haut  │
│ Luma Blend      : 8% (réalisme)     │
│ Contrast        : 97% (subtil)      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Fog Atmosphérique                  │
├─────────────────────────────────────┤
│ Couleur         : #95b9dd (ciel)    │
│ Near distance   : 60 blocs          │
│ Far distance    : 190 blocs         │
└─────────────────────────────────────┘
```

---

## 🔧 Textures Utilisées

- `water_still` : Surface eau calme (top + bottom de source)
- `water_flow` : Côtés eau + top en mouvement (flux 1-7)
- Emplacements : `assets/textures/blocks/water_*.png`
- Métadonnées : `assets/textures/blocks/water_*.png.mcmeta`

---

## ✨ Points Importants

1. **depthWrite: false** - L'eau ne bloque pas les pixels arrière (transparence)
2. **Shaders dynamiques** - Modifiés via `onBeforeCompile` après création material
3. **Fresnel effect** - Rend l'eau plus transparente vue de face
4. **Normal-based masking** - Change teinte selon orientation face
5. **Corner height smoothing** - Surface eau lisse et réaliste
6. **Fog global** - Modifiable par frame pour transitions sous-eau

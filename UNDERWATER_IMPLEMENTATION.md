# Implémentation Recommandée - Système Sous-Eau Complet

Guide pour ajouter un système de fog et effets visuels sous-eau réaliste.

---

## 🎯 Objectif

Étendre le système de fog existant pour détecter quand la caméra est submergée et appliquer :
- ✅ Teinte bleue sous-marine
- ✅ Fog réduit (moins de visibility)
- ✅ Exposition diminuée (plus sombre)
- ✅ Transition progressive entre air et eau

---

## 📋 Étapes d'Implémentation

### Étape 1 : Ajouter Constantes Sous-Marines

**Fichier** : [src/render/Renderer.ts](src/render/Renderer.ts)

**Après ligne 61** (après les constantes air), ajouter :

```typescript
// ════════════════════════════════════════
// UNDERWATER ATMOSPHERE
// ════════════════════════════════════════
const UNDERWATER_FOG_COLOR = '#0d2a3d';        // Bleu très foncé
const UNDERWATER_FOG_NEAR = 10;                // 10 blocs seulement
const UNDERWATER_FOG_FAR = 40;                 // 40 blocs max
const UNDERWATER_EXPOSURE = 0.7;               // Plus sombre (-30%)
const WATER_VIEW_BLEND_SPEED = 3.0;            // Transition en 1/3 sec
```

---

### Étape 2 : Ajouter Propriétés à la Classe Renderer

**Fichier** : [src/render/Renderer.ts](src/render/Renderer.ts)

**Après ligne 128** (fin des propriétés publiques), ajouter :

```typescript
// Gestion de la vue sous-marine
private cameraSubmerged = false;
private waterViewBlend = 0;  // 0 = air, 1 = eau
private airFogColor = new Color(AIR_FOG_COLOR);
private underwaterFogColor = new Color(UNDERWATER_FOG_COLOR);
private sceneFog: Fog;
```

---

### Étape 3 : Modifier le Constructeur

**Fichier** : [src/render/Renderer.ts](src/render/Renderer.ts)

**Ligne 175** : Changer de :
```typescript
this.scene.fog = new Fog(new Color(AIR_FOG_COLOR), AIR_FOG_NEAR, AIR_FOG_FAR);
```

À :
```typescript
this.sceneFog = new Fog(new Color(AIR_FOG_COLOR), AIR_FOG_NEAR, AIR_FOG_FAR);
this.scene.fog = this.sceneFog;
```

---

### Étape 4 : Ajouter Méthode de Détection

**Fichier** : [src/render/Renderer.ts](src/render/Renderer.ts)

**Ajouter avant la méthode `render()`** (avant ligne 609) :

```typescript
checkCameraUnderwater(world: World): void {
  const pos = this.camera.position;
  const blockX = Math.floor(pos.x);
  const blockY = Math.floor(pos.y);
  const blockZ = Math.floor(pos.z);
  
  // Récupérer le bloc à la position caméra
  const blockId = world.getBlock(blockX, blockY, blockZ);
  
  // Importer depuis world/BlockRegistry.ts
  const targetSubmerged = isWaterBlock(blockId);
  
  // Mise à jour l'état de submersion
  this.cameraSubmerged = targetSubmerged;
}
```

---

### Étape 5 : Ajouter Transition d'Atmosphère

**Fichier** : [src/render/Renderer.ts](src/render/Renderer.ts)

**Ajouter après la méthode `checkCameraUnderwater()`** :

```typescript
updateWaterViewAtmosphere(dt: number): void {
  // Objectif : 0 en air, 1 sous l'eau
  const targetBlend = this.cameraSubmerged ? 1 : 0;
  
  // Interpolation exponentielle
  // Plus rapide vers l'eau, plus lent vers l'air (réaliste pour les yeux)
  const blendSpeed = this.cameraSubmerged 
    ? WATER_VIEW_BLEND_SPEED * 1.5  // Rapide submersion
    : WATER_VIEW_BLEND_SPEED * 0.8; // Lent émersion
  
  const blend = Math.min(1, dt * blendSpeed);
  this.waterViewBlend += (targetBlend - this.waterViewBlend) * blend;
  
  // Pas de mise à jour si proche du seuil (éviter flottage)
  if (Math.abs(this.waterViewBlend - targetBlend) < 0.001) {
    this.waterViewBlend = targetBlend;
  }
  
  // ═══════════════════════════════════════════
  // Interpoler fog color
  // ═══════════════════════════════════════════
  this.sceneFog.color
    .copy(this.airFogColor)
    .lerp(this.underwaterFogColor, this.waterViewBlend);
  
  // ═══════════════════════════════════════════
  // Interpoler fog distances
  // ═══════════════════════════════════════════
  this.sceneFog.near = AIR_FOG_NEAR + 
    (UNDERWATER_FOG_NEAR - AIR_FOG_NEAR) * this.waterViewBlend;
  
  this.sceneFog.far = AIR_FOG_FAR + 
    (UNDERWATER_FOG_FAR - AIR_FOG_FAR) * this.waterViewBlend;
  
  // ═══════════════════════════════════════════
  // Interpoler exposition (luminosité)
  // ═══════════════════════════════════════════
  this.renderer.toneMappingExposure = AIR_EXPOSURE + 
    (UNDERWATER_EXPOSURE - AIR_EXPOSURE) * this.waterViewBlend;
}
```

---

### Étape 6 : Intégrer dans la Boucle GamGame

**Fichier** : [src/game/Game.ts](src/game/Game.ts)

Dans la méthode `render()`, appeler :

```typescript
private render(): void {
  // ... code existant ...
  
  // Vérifier si sous-eau
  this.renderer.checkCameraUnderwater(this.world);
  
  // Mettre à jour fog et atmosphère
  const dt = (performance.now() - this.lastRenderTime) / 1000;
  this.renderer.updateWaterViewAtmosphere(dt);
  
  // Rendu normal
  this.renderer.render();
  
  this.lastRenderTime = performance.now();
}
```

---

## 📝 Import Requis

**Fichier** : [src/render/Renderer.ts](src/render/Renderer.ts)

**Ajouter à l'import de BlockRegistry** (ligne ~24) :

```typescript
// Existant :
import { getBlockDefinition } from '../world/BlockRegistry';

// Ajouter :
import { isWaterBlock } from '../world/BlockRegistry';
```

**Ajouter import de World** (type) :

```typescript
import type { World } from '../world/World';
```

---

## 🧪 Test de l'Implémentation

### Test 1 : En Air
```typescript
// Position : hors de l'eau
renderer.checkCameraUnderwater(world);
console.log(renderer['cameraSubmerged']);  // → false
console.log(renderer['waterViewBlend']);   // → 0
console.log(scene.fog.color.getHexString());  // → #95b9dd
```

### Test 2 : Entrée Eau
```typescript
// Position : dans bloc eau
renderer.checkCameraUnderwater(world);  
console.log(renderer['cameraSubmerged']);  // → true

// Après 0.33s de transition :
renderer.updateWaterViewAtmosphere(0.33);
console.log(renderer['waterViewBlend']);   // → ~0.99
console.log(scene.fog.color.getHexString());  // → ~#0d3052 (bleu foncé)
console.log(scene.fog.near);  // → ~10
console.log(scene.fog.far);   // → ~40
```

---

## 🎨 Configuration Visuelle Alternative

### Option 1 : Turquoise (Tropical)
```typescript
const UNDERWATER_FOG_COLOR = '#1a6b6b';        // Cyan/turquoise
const UNDERWATER_FOG_NEAR = 15;
const UNDERWATER_FOG_FAR = 50;
const UNDERWATER_EXPOSURE = 0.8;
```

### Option 2 : Très Sombre (Grotte)
```typescript
const UNDERWATER_FOG_COLOR = '#0a1520';        // Presque noir
const UNDERWATER_FOG_NEAR = 5;
const UNDERWATER_FOG_FAR = 25;
const UNDERWATER_EXPOSURE = 0.5;
```

### Option 3 : Réaliste Lagon
```typescript
const UNDERWATER_FOG_COLOR = '#2d5a5a';        // Gris-bleu
const UNDERWATER_FOG_NEAR = 20;
const UNDERWATER_FOG_FAR = 70;
const UNDERWATER_EXPOSURE = 0.85;
```

---

## 🔧 Points d'Extension

### Ajouter Particules de Bulles
```typescript
// Dans updateWaterViewAtmosphere(), si submerged et moving :
if (this.cameraSubmerged && movementIntensity > 0.5) {
  this.spawnBubbleParticles(3);  // 3 bulles par frame
}
```

### Ajouter Post-Processing Underwater
```typescript
// Appliquer distortion shader lors du rendu sous-eau
if (this.waterViewBlend > 0) {
  this.applyWaterDistortionPass(this.waterViewBlend);
}
```

### Bruits de Sons Sous-Marins
```typescript
// Dans updateWaterViewAtmosphere() :
const targetVolume = this.waterViewBlend;
audioManager.setAmbientSound('underwater_loop', targetVolume);
```

---

## ⚡ Performance

### Impact CPU/GPU
- **checkCameraUnderwater()** : O(1) - un seul lookup world
- **updateWaterViewAtmosphere()** : O(1) - interpolations simples
- **Total overhead** : ~0.1ms par frame

### Optimisation si Nécessaire
```typescript
// Vérifier submersion seulement tous les N frames
if (frameCount % 10 === 0) {  // Tous les 10 frames
  this.checkCameraUnderwater(world);
}

// Utiliser timeEasing au lieu de lerp si très rapide
if (dt > 0.016) { // Frame drop détecté
  this.waterViewBlend = targetBlend;  // Jump direct
} else {
  // Interpolation normale
}
```

---

## 🧬 Architecture Complète Post-Implémentation

```
Boucle Render (Game.ts)
├─ À chaque frame :
│  ├─ checkCameraUnderwater(world)
│  │  └─ Récupère blockId à position caméra
│  │     └─ isWaterBlock(blockId)  → cameraSubmerged
│  │
│  ├─ updateWaterViewAtmosphere(dt)
│  │  ├─ Calcule blend : air → eau
│  │  ├─ Interpole scene.fog.color
│  │  ├─ Interpole scene.fog.near/far
│  │  └─ Interpole toneMappingExposure
│  │
│  └─ renderer.render()
│     ├─ Vertex Shader : géométrie
│     └─ Fragment Shader :
│        ├─ Appliquer waterMaterial (teinte)
│        ├─ Appliquer fog (distance)
│        └─ Appliquer exposure (luminosité)
│           → Output final image
```

---

## 📊 State Diagram

```
                    ┌──────────────┐
                    │  Camera in   │
                    │  water block │
                    └──────┬───────┘
                           │
                    ┌──────▼─────┐
              1.5× Blend Speed  │
                    │            │
        ┌───────────┴─────────────┼──────────┐
        │                         │          │
        ▼                         ▼          ▼
   ┌─────────────────────────────────────────┐
   │   waterViewBlend = targetBlend × blend  │
   │   (exponential interpolation)           │
   └──────┬──────────────────────────────────┘
          │
          ├─ scene.fog.color.lerp()
          ├─ scene.fog.near += delta
          ├─ scene.fog.far += delta
          └─ renderer.toneMappingExposure += delta
                      │
                      ▼
              ┌────────────────┐
              │  Rendered Fog  │
              │  and Exposure  │
              └────────────────┘
```

---

## 🎬 Résumé du Code

| Élément | Lieu | Lignes | Fonction |
|---------|------|--------|----------|
| Constantes | Renderer.ts | 62-65 | Fog underwater |
| Propriétés | Renderer.ts | 128+ | État submersion |
| Constructeur | Renderer.ts | 175 | Initialiser fog |
| Détection | Renderer.ts | ~650 | checkCameraUnderwater() |
| Transition | Renderer.ts | ~660 | updateWaterViewAtmosphere() |
| Intégration | Game.ts | render() | Appeler les 2 méthodes |

---

## ✅ Checklist d'Implémentation

- [ ] Ajouter constantes UNDERWATER_*
- [ ] Ajouter propriétés class (cameraSubmerged, waterViewBlend, fog colors)
- [ ] Modifier constructeur pour stocker fog reference
- [ ] Implémenter checkCameraUnderwater()
- [ ] Implémenter updateWaterViewAtmosphere()
- [ ] Ajouter imports (isWaterBlock, World type)
- [ ] Intégrer dans Game.ts render()
- [ ] Tester en air (blend = 0)
- [ ] Tester dans eau (blend → 1)
- [ ] Vérifier transition progressive
- [ ] Ajuster constantes pour look désiré
- [ ] Performance test (60 fps stable)

---

## 💬 Tests et Debugging

```typescript
// Debug : afficher état sous-eau dans console
setInterval(() => {
  console.log(JSON.stringify({
    submerged: renderer['cameraSubmerged'],
    blend: renderer['waterViewBlend'].toFixed(2),
    fogColor: renderer['sceneFog'].color.getHexString(),
    fogNear: renderer['sceneFog'].near.toFixed(1),
    fogFar: renderer['sceneFog'].far.toFixed(1),
    exposure: renderer['renderer'].toneMappingExposure.toFixed(2),
  }, null, 2));
}, 500);
```

---

**Documentation associée** :
- [WATER_RENDERING_ANALYSIS.md](WATER_RENDERING_ANALYSIS.md) - Comprendre l'architecture
- [WATER_MESHING_DETAILS.md](WATER_MESHING_DETAILS.md) - Détails mesh
- [WATER_QUICK_REFERENCE.md](WATER_QUICK_REFERENCE.md) - Références rapides

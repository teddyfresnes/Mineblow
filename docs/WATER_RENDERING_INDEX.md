# 📚 Documentation Water Rendering - Index

Exploration complète du système de rendu de l'eau dans Mineblow (Minecraft TypeScript/WebGL).

---

## 📖 Documents

### 1️⃣ [WATER_RENDERING_ANALYSIS.md](WATER_RENDERING_ANALYSIS.md) 
**Architecture générale et shaders**

Contient :
- ✅ Vue d'ensemble du système Three.js
- ✅ Configuration matériau eau (opacity, tint, emissive)
- ✅ **Shaders personnalisés complets** avec GLSL fragments
- ✅ Système de fog existant (AIR_FOG_COLOR, distances)
- ✅ Gestion caméra et transformation
- ✅ Référence `cameraSubmerged` (futur)
- ✅ Détail des uniforms shader et effets

**Meilleur pour** : Comprendre comment l'eau est rendue visuellement

---

### 2️⃣ [WATER_MESHING_DETAILS.md](WATER_MESHING_DETAILS.md)
**Algorithmes de maillage et hauteurs d'eau**

Contient :
- ✅ Système de hauteur surface `waterLevelToSurfaceHeight()`
- ✅ **Lissage des coins** : `smoothWaterCornerHeight()`
- ✅ **Calcul flux directionnel** : `computeWaterTopFlow()`
- ✅ **Rotation UVs par flux** : `buildWaterTopUvs()`
- ✅ Détails de `pushWaterBlock()` (5 faces par bloc)
- ✅ Schémas visuels du pipeline complet
- ✅ Exemple rendu cascades

**Meilleur pour** : Comprendre la géométrie et la physique de l'eau

---

### 3️⃣ [WATER_QUICK_REFERENCE.md](WATER_QUICK_REFERENCE.md)
**Références rapides et snippets**

Contient :
- ✅ Chemins fichiers clés (`src/render/Renderer.ts` lignes 49-225)
- ✅ Palettes de constantes (couleurs, distances, opacités)
- ✅ Snippets code prêt à copier-coller
- ✅ Comment détecter caméra sous-eau
- ✅ Comment modifier coloration eau
- ✅ Tests unitaires existants
- ✅ Configuration recommandée sous-eau

**Meilleur pour** : Référence rapide pendant le codage

---

### 4️⃣ [UNDERWATER_IMPLEMENTATION.md](UNDERWATER_IMPLEMENTATION.md)
**Guide d'implémentation système sous-eau**

Contient :
- ✅ **Étapes détaillées** pour ajouter effet sous-eau
- ✅ Constantes proposées (fog underwater, exposure)
- ✅ Propriétés à ajouter à Renderer
- ✅ Modification du constructeur
- ✅ Code de détection `checkCameraUnderwater()`
- ✅ Code de transition `updateWaterViewAtmosphere()`
- ✅ Intégration dans Game.ts
- ✅ Tests et debugging
- ✅ Variantes visuelles (tropical, grotte, réaliste)

**Meilleur pour** : Implémenter les fonctionnalités manquantes

---

## 🎯 Roadmap de Lecture

### Pour Débuter (5 min)
1. Lire section "Rendu de l'eau - Configuration actuelle" de [WATER_RENDERING_ANALYSIS.md](WATER_RENDERING_ANALYSIS.md)
2. Regarder "Shaders personnalisés" pour comprendre les effets visuels

### Pour Comprendre Profondément (20 min)
1. [WATER_RENDERING_ANALYSIS.md](WATER_RENDERING_ANALYSIS.md) complet
2. [WATER_MESHING_DETAILS.md](WATER_MESHING_DETAILS.md) - sections 1 et 2 (hauteurs, smoothing)

### Pour Coder une Extension (30 min)
1. [WATER_QUICK_REFERENCE.md](WATER_QUICK_REFERENCE.md) - chemins et snippets
2. [UNDERWATER_IMPLEMENTATION.md](UNDERWATER_IMPLEMENTATION.md) - étapes 1-6
3. Adapter les constantes à votre style visuel

### Full Deep Dive (60 min)
- Lire tous les documents dans l'ordre
- Examiner le code source directement dans l'IDE
- Implémenter le système complet

---

## 📊 Résumé des Découvertes

### Rendu de l'Eau ✅
```
MeshLambertMaterial
├─ color: #2f5da8 (bleu Minecraft)
├─ opacity: 0.82
├─ depthWrite: false (important!)
└─ Shaders personnalisés (onBeforeCompile)
   ├─ Fresnel effect (transparence par angle)
   ├─ Surface glow (surbrillance haut)
   └─ Luma blend (réalisme)
```

### Maillage Eau ✅
```
Surface d'eau dynamique
├─ Hauteur base: 0.86 (source)
├─ Hauteur min: 0.125 (flux max)
├─ Coins lissés (moyenne 4 voisins)
├─ Flux directionnel (gradient hauteur)
└─ UVs rotées selon flux
```

### Fog Existant ✅
```
Three.js Fog (linéaire)
├─ Couleur: #95b9dd (ciel)
├─ Near: 60 blocs
└─ Far: 190 blocs

À étendre :
├─ Fog underwater: #0d2a3d
├─ Near: 10, Far: 40
└─ Transition progressive
```

### Caméra Sous-Eau ⚠️ À Implémenter
```
Détection : blockId à position caméra → isWaterBlock()
Transition : interpolation exponentielle air ↔ eau
Effets :
  ├─ Fog changement couleur/distance
  ├─ Exposition diminuée (toneMappingExposure)
  └─ Opcional : particules bulles, post-processing
```

---

## 🔗 Fichiers Sources Principaux

### Cœur du Rendu
| Fichier | Relevance | Lignes clés |
|---------|-----------|-----------|
| `src/render/Renderer.ts` | ⭐⭐⭐ Essentiel | 49-225 config eau, 175 fog, 609 render |
| `src/render/ChunkMesher.ts` | ⭐⭐⭐ Essentiel | 99-330 génération mesh eau |

### Données
| Fichier | Relevance | Lignes clés |
|---------|-----------|-----------|
| `src/world/BlockRegistry.ts` | ⭐⭐ Important | 9-12 IDs eau, 143-368 définitions |
| `src/render/TextureAtlas.ts` | ⭐ Support | Gestion textures water_still/flow |

### Tests
| Fichier | Relevance | Contenu |
|---------|-----------|---------|
| `src/render/ChunkMesherWater.test.ts` | ⭐ Validation | Tests water helpers |

---

## 🧪 Constantes Principales

### Configuration Eau

| Constante | Valeur | Fonction |
|-----------|--------|----------|
| WATER_TINT_COLOR | #2f5da8 | Teinte bleue |
| WATER_OPACITY | 0.82 | Transparence générale |
| WATER_TINT_STRENGTH | 0.32 | Force teinte appliquée |
| WATER_TOP_ALPHA_BOOST | 0.1 | Surbrillance face supérieure |
| WATER_TOP_ALPHA_GRAZE_BOOST | 0.18 | Fresnel effect force |
| WATER_LUMA_BLEND | 0.08 | Mélange luminosité |
| WATER_CONTRAST | 0.97 | Contraste subtil |
| WATER_EMISSIVE_INTENSITY | 0.07 | Brillance émissive |

### Configuration Fog Air

| Constante | Valeur | Fonction |
|-----------|--------|----------|
| AIR_FOG_COLOR | #95b9dd | Bleu ciel |
| AIR_FOG_NEAR | 60 | Début brouillard |
| AIR_FOG_FAR | 190 | Fin brouillard |
| AIR_EXPOSURE | 1.03 | Luminosité normale |

### Configuration Water Levels

| Constante | Valeur | Fonction |
|-----------|--------|----------|
| WATER_SURFACE_BASE_HEIGHT | 0.86 | Eau source (remplie) |
| WATER_SURFACE_MIN_HEIGHT | 0.125 | Eau flux 7 (vide) |
| WATER_FLOW_LEVEL_MAX | 7 | Niveaux 1-7 |
| WATER_TOP_FLOW_MIN_MAGNITUDE | 0.03 | Seuil animation UV |

---

## 🔄 Pipeline Complet

```
┌──────────────────────────────────────────────────────────┐
│                    Startup (Renderer)                     │
├──────────────────────────────────────────────────────────┤
│ 1. Créer MeshLambertMaterial                            │
│ 2. Configurer shaders via onBeforeCompile()             │
│ 3. Ajouter uniforms personnalisés                       │
│ 4. Initialiser scene.fog (Three.js Fog)                 │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│              Per Chunk (ChunkMesher)                     │
├──────────────────────────────────────────────────────────┤
│ 1. Itérer blocs dans chunk                              │
│ 2. Pour chaque eau : pushWaterBlock()                   │
│    ├─ Calculer hauteurs 4 coins                         │
│    ├─ Lisser (moyenne voisins)                          │
│    ├─ Créer flux directionnel                           │
│    ├─ Générer géométrie (haut + 4 côtés)               │
│    └─ Mapper UVs rotées                                 │
│ 3. Créer BufferGeometry avec 2 groupes                  │
│    ├─ Groupe 0 : blocs solides                          │
│    └─ Groupe 1 : eau                                    │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│            Per Frame Render (Game.ts)                    │
├──────────────────────────────────────────────────────────┤
│ 1. checkCameraUnderwater(world)                          │
│    → Déterminer if blockAtCamera = eau                   │
│ 2. updateWaterViewAtmosphere(dt)                         │
│    → Interpoler fog, exposure vers air/eau               │
│ 3. renderer.render()                                     │
│    → Afficher à l'écran                                  │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│          GPU Rendering (Three.js Shaders)                │
├──────────────────────────────────────────────────────────┤
│ Vertex Shader :                                          │
│   - Transférer position, normal, UV                      │
│                                                          │
│ Fragment Shader (standard Lambert) + Custom :            │
│   - map_fragment hook :                                  │
│     ├─ Luma blend (monochrome)                           │
│     ├─ Teinte bleu appliquée                             │
│     ├─ Surface glow (si normal.y > 0.72)                │
│     ├─ Fresnel (angle rasant + alpha)                    │
│     └─ Contraste ajusté                                  │
│   - Fog appliquée par Three.js                           │
│                                                          │
│ Output : Image water + fog rendue                        │
└──────────────────────────────────────────────────────────┘
```

---

## 💡 Tips d'Optimisation

### Meshing
- Culling de faces : Eau pas rendue si occludée
- Groupes géométrie : Eau séparée = rendu efficace
- Corner smoothing : Lisse naturellement sans coût

### Shaders
- `depthWrite: false` : Rend alpha blending correct
- `alphaTest: 0.01` : Culls presque transparent pixels
- Uniforms compilés une fois : Pas de recompile per frame

### Fog
- Interpolation progressive : Évite discontinuité
- Utiliser blend exponentiel : Plus naturel

---

## 🎓 Concepts Clés

### Fresnel Effect
L'eau est plus transparente vue de face (perpendiculaire) et moins transparente vue de biais (rasante). Implémenté via :
```glsl
float waterTopViewFacing = clamp(abs(dot(normalize(vNormal), normalize(vViewPosition))), 0.0, 1.0);
```

### Surface Highlighting
Seule la face supérieure de l'eau (normal.y) a une surbrillance bleue additionnelle.

### Flow Animation
Direction du flux = gradient inversé des hauteurs des coins. Les UVs sont rotées selon ce vecteur.

### Corner Smoothing
Surfaces d'eau lisses en moyennant les hauteurs des 4 coins du bloc avec les blocs voisins.

---

## 📞 Support et Debug

### Vérifier Fog de l'eau
```javascript
console.log(renderer.scene.fog);
// {color: Color, near: 60, far: 190, type: "Fog"}
```

### Vérifier Water Metadata
```javascript
import { isWaterBlock, getWaterLevel } from './world/BlockRegistry';
console.log(isWaterBlock(10));  // true (source)
console.log(getWaterLevel(10)); // null (source)
console.log(getWaterLevel(26)); // 1 (flux level 1)
```

### Vérifier sous-eau
```javascript
console.log(camera.position);  // {x, y, z}
const blockAtCamera = world.getBlock(x, y, z);
console.log(isWaterBlock(blockAtCamera));  // true/false
```

---

## 🚀 Prochaines Étapes

### Immédiat
- [ ] Lire WATER_RENDERING_ANALYSIS.md
- [ ] Consulter WATER_QUICK_REFERENCE.md
- [ ] Implémenter UNDERWATER_IMPLEMENTATION.md

### Court terme
- [ ] Ajouter détection caméra sous-eau
- [ ] Implémenter transition fog
- [ ] Tester en jeu

### Long terme
- [ ] Ajouter particules bulles
- [ ] Post-processing underwater distortion
- [ ] Bruits sons ambiance
- [ ] Effecteur d'air visage sous-eau

---

## 📜 Version & Historique

- **Date** : 28 Mars 2026
- **Projet** : Mineblow (Minecraft Clone)
- **Engine** : Three.js (WebGL)
- **Language** : TypeScript
- **Couverture** : Rendu eau complète + système fog + guide implémentation

---

## 📞 Fichiers à Modifier

Pour implémenter le système sous-eau complet :

1. ✏️ [src/render/Renderer.ts](src/render/Renderer.ts) - Ajouter méthodes underwater
2. ✏️ [src/game/Game.ts](src/game/Game.ts) - Appeler dans render loop
3. 📖 [src/world/BlockRegistry.ts](src/world/BlockRegistry.ts) - Import isWaterBlock

**Effort estimé** : 1-2 heures d'intégration

---

**Documentation créée par analyse de code complète du projet Mineblow** ✨

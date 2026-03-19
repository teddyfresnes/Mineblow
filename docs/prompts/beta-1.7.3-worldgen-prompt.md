Tu es un ingénieur senior TypeScript. Tu dois implémenter dans ce repo une génération Overworld qui reproduit **Minecraft Beta 1.7.3** au plus proche, en **remplaçant** le générateur actuel (pas de mode toggle).

Contrainte clé:
- Garder les API publiques de `TerrainGenerator`: `generateChunk(coord)`, `getSurfaceHeight(x,z)`, `getTerrainBlock(x,y,z)`.
- Hauteur monde: `Y=0..127`.
- Déterminisme strict à seed égale.

Références algorithmiques (à suivre littéralement autant que possible):
- `ChunkProviderGenerate.java`:
  https://github.com/Bukkit/mc-dev/blob/1a792ed860ebe2c6d4c40c52f3bc7b9e0789ca23/net/minecraft/server/ChunkProviderGenerate.java
- `WorldChunkManager.java`:
  https://github.com/Bukkit/mc-dev/blob/1a792ed860ebe2c6d4c40c52f3bc7b9e0789ca23/net/minecraft/server/WorldChunkManager.java
- `BiomeBase.java`:
  https://github.com/Bukkit/mc-dev/blob/1a792ed860ebe2c6d4c40c52f3bc7b9e0789ca23/net/minecraft/server/BiomeBase.java
- `MapGenCaves.java`:
  https://github.com/Bukkit/mc-dev/blob/1a792ed860ebe2c6d4c40c52f3bc7b9e0789ca23/net/minecraft/server/MapGenCaves.java

## Objectif de parité
Implémenter ce pipeline, dans cet ordre:
1. Biomes/climat (température + humidité + weirdness) style beta.
2. Terrain brut densité `5x17x5`, interpolation en `16x128x16`.
3. Surface pass beta (top/filler biome, sable/gravier, sandstone, bedrock irrégulier, mer).
4. Caves pass style `MapGenCaves` beta.
5. Populate pass (au minimum: minerais, arbres, herbes/fleurs, sources d’eau, neige/glace).

## Constantes et RNG
Utiliser un RNG compatible `java.util.Random`:
- seed chunk terrain: `chunkX*341873128712 + chunkZ*132897987541`
- seed populate:
  - `rand.setSeed(worldSeed)`
  - `oddX = rand.nextLong()/2*2+1`
  - `oddZ = rand.nextLong()/2*2+1`
  - `rand.setSeed(chunkX*oddX + chunkZ*oddZ ^ worldSeed)`
- bruit terrain:
  - `684.412`, `684.412/80`, `684.412/160`, `1.121`, `200.0`
- climat:
  - `0.025`, `0.05`, `0.25`
  - amplitudes `0.25`, `1/3`, `0.5882352941176471`
- niveau mer: `Y=64`.

## Détails d’implémentation attendus
1. `WORLD_CONFIG.chunkSizeY = 128`.
2. Supprimer hardcodes verticaux (ex: 96) et utiliser `WORLD_CONFIG.chunkSizeY`.
3. Ajouter/brancher les blocs de génération:
   - `gravel`, `sandstone`, `coal_ore`, `iron_ore`, `gold_ore`, `redstone_ore`, `diamond_ore`, `lapis_ore`, `snow`, `ice`.
4. Textures via `assets/textures/blocks`.
   - Si `ice` absent: fallback texture (ex: `glass`) sans bloquer le pipeline.
5. Étendre `BlockId`, `BlockKey`, `BlockRegistry`, `TextureAtlas`, schéma save.
6. Garder `World` et le streaming chunk stables.

## Règles biome beta à reproduire
Utiliser la logique `BiomeBase.a(temp, rain)` de beta 1.7.3:
- `rain *= temp` puis seuils pour `tundra`, `savanna`, `desert`, `swampland`, `taiga`, `shrubland`, `forest`, `plains`, `seasonal_forest`, `rainforest`.
- `desert` top/filler = sable.

## Populate (minimum obligatoire)
- Minerais style beta:
  - dirt: 20x size32 (Y<128)
  - gravel: 10x size32 (Y<128)
  - coal: 20x size16 (Y<128)
  - iron: 20x size8 (Y<64)
  - gold: 2x size8 (Y<32)
  - redstone: 8x size7 (Y<16)
  - diamond: 1x size7 (Y<16)
  - lapis: 1x size6 (distribution beta centrée bas)
- Arbres selon biome + bruit arbre.
- Fleurs/herbes selon biome.
- Sources d’eau style beta.
- Neige de surface selon température ajustée par altitude.

## Critères d’acceptation (tests)
Ajouter/adapter des tests pour valider:
1. Déterminisme:
   - seed/chunk identiques => chunk byte-à-byte identique.
2. Invariants terrain:
   - bedrock irrégulier au fond, mer à `Y=64`, eau/glace cohérentes.
3. Invariants génération:
   - caves présentes sans fuites d’eau aberrantes.
   - minerais dans plages Y attendues.
4. Régression moteur:
   - rendu/meshing correct jusqu’à `Y=127`.
   - tests monde/sauvegarde existants passent.

## Contraintes de livraison
- Pas de pseudo-code: faire les edits réels.
- TypeScript strict, pas de `any`.
- Préférer petites fonctions testables.
- Garder le code lisible et commenté seulement si nécessaire.

Tu dois:
1. Éditer les fichiers.
2. Lancer tests + build.
3. Donner un résumé des changements + résultats de validation.

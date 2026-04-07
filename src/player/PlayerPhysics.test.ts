import { describe, expect, it } from 'vitest';
import { PlayerPhysics } from './PlayerPhysics';
import { isWaterBlock, toFlowWaterId, toSnowCoverBlockId } from '../world/BlockRegistry';
import { World } from '../world/World';
import { waterLevelToSurfaceHeight } from '../world/WaterSurface';

describe('PlayerPhysics', () => {
  const sampleLegacyWaterDepth = (world: World, position: [number, number, number]): number => {
    const worldX = Math.floor(position[0]);
    const worldZ = Math.floor(position[2]);
    const feetY = Math.floor(position[1]);
    let depth = 0;
    for (let offsetY = 0; offsetY <= Math.ceil(1.8); offsetY += 1) {
      if (isWaterBlock(world.getBlock(worldX, feetY + offsetY, worldZ))) {
        depth += 1;
      }
    }
    return depth;
  };

  it('lands on the terrain without sinking into ground blocks', () => {
    const world = new World('physics');
    world.primeAround(0, 0, 0);
    const surfaceY = world.getTopSolidBlockY(0, 0);

    let position: [number, number, number] = [0.5, surfaceY + 4, 0.5];
    let velocity: [number, number, number] = [0, 0, 0];
    let grounded = false;

    for (let step = 0; step < 180; step += 1) {
      velocity[1] -= 22 / 60;
      const result = PlayerPhysics.simulate(world, position, velocity, 1 / 60);
      position = result.position;
      velocity = result.velocity;
      grounded = result.grounded;
      if (grounded) {
        break;
      }
    }

    expect(grounded).toBe(true);
    expect(position[1]).toBeGreaterThanOrEqual(surfaceY + 1);
  });

  it('uses real fluid height for every partial flowing-water level', () => {
    const world = new World('physics-partial-flow-heights');
    world.primeAround(0, 0, 0);

    for (let x = 0; x <= 15; x += 1) {
      for (let z = 0; z <= 15; z += 1) {
        world.setBlock(x, 20, z, 3);
        world.setBlock(x, 21, z, 0);
        world.setBlock(x, 22, z, 0);
        world.setBlock(x, 23, z, 0);
      }
    }

    for (const level of [1, 3, 5, 7]) {
      world.setBlock(4, 21, 4, toFlowWaterId(level));
      const topY = 21 + waterLevelToSurfaceHeight(level);

      const aboveFlowSurface = PlayerPhysics.sampleWater(world, [4.5, topY + 0.02, 4.5]);
      expect(aboveFlowSurface.inWater).toBe(false);

      const insideFlow = PlayerPhysics.sampleWater(world, [4.5, topY - 0.02, 4.5]);
      expect(insideFlow.inWater).toBe(true);
      expect(insideFlow.depthBlocks).toBeLessThanOrEqual(1);
    }
  });

  it('keeps legacy full-water depth behavior unchanged', () => {
    const world = new World('physics-full-water-legacy');
    world.primeAround(0, 0, 0);

    for (let x = 0; x <= 15; x += 1) {
      for (let z = 0; z <= 15; z += 1) {
        world.setBlock(x, 20, z, 3);
        world.setBlock(x, 21, z, 0);
        world.setBlock(x, 22, z, 0);
        world.setBlock(x, 23, z, 0);
      }
    }

    world.setBlock(4, 21, 4, 10);
    world.setBlock(4, 22, 4, 10);

    for (const y of [21.02, 21.2, 21.62, 21.95]) {
      const position: [number, number, number] = [4.5, y, 4.5];
      const state = PlayerPhysics.sampleWater(world, position);
      const legacyDepth = sampleLegacyWaterDepth(world, position);
      expect(state.depthBlocks).toBe(legacyDepth);
      expect(state.inWater).toBe(legacyDepth > 0);
    }
  });

  it('lands on partial snow layers at their real collision height', () => {
    const world = new World('physics-snow-layer');
    world.primeAround(0, 0, 0);

    for (let x = 0; x <= 15; x += 1) {
      for (let z = 0; z <= 15; z += 1) {
        world.setBlock(x, 90, z, 3);
        for (let y = 91; y < 96; y += 1) {
          world.setBlock(x, y, z, 0);
        }
      }
    }
    world.setBlock(4, 91, 4, toSnowCoverBlockId(4));

    let position: [number, number, number] = [4.5, 95, 4.5];
    let velocity: [number, number, number] = [0, 0, 0];
    let grounded = false;

    for (let step = 0; step < 120; step += 1) {
      velocity[1] -= 22 / 60;
      const result = PlayerPhysics.simulate(world, position, velocity, 1 / 60);
      position = result.position;
      velocity = result.velocity;
      grounded = result.grounded;
      if (grounded) {
        break;
      }
    }

    expect(grounded).toBe(true);
    expect(position[1]).toBeCloseTo(91.5, 4);
  });

  it('steps up onto snow layers up to 0.6 block high without needing a jump', () => {
    const world = new World('physics-snow-step-up');
    world.primeAround(0, 0, 0);

    for (let x = 0; x <= 15; x += 1) {
      for (let z = 0; z <= 15; z += 1) {
        world.setBlock(x, 90, z, 3);
        for (let y = 91; y < 96; y += 1) {
          world.setBlock(x, y, z, 0);
        }
      }
    }
    world.setBlock(5, 91, 4, toSnowCoverBlockId(4));

    let position: [number, number, number] = [4.2, 91, 4.5];
    let velocity: [number, number, number] = [2.4, 0, 0];

    for (let step = 0; step < 20; step += 1) {
      const result = PlayerPhysics.simulate(world, position, velocity, 1 / 60);
      position = result.position;
      velocity = [2.4, 0, 0];
    }

    expect(position[0]).toBeGreaterThan(5);
    expect(position[1]).toBeCloseTo(91.5, 4);
  });

  it('does not auto-step onto full blocks while moving forward', () => {
    const world = new World('physics-full-block-no-step');
    world.primeAround(0, 0, 0);

    for (let x = 0; x <= 15; x += 1) {
      for (let z = 0; z <= 15; z += 1) {
        world.setBlock(x, 90, z, 3);
        for (let y = 91; y < 96; y += 1) {
          world.setBlock(x, y, z, 0);
        }
      }
    }
    world.setBlock(5, 91, 4, 3);

    let position: [number, number, number] = [4.2, 91, 4.5];
    let velocity: [number, number, number] = [2.4, 0, 0];

    for (let step = 0; step < 20; step += 1) {
      const result = PlayerPhysics.simulate(world, position, velocity, 1 / 60);
      position = result.position;
      velocity = [2.4, 0, 0];
    }

    expect(position[0]).toBeLessThan(5);
    expect(position[1]).toBeCloseTo(91, 4);
  });
});

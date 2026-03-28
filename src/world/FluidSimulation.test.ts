import { describe, expect, it } from 'vitest';
import { WORLD_CONFIG } from '../game/Config';
import { isWaterBlock, toFlowWaterId } from './BlockRegistry';
import { World } from './World';

const runFluidTicks = (world: World, ticks: number): void => {
  for (let index = 0; index < ticks; index += 1) {
    world.tickFluids(WORLD_CONFIG.fluidTickSeconds);
  }
};

const fillBox = (
  world: World,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number,
  blockId: number,
): void => {
  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      for (let z = minZ; z <= maxZ; z += 1) {
        world.setBlock(x, y, z, blockId as 0 | 3 | 10);
      }
    }
  }
};

describe('World fluid simulation', () => {
  it('spreads laterally from a source and caps horizontal range to level 7', () => {
    const world = new World('fluid-lateral');
    world.primeAround(0, 0, 0);

    fillBox(world, 0, 15, 30, 32, 0, 15, 0);
    fillBox(world, 0, 15, 30, 30, 0, 15, 3);
    world.setBlock(4, 31, 4, 10);

    runFluidTicks(world, 80);

    expect(world.getBlock(5, 31, 4)).toBe(toFlowWaterId(1));
    expect(world.getBlock(8, 31, 4)).toBe(toFlowWaterId(4));
    expect(world.getBlock(11, 31, 4)).toBe(toFlowWaterId(7));
    expect(world.getBlock(12, 31, 4)).toBe(0);
    world.dispose();
  });

  it('falls downward before spreading across the floor', () => {
    const world = new World('fluid-fall');
    world.primeAround(0, 0, 0);

    fillBox(world, 0, 15, 20, 26, 0, 15, 0);
    fillBox(world, 0, 15, 20, 20, 0, 15, 3);
    world.setBlock(6, 26, 6, 10);

    runFluidTicks(world, 90);

    expect(world.getBlock(6, 25, 6)).toBe(toFlowWaterId(1));
    expect(world.getBlock(6, 24, 6)).toBe(toFlowWaterId(1));
    expect(world.getBlock(6, 21, 6)).toBe(toFlowWaterId(1));
    expect(isWaterBlock(world.getBlock(7, 21, 6))).toBe(true);
    world.dispose();
  });

  it('prefers the nearest drop direction before lateral expansion', () => {
    const world = new World('fluid-directed-flow');
    world.primeAround(0, 0, 0);

    fillBox(world, 0, 15, 18, 23, 0, 15, 0);
    fillBox(world, 0, 15, 18, 18, 0, 15, 3);
    fillBox(world, 0, 15, 20, 20, 0, 15, 3);
    world.setBlock(8, 21, 8, 10);
    world.setBlock(9, 20, 8, 0);

    runFluidTicks(world, 40);

    expect(world.getBlock(9, 21, 8)).toBe(toFlowWaterId(1));
    expect(world.getBlock(9, 20, 8)).toBe(toFlowWaterId(1));
    expect(world.getBlock(7, 21, 8)).toBe(0);
    expect(world.getBlock(8, 21, 7)).toBe(0);
    expect(world.getBlock(8, 21, 9)).toBe(0);
    world.dispose();
  });

  it('computes a horizontal current vector aligned with directed flow blocks', () => {
    const world = new World('fluid-current-vector');
    world.primeAround(0, 0, 0);

    fillBox(world, 0, 15, 30, 32, 0, 15, 0);
    fillBox(world, 0, 15, 30, 30, 0, 15, 3);
    for (let x = 0; x <= 15; x += 1) {
      world.setBlock(x, 31, 3, 3);
      world.setBlock(x, 31, 5, 3);
    }
    world.setBlock(3, 31, 4, 3);
    world.setBlock(4, 31, 4, 10);

    runFluidTicks(world, 80);

    const flow = world.getFlowVectorForWaterCell(6, 31, 4);
    expect(flow.magnitude).toBeGreaterThan(0);
    expect(flow.x).toBeGreaterThan(0.7);
    expect(Math.abs(flow.z)).toBeLessThan(0.2);

    const tailFlow = world.getFlowVectorForWaterCell(11, 31, 4);
    expect(tailFlow.magnitude).toBeGreaterThan(0);
    expect(tailFlow.edgeBoost).toBeGreaterThan(0.4);
    world.dispose();
  });

  it('retracts flows when the source is removed', () => {
    const world = new World('fluid-retract');
    world.primeAround(0, 0, 0);

    fillBox(world, 0, 15, 40, 42, 0, 15, 0);
    fillBox(world, 0, 15, 40, 40, 0, 15, 3);
    world.setBlock(5, 41, 5, 10);

    runFluidTicks(world, 80);
    expect(world.getBlock(7, 41, 5)).toBe(toFlowWaterId(2));

    world.setBlock(5, 41, 5, 0);
    runFluidTicks(world, 120);

    expect(world.getBlock(6, 41, 5)).toBe(0);
    expect(world.getBlock(8, 41, 5)).toBe(0);
    world.dispose();
  });

  it('fills a newly opened block directly below existing flowing water', () => {
    const world = new World('fluid-underflow-fill');
    world.primeAround(0, 0, 0);

    fillBox(world, 0, 15, 28, 33, 0, 15, 0);
    fillBox(world, 0, 15, 28, 30, 0, 15, 3);
    world.setBlock(4, 31, 4, 10);

    runFluidTicks(world, 80);
    expect(world.getBlock(8, 31, 4)).toBe(toFlowWaterId(4));
    expect(world.getBlock(8, 30, 4)).toBe(3);

    world.setBlock(8, 30, 4, 0);
    runFluidTicks(world, 12);

    expect(world.getBlock(8, 30, 4)).toBe(toFlowWaterId(1));
    world.dispose();
  });
});

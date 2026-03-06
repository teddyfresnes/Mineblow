import { describe, expect, it } from 'vitest';
import { PlayerPhysics } from './PlayerPhysics';
import { World } from '../world/World';

describe('PlayerPhysics', () => {
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
});

import { PLAYER_CONFIG } from '../game/Config';
import {
  getWaterLevel,
  isSolidBlock,
  isWaterBlock,
  isWaterSource,
} from '../world/BlockRegistry';
import { waterLevelToSurfaceHeight } from '../world/WaterSurface';
import type { World } from '../world/World';

export interface PhysicsResult {
  position: [number, number, number];
  velocity: [number, number, number];
  grounded: boolean;
}

export interface WaterState {
  inWater: boolean;
  depthBlocks: number;
  flowX: number;
  flowZ: number;
  flowMagnitude: number;
  outflowX: number;
  outflowZ: number;
  outflowMagnitude: number;
}

const HALF_WIDTH = PLAYER_CONFIG.colliderWidth / 2;
const HEIGHT = PLAYER_CONFIG.colliderHeight;
const FLOW_CONTACT_EPSILON = 0.0001;

const overlapsSolid = (world: World, position: [number, number, number]): boolean => {
  const minX = Math.floor(position[0] - HALF_WIDTH);
  const maxX = Math.floor(position[0] + HALF_WIDTH);
  const minY = Math.floor(position[1]);
  const maxY = Math.floor(position[1] + HEIGHT - 0.001);
  const minZ = Math.floor(position[2] - HALF_WIDTH);
  const maxZ = Math.floor(position[2] + HALF_WIDTH);

  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      for (let z = minZ; z <= maxZ; z += 1) {
        if (isSolidBlock(world.getBlock(x, y, z))) {
          return true;
        }
      }
    }
  }

  return false;
};

const hasGroundSupportAt = (
  world: World,
  position: [number, number, number],
  probeDepth = 0.06,
): boolean => {
  const sampleY = Math.floor(position[1] - probeDepth);
  const sampleRadius = Math.max(0.02, HALF_WIDTH - 0.03);
  const sampleOffsets: Array<[number, number]> = [
    [0, 0],
    [-sampleRadius, -sampleRadius],
    [sampleRadius, -sampleRadius],
    [-sampleRadius, sampleRadius],
    [sampleRadius, sampleRadius],
  ];

  for (const [offsetX, offsetZ] of sampleOffsets) {
    const sampleX = Math.floor(position[0] + offsetX);
    const sampleZ = Math.floor(position[2] + offsetZ);
    if (isSolidBlock(world.getBlock(sampleX, sampleY, sampleZ))) {
      return true;
    }
  }

  return false;
};

const resolveAxis = (
  world: World,
  position: [number, number, number],
  velocity: [number, number, number],
  axis: 0 | 1 | 2,
): boolean => {
  let collided = false;
  let safety = 0;

  while (overlapsSolid(world, position) && safety < 8) {
    collided = true;
    if (axis === 0) {
      if (velocity[0] > 0) {
        const maxX = Math.floor(position[0] + HALF_WIDTH);
        position[0] = maxX - HALF_WIDTH - 0.001;
      } else if (velocity[0] < 0) {
        const minX = Math.floor(position[0] - HALF_WIDTH);
        position[0] = minX + 1 + HALF_WIDTH + 0.001;
      } else {
        break;
      }
    } else if (axis === 1) {
      if (velocity[1] > 0) {
        const maxY = Math.floor(position[1] + HEIGHT);
        position[1] = maxY - HEIGHT - 0.001;
      } else if (velocity[1] < 0) {
        const minY = Math.floor(position[1]);
        position[1] = minY + 1;
      } else {
        break;
      }
    } else if (velocity[2] > 0) {
      const maxZ = Math.floor(position[2] + HALF_WIDTH);
      position[2] = maxZ - HALF_WIDTH - 0.001;
    } else if (velocity[2] < 0) {
      const minZ = Math.floor(position[2] - HALF_WIDTH);
      position[2] = minZ + 1 + HALF_WIDTH + 0.001;
    } else {
      break;
    }

    safety += 1;
  }

  return collided;
};

export class PlayerPhysics {
  static simulate(
    world: World,
    position: [number, number, number],
    velocity: [number, number, number],
    dt: number,
  ): PhysicsResult {
    const nextPosition: [number, number, number] = [...position];
    const nextVelocity: [number, number, number] = [...velocity];
    let grounded = false;

    nextPosition[0] += nextVelocity[0] * dt;
    if (resolveAxis(world, nextPosition, nextVelocity, 0)) {
      nextVelocity[0] = 0;
    }

    nextPosition[2] += nextVelocity[2] * dt;
    if (resolveAxis(world, nextPosition, nextVelocity, 2)) {
      nextVelocity[2] = 0;
    }

    nextPosition[1] += nextVelocity[1] * dt;
    const collidedY = resolveAxis(world, nextPosition, nextVelocity, 1);
    if (collidedY) {
      grounded = nextVelocity[1] <= 0;
      nextVelocity[1] = 0;
    } else {
      grounded = hasGroundSupportAt(world, nextPosition);
    }

    return {
      position: nextPosition,
      velocity: nextVelocity,
      grounded,
    };
  }

  static wouldCollideWithBlock(
    position: [number, number, number],
    blockX: number,
    blockY: number,
    blockZ: number,
  ): boolean {
    const minX = position[0] - HALF_WIDTH;
    const maxX = position[0] + HALF_WIDTH;
    const minY = position[1];
    const maxY = position[1] + HEIGHT;
    const minZ = position[2] - HALF_WIDTH;
    const maxZ = position[2] + HALF_WIDTH;

    return !(
      maxX <= blockX ||
      minX >= blockX + 1 ||
      maxY <= blockY ||
      minY >= blockY + 1 ||
      maxZ <= blockZ ||
      minZ >= blockZ + 1
    );
  }

  static sampleWater(world: World, position: [number, number, number]): WaterState {
    const worldX = Math.floor(position[0]);
    const worldZ = Math.floor(position[2]);
    const feetY = Math.floor(position[1]);
    const playerMinY = position[1];
    const playerMaxY = position[1] + HEIGHT;
    let fullDepthBlocks = 0;
    let partialDepthBlocks = 0;
    let flowX = 0;
    let flowZ = 0;
    let flowWeight = 0;
    let outflowX = 0;
    let outflowZ = 0;
    let outflowWeight = 0;

    for (let offsetY = 0; offsetY <= Math.ceil(HEIGHT); offsetY += 1) {
      const blockY = feetY + offsetY;
      const blockId = world.getBlock(worldX, blockY, worldZ);
      if (!isWaterBlock(blockId)) {
        continue;
      }

      let immersion = 1;
      const level = getWaterLevel(blockId);
      const aboveBlockId = world.getBlock(worldX, blockY + 1, worldZ);
      const isPartialFlow = level !== null && !isWaterSource(blockId) && !isWaterBlock(aboveBlockId);
      if (isPartialFlow) {
        const fluidTopY = blockY + waterLevelToSurfaceHeight(level);
        const overlap = Math.min(playerMaxY, fluidTopY) - Math.max(playerMinY, blockY);
        if (overlap <= FLOW_CONTACT_EPSILON) {
          continue;
        }
        immersion = Math.min(1, overlap);
        partialDepthBlocks += immersion;
      } else {
        // Preserve legacy behavior for full water blocks exactly (source or stacked flow).
        fullDepthBlocks += 1;
      }

      const flow = world.getFlowVectorForWaterCell(worldX, blockY, worldZ);
      if (flow.magnitude > 0) {
        const weightedFlow = immersion * flow.magnitude;
        flowX += flow.x * weightedFlow;
        flowZ += flow.z * weightedFlow;
        flowWeight += weightedFlow;
      }
      if (flow.edgeBoost > 0) {
        const weightedOutflow = immersion * flow.edgeBoost;
        outflowX += flow.x * weightedOutflow;
        outflowZ += flow.z * weightedOutflow;
        outflowWeight += weightedOutflow;
      }
    }

    const depth = fullDepthBlocks + partialDepthBlocks;
    let flowMagnitude = 0;
    if (flowWeight > 0) {
      const magnitude = Math.hypot(flowX, flowZ);
      if (magnitude > FLOW_CONTACT_EPSILON) {
        flowX /= magnitude;
        flowZ /= magnitude;
        flowMagnitude = Math.min(1, magnitude / flowWeight);
      } else {
        flowX = 0;
        flowZ = 0;
      }
    }

    let outflowMagnitude = 0;
    if (outflowWeight > 0) {
      const magnitude = Math.hypot(outflowX, outflowZ);
      if (magnitude > FLOW_CONTACT_EPSILON) {
        outflowX /= magnitude;
        outflowZ /= magnitude;
        outflowMagnitude = Math.min(1, magnitude / outflowWeight);
      } else {
        outflowX = 0;
        outflowZ = 0;
      }
    }

    return {
      inWater: depth > 0,
      depthBlocks: depth,
      flowX,
      flowZ,
      flowMagnitude,
      outflowX,
      outflowZ,
      outflowMagnitude,
    };
  }

  static hasGroundSupport(world: World, position: [number, number, number]): boolean {
    return hasGroundSupportAt(world, position);
  }
}

import { Euler, Vector3 } from 'three';
import type { KeyBindings } from '../game/Controls';
import { PLAYER_CONFIG } from '../game/Config';
import type { PlayerState } from '../types/player';
import { clamp } from '../utils/math';
import type { InputController } from './InputController';
import { PlayerPhysics } from './PlayerPhysics';
import { blocksMovement, getBlockCollisionHeight } from '../world/BlockRegistry';
import type { World } from '../world/World';

const WATER_FLOW_PUSH_SPEED = 0.98;
const WATER_OUTFLOW_PUSH_SPEED = 0.46;
const WATER_OUTFLOW_EXIT_IMPULSE_SCALE = 0.4;

export interface PlayerFrameUpdate {
  jumped: boolean;
  sprinting: boolean;
  moving: boolean;
}

export class PlayerController {
  private state: PlayerState;
  private grounded = false;
  private crouched = false;
  private sprinting = false;
  private sprintToggle = false;
  private inWater = false;
  private jumpCooldownMs = 0;
  private groundedDurationMs = 0;
  private coyoteTimeMs = 0;
  private jumpBufferMs = 0;
  private sprintCarryInAir = false;
  private allowHeldJump = false;
  private waterSurfaceRiseLockMs = 0;
  private readonly waterOutflowExitImpulse: [number, number] = [0, 0];
  private readonly moveVector = new Vector3();
  private readonly upAxis = new Vector3(0, 1, 0);
  private readonly lookEuler = new Euler(0, 0, 0, 'YXZ');

  constructor(initialState: PlayerState) {
    this.state = initialState;
  }

  update(
    dt: number,
    input: InputController,
    world: World,
    controls: KeyBindings,
  ): PlayerFrameUpdate {
    const dtMs = dt * 1000;
    const tickFactor = dt / PLAYER_CONFIG.mcTickSeconds;

    this.jumpCooldownMs = Math.max(0, this.jumpCooldownMs - dtMs);
    this.coyoteTimeMs = Math.max(0, this.coyoteTimeMs - dtMs);
    this.jumpBufferMs = Math.max(0, this.jumpBufferMs - dtMs);
    this.waterSurfaceRiseLockMs = Math.max(0, this.waterSurfaceRiseLockMs - dtMs);
    if (this.grounded) {
      this.groundedDurationMs += dtMs;
      this.coyoteTimeMs = PLAYER_CONFIG.coyoteTimeMs;
    } else {
      this.groundedDurationMs = 0;
    }

    const look = input.consumeLookDelta();
    this.state.yaw -= look.x * PLAYER_CONFIG.mouseSensitivity;
    this.state.pitch = clamp(
      this.state.pitch - look.y * PLAYER_CONFIG.mouseSensitivity,
      -Math.PI / 2 + 0.01,
      Math.PI / 2 - 0.01,
    );

    const left = Number(
      input.isAnyKeyDown([controls.moveLeft.primary, controls.moveLeft.secondary]),
    );
    const right = Number(
      input.isAnyKeyDown([controls.moveRight.primary, controls.moveRight.secondary]),
    );
    const forward = Number(
      input.isAnyKeyDown([controls.moveForward.primary, controls.moveForward.secondary]),
    );
    const backward = Number(
      input.isAnyKeyDown([controls.moveBackward.primary, controls.moveBackward.secondary]),
    );
    const moveX = right - left;
    const moveForward = forward - backward;

    this.crouched = input.isAnyKeyDown([controls.crouch.primary, controls.crouch.secondary]);
    const sprintHeld = input.isAnyKeyDown([controls.sprint.primary, controls.sprint.secondary]);
    const sprintPressed = input.consumeAnyJustPressed([
      controls.sprint.primary,
      controls.sprint.secondary,
    ]);
    const jumpHeld = input.isAnyKeyDown([controls.jump.primary, controls.jump.secondary]);
    const jumpJustPressed = input.consumeAnyJustPressed([
      controls.jump.primary,
      controls.jump.secondary,
    ]);
    if (jumpJustPressed) {
      this.jumpBufferMs = PLAYER_CONFIG.jumpBufferMs;
    }
    if (!jumpHeld) {
      this.allowHeldJump = false;
    }
    const wasInWater = this.inWater;
    const waterState = PlayerPhysics.sampleWater(world, this.state.position);
    this.inWater = waterState.inWater;
    if (!this.inWater) {
      this.waterSurfaceRiseLockMs = 0;
      if (wasInWater) {
        this.state.velocity[0] += this.waterOutflowExitImpulse[0];
        this.state.velocity[2] += this.waterOutflowExitImpulse[1];
      }
      this.waterOutflowExitImpulse[0] *= 0.35;
      this.waterOutflowExitImpulse[1] *= 0.35;
    }

    const localMove = new Vector3(moveX, 0, -moveForward);
    if (localMove.lengthSq() > 1) {
      localMove.normalize();
    }

    const moving = localMove.lengthSq() > 0;
    if (moving) {
      this.moveVector.copy(localMove).applyAxisAngle(this.upAxis, this.state.yaw);
    } else {
      this.moveVector.set(0, 0, 0);
    }

    const movementGrounded = this.grounded && this.state.velocity[1] <= 0.04;
    const movingForward = moveForward > 0;
    const obstacleAhead =
      movementGrounded && movingForward && !jumpHeld && moving
        ? this.hasSprintObstacle(world, this.moveVector)
        : false;

    if (sprintPressed && movingForward && !this.crouched && !obstacleAhead) {
      this.sprintToggle = true;
    }

    if (this.sprintToggle && (!moving || backward > 0 || this.crouched)) {
      this.sprintToggle = false;
    }

    const sprintRequested = sprintHeld || this.sprintToggle;
    const canGroundSprint = sprintRequested && movingForward && !this.crouched && !obstacleAhead;
    if (this.inWater) {
      this.sprinting = false;
      this.sprintToggle = false;
      this.sprintCarryInAir = false;
    } else if (movementGrounded) {
      this.sprinting = canGroundSprint;
      this.sprintCarryInAir = canGroundSprint;
    } else {
      if (canGroundSprint) {
        this.sprintCarryInAir = true;
      }
      if (backward > 0 || this.crouched) {
        this.sprintCarryInAir = false;
      }
      this.sprinting = this.sprintCarryInAir;
    }
    if (moving) {
      if (this.sprinting && movingForward && Math.abs(moveX) > 0) {
        localMove.x *= movementGrounded
          ? PLAYER_CONFIG.groundSprintForwardStrafeScale
          : PLAYER_CONFIG.airSprintForwardStrafeScale;
        localMove.normalize();
      }
      this.moveVector.copy(localMove).applyAxisAngle(this.upAxis, this.state.yaw);
    }

    if (this.inWater) {
      const movementSpeed = this.crouched
        ? PLAYER_CONFIG.crouchSpeed
        : this.sprinting
          ? PLAYER_CONFIG.sprintSpeed
          : PLAYER_CONFIG.walkSpeed;
      const lateralSpeed =
        !this.grounded && this.sprinting && Math.abs(localMove.x) > 0
          ? PLAYER_CONFIG.walkSpeed
          : movementSpeed;
      const localVelocity = new Vector3(
        localMove.x * lateralSpeed * 0.62,
        0,
        localMove.z * movementSpeed * 0.62,
      );
      localVelocity.applyAxisAngle(this.upAxis, this.state.yaw);
      this.state.velocity[0] = localVelocity.x;
      this.state.velocity[2] = localVelocity.z;
      let flowVelocityX = 0;
      let flowVelocityZ = 0;
      if (waterState.flowMagnitude > 0) {
        const flowPush = WATER_FLOW_PUSH_SPEED * waterState.flowMagnitude;
        flowVelocityX += waterState.flowX * flowPush;
        flowVelocityZ += waterState.flowZ * flowPush;
      }
      if (waterState.outflowMagnitude > 0) {
        const outflowPush = WATER_OUTFLOW_PUSH_SPEED * waterState.outflowMagnitude;
        flowVelocityX += waterState.outflowX * outflowPush;
        flowVelocityZ += waterState.outflowZ * outflowPush;
      }
      this.state.velocity[0] += flowVelocityX;
      this.state.velocity[2] += flowVelocityZ;
      this.waterOutflowExitImpulse[0] = flowVelocityX * WATER_OUTFLOW_EXIT_IMPULSE_SCALE;
      this.waterOutflowExitImpulse[1] = flowVelocityZ * WATER_OUTFLOW_EXIT_IMPULSE_SCALE;

      const sinkStrength = waterState.depthBlocks >= 2 ? 5.2 : 2.1;
      const justEnteredWater = !wasInWater && this.inWater;
      const inTopWaterBand = waterState.depthBlocks <= 1;
      if (
        justEnteredWater &&
        jumpHeld &&
        inTopWaterBand &&
        this.state.velocity[1] <= 0
      ) {
        // Force a short dip on re-entry so the surface bob keeps a visible amplitude.
        this.waterSurfaceRiseLockMs = 140;
      }

      const lockSurfaceRise = jumpHeld && inTopWaterBand && this.waterSurfaceRiseLockMs > 0;
      if (lockSurfaceRise) {
        const forcedSinkSpeed = this.crouched ? -2.15 : -0.95;
        this.state.velocity[1] = Math.min(this.state.velocity[1], forcedSinkSpeed);
      } else if (jumpHeld) {
        this.state.velocity[1] = Math.min(4.1, this.state.velocity[1] + 12 * dt);
      } else {
        const crouchSink = this.crouched ? 2.4 : 0;
        this.state.velocity[1] = Math.max(
          this.state.velocity[1] - (sinkStrength + crouchSink) * dt,
          -4.5,
        );
      }
      if (waterState.depthBlocks >= 2 || !jumpHeld) {
        this.waterSurfaceRiseLockMs = 0;
      }
      this.state.velocity[1] *= 0.96;
    } else {
      const horizontalDragTick = movementGrounded
        ? PLAYER_CONFIG.groundFrictionTick
        : PLAYER_CONFIG.airFrictionTick;
      const frictionScale = Math.pow(
        horizontalDragTick,
        tickFactor,
      );
      this.state.velocity[0] *= frictionScale;
      this.state.velocity[2] *= frictionScale;
      const horizontalSpeedBeforeAirControl = Math.hypot(this.state.velocity[0], this.state.velocity[2]);

      if (moving) {
        let accelerationTick = movementGrounded
          ? this.crouched
            ? PLAYER_CONFIG.groundCrouchAccelerationTick
            : this.sprinting
              ? PLAYER_CONFIG.groundSprintAccelerationTick
              : PLAYER_CONFIG.groundWalkAccelerationTick
          : this.sprinting
            ? PLAYER_CONFIG.airSprintAccelerationTick
            : PLAYER_CONFIG.airWalkAccelerationTick;

        if (!movementGrounded && Math.abs(moveX) > 0) {
          if (this.sprinting) {
            accelerationTick *=
              moveForward > 0
                ? PLAYER_CONFIG.airSprintSideControlPenalty
                : PLAYER_CONFIG.airStrafePenalty;
          } else if (!movingForward) {
            accelerationTick *= PLAYER_CONFIG.airStrafePenalty;
          }
        }

        const acceleration = accelerationTick * (1 / PLAYER_CONFIG.mcTickSeconds);
        this.state.velocity[0] += this.moveVector.x * acceleration * tickFactor;
        this.state.velocity[2] += this.moveVector.z * acceleration * tickFactor;
      }

      if (!movementGrounded && this.state.velocity[1] < 0 && Math.abs(moveX) > 0 && moveForward <= 0) {
        const horizontalSpeedAfterAirControl = Math.hypot(this.state.velocity[0], this.state.velocity[2]);
        const maxAllowedAirStrafeSpeed = Math.max(
          horizontalSpeedBeforeAirControl,
          PLAYER_CONFIG.fallStrafeBaseControlSpeed,
        );
        if (horizontalSpeedAfterAirControl > maxAllowedAirStrafeSpeed && horizontalSpeedAfterAirControl > 0.0001) {
          const scale = maxAllowedAirStrafeSpeed / horizontalSpeedAfterAirControl;
          this.state.velocity[0] *= scale;
          this.state.velocity[2] *= scale;
        }
      }

      const targetHorizontalSpeed = movementGrounded
        ? this.crouched
          ? PLAYER_CONFIG.crouchSpeed
          : this.sprinting
            ? PLAYER_CONFIG.sprintSpeed
            : PLAYER_CONFIG.walkSpeed
        : this.sprinting
          ? PLAYER_CONFIG.airborneSprintSpeed
          : PLAYER_CONFIG.airborneWalkSpeed;
      const horizontalSpeedCap = Math.min(PLAYER_CONFIG.maxHorizontalSpeed, targetHorizontalSpeed);
      const horizontalSpeed = Math.hypot(this.state.velocity[0], this.state.velocity[2]);
      if (horizontalSpeed > horizontalSpeedCap && horizontalSpeed > 0.0001) {
        const scale = horizontalSpeedCap / horizontalSpeed;
        this.state.velocity[0] *= scale;
        this.state.velocity[2] *= scale;
      }

      if (this.crouched && movementGrounded && !jumpHeld) {
        this.applyCrouchEdgeClamp(world, dt);
      }

      this.state.velocity[1] -= PLAYER_CONFIG.gravity * dt;
      this.state.velocity[1] *= Math.pow(PLAYER_CONFIG.verticalDragTick, tickFactor);
      this.state.velocity[1] = Math.max(this.state.velocity[1], -PLAYER_CONFIG.maxFallSpeed);
    }

    if (!this.inWater && this.state.velocity[1] < -PLAYER_CONFIG.landingApproachMinFallSpeed) {
      const [x, y, z] = this.state.position;
      const probeTime = Math.min(dt, PLAYER_CONFIG.landingProbeSeconds);
      const probePosition: [number, number, number] = [
        x,
        y + this.state.velocity[1] * probeTime,
        z,
      ];
      if (PlayerPhysics.hasGroundSupport(world, probePosition)) {
        this.state.velocity[1] *= PLAYER_CONFIG.landingApproachDamping;
      }
    }

    let jumped = false;
    const autoJumpFromHold =
      jumpHeld &&
      !jumpJustPressed &&
      this.allowHeldJump &&
      this.groundedDurationMs >= PLAYER_CONFIG.autoJumpGroundedDelayMs;
    const jumpRequested = this.jumpBufferMs > 0 || autoJumpFromHold;
    const canUseGroundGrace = movementGrounded || this.coyoteTimeMs > 0;
    if (!this.inWater && canUseGroundGrace && jumpRequested && this.jumpCooldownMs <= 0) {
      this.state.velocity[1] = PLAYER_CONFIG.jumpVelocity;
      this.grounded = false;
      jumped = true;
      this.groundedDurationMs = 0;
      this.coyoteTimeMs = 0;
      this.jumpBufferMs = 0;
      this.jumpCooldownMs = PLAYER_CONFIG.jumpRepeatDelayMs;
      this.allowHeldJump = false;
      if (this.sprinting && movingForward) {
        const boostDirection = new Vector3(0, 0, -1).applyAxisAngle(this.upAxis, this.state.yaw);
        this.state.velocity[0] += boostDirection.x * PLAYER_CONFIG.sprintJumpBoost;
        this.state.velocity[2] += boostDirection.z * PLAYER_CONFIG.sprintJumpBoost;
      }
    }

    const wasGrounded = this.grounded;
    const verticalVelocityBeforeSim = this.state.velocity[1];
    const result = PlayerPhysics.simulate(world, this.state.position, this.state.velocity, dt);
    this.state.position = result.position;
    this.state.velocity = result.velocity;
    this.grounded = result.grounded;
    if (!wasGrounded && this.grounded) {
      this.groundedDurationMs = 0;
      this.allowHeldJump = verticalVelocityBeforeSim < -0.2;
      this.coyoteTimeMs = PLAYER_CONFIG.coyoteTimeMs;
      this.jumpCooldownMs = Math.max(
        this.jumpCooldownMs,
        PLAYER_CONFIG.landingJumpCooldownMs,
      );
    }
    if (!this.grounded) {
      this.groundedDurationMs = 0;
      if (this.coyoteTimeMs <= 0) {
        this.allowHeldJump = false;
      }
      if (backward > 0 || this.crouched) {
        this.sprintCarryInAir = false;
      }
    }

    if (this.state.position[1] < -16) {
      this.respawn();
    }

    return {
      jumped,
      sprinting: this.sprinting,
      moving,
    };
  }

  respawn(): void {
    this.state.position = [...this.state.spawnPoint];
    this.state.velocity = [0, 0, 0];
    this.sprintCarryInAir = false;
    this.waterSurfaceRiseLockMs = 0;
    this.waterOutflowExitImpulse[0] = 0;
    this.waterOutflowExitImpulse[1] = 0;
  }

  setSelectedSlot(slotIndex: number): void {
    this.state.selectedSlot = slotIndex;
  }

  getState(): PlayerState {
    return {
      ...this.state,
      position: [...this.state.position],
      velocity: [...this.state.velocity],
      spawnPoint: [...this.state.spawnPoint],
    };
  }

  getPosition(): [number, number, number] {
    return [...this.state.position];
  }

  getCameraPosition(): { x: number; y: number; z: number } {
    return {
      x: this.state.position[0],
      y:
        this.state.position[1] +
        (this.crouched ? PLAYER_CONFIG.crouchEyeHeight : PLAYER_CONFIG.eyeHeight),
      z: this.state.position[2],
    };
  }

  getRotation(): { yaw: number; pitch: number } {
    return {
      yaw: this.state.yaw,
      pitch: this.state.pitch,
    };
  }

  getLookDirection(): { x: number; y: number; z: number } {
    const direction = new Vector3(0, 0, -1);
    this.lookEuler.set(this.state.pitch, this.state.yaw, 0, 'YXZ');
    direction.applyEuler(this.lookEuler);
    return {
      x: direction.x,
      y: direction.y,
      z: direction.z,
    };
  }

  canOccupyBlock(blockX: number, blockY: number, blockZ: number, blockHeight = 1): boolean {
    return !PlayerPhysics.wouldCollideWithBlock(this.state.position, blockX, blockY, blockZ, blockHeight);
  }

  isCrouched(): boolean {
    return this.crouched;
  }

  isGrounded(): boolean {
    return this.grounded;
  }

  isInWater(): boolean {
    return this.inWater;
  }

  private applyCrouchEdgeClamp(world: World, dt: number): void {
    const [x, y, z] = this.state.position;
    if (!PlayerPhysics.hasGroundSupport(world, [x, y, z])) {
      return;
    }

    const nextX = x + this.state.velocity[0] * dt;
    const nextZ = z + this.state.velocity[2] * dt;
    if (PlayerPhysics.hasGroundSupport(world, [nextX, y, nextZ])) {
      return;
    }

    const canMoveX = PlayerPhysics.hasGroundSupport(world, [nextX, y, z]);
    const canMoveZ = PlayerPhysics.hasGroundSupport(world, [x, y, nextZ]);

    if (!canMoveX) {
      this.state.velocity[0] = 0;
    }
    if (!canMoveZ) {
      this.state.velocity[2] = 0;
    }
  }

  private hasSprintObstacle(world: World, direction: Vector3): boolean {
    const [x, y, z] = this.state.position;
    const movement = direction.clone().normalize();
    const right = new Vector3(-movement.z, 0, movement.x);
    const probeDistance = 0.45;
    const probeX = x + movement.x * probeDistance;
    const probeZ = z + movement.z * probeDistance;
    const feetY = Math.floor(y + 0.08);
    const chestY = Math.floor(y + (this.crouched ? 1.05 : 1.4));
    const headY = Math.floor(y + (this.crouched ? 1.45 : 1.72));

    for (const lateralOffset of [-0.16, 0, 0.16]) {
      const worldX = Math.floor(probeX + right.x * lateralOffset);
      const worldZ = Math.floor(probeZ + right.z * lateralOffset);
      const feetBlockId = world.getBlock(worldX, feetY, worldZ);
      const chestBlockId = world.getBlock(worldX, chestY, worldZ);
      const headBlockId = world.getBlock(worldX, headY, worldZ);
      const feetObstacle =
        blocksMovement(feetBlockId) &&
        feetY + getBlockCollisionHeight(feetBlockId) >
          this.state.position[1] + PLAYER_CONFIG.autoStepHeight;
      if (
        feetObstacle ||
        blocksMovement(chestBlockId) ||
        blocksMovement(headBlockId)
      ) {
        return true;
      }
    }

    return false;
  }
}

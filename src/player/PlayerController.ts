import { Euler, Vector3 } from 'three';
import type { KeyBindings } from '../game/Controls';
import { PLAYER_CONFIG } from '../game/Config';
import type { PlayerState } from '../types/player';
import { clamp } from '../utils/math';
import type { InputController } from './InputController';
import { PlayerPhysics } from './PlayerPhysics';
import { isSolidBlock } from '../world/BlockRegistry';
import type { World } from '../world/World';

export interface PlayerFrameUpdate {
  jumped: boolean;
  sprinting: boolean;
  moving: boolean;
}

export class PlayerController {
  private state: PlayerState;
  private grounded = false;
  private crouched = false;
  private sprintLatched = false;
  private forwardTapTimerMs = 0;
  private readonly moveVector = new Vector3();
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
    this.forwardTapTimerMs = Math.max(0, this.forwardTapTimerMs - dt * 1000);

    const look = input.consumeLookDelta();
    this.state.yaw -= look.x * PLAYER_CONFIG.mouseSensitivity;
    this.state.pitch = clamp(
      this.state.pitch - look.y * PLAYER_CONFIG.mouseSensitivity,
      -Math.PI / 2 + 0.01,
      Math.PI / 2 - 0.01,
    );

    const forwardJustPressed = input.consumeAnyJustPressed([
      controls.moveForward.primary,
      controls.moveForward.secondary,
    ]);
    if (forwardJustPressed) {
      if (this.forwardTapTimerMs > 0) {
        this.sprintLatched = true;
      }
      this.forwardTapTimerMs = PLAYER_CONFIG.sprintDoubleTapWindowMs;
    }

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
    const moveZ = forward - backward;

    this.crouched = input.isAnyKeyDown([controls.crouch.primary, controls.crouch.secondary]);
    const sprintHeld = input.isAnyKeyDown([controls.sprint.primary, controls.sprint.secondary]);
    const jumpHeld = input.isAnyKeyDown([controls.jump.primary, controls.jump.secondary]);
    const waterState = PlayerPhysics.sampleWater(world, this.state.position);

    if (forward === 0 || backward > 0 || this.crouched) {
      this.sprintLatched = false;
    }

    const localMove = new Vector3(moveX, 0, -moveZ);
    if (localMove.lengthSq() > 1) {
      localMove.normalize();
    }

    const moving = localMove.lengthSq() > 0;
    if (moving) {
      this.moveVector.copy(localMove).applyAxisAngle(new Vector3(0, 1, 0), this.state.yaw);
    } else {
      this.moveVector.set(0, 0, 0);
    }

    const obstacleAhead = moving ? this.hasSprintObstacle(world, this.moveVector) : false;
    if (obstacleAhead) {
      this.sprintLatched = false;
    }
    const sprintIntent =
      !this.crouched &&
      moving &&
      !obstacleAhead &&
      (sprintHeld || (this.sprintLatched && forward > 0));
    const sprinting = sprintIntent && !(!this.grounded && Math.abs(moveX) > 0);
    const movementSpeed = this.crouched
      ? PLAYER_CONFIG.crouchSpeed
      : sprinting
        ? PLAYER_CONFIG.sprintSpeed
        : PLAYER_CONFIG.walkSpeed;

    const lateralSpeed =
      !this.grounded && sprinting && Math.abs(localMove.x) > 0 ? PLAYER_CONFIG.walkSpeed : movementSpeed;
    const localVelocity = new Vector3(
      localMove.x * lateralSpeed * (waterState.inWater ? 0.62 : 1),
      0,
      localMove.z * movementSpeed * (waterState.inWater ? 0.62 : 1),
    );
    localVelocity.applyAxisAngle(new Vector3(0, 1, 0), this.state.yaw);

    this.state.velocity[0] = localVelocity.x;
    this.state.velocity[2] = localVelocity.z;

    if (waterState.inWater) {
      const sinkStrength = waterState.depthBlocks >= 2 ? 5.2 : 2.1;
      if (jumpHeld) {
        this.state.velocity[1] = Math.min(4.1, this.state.velocity[1] + 12 * dt);
      } else {
        const crouchSink = this.crouched ? 2.4 : 0;
        this.state.velocity[1] = Math.max(
          this.state.velocity[1] - (sinkStrength + crouchSink) * dt,
          -4.5,
        );
      }
      this.state.velocity[1] *= 0.96;
    } else {
      this.state.velocity[1] -= PLAYER_CONFIG.gravity * dt;
    }

    let jumped = false;
    if (!waterState.inWater && this.grounded && jumpHeld) {
      this.state.velocity[1] = PLAYER_CONFIG.jumpVelocity;
      this.grounded = false;
      jumped = true;
    }

    const result = PlayerPhysics.simulate(world, this.state.position, this.state.velocity, dt);
    this.state.position = result.position;
    this.state.velocity = result.velocity;
    this.grounded = result.grounded;

    if (this.state.position[1] < -16) {
      this.respawn();
    }

    return {
      jumped,
      sprinting,
      moving,
    };
  }

  respawn(): void {
    this.state.position = [...this.state.spawnPoint];
    this.state.velocity = [0, 0, 0];
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

  canOccupyBlock(blockX: number, blockY: number, blockZ: number): boolean {
    return !PlayerPhysics.wouldCollideWithBlock(this.state.position, blockX, blockY, blockZ);
  }

  isCrouched(): boolean {
    return this.crouched;
  }

  isGrounded(): boolean {
    return this.grounded;
  }

  private hasSprintObstacle(world: World, direction: Vector3): boolean {
    const [x, y, z] = this.state.position;
    const movement = direction.clone().normalize();
    const right = new Vector3(-movement.z, 0, movement.x);
    const probeDistance = 0.62;
    const probeX = x + movement.x * probeDistance;
    const probeZ = z + movement.z * probeDistance;
    const feetY = Math.floor(y + 0.08);
    const chestY = Math.floor(y + (this.crouched ? 1.05 : 1.4));

    for (const lateralOffset of [-0.22, 0, 0.22]) {
      const worldX = Math.floor(probeX + right.x * lateralOffset);
      const worldZ = Math.floor(probeZ + right.z * lateralOffset);
      if (
        isSolidBlock(world.getBlock(worldX, feetY, worldZ)) ||
        isSolidBlock(world.getBlock(worldX, chestY, worldZ))
      ) {
        return true;
      }
    }

    return false;
  }
}

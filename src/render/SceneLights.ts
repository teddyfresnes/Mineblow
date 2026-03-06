import { AmbientLight, DirectionalLight, HemisphereLight, Object3D, Scene } from 'three';

export interface SceneLights {
  ambient: AmbientLight;
  skyBounce: HemisphereLight;
  sun: DirectionalLight;
  sunTarget: Object3D;
}

export const addSceneLights = (scene: Scene): SceneLights => {
  const ambient = new AmbientLight('#e8f4ff', 0.3);
  const skyBounce = new HemisphereLight('#bfe3ff', '#4f5b3f', 0.9);
  const sun = new DirectionalLight('#ffe8b9', 1.45);
  const sunTarget = new Object3D();

  sun.castShadow = true;
  sun.shadow.mapSize.set(1536, 1536);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 190;
  sun.shadow.camera.left = -58;
  sun.shadow.camera.right = 58;
  sun.shadow.camera.top = 58;
  sun.shadow.camera.bottom = -58;
  sun.shadow.bias = -0.00025;
  sun.shadow.normalBias = 0.02;
  sun.target = sunTarget;

  scene.add(ambient, skyBounce, sun, sunTarget);
  return { ambient, skyBounce, sun, sunTarget };
};

export const updateSunForCamera = (
  lights: SceneLights,
  cameraX: number,
  cameraZ: number,
): void => {
  lights.sun.position.set(cameraX + 52, 78, cameraZ + 34);
  lights.sunTarget.position.set(cameraX, 12, cameraZ);
  lights.sunTarget.updateMatrixWorld();
};

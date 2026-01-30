import * as THREE from "three";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500,
);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});

const scene = new THREE.Scene();

const lastPoint = new THREE.Vector3(
  Math.random() * 50 - 25,
  Math.random() * 50 - 25,
  Math.random() * 50 - 25,
);

for (let i = 0; i < 50; i++) {
  const nextPoint = new THREE.Vector3(
    Math.random() * 60 - 30,
    Math.random() * 60 - 30,
    Math.random() * 60 - 30,
  );

  const geometry = new THREE.BufferGeometry().setFromPoints([
    lastPoint,
    nextPoint,
  ]);
  const material = new THREE.LineBasicMaterial({
    color: Math.random() * 0xffffff,
  });
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  lastPoint.copy(nextPoint);
}

renderer.render(scene, camera);

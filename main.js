import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const cube = theCubeMaker(5, 3, 1, 0xede8be);
const cubeTwo = theCubeMaker(8, 1, 1, 0x639463);
const cubeThree = theCubeMaker(1, 1, 1, 0x94637d);

scene.add(cube, cubeTwo, cubeThree);

camera.position.z = 10;

cube.position.x = -5;
cubeTwo.position.x = 5;

function animate() {
  cube.rotation.x += 0.06;

  cubeTwo.rotation.x -= 0.03;
  cubeTwo.rotation.y += 0.05;
  cubeTwo.rotation.z += 0.01;

  cubeThree.rotation.y -= 0.02;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

function theCubeMaker(width, height, depth, color) {
  const cube = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial({ color: color });
  return new THREE.Mesh(cube, material);
}

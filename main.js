import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

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
const textMesh = await printText("welcome", 0xdeb887, 1, 0);

scene.add(cube, cubeTwo, cubeThree, textMesh);

cube.position.x = -5;
cubeTwo.position.x = 5;
textMesh.position.y = 3;
textMesh.position.z = 1;

camera.position.z = 10;

function animate() {
  cube.rotation.x += 0.06;

  cubeTwo.rotation.x -= 0.03;
  cubeTwo.rotation.y += 0.05;
  cubeTwo.rotation.z += 0.01;

  cubeThree.rotation.y -= 0.02;

  textMesh.rotation.x += 0.04;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

function theCubeMaker(width, height, depth, hexColor) {
  const cube = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial({ color: hexColor });
  return new THREE.Mesh(cube, material);
}

async function printText(myText, hexColor, fontSize, depth) {
  const loader = new FontLoader();
  const font = await loader.loadAsync("fonts/helvetiker_regular.typeface.json");

  const geometry = new TextGeometry(myText, {
    font: font,
    size: fontSize,
    depth: depth,
    curveSegments: 24,
  });

  geometry.center();

  const textMaterial = new THREE.MeshBasicMaterial({ color: hexColor });
  return new THREE.Mesh(geometry, textMaterial);
}

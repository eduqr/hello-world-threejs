import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = theCubeMaker(
  5,
  3,
  1,
  0xede8be,
  "/experiments/01-lines/index.html",
);
const cubeTwo = theCubeMaker(
  1,
  1,
  1,
  0x94637d,
  "/experiments/02-models/index.html",
);
const cubeThree = theCubeMaker(8, 1, 1, 0x639463, "");
const textMesh = await printText("welcome", 0xdeb887, 1, 0);

scene.add(cube, cubeTwo, cubeThree, textMesh);

cube.position.x = -5;
cubeThree.position.x = 5;
textMesh.position.y = 3;
textMesh.position.z = 1;

window.addEventListener("resize", onWindowResize);
document.addEventListener("mousedown", onDocumentMouseDown, false);
document.addEventListener("mousemove", onDocumentMouseMove, false);

onWindowResize();
renderer.setAnimationLoop(animate);

function animate() {
  controls.update();
  cube.rotation.x += 0.06;

  cubeThree.rotation.x -= 0.03;
  cubeThree.rotation.y += 0.05;
  cubeThree.rotation.z += 0.01;

  cubeTwo.rotation.y -= 0.02;

  textMesh.rotation.x += 0.04;

  renderer.render(scene, camera);
}

function theCubeMaker(width, height, depth, hexColor, url) {
  const cube = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial({ color: hexColor });
  const mesh = new THREE.Mesh(cube, material);
  mesh.userData.URL = url;
  return mesh;
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

function onDocumentMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0 && intersects[0].object.userData.URL) {
    window.location.href = intersects[0].object.userData.URL;
  }
}

function onDocumentMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  const clickable = intersects.length > 0 && intersects[0].object.userData.URL;
  document.body.style.cursor = clickable ? "pointer" : "default";
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;

  // Ajustar para mobile alejando la cam
  if (aspect < 1) {
    camera.position.z = 15 / aspect;
  } else {
    camera.position.z = 12;
  }

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

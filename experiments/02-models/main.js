import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();

const color = 0xf2eddf;
const light = new THREE.AmbientLight(color, 0.9);
const directionalLight = new THREE.DirectionalLight(color, 2);
directionalLight.position.set(5, 5, 5);

scene.add(light, directionalLight);

camera.position.z = 1;
camera.position.y = 0.5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setAnimationLoop(animate);

loader.load(
  "/models/chess_pieces-v1.glb",
  function (gltf) {
    gltf.scene.scale.setScalar(4);
    gltf.scene.position.set(-0.1, -0.1, 0);
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  },
);

function animate() {
  controls.update();
  renderer.render(scene, camera);
}

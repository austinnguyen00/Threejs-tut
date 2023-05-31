import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// To actually be able to display anything with three.js, 
// we need three things: 
// scene, camera and renderer, 
// so that we can render the scene with camera.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer needs to know which element to use
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

// CREATE OBJECT
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x1aa7ec });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// ADDING LIGHT
const pointLight = new THREE.PointLight(0xfffff, 1);
const ambientLight = new THREE.AmbientLight(0xfffff);
pointLight.position.set(10, 10, 10);
scene.add(pointLight, ambientLight);

// ADDING POINT LIGHT HELPER
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);

// ADDING GRID HELPER
const size = 50;
const divisions = 50;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// ORBIT CONTROL
const controls = new OrbitControls(camera, renderer.domElement);

// ADDING OBJECTS FUNCTIONS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)

// LOADING IMAGES TEXTURES
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture

// UPDATE SCREEN EVERY TIME ITS UPDATED
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.Z += 0.01;

  // controls.update() must be called after
  // any manual changes to the camera's transform
  controls.update();

  renderer.render(scene, camera);
}

animate();
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
camera.position.setX(-3);

// CREATE OBJECT
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// ADDING LIGHT
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
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

// AVATAR - TEXTURE MAPPING
const avatarTexture = new THREE.TextureLoader().load('avatar.jpg');
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
)
scene.add(avatar)

// MOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture }),
)
scene.add(moon)

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
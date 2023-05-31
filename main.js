import './style.css'
import * as THREE from 'three';

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
const material = new THREE.MeshBasicMaterial({ color: 0x1aa7ec, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
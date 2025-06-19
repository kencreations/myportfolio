import * as THREE from 'https://unpkg.com/three@0.177.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.177.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.177.0/examples/jsm/controls/OrbitControls.js';


const canvas = document.getElementById('computerCanvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(20, 3, 5);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// Lighting
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.15);
scene.add(hemiLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(-20, 50, 10);
spotLight.castShadow = true;
scene.add(spotLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(pointLight);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2;

// Load model
const loader = new GLTFLoader();
loader.load(
  '/models/desktop_pc/scene.gltf',
  (gltf) => {
    console.log("✅ Model loaded:", gltf);
    const model = gltf.scene;

    model.scale.set(2, 2, 2);  // exaggerate
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(model);
    animate();
  },
  (xhr) => {
    console.log(`Loading model: ${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  (error) => {
    console.error('❌ Error loading GLTF model:', error);
  }
);
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
box.position.set(0, 1, 0);
scene.add(box);

loader.load(
  'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
  (gltf) => {
    scene.add(gltf.scene);
    animate();
  },
  undefined,
  (e) => console.error('Failed to load test model:', e)
);

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
console.log("Render loop started...");

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import testVertexShader from "./shaders/vertex.glsl";
import testFragmentShader from "./shaders/fragment.glsl";

// canvas
let canvas = document.querySelector(".webgl");

// scene
let scene = new THREE.Scene();
// sizes
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

//
//texture
//
// texture loader
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load(
  "textures/indian_flag.jpg",
  () => {
    console.log("Texture loaded successfully");
  },
  undefined,
  (err) => {
    console.error("An error occurred while loading the texture", err);
  }
);
//  plane
// Corrected vertex shader and fragment shader for a custom RawShaderMaterial

let geometry = new THREE.PlaneGeometry(1, 1, 32, 32); // Use PlaneGeometry instead of BufferGeometry for a simple plane

const count = geometry.attributes.position.count; // for getting count of positions

const randoms = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}

geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

let material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) }, // for waves
    uTime: { value: 0 }, // time uniform value for animation
    // uColor: { value: new THREE.Color("orange") },
    uTexture: { value: flagTexture },
  },
  // uFrequency: { value: 10 }, // for waves,
  // transperent: true,
});

// Create the plane mesh
let plane = new THREE.Mesh(geometry, material);
plane.scale.y = 2 / 3;

// Add the plane to the scene
scene.add(plane);

// camera
let fov = 45;
let aspectRatio = sizes.width / sizes.height;
let far = 10;
let near = 0.1;
let camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.z = 2;
// camera.lookAt(new THREE.Vector3(0, 0, 0));

// renderer //
let renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

renderer.setAnimationLoop(animation);

// controls funtion to move in all direction
const controls = new OrbitControls(camera, renderer.domElement);

// resizing
window.addEventListener("resize", () => {
  console.log("window resized");
});

//
// animate
//

const clock = new THREE.Clock();

function animation() {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
}

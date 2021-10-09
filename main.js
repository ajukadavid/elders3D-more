import './style.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0x1b7518 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z);
    scene.add(star)
}
Array(800).fill().forEach(addStar);

const elders = new THREE.TextureLoader().load('lgo.png')
scene.background = elders;

//3D Object
const loader = new GLTFLoader();

loader.load('elders3D.gltf', function(gltf) {

    scene.add(gltf.scene);

}, undefined, function(error) {

    console.error(error);

});



//Avatar

const eldersTexture = new THREE.TextureLoader().load('bg-wo.png')

const elder = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({
        map: eldersTexture
    })
)

scene.add(elder)
const lastTexture = new THREE.TextureLoader().load('eldrs.png')
const last = new THREE.Mesh(
    new THREE.SphereGeometry(8, 8, 32),
    new THREE.MeshStandardMaterial({
        map: lastTexture
    })
)

scene.add(last)

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update()

    renderer.render(scene, camera)
}
animate()
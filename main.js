import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const ambientLight = new THREE.AmbientLight(16777215, 0.2);
scene.add(ambientLight);
const light = new THREE.PointLight(16777215, 200);
light.position.set(15, 15, 15);
scene.add(light);
const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 40);
const material = new THREE.MeshPhysicalMaterial({
    color: '#c1829e',
    emissive: '#90fc99',
    emissiveIntensity: '0.1245',
    roughness: '0.2875',
    metalness: '0.7451',
    reflectivity: 0.0625,
    iridescence: 0.8575,
    clearcoat: 0.5204,
    clearcoatRoughness: 0.5232,
    specularIntensity: 0.4152,
    specularColor: '#80a5be'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 30;
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener('mousemove', event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeZ, intersectPoint);

    light.position.copy(intersectPoint);
});
animate();

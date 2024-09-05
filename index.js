import * as THREE from 'three'
import { OrbitControls } from 'jsm/controls/OrbitControls.js'

//definindo o tamando do canvas para tela toda e adicionando no body
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(sizes.width,sizes.height)
document.body.appendChild(renderer.domElement)

//aspects bascio para camera 
const fov = 100
const aspect = sizes.width/sizes.height
const near = 0.1
const far = 10
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2

//adicionando scene com background e controls 
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x4670AA );
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.1

//adicionando um objeto e outro igual só com o wireframe
const geo = new THREE.IcosahedronGeometry(1.0, 2)
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
})
const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)
//segundo obj
const wireMat = new THREE.MeshBasicMaterial ({
    color: 0xffffff,
    wireframe: true
})
//adicionar o elemento no elemento pai ⬆️
const wireMesh = new THREE.Mesh(geo, wireMat)
mesh.add(wireMesh)

//addding luzes
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500)
scene.add(hemiLight)
  
//update resize da tela/
window.addEventListener('resize', () => {
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
  
    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    //update render
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}) 

//addding animation rotation and updates
function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001
    renderer.render(scene,camera)
    controls.upadate()
} 
animate()
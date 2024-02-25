import { IcosahedronGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PointLight, Scene, SphereGeometry } from "three";
import Experience from "../Experience";

export default class Sun {

    experience: Experience
    scene: Scene
    geometry: THREE.IcosahedronGeometry
    material: THREE.MeshStandardMaterial
    mesh: THREE.Mesh
    light: THREE.PointLight

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.light = new PointLight(0xffffff, 5, 800)
        this.light.castShadow = false
        this.light.position.set(0, 0, 0)

        this.scene.add(this.light)

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new IcosahedronGeometry(1, 2)
    }

    setMaterial()
    {
        this.material = new MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 1,
            wireframe:false,
        })

    }

    setMesh()
    {
        this.mesh = new Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
    

}
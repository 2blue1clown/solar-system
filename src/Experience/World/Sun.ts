import { Color, IcosahedronGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PointLight, Scene, SphereGeometry } from "three";
import Experience from "../Experience";

export default class Sun {

    experience: Experience
    scene: Scene
    geometry: THREE.IcosahedronGeometry
    material: THREE.MeshStandardMaterial
    mesh: THREE.Mesh
    light: THREE.PointLight
    color = new Color(0xf28322)

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
            color: this.color,
            emissive: this.color,
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
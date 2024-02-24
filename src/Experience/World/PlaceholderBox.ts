
import { BoxGeometry, Material, Mesh, MeshStandardMaterial } from "three"
import Experience from "../Experience"
import Resources, { Textures } from "../Utils/Resources"

export default class PlaceholderBox {
    experience: Experience
    scene: THREE.Scene
    resources: Resources
    geometry: THREE.BoxGeometry
    textures: Textures
    material: Material
    mesh: THREE.Mesh
    color:number
    constructor(color: number = 0xffff00)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.color = color

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    set position(position: {x:number, y:number, z:number})
    {
        this.mesh.position.set(position.x, position.y, position.z)
    }

    setGeometry()
    {
        this.geometry = new BoxGeometry(1, 1, 1)
    
    }

    setTextures()
    {
        // this.textures = {} as Textures

        // this.textures.color = this.resources.items.placeholderBoxColorTexture as THREE.Texture
        // this.textures.color.colorSpace = THREE.SRGBColorSpace
        // this.textures.color.repeat.set(1, 1)
        // this.textures.color.wrapS = THREE.RepeatWrapping
        // this.textures.color.wrapT = THREE.RepeatWrapping

        // this.textures.normal = this.resources.items.placeholderBoxNormalTexture as THREE.Texture
        // this.textures.normal.repeat.set(1, 1)
        // this.textures.normal.wrapS = THREE.RepeatWrapping
        // this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.material = new MeshStandardMaterial({
            color: this.color,
            // map: this.textures.color,
            // normalMap: this.textures.normal
        })
    }

    setMesh()
    {
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
    }
}
import { CircleGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace } from 'three'
import Experience from '../Experience.ts'
import Resources, { Textures } from '../Utils/Resources.ts'



export default class Floor
{
    experience: Experience
    scene: THREE.Scene
    resources: Resources
    geometry: THREE.CircleGeometry
    textures: Textures
    material: THREE.MeshStandardMaterial
    mesh: THREE.Mesh
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new CircleGeometry(10, 64)
    }

    setTextures()
    {
        this.textures = {} as Textures

        this.textures.color = this.resources.items.grassColorTexture as THREE.Texture
        this.textures.color.colorSpace = SRGBColorSpace
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = RepeatWrapping
        this.textures.color.wrapT = RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture as THREE.Texture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = RepeatWrapping
        this.textures.normal.wrapT = RepeatWrapping
    }

    setMaterial()
    {
        this.material = new MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh()
    {
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}
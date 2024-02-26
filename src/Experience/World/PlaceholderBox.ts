
import { BoxGeometry, BufferAttribute, Color, IcosahedronGeometry, Material, Mesh, MeshStandardMaterial } from "three"
import Experience from "../Experience"
import Resources, { Textures } from "../Utils/Resources"
import { ColorInfo } from "./planet-data"

export default class PlaceholderBox {
    experience: Experience
    scene: THREE.Scene
    resources: Resources
    geometry: THREE.IcosahedronGeometry
    textures: Textures
    material: Material
    mesh: THREE.Mesh
    colorWeights: ColorInfo[]

    constructor(colorWeights:ColorInfo[])
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.colorWeights = colorWeights

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    set position(position: {x:number, y:number, z:number})
    {
        this.mesh.position.set(position.x, position.y, position.z)
    }

    setGeometry()
    {
        
        

        this.geometry = new IcosahedronGeometry(1, 1)
        const count = this.geometry.attributes.position.count
        this.geometry.setAttribute('color', new BufferAttribute(new Float32Array(count * 3), 3))
        const aColor = this.geometry.attributes.color
        
        for (let i = 0; i < (count / 3); i++) {
            const color = new Color(this.chooseColor(this.colorWeights))
            aColor.setXYZ(i * 3 + 0, color.r, color.g, color.b);
            aColor.setXYZ(i * 3 + 1, color.r, color.g, color.b);
            aColor.setXYZ(i * 3 + 2, color.r, color.g, color.b);
          }
    
    }

    chooseColor(colorInfo: ColorInfo[]) {
        let totalWeight = colorInfo.reduce((total, color) => total + color.weight, 0);
        let randomNum = Math.random() * totalWeight;
        let weightSum = 0;
    
        for (const color of colorInfo) {
            weightSum += color.weight;
            if (randomNum <= weightSum) {
                return color.hex;
            }
        }
        return colorInfo[colorInfo.length - 1].hex; // fallback to the last color if no color is chosen (should not happen)
    }

    setMaterial()
    {
        this.material = new MeshStandardMaterial({
            flatShading: true,
            vertexColors: true,
        })
    }

    setMesh()
    {
        this.mesh = new Mesh(this.geometry, this.material)
    
    }
}
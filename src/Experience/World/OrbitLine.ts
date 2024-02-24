import { Mesh, MeshBasicMaterial, RingGeometry } from "three";
import Experience from "../Experience";

export default class OrbitLine{
    experience:Experience
    scene:THREE.Scene
    geometry:THREE.RingGeometry
    material:THREE.MeshBasicMaterial
    mesh:THREE.Mesh

    radius:number
    color:number
    width:number

    set position(position: {x:number, y:number, z:number})
    {
        this.mesh.position.set(position.x, position.y, position.z)
    }

    constructor(radius:number,width:number = 0.01, color:number = 0xffffff){
        this.radius = radius
        this.color = color
        this.width = width

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){
        this.geometry = new RingGeometry(this.radius - this.width/2,this.radius + this.width/2, 64)
    }

    setMaterial(){
        this.material = new MeshBasicMaterial({
            color:this.color,
        })
    }

    setMesh(){
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
    }

}
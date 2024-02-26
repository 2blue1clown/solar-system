import { BufferGeometry, LineDashedMaterial, LineSegments, Vector3 } from "three"
import Experience from "../Experience"

export default class StraightDottedLine{ 
    experience:Experience
    scene:THREE.Scene
    geometry:THREE.BufferGeometry
    material:THREE.LineBasicMaterial
    mesh:THREE.LineSegments
    color:number
    width:number
    length:number
    position:THREE.Vector3
    direction:THREE.Vector3
    dashSize:number
    gapSize:number

    constructor(position:THREE.Vector3, direction:THREE.Vector3, length:number, color:number = 0xffffff, width:number = 0.01, dashSize:number = 0.1, gapSize:number = 0.1){
        this.position = position
        this.direction = direction
        this.length = length
        this.color = color
        this.width = width
        this.dashSize = dashSize
        this.gapSize = gapSize

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){
        //set the geometry so the position is the center of the line
        const start = new Vector3(0,0,-this.length/2)
        const end = new Vector3(0,0,this.length/2)
        this.geometry = new BufferGeometry().setFromPoints([start,end])

    }

    setMaterial(){
        this.material = new LineDashedMaterial({color: this.color, linewidth: this.width, dashSize: this.dashSize, gapSize: this.gapSize})
    }

    setMesh(){
        this.mesh = new LineSegments(this.geometry, this.material)
    }

    
}
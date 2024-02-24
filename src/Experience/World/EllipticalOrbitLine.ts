


import { BufferGeometry, DoubleSide, EllipseCurve, LineBasicMaterial, Mesh } from "three";
import Experience from "../Experience";


export default class EllipticalOrbitLine{
    experience:Experience
    scene:THREE.Scene
    geometry:THREE.BufferGeometry
    material:THREE.LineBasicMaterial
    mesh:THREE.Mesh

    semiMajorAxis:number
    eccentricity:number
    inclination:number

    curve:EllipseCurve

    get semiMinorAxis(){
        return this.semiMajorAxis * Math.sqrt(1 - this.eccentricity**2)
    }

    get fociDistance(): number {
        return 2 * Math.sqrt(this.semiMajorAxis**2 - this.semiMinorAxis**2);
    }

    getXPosition(parameter:number){
        return this.curve.getPoint(parameter).x
    }
    getYPosition(parameter:number){
        return this.curve.getPoint(parameter).y
    }

    // getZPosition(parameter:number){
    //     return this.curve.getPoint(parameter).z
    // }

    color:number
    width:number


    constructor(semiMajorAxis:number, eccentricity:number, color:number = 0xffffff){
        
        this.semiMajorAxis = semiMajorAxis
        this.eccentricity = eccentricity
        
        this.color = color
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){

        this.curve =  new EllipseCurve(this.fociDistance/2, 0, this.semiMajorAxis, this.semiMinorAxis, 0,2*Math.PI, false)

        const points = this.curve.getPoints( 200 );
        this.geometry = new BufferGeometry().setFromPoints( points );
    }

    setMaterial(){
        this.material = new LineBasicMaterial({
            color:this.color,
            side:DoubleSide

        })
    }

    setMesh(){
        this.mesh = new Mesh(this.geometry, this.material)
    }


}





import { AdditiveBlending, BufferGeometry, EllipseCurve, LineBasicMaterial, Mesh, MeshBasicMaterial, RingGeometry } from "three";
import Experience from "../Experience";

export default class EllipticalOrbitLine{
    experience:Experience
    scene:THREE.Scene
    geometry:THREE.BufferGeometry
    material:THREE.LineBasicMaterial
    mesh:THREE.Mesh

    semiMajorAxis:number
    eccentricity:number

    get semiMinorAxis(){
        return this.semiMajorAxis * Math.sqrt(1 - this.eccentricity**2)
    }

    get fociDistance(): number {
        return 2 * Math.sqrt(this.semiMajorAxis**2 - this.semiMinorAxis**2);
    }

    color:number
    width:number


    constructor(semiMajorAxis:number, eccentricity:number,width:number = 0.01, color:number = 0xffffff){
        

        this.semiMajorAxis = semiMajorAxis
        this.eccentricity = eccentricity

        this.color = color
        this.width = width

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){

        // I want to place the ellipse at one of the foci points
        // 1. Find the distance between the foci points

        const curve =  new EllipseCurve(this.fociDistance/2, 0, this.semiMajorAxis, this.semiMinorAxis, 0, 2 * Math.PI, false, 0)
        const points = curve.getPoints( 100 );
        this.geometry = new BufferGeometry().setFromPoints( points );
    }

    setMaterial(){
        this.material = new LineBasicMaterial({
            color:this.color,
            // vertexColors: true,
            blending:AdditiveBlending,
            // transparent:true,
            linejoin: 'round',

        })
    }

    setMesh(){
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
    }


}


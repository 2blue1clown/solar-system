import { Group, Scene, Vector3 } from 'three'
import Experience from '../Experience.ts'
import Resources from '../Utils/Resources.ts'
import Environment from './Environment.js'
import Floor from './Floor.js'
import PlaceholderBox from './PlaceholderBox.ts'
import { PLANET_DATA, SCALED_PLANET_DATA } from './planet-data.ts'
import { Planet } from './planet-data.ts'
import EllipticalOrbitLine from './EllipticalOrbitLine.ts'
import Time from '../Utils/Time.ts'
import Sun from './Sun.ts'
import StraightDottedLine from './StraightDottedLine.ts'

export default class World
{
    experience: Experience
    scene: Scene
    resources: Resources
    floor: Floor
    environment: Environment

    time:Time

    planets = {} as { [key in Planet]: Group }
    orbitLines = {} as { [key in Planet]: EllipticalOrbitLine }
    
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time


        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.environment = new Environment()

            const solarSystem = new Group()

            for(let planet in SCALED_PLANET_DATA){
            
                if(planet == "sun"){
                    const sun = new Sun()
                    sun.mesh.scale.set(SCALED_PLANET_DATA.sun.radius, SCALED_PLANET_DATA.sun.radius, SCALED_PLANET_DATA.sun.radius)
                    solarSystem.add(sun.mesh)

                    continue
                }

                this.planets[planet] = new Group()
                
                const box = new PlaceholderBox(PLANET_DATA[planet].colorWeights,(PLANET_DATA[planet].dwarf)?0:1)
                const line = new StraightDottedLine(new Vector3(0,0,0),new Vector3(0,0,1),1.2,0xffffff,0.1,1,1)

    
                box.mesh.scale.set(SCALED_PLANET_DATA[planet].radius, SCALED_PLANET_DATA[planet].radius, SCALED_PLANET_DATA[planet].radius)
                line.mesh.scale.set(SCALED_PLANET_DATA[planet].radius*2, SCALED_PLANET_DATA[planet].radius*2, SCALED_PLANET_DATA[planet].radius*2)
                this.planets[planet].add(box.mesh)
                this.planets[planet].add(line.mesh)

                box.mesh.rotateY(SCALED_PLANET_DATA[planet].inclinationOfEquatorToOrbit)
                line.mesh.rotateY(SCALED_PLANET_DATA[planet].inclinationOfEquatorToOrbit)
                
                if(planet != "sun"){
                    
                    const startingPoint = Math.random()
                    const scaledSemiMajorAxis = Math.log(SCALED_PLANET_DATA[planet].semiMajorAxis *10)
                    const orbit = new EllipticalOrbitLine(
                        scaledSemiMajorAxis, 
                        PLANET_DATA[planet].eccentricity,
                        startingPoint,
                        0xffffff)
                    
                    this.orbitLines[planet] = orbit
                    box.position = {x: orbit.getXPosition(startingPoint), y:orbit.getYPosition(startingPoint), z: 0}
                    line.mesh.position.set(orbit.getXPosition(startingPoint),orbit.getYPosition(startingPoint), 0)
                    this.planets[planet].add(orbit.mesh)
                    this.planets[planet].rotateY(SCALED_PLANET_DATA[planet].inclinationOfOrbitToEcliptic)
                }
                solarSystem.add(this.planets[planet])
            }
            solarSystem.rotateX(-Math.PI/2)
            console.log(solarSystem)
            this.scene.add(solarSystem)
        

            
        })
    }

    update()
    {
        const elapsedTime = this.time.elapsedSeconds /36.5 ;
        for(let planet in this.planets){
            if(planet == "sun") continue
            const boxMesh = this.planets[planet].children[0] as THREE.Mesh
            const lineMesh = this.planets[planet].children[1] as THREE.Mesh
            const orbit = this.orbitLines[planet]
            // I want one year to be 365 seconds
            const period = SCALED_PLANET_DATA[planet].orbitalPeriod
            boxMesh.position.set(
                orbit.getXPosition(elapsedTime/period%1),
                orbit.getYPosition(elapsedTime/period%1),
                0)
            lineMesh.position.set(
                orbit.getXPosition(elapsedTime/period%1),
                orbit.getYPosition(elapsedTime/period%1),
                0)
            
            boxMesh.rotateZ((1/(SCALED_PLANET_DATA[planet].rotationPeriod))*0.1)   
        }

    }
}
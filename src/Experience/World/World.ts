import { Group, Scene } from 'three'
import Experience from '../Experience.ts'
import Resources from '../Utils/Resources.ts'
import Environment from './Environment.js'
import Floor from './Floor.js'
import PlaceholderBox from './PlaceholderBox.ts'
import { PLANET_DATA, SCALED_PLANET_DATA } from './planet-data.ts'
import { Planet } from './planet-data.ts'
import EllipticalOrbitLine from './EllipticalOrbitLine.ts'
import Time from '../Utils/Time.ts'

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
            
                this.planets[planet] = new Group()
                const box = new PlaceholderBox(PLANET_DATA[planet].color)
                box.mesh.scale.set(SCALED_PLANET_DATA[planet].radius, SCALED_PLANET_DATA[planet].radius, SCALED_PLANET_DATA[planet].radius)
                this.planets[planet].add(box.mesh)
                
                if(planet != "sun"){
                    
                    const scaledSemiMajorAxis = Math.log(SCALED_PLANET_DATA[planet].semiMajorAxis) + 1
                    const orbit = new EllipticalOrbitLine(
                        scaledSemiMajorAxis, 
                        PLANET_DATA[planet].eccentricity,
                        0xffffff)
                    // const orbit = new EllipticalOrbitLine(
                    //     PLANET_DATA[planet].semiMajorAxis, 
                    //     PLANET_DATA[planet].eccentricity,
                    //     0xffffff)
                    
                    this.orbitLines[planet] = orbit
                    box.position = {x: orbit.getXPosition(0), y:orbit.getYPosition(0), z: 0}
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
            const orbit = this.orbitLines[planet]
            // I want one year to be 365 seconds
            const period = SCALED_PLANET_DATA[planet].orbitalPeriod
            boxMesh.position.set(
                orbit.getXPosition(elapsedTime/period%1),
                orbit.getYPosition(elapsedTime/period%1),
                0)
        }

    }
}
import { Group, Scene } from 'three'
import Experience from '../Experience.ts'
import Resources from '../Utils/Resources.ts'
import Environment from './Environment.js'
import Floor from './Floor.js'
import PlaceholderBox from './PlaceholderBox.ts'
import { PLANET_DATA, SCALED_PLANET_DATA } from './planet-data.ts'
import { Planet } from './planet-data.ts'
import EllipticalOrbitLine from './EllipticalOrbitLine.ts'

export default class World
{
    experience: Experience
    scene: Scene
    resources: Resources
    floor: Floor
    environment: Environment
    planets = {} as { [key in Planet]: Group } 
    
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

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
                    
                    const scaledSemiMajorAxis = Math.abs(Math.log(SCALED_PLANET_DATA[planet].semiMajorAxis))

                    console.log(planet,scaledSemiMajorAxis)

                    const orbit = new EllipticalOrbitLine(
                        scaledSemiMajorAxis, 
                        PLANET_DATA[planet].eccentricity,
                        0xffffff)

                    box.position = {x: orbit.getXPosition(0), y:orbit.getYPosition(0), z: 0}
                    this.planets[planet].add(orbit.mesh)
                    this.planets[planet].rotateY(SCALED_PLANET_DATA[planet].inclinationOfOrbitToEcliptic)
                }
                solarSystem.add(this.planets[planet])
            }
            solarSystem.rotateX(-Math.PI/2)
            this.scene.add(solarSystem)
        

            
        })
    }

    update()
    {
        // if(this.fox)
        //     this.fox.update()
    }
}
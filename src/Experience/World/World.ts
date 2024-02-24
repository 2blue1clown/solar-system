import { Mesh, Scene } from 'three'
import Experience from '../Experience.ts'
import Resources from '../Utils/Resources.ts'
import Environment from './Environment.js'
import Floor from './Floor.js'
import PlaceholderBox from './PlaceholderBox.ts'
import OrbitLine from './OrbitLine.ts'
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
    planets = {} as { [key in Planet]: PlaceholderBox } 
    orbits = {} as { [key in Planet]: OrbitLine }
    
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


            this.planets.venus = new PlaceholderBox(0xc0c0c0)
            this.planets.venus.position = {x: 1, y: 0, z: 0}
            this.planets.venus.mesh.scale.set(0.2, 0.2, 0.2)

            this.orbits.venus = new OrbitLine(1,0.01)
            this.orbits.venus.position = {x: 0, y: 0, z: 0}

            console.log(SCALED_PLANET_DATA)

            for(let planet in SCALED_PLANET_DATA){
                
                this.planets[planet] = new PlaceholderBox(PLANET_DATA[planet].color)
                this.planets[planet].position = {x: PLANET_DATA[planet].distance, y: 0, z: 0}
                this.planets[planet].mesh.scale.set(SCALED_PLANET_DATA[planet].radius, SCALED_PLANET_DATA[planet].radius, SCALED_PLANET_DATA[planet].radius)

                if(planet != "sun"){
                    // this.orbits[planet] = new OrbitLine(PLANET_DATA[planet].distance,0.01,0xffffff)
                    this.orbits[planet] = new EllipticalOrbitLine(PLANET_DATA[planet].semiMajorAxis, PLANET_DATA[planet].eccentricity,0.01,0xffffff)
                    this.orbits[planet].position = {x: 0, y: 0, z: 0}
                    this.scene.add(this.orbits[planet].mesh)
                }
                this.scene.add(this.planets[planet].mesh)
            }
            
        })
    }

    update()
    {
        // if(this.fox)
        //     this.fox.update()
    }
}
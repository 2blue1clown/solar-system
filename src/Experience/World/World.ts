import { Mesh, Scene } from 'three'
import Experience from '../Experience.ts'
import Resources from '../Utils/Resources.ts'
import Environment from './Environment.js'
import Floor from './Floor.js'
import PlaceholderBox from './PlaceholderBox.ts'
import OrbitLine from './OrbitLine.ts'

export enum Planet {
    Mercury = 'mercury',
    Venus = 'venus',
    Earth = 'earth',
    Mars = 'mars',
    Jupiter = 'jupiter',
    Saturn = 'saturn',
    Uranus = 'uranus',
    Neptune = 'neptune',
    Pluto = 'pluto',
}

export default class World
{
    experience: Experience
    scene: Scene
    resources: Resources
    floor: Floor
    environment: Environment
    sun: PlaceholderBox
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
            this.floor = new Floor()
            this.environment = new Environment()

            this.sun = new PlaceholderBox()
            this.sun.position = {x: 0, y: 0.6, z: 0}

            this.planets.venus = new PlaceholderBox(0xc0c0c0)
            this.planets.venus.position = {x: 1, y: 0.6, z: 0}
            this.planets.venus.mesh.scale.set(0.2, 0.2, 0.2)

            this.orbits.venus = new OrbitLine(1,0.01)
            this.orbits.venus.position = {x: 0, y: 0.6, z: 0}

            this.planets.mercury = new PlaceholderBox(0xCC5500)
            this.planets.mercury.position = {x: 2, y: 0.6, z: 0}
            this.planets.mercury.mesh.scale.set(0.3, 0.3, 0.3)

            this.orbits.mercury = new OrbitLine(2,0.01)
            this.orbits.mercury.position = {x: 0, y: 0.6, z: 0}

            this.planets.earth = new PlaceholderBox(0x0000FF)
            this.planets.earth.position = {x: 3, y: 0.6, z: 0}
            this.planets.earth.mesh.scale.set(0.3, 0.3, 0.3)

            this.orbits.earth = new OrbitLine(3,0.01)
            this.orbits.earth.position = {x: 0, y: 0.6, z: 0}

            this.planets.mars = new PlaceholderBox(0xFF0000)
            this.planets.mars.position = {x: 4, y: 0.6, z: 0}
            this.planets.mars.mesh.scale.set(0.3, 0.3, 0.3)

            this.orbits.mars = new OrbitLine(4,0.01)
            this.orbits.mars.position = {x: 0, y: 0.6, z: 0}

            this.planets.jupiter = new PlaceholderBox(0xFFD700)
            this.planets.jupiter.position = {x: 5, y: 0.6, z: 0}
            this.planets.jupiter.mesh.scale.set(0.3, 0.3, 0.3)

            this.orbits.jupiter = new OrbitLine(5,0.01)
            this.orbits.jupiter.position = {x: 0, y: 0.6, z: 0}

            this.planets.saturn = new PlaceholderBox(0xFFA500)
            this.planets.saturn.position = {x: 6, y: 0.6, z: 0}
            this.planets.saturn.mesh.scale.set(0.3, 0.3, 0.3)

            this.orbits.saturn = new OrbitLine(6,0.01)
            this.orbits.saturn.position = {x: 0, y: 0.6, z: 0}

            this.planets.uranus = new PlaceholderBox(0x00FFFF)
            this.planets.uranus.position = {x: 7, y: 0.6, z: 0}
            this.planets.uranus.mesh.scale.set(0.3, 0.3, 0.3)

            this.orbits.uranus = new OrbitLine(7,0.01)
            this.orbits.uranus.position = {x: 0, y: 0.6, z: 0}

            this.planets.neptune = new PlaceholderBox(0x0000FF)
            this.planets.neptune.position = {x: 8, y: 0.6, z: 0}
            this.planets.neptune.mesh.scale.set(0.3, 0.3, 0.3)

            this.orbits.neptune = new OrbitLine(8,0.01)
            this.orbits.neptune.position = {x: 0, y: 0.6, z: 0}

            this.planets.pluto = new PlaceholderBox(0x0000FF)
            this.planets.pluto.position = {x: 9, y: 0.6, z: 0}
            this.planets.pluto.mesh.scale.set(0.05, 0.05, 0.05)

            this.orbits.pluto = new OrbitLine(9,0.01)
            this.orbits.pluto.position = {x: 0, y: 0.6, z: 0}


        
            this.scene.add(this.sun.mesh)
            for(let planet in this.planets)
            {
                this.scene.add(this.orbits[planet].mesh)
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
import { Scene } from 'three'
import Experience from '../Experience.ts'
import Resources from '../Utils/Resources.ts'
import Environment from './Environment.js'
import Floor from './Floor.js'
import PlaceholderBox from './PlaceholderBox.ts'

export default class World
{
    experience: Experience
    scene: Scene
    resources: Resources
    floor: Floor
    environment: Environment
    box: PlaceholderBox
    
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
            this.box = new PlaceholderBox()

            this.box.position = {x: 0, y: 0.6, z: 0}

            this.scene.add(this.box.mesh)
        })
    }

    update()
    {
        // if(this.fox)
        //     this.fox.update()
    }
}
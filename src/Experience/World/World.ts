import Experience from '../Experience.ts'
import Resources from '../Utils/Resources.ts'
import Environment from './Environment.js'
import Floor from './Floor.js'

export default class World
{
    experience: Experience
    scene: THREE.Scene
    resources: Resources
    floor: Floor
    environment: Environment
    
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
        })
    }

    update()
    {
        // if(this.fox)
        //     this.fox.update()
    }
}
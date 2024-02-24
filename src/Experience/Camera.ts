import Experience from './Experience.ts'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Sizes from './Utils/Sizes.ts'
import { PerspectiveCamera, Scene } from 'three'

export default class Camera
{
    experience: Experience
    sizes:Sizes
    scene: Scene
    canvas: HTMLCanvasElement

    instance: PerspectiveCamera
    controls: OrbitControls
    
    constructor(experience:Experience)
    {
        this.experience = experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 200)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}
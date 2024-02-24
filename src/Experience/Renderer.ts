import Experience from './Experience.js'
import Sizes from './Utils/Sizes.ts'
import Camera from './Camera.ts'
import { CineonToneMapping, PCFSoftShadowMap, Scene, WebGLRenderer } from 'three'

export default class Renderer
{
    experience: Experience
    canvas: HTMLCanvasElement
    sizes: Sizes
    scene: Scene
    camera: Camera

    instance: WebGLRenderer
    constructor(experience:Experience)
    {
        this.experience = experience
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.toneMapping = CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        if(this.camera.instance) this.instance.render(this.scene, this.camera.instance)
    }
}
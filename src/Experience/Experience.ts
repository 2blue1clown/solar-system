

import Debug from './Utils/Debug.ts'
import Sizes from './Utils/Sizes.ts'
import Time from './Utils/Time.ts'
import Camera from './Camera.ts'
import Renderer from './Renderer.ts'
import World from './World/World.js'
import Resources from './Utils/Resources.ts'

import sources from './sources.ts'
import { Mesh, Scene } from 'three'

let instance: Experience;

declare global { 
    interface Window { experience: Experience;}
}

export default class Experience
{
    canvas: HTMLCanvasElement
    debug: Debug
    sizes: Sizes
    time: Time
    scene: Scene
    resources: Resources
    camera: Camera
    renderer: Renderer
    world: World

    constructor(_canvas?: HTMLCanvasElement)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        if(!_canvas)
        {
            _canvas = document.createElement('canvas')
            document.body.appendChild(_canvas)
        }
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls!.dispose()
        this.renderer.instance!.dispose()

        if(this.debug.active)
            this.debug.ui!.destroy()
    }
}
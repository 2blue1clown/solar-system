import EventEmitter from './EventEmitter.ts'

export default class Sizes extends EventEmitter
{
    width: number
    height: number
    pixelRatio: number

    constructor()
    {
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight * 0.8
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () =>
        {
            this.width = window.innerWidth
            this.height = window.innerHeight * 0.8
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}
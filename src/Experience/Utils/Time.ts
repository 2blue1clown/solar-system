import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter
{
    start: number
    current: number
    elapsed: number
    delta: number
    elapsedSeconds: number
    
    constructor()
    {
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        this.elapsedSeconds = this.elapsed / 1000

        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }
}

import Experience from './Experience/Experience.ts'

declare global { 
    interface Window { experience: Experience;}
}

const experience = new Experience(document.querySelector('canvas.webgl') as HTMLCanvasElement)
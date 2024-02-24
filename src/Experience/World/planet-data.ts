// source https://web.njit.edu/~gary/202/Lecture7.html

export enum Planet {
    Sun = 'sun',
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


export interface PlanetData {
    /**
     * Color in hex
     */
    color: number,
    /**
     * Distance from the sun in AU
     */
    distance: number,
    /**
     * Radius of the planet in km
     */
    radius: number,
}

export const PLANET_DATA = {
    [Planet.Sun]:{
        color: 0xFFFF00,
        distance: 0,
        radius: 696000

    },

    [Planet.Mercury]:{
        color: 0xCC5500,
        distance: 0.39,
        radius: 2439,
    },
    [Planet.Venus]:{
        color: 0xc0c0c0,
        distance: 0.72,
        radius: 6052
    },
    [Planet.Earth]:{
        color: 0x0000FF,
        distance: 1,
        radius: 6387
    },
    [Planet.Mars]:{
        color: 0xFF0000,
        distance: 1.5,
        radius: 3393
    },
    [Planet.Jupiter]:{
        color: 0xFFD700,
        distance: 5.2,
        radius: 71398
    },
    [Planet.Saturn]:{
        color: 0xFFA500,
        distance: 9.5,
        radius: 60000
    },
    [Planet.Uranus]:{
        color: 0x00FFFF,
        distance: 19.2,
        radius: 25559
    },
    [Planet.Neptune]:{
        color: 0x0000FF,
        distance: 30.1,
        radius: 24800
    },
    [Planet.Pluto]:{
        color: 0x0000FF,
        distance: 39.5,
        radius: 1140
    }
}


//do the same but to another object instead
export const SCALED_PLANET_DATA = Object.keys(PLANET_DATA).reduce((acc, planet) => {
    acc[planet] = {
        ...PLANET_DATA[planet as Planet],
        radius: Math.log(PLANET_DATA[planet as Planet].radius) * 0.01
    }
    return acc
}, {} as {[key in Planet]: PlanetData})
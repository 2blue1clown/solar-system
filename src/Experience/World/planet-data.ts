// Size and distance source https://web.njit.edu/~gary/202/Lecture7.html
// Orbital information source https://www.windows2universe.org/our_solar_system/planets_orbits_table.html
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
    semiMajorAxis?: number,
    eccentricity?: number,
    inclinationOfOrbitToEcliptic?:number
    inclinationOfEquatorToOrbit?:number
    orbitalPeriod?:number
}

export const PLANET_DATA = {
    [Planet.Sun]:{
        color: 0xFFFF00,
        distance: 0,
        radius: 696000
    },

    [Planet.Mercury]:{
        color: 0xc0c0c0,
        distance: 0.39,
        radius: 2439,
        semiMajorAxis: 0.3871,
        eccentricity: 0.206,
        inclinationOfOrbitToEcliptic:degToRad( 7.0),
        inclinationOfEquatorToOrbit:degToRad( 0),
        orbitalPeriod: 0.2408
    },
    [Planet.Venus]:{
        color: 0xCC5500,
        distance: 0.72,
        radius: 6052,
        semiMajorAxis: 0.7233,
        eccentricity: 0.007,
        inclinationOfOrbitToEcliptic:degToRad( 3.39),
        inclinationOfEquatorToOrbit:degToRad( 177.3),
        orbitalPeriod: 0.6152
    },
    [Planet.Earth]:{
        color: 0x0000FF,
        distance: 1,
        radius: 6387,
        semiMajorAxis: 1,
        eccentricity: 0.017,
        inclinationOfOrbitToEcliptic:degToRad( 0),
        inclinationOfEquatorToOrbit:degToRad( 23.4),
        orbitalPeriod:1
    },
    [Planet.Mars]:{
        color: 0xFF0000,
        distance: 1.5,
        radius: 3393,
        semiMajorAxis: 1.5273,
        eccentricity: 0.093,
        inclinationOfOrbitToEcliptic:degToRad( 1.85),
        inclinationOfEquatorToOrbit:degToRad( 25.2),
        orbitalPeriod:1.8809
    },
    [Planet.Jupiter]:{
        color: 0xFFD700,
        distance: 5.2,
        radius: 71398,
        semiMajorAxis: 5.2028,
        eccentricity: 0.048,
        inclinationOfOrbitToEcliptic:degToRad( 1.31),
        inclinationOfEquatorToOrbit:degToRad( 3.1),
        orbitalPeriod:11.862
    },
    [Planet.Saturn]:{
        color: 0xFFA500,
        distance: 9.5,
        radius: 60000,
        semiMajorAxis: 9.5388,
        eccentricity: 0.056,
        inclinationOfOrbitToEcliptic:degToRad( 2.49),
        inclinationOfEquatorToOrbit:degToRad( 26.7),
        orbitalPeriod:29.458
    },
    [Planet.Uranus]:{
        color: 0x00FFFF,
        distance: 19.2,
        radius: 25559,
        semiMajorAxis: 19.1914,
        eccentricity: 0.046,
        inclinationOfOrbitToEcliptic:degToRad( 0.77),
        inclinationOfEquatorToOrbit:degToRad( 97.9),
        orbitalPeriod:84.01
    },
    [Planet.Neptune]:{
        color: 0x0000FF,
        distance: 30.1,
        radius: 24800,
        semiMajorAxis: 30.0611,
        eccentricity: 0.010,
        inclinationOfOrbitToEcliptic:degToRad( 1.77),
        inclinationOfEquatorToOrbit:degToRad( 29.6),
        orbitalPeriod:164.79
    },
    [Planet.Pluto]:{
        color: 0x0000FF,
        distance: 39.5,
        radius: 1140,
        semiMajorAxis: 39.5294,
        eccentricity: 0.248,
        inclinationOfOrbitToEcliptic:degToRad( 17.15),
        inclinationOfEquatorToOrbit:degToRad( 122.5),
        orbitalPeriod:248.54
    }
} as {[key in Planet]: PlanetData}


//do the same but to another object instead
export const SCALED_PLANET_DATA = Object.keys(PLANET_DATA).reduce((acc, planet) => {
    acc[planet] = {
        ...PLANET_DATA[planet as Planet],
        radius: Math.log(PLANET_DATA[planet as Planet].radius) * 0.01,
    }
    return acc
}, {} as {[key in Planet]: PlanetData})

function degToRad(degrees:number){
    return degrees * (Math.PI/180)
}   
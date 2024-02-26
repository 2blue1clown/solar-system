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

export interface ColorInfo  {hex: number
    weight: number}

export interface PlanetData {
    /**
     * Color in hex
     */
    colorWeights: ColorInfo[],
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
    orbitalPeriod?:number //in earth years
    rotationPeriod?:number //in earth days
    dwarf?:boolean
}

export const PLANET_DATA = {
    [Planet.Sun]:{
        distance: 0,
        radius: 696000
    },

    [Planet.Mercury]:{
        colorWeights: [{hex: 0xBFBEBD, weight: 0.99},{hex:0xF2f2f2,weight:0.01}],
        distance: 0.39,
        radius: 2439,
        semiMajorAxis: 0.3871,
        eccentricity: 0.206,
        inclinationOfOrbitToEcliptic:degToRad( 7.0),
        inclinationOfEquatorToOrbit:degToRad( 0),
        orbitalPeriod: 0.2408,
        rotationPeriod: 58.65
    },
    [Planet.Venus]:{
        colorWeights: [{hex:0xd9b391,weight:0.8},{hex:0xF2dac4,weight:0.1},{hex:0x88898c,weight:0.1}],
        distance: 0.72,
        radius: 6052,
        semiMajorAxis: 0.7233,
        eccentricity: 0.007,
        inclinationOfOrbitToEcliptic:degToRad( 3.39),
        inclinationOfEquatorToOrbit:degToRad( 177.3),
        orbitalPeriod: 0.6152,
        rotationPeriod: -243.01
    },
    [Planet.Earth]:{
        colorWeights: [{hex:0x426a8c,weight:0.85},{hex:0x00FF00,weight:0.15}],
        distance: 1,
        radius: 6387,
        semiMajorAxis: 1,
        eccentricity: 0.017,
        inclinationOfOrbitToEcliptic:degToRad( 0),
        inclinationOfEquatorToOrbit:degToRad( 23.4),
        orbitalPeriod:1,
        rotationPeriod: 0.997
    },
    [Planet.Mars]:{
        colorWeights:[{hex:0xbf6c5a,weight:0.9},{hex:0xf27a5e,weight:0.1}],
        distance: 1.5,
        radius: 3393,
        semiMajorAxis: 1.5273,
        eccentricity: 0.093,
        inclinationOfOrbitToEcliptic:degToRad( 1.85),
        inclinationOfEquatorToOrbit:degToRad( 25.2),
        orbitalPeriod:1.8809,
        rotationPeriod: 1.026
    },
    [Planet.Jupiter]:{
        colorWeights: [{hex: 0xFFA500, weight: 0.05},{hex: 0xbfae99, weight: 0.9}],
        distance: 5.2,
        radius: 71398,
        semiMajorAxis: 5.2028,
        eccentricity: 0.048,
        inclinationOfOrbitToEcliptic:degToRad( 1.31),
        inclinationOfEquatorToOrbit:degToRad( 3.1),
        orbitalPeriod:11.862,
        rotationPeriod: 0.410
    },
    [Planet.Saturn]:{
        colorWeights: [{hex: 0xf2cd88, weight: 1}],
        distance: 9.5,
        radius: 60000,
        semiMajorAxis: 9.5388,
        eccentricity: 0.056,
        inclinationOfOrbitToEcliptic:degToRad( 2.49),
        inclinationOfEquatorToOrbit:degToRad( 26.7),
        orbitalPeriod:29.458,
        rotationPeriod: 0.426
    },
    [Planet.Uranus]:{
        colorWeights: [{hex: 0xcef2f2, weight: 1}],
        distance: 19.2,
        radius: 25559,
        semiMajorAxis: 19.1914,
        eccentricity: 0.046,
        inclinationOfOrbitToEcliptic:degToRad( 0.77),
        inclinationOfEquatorToOrbit:degToRad( 97.9),
        orbitalPeriod:84.01,
        rotationPeriod: -0.746
    },
    [Planet.Neptune]:{
        colorWeights: [{hex: 0x657ba6, weight: 1}],
        distance: 30.1,
        radius: 24800,
        semiMajorAxis: 30.0611,
        eccentricity: 0.010,
        inclinationOfOrbitToEcliptic:degToRad( 1.77),
        inclinationOfEquatorToOrbit:degToRad( 29.6),
        orbitalPeriod:164.79,
        rotationPeriod: 0.718
    },
    [Planet.Pluto]:{
        colorWeights: [{hex: 0x4d5d73, weight: 1}],
        distance: 39.5,
        radius: 1140,
        semiMajorAxis: 39.5294,
        eccentricity: 0.248,
        inclinationOfOrbitToEcliptic:degToRad( 17.15),
        inclinationOfEquatorToOrbit:degToRad( 122.5),
        orbitalPeriod:248.54,
        rotationPeriod: 6.4,
        dwarf:true
        
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
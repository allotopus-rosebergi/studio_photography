import moon_long_exposure from "../assets/img/photography/moon_long_exposure.webp"
import drone from "../assets/img/photography/drone.webp"
import pertholz from "../assets/img/photography/pertholz.webp"

export const navLinks = [
    {
        id: '0',
        title: 'STÄRKEN',
        slug: 'skills'
    },
    {
        id: '1',
        title: 'PROJEKTE',
        slug: 'projects'
    },
    {
        id: '2',
        title: 'KONTAKT',
        slug: 'contact',
    }
]
export const skills = [
    {
        id: '0',
        number: '01',
        title: 'Grafikdesign',
        description: 'Ich entwerfe Logos, Grafiken und Layouts für Printprodukte wie Poster oder Verpackungen und sorge für ein stimmiges und professionelles Erscheinungsbild.'
    },
    {
        id: '1',
        number: '02',
        title: 'Web und Frontend',
        description: 'Ich entwickle individuelle Websites und App-Oberflächen, verfeinere sie mit Animationen und optimiere sie für Suchmaschinen, damit Design und Sichtbarkeit Hand in Hand gehen.'
    },
    {
        id: '2',
        number: '03',
        title: 'Fotografie',
        description: 'Ich erstelle und bearbeite Fotos, um Projekten einen persönlichen, einzigartigen Touch zu verleihen.'
    }
]

export const cameras = [
    {
        id: 'sony-a6400',
        brand: 'Sony',
        model: 'Alpha 6400',
        mount: 'Sony E',
        sensor: {
            type: 'CMOS',
            format: 'APS-C',
            size_mm: { width: 23.5, height: 15.6 },
            megapixels_effective: 24.2
        },
        iso_range: {
            native_min: 100,
            native_max: 32000,
            expanded_max: 102400
        },
        shutter_speed: {
            min_seconds: 30,
            max_seconds: 1 / 4000
        },
        crop_factor: 1.5,
        notes: 'Mirrorless APS-C camera with 425 phase-detect AF points and 4K video.'
    }
];


export const lenses = [
    {
        id: 'sony-e-70-350-g-oss',
        brand: 'Sony',
        model: 'E 70–350mm G', //old modelname: E 70–350mm F4.5–6.3 G OSS
        mount: 'Sony E (APS-C)',
        focal_length_mm: { min: 70, max: 350 },
        focal_length_equiv_mm: { min: 105, max: 525 },
        max_aperture: { min_f: 4.5, max_f: 6.3 },
        min_aperture: 32,
        stabilization: true,
        min_focus_distance_m: { min: 1.1, max: 1.5 },
        max_magnification: 0.23,
        filter_thread_mm: 67,
        weight_g: 625,
        notes: 'Telephoto zoom G lens for APS-C with optical image stabilization.'
    }
];


export const photos = [
    {
        id: 'moon-long-exposure',
        src: moon_long_exposure,

        title: 'Moon long exposure',
        alt: 'Moon long exposure',
        datetime: "23.12.2025 | 13:02",

        cameraId: 'sony-a6400',
        lensId: 'sony-e-70-350-g-oss',

        iso: 100,
        shutter: '1/4',
        fstop: 8,

        focal_length_mm: 350,
        location: 'Bad Großpertholz, Österreich',
        tags: ['highlight', 'night', 'long exposure']
    },
    {
        id: 'drone',
        src: drone,

        title: 'Drone',
        alt: 'Drone',
        datetime: "23.12.2025 | 13:02",

        cameraId: 'sony-a6400',
        lensId: 'sony-e-70-350-g-oss',

        iso: 100,
        shutter: '1/4',
        fstop: 8,

        focal_length_mm: 350,
        location: 'Bad Großpertholz, Österreich',
        tags: ['highlight']
    },
    {
        id: 'pertholz',
        src: pertholz,

        title: 'pertholz',
        alt: 'pertholz',
        datetime: "23.12.2025 | 13:02",

        cameraId: 'sony-a6400',
        lensId: 'sony-e-70-350-g-oss',

        iso: 100,
        shutter: '1/4',
        fstop: 8,

        focal_length_mm: 350,
        location: 'Bad Großpertholz, Österreich',
        tags: ['highlight', 'night']
    },
    {
        id: 'moon-long-exposure-2',
        src: moon_long_exposure,

        title: 'Moon long exposure',
        alt: 'Moon long exposure',
        datetime: "23.12.2025 | 13:02",

        cameraId: 'sony-a6400',
        lensId: 'sony-e-70-350-g-oss',

        iso: 100,
        shutter: '1/4',
        fstop: 8,

        focal_length_mm: 350,
        location: 'Bad Großpertholz, Österreich',
        tags: ['highlight', 'night', 'long exposure']
    },
];

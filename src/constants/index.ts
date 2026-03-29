import type {Camera, Lens, NavLink} from "../types";

export const navLinks: NavLink[] = [
    {
        id: '0',
        title: 'WILDLIFE',
        slug: 'collection-wildlife-photography'
    },
    {
        id: '1',
        title: 'NIGHT',
        slug: 'collection-night-photography'
    },
    {
        id: '2',
        title: 'MACRO',
        slug: 'collection-macro-photography',
    },
    {
        id: '3',
        title: 'ABOUT ME',
        slug: 'about-me',
    }
]

export const cameras: Camera[] = [
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


export const lenses : Lens[] = [
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

export type NavLink = {
    id: string | number;
    slug: string;
    title: string;
}

export type Photo = {
    cameraId: string | number;
    lensId: string | number;
    id: string;
    src: string;
    alt?: string;
    tags?: string[];
    title: string;
    datetime: string;
    iso: string | number;
    fstop: string | number;
    focal_length_mm: string | number;
    shutter: string;
    location: string;
}

export type GalleryItemProps = {
    photo: Photo;
    className?: string;
}

export type GalleryProps = {
    title: string;
    tag: string;
}

type SensorSize = {
    width: number;
    height: number;
}

type Sensor = {
    type: string;
    format: string;
    size_mm: SensorSize;
    megapixels_effective: number;
}

type IsoRange = {
    native_min: number;
    native_max: number;
    expanded_max: number;
}

type ShutterSpeed = {
    min_seconds: number;
    max_seconds: number;
}

export type Camera = {
    id: string;
    brand: string;
    model: string;
    mount: string;
    sensor: Sensor;
    iso_range: IsoRange;
    shutter_speed: ShutterSpeed;
    crop_factor: number;
    notes?: string;
}

type FocalLength = {
    min: number;
    max: number;
}

type Aperture = {
    min_f: number;
    max_f: number;
}

type FocusDistance = {
    min: number;
    max: number;
}

export type Lens = {
    id: string;
    brand: string;
    model: string;
    mount: string;
    focal_length_mm: FocalLength;
    focal_length_equiv_mm: FocalLength;
    max_aperture: Aperture;
    min_aperture: number;
    stabilization: boolean;
    min_focus_distance_m: FocusDistance;
    max_magnification: number;
    filter_thread_mm: number;
    weight_g: number;
    notes?: string;
}

export type Collection = {
    id: string;
    name: string;
    description: string;
    photoIds: string[];
}
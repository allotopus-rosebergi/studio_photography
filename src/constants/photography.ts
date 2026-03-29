import type {Collection, Photo} from "../types";
import moon_long_exposure from "../assets/img/photography/moon_long_exposure.webp";
import kleiber from "../assets/img/photography/side_down.webp";
import specht from "../assets/img/photography/male_side.webp";
import sperber from "../assets/img/photography/sperber.webp";
import atomium from "../assets/img/photography/atomium.webp";
import europa_parlament from "../assets/img/photography/europa_parlament.webp";
//import megageile_burg from "../assets/img/photography/megageile_burg.webp";
import cilnia_humeralise from "../assets/img/photography/cilnia_humeralis.webp";

export const photos: Photo[] = [
    {
        id: "cilnia-humeralise",
        src: cilnia_humeralise,
        title: "Northern Sparrowhawk",
        alt: "Northern sparrowhawk soaring with wings spread",
        datetime: "2025-12-23 | 14:30",
        cameraId: "sony-a6400",
        lensId: "sony-e-70-350-g-oss",
        iso: 200,
        shutter: "1/1600",
        fstop: 5.6,
        focal_length_mm: 350,
        location: "Bad Großpertholz, Lower Austria",
        tags: ["highlight", "wildlife", "bird", "action"],
    },
    {
        id: "kleiber-nuthatch",
        src: kleiber,
        title: "Eurasian Nuthatch",
        alt: "Eurasian nuthatch climbing down tree trunk headfirst",
        datetime: "2025-12-23 | 13:15",
        cameraId: "sony-a6400",
        lensId: "sony-e-70-350-g-oss",
        iso: 800,
        shutter: "1/800",
        fstop: 6.3,
        focal_length_mm: 300,
        location: "Bad Großpertholz, Lower Austria",
        tags: ["highlight", "wildlife", "bird"],
    },
    {
        id: "sperber-sparrowhawk",
        src: sperber,
        title: "Northern Sparrowhawk",
        alt: "Northern sparrowhawk soaring with wings spread",
        datetime: "2025-12-23 | 14:30",
        cameraId: "sony-a6400",
        lensId: "sony-e-70-350-g-oss",
        iso: 200,
        shutter: "1/1600",
        fstop: 5.6,
        focal_length_mm: 350,
        location: "Bad Großpertholz, Lower Austria",
        tags: ["highlight", "wildlife", "bird", "action"],
    },
    {
        id: "pertholz-woodpecker",
        src: specht,
        title: "Great Spotted Woodpecker",
        alt: "Great spotted woodpecker perched on tree in Bad Großpertholz",
        datetime: "2025-12-23 | 13:02",
        cameraId: "sony-a6400",
        lensId: "sony-e-70-350-g-oss",
        iso: 400,
        shutter: "1/1000",
        fstop: 6.3,
        focal_length_mm: 350,
        location: "Bad Großpertholz, Lower Austria",
        tags: ["highlight", "wildlife", "bird"],
    },
    {
        id: "atomium",
        src: atomium,
        title: "Northern Sparrowhawk",
        alt: "Northern sparrowhawk soaring with wings spread",
        datetime: "2025-12-23 | 14:30",
        cameraId: "sony-a6400",
        lensId: "sony-e-70-350-g-oss",
        iso: 200,
        shutter: "1/1600",
        fstop: 5.6,
        focal_length_mm: 350,
        location: "Bad Großpertholz, Lower Austria",
        tags: ["highlight", "wildlife", "bird", "action"],
    },
    {
        id: "moon-long-exposure",
        src: moon_long_exposure,
        title: "Full Moon Long Exposure",
        alt: "Detailed full moon with craters over dark forest silhouette",
        datetime: "2025-12-23 | 21:45",
        cameraId: "sony-a6400",
        lensId: "sony-e-70-350-g-oss",
        iso: 100,
        shutter: "2",
        fstop: 8,
        focal_length_mm: 350,
        location: "Bad Großpertholz, Lower Austria",
        tags: ["highlight", "night", "long exposure", "landscape"],
    },
    {
        id: "europa-parlament",
        src: europa_parlament,
        title: "Northern Sparrowhawk",
        alt: "Northern sparrowhawk soaring with wings spread",
        datetime: "2025-12-23 | 14:30",
        cameraId: "sony-a6400",
        lensId: "sony-e-70-350-g-oss",
        iso: 200,
        shutter: "1/1600",
        fstop: 5.6,
        focal_length_mm: 350,
        location: "Bad Großpertholz, Lower Austria",
        tags: ["highlight", "wildlife", "bird", "action"],
    },
]

export const collections: Collection[] = [
    {
        id: "wildlife_collections",
        name: "Wildlife Photography",
        description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        photoIds: ["kleiber-nuthatch", "sperber-sparrowhawk"],
    },

    {
        id: "night_collection",
        name: "Night Photography",
        description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusat et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        photoIds: ["moon-long-exposure"],
    },
];
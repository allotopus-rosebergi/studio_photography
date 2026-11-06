import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GalleryItem from "./GalleryItem.tsx";
import type {GalleryProps, Photo} from "../types";
import {photos} from "../constants/photography.ts";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Gallery({ tag }: GalleryProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const taggedPhotos = (photos as Photo[]).filter((img: Photo) =>
        img.tags?.includes(tag)
    );
    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>(".gallery-item");

        const sorted = [...items].sort((a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top
        );

        gsap.set(sorted, { opacity: 0, scale: 0.92, y: 32 }); //Wüst mi vaoschn, warum gehts mit "y: 60, opacity: 0, scale: 0.96" ned....

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery-wrapper",
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        tl.to(sorted, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
        });
    }, []);

    return (
        <div className="grid-medium-width m-auto">
            <div
                ref={wrapperRef}
                className="gallery-wrapper columns-1 sm:columns-2 sm:gap-6 gap-4 my-16 [column-fill:_balance]"
            >
                {taggedPhotos.map((photo: Photo) => (
                    <GalleryItem
                        photo={photo}
                        key={photo.id}
                        className="gallery-item"
                    />
                ))}
            </div>
        </div>
    );
}

export default Gallery;
import { useMemo, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
import GalleryItem from "./GalleryItem.tsx";
import type { Collection, Photo } from "../types";
import { photos } from "../constants/photography.ts";



// gsap.registerPlugin(ScrollTrigger, useGSAP);

export type GalleryProps = {
    collection?: Collection | null;
};

const photosById = new Map((photos as Photo[]).map((photo) => [photo.id, photo]));

function Gallery({ collection }: GalleryProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const collectionPhotos = useMemo(
        () =>
            (collection?.photoIds ?? [])
                .map((id) => photosById.get(id))
                .filter((photo): photo is Photo => photo !== undefined),
        [collection]
    );

    // useGSAP(
    //     () => {
    //         if (!collectionPhotos.length || !wrapperRef.current) return;
    //
    //         const items = gsap.utils.toArray<HTMLElement>(".gallery-item", wrapperRef.current);
    //
    //         const sorted = [...items].sort(
    //             (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
    //         );
    //
    //         gsap.set(sorted, { opacity: 0, scale: 0.92, y: 32 });
    //
    //         const tl = gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: wrapperRef.current,
    //                 start: "top 95%",
    //                 end: "bottom bottom",
    //                 scrub: 1,
    //             },
    //         });
    //
    //         tl.to(sorted, {
    //             y: 0,
    //             opacity: 1,
    //             scale: 1,
    //             duration: 0.6,
    //             ease: "power3.out",
    //             stagger: 0.15,
    //         });
    //     },
    //     { dependencies: [collectionPhotos], scope: wrapperRef, revertOnUpdate: true }
    // );

    if (!collectionPhotos.length) {
        return (
            <div className="m-auto py-12 text-center opacity-60">
                <p>This collection is empty.</p>
            </div>
        );
    }

    return (
        <div className="m-auto">
            <div
                ref={wrapperRef}
                className="gallery-wrapper columns-1 sm:columns-2 sm:gap-6 gap-4 [column-fill:_balance]"
            >
                {collectionPhotos.map((photo) => (
                    <GalleryItem photo={photo} key={photo.id} className="gallery-item" />
                ))}
            </div>
        </div>
    );
}

export default Gallery;
import { useRef } from "react";
import gsap from "gsap";
import { cameras, lenses } from "../constants";
import type { GalleryItemProps, Camera, Lens, Collection } from "../types";
import { collections } from "../constants/photography";
import CustomButton from "./CustomButton.tsx";
import {useGSAP} from "@gsap/react";

const findPhotoCollections = (photoId: string): Collection[] => {
    return collections.filter((collection) => collection.photoIds.includes(photoId));
};

function GalleryItem({ photo, className }: GalleryItemProps) {
    const camera = cameras.find((c: Camera) => c.id === photo.cameraId);
    const lens = lenses.find((l: Lens) => l.id === photo.lensId);
    const photoCollections = findPhotoCollections(photo.id);

    const cardRef = useRef<HTMLDivElement>(null);
    const boundsRef = useRef<DOMRect | null>(null);

    useGSAP(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseEnter = () => {
            boundsRef.current = card.getBoundingClientRect();
            gsap.to(card, {
                scale: 1.04,
                duration: 0.8,
                ease: "power2.out",
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            const bounds = boundsRef.current;
            if (!bounds) return;

            const relX = (e.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
            const relY = (e.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);

            const maxFollow = 18;

            gsap.to(card, {
                x: relX * maxFollow,
                y: relY * maxFollow,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 23)",
            });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`${className ?? ""} mb-6 w-full relative`}
            style={{ willChange: "transform" }}
        >
            <img
                src={photo.src}
                alt={photo.alt || photo.title}
                className="w-full object-cover"
                loading="lazy"
            />

            <div className="gallery-item-vignette absolute opacity-0 hover:opacity-100 inset-0 p-4 sm:p-6 flex flex-col justify-between text-sm">
                <div className="flex flex-col w-full justify-between gap-4">
                    <div>
                        <p className="besley-bold text-xl">{photo.title}</p>
                    </div>
                    <div className="text-left">
                        <p><span className="font-extrabold">LENS</span> <span className="text-gray">{lens!.brand + " " + lens!.model}</span></p>
                        <p><span className="font-extrabold">BODY</span> <span className="text-gray">{camera!.brand + " " + camera!.model}</span></p>
                    </div>
                </div>

                <div className="w-full border-1 h-full my-2 border-white hidden"></div>

                <div className="flex flex-row w-full justify-between gap-4 items-end">
                    <div className="text-left text-gray">
                        {photoCollections.length > 0
                            ? photoCollections.map(c =>
                                <div key={c.id}>
                                    <p className="mb-2">This photo is part of the <br /><span className="text-semibold besley-bold text-light">{c.name}</span> collection.</p>
                                    <CustomButton size="small" addon="arrow">Visit Collection</CustomButton>
                                </div>)
                            : <p>This photo is not part of any other collection.</p>
                        }
                    </div>
                    <div className="text-right">
                        <p><span className="font-extrabold">ISO</span> <span className="text-gray">{photo.iso}</span></p>
                        <p><span className="font-extrabold">F-STOP</span> <span className="text-gray">{photo.fstop}</span></p>
                        <p><span className="font-extrabold">SHUTTER</span> <span className="text-gray">{photo.shutter}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryItem;
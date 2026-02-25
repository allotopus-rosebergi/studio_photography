import { cameras, lenses } from "../constants";
import type {JSX} from "react";

interface Camera {
    id: string | number;
    brand: string;
    model: string;
}

interface Lens {
    id: string | number;
    brand: string;
    model: string;
}

interface Photo {
    cameraId: string | number;
    lensId: string | number;
    src: string;
    alt?: string;
    title: string;
    datetime: string;
    iso: string | number;
    fstop: string | number;
    shutter: string;
}

interface GalleryItemProps {
    photo: Photo;
}

function GalleryItem({ photo }: GalleryItemProps): JSX.Element {
    const camera = cameras.find((c: Camera) => c.id === photo.cameraId);
    const lens = lenses.find((l: Lens) => l.id === photo.lensId);

    return (
        <div
            className="project
        p-0.5 mb-6 sm:mb-14 w-full
        bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 hover:bg-gradient-to-br hover:from-zinc-800 hover:via-zinc-700 hover:to-zinc-600
        transition-transform duration-200 hover:scale-120"

        >
            <div className="relative ">
                <img
                    src={photo.src}
                    alt={photo.alt || photo.title}
                    className="w-full object-cover break-inside-avoid hover:scale-150"
                    loading="lazy"
                />

                <div
                    className="
                absolute opacity-0 hover:opacity-100 inset-0 p-4 sm:p-6
                flex flex-col justify-between
                "
                >
                    <p>{photo.datetime}</p>

                    <div className="w-full border-2 h-full my-4 sm:my-6 hidden border-white"></div>

                    <div className="flex flex-row w-full justify-between gap-4">
                        <div>
                            <p>ISO {photo.iso}</p>
                            <p>
                                F{photo.fstop}, {photo.shutter}
                            </p>
                        </div>
                        <div className="text-right">
                            <p>{camera!.brand + " " + camera!.model}</p>
                            <p>{lens!.brand + " " + lens!.model}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryItem;

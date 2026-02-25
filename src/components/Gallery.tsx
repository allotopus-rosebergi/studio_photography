import GalleryItem from './GalleryItem';
import { photos } from '../constants';
import { gsap } from "gsap";
import {type JSX, useEffect} from "react";



interface Photo {
    id: string | number;
    tags?: string[];
    src: string;
    alt?: string;
    title: string;
    datetime: string;
    iso: string | number;
    fstop: string | number;
    shutter: string;
    cameraId: string | number;
    lensId: string | number;
}

interface GalleryProps {
    title: string;
    tag: string;
}

function Gallery({tag}: GalleryProps): JSX.Element {
    const taggedPhotos = (photos as Photo[]).filter((img: Photo) =>
        img.tags?.includes(tag)
    );

    useEffect(() => {
        gsap.fromTo(".project",
            { y: 10, opacity: 0.5, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 2,
                stagger: 0.2,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: ".projectWrapper",
                    start: "top 90%",
                }
            }
        );
    }, []);

    return (
        <div className="sm:w-[80%] w-full m-auto projectWrapper">
            {/*<h2>{title}</h2>*/}
            <div className="columns-1 sm:columns-2 sm:gap-16 gap-4 my-16 [column-fill:_balance] project">
                {taggedPhotos.map((photo: Photo) => (
                    <GalleryItem
                        photo={photo}
                        key={photo.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default Gallery;

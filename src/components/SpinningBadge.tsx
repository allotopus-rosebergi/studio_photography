import { useEffect, useRef } from "react";
import calendar_badge_bg from "@/assets/badge/photo_calendar_blob.webp";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type SpinningBadgeProps = {
    img: string;
    link: string;
    className?: string;
};

const RADIUS = 150;
const STRENGTH = 0.15;

function SpinningBadge({ img, link, className }: SpinningBadgeProps) {
    const badgeRef = useRef<HTMLAnchorElement>(null);
    const magnetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const badge = badgeRef.current;
        const magnet = magnetRef.current;
        if (!badge || !magnet) return;

        let frame = 0;
        const reset = () => (magnet.style.translate = "0px 0px");

        const onMove = (e: MouseEvent) => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const rect = badge.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);

                if (Math.hypot(dx, dy) < RADIUS) {
                    magnet.style.translate = `${dx * STRENGTH}px ${dy * STRENGTH}px`;
                } else {
                    reset();
                }
            });
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", reset);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", reset);
        };
    }, []);

    return (
        <NavLink
            ref={badgeRef}
            className={cn(className, "group z-20 block size-[200px] md:right-12 cursor-pointer")}
            to={link}
        >
            <div
                ref={magnetRef}
                aria-hidden
                className="absolute inset-0 transition-[translate,scale] duration-300 ease-out group-hover:scale-105"
            >
                <div
                    className="size-full animate-[spin_25s_linear_infinite] bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${calendar_badge_bg})` }}
                />
            </div>

            <img
                src={img}
                className="relative z-10 w-full p-4 pointer-events-none"
                alt="Photo Calendar 2027 Marius Lassl"
            />

            <svg
                viewBox="0 0 260 260"
                className="pointer-events-none absolute -inset-[30px] z-20 size-[260px]"
                aria-hidden="true"
            >
                <defs>
                    <path
                        id="badge-text-path"
                        d="M 130,22 A 128,108 0 0,0 130,238 A 108,108 0 0,0 130,22"
                    />
                </defs>
                <text className="fill-[#49382c] font-staatliches text-[15px] uppercase z-30" letterSpacing="1">
                    <textPath href="#badge-text-path" startOffset="25%" className="hover:underline">
                        MORE INFO
                    </textPath>
                </text>
            </svg>
        </NavLink>
    );
}

export default SpinningBadge;
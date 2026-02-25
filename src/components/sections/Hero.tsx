'use client';
import { motion } from 'framer-motion';
import { type JSX, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./Navigation.tsx"
import AnimatedButton from "../custom/AnimatedButton.tsx";

gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger);

function Hero(): JSX.Element {
    const [, setActive] = useState<string>("");
    const splitRef = useRef<InstanceType<typeof SplitText> | null>(null);

    useEffect(() => {
        document.fonts.ready.then((): void => {
            const split = new SplitText(".hero_text", {
                type: "lines",
                mask: "lines",
                linesClass: "lineChild"
            });

            splitRef.current = split;

            const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

            tl.fromTo(split.lines,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, delay:0.1},
            );

            tl.fromTo(".hero_info",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, delay:0.2},
            );

            tl.fromTo(".hero_button",
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay:0.5,
                    onComplete: (): void => { gsap.set(".hero_button", { clearProps: "transform" }); }
                },
                "-=0.8"
            );
        });

        gsap.fromTo(".testRef",
            {y: 0},
            {y: 250,
            ease:"none",
            scrollTrigger: {
                trigger: ".testRef",
                start: "top center",
                end: "bottom top",
                scrub: true,
                //markers: true,
            },
        });

        return (): void => {
            splitRef.current?.revert();
        };
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "-100%" }}
                transition={{
                    duration: 1.2,
                    ease: [0.5, 0, 0.25, 1],
                }}
                className="absolute bottom-0 left-0 w-1/2 h-full bg-dark z-10"
            />

            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                    duration: 1.2,
                    ease: [0.5, 0, 0.25, 1],
                    delay: 0.1,                  // tiny offset so they don’t feel robotic
                }}
                className="absolute top-0 right-0 w-1/2 h-full bg-dark z-10"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1.2,
                    duration: 0.6,
                    ease: 'easeOut',
                }}
                className="relative z-10"
            >
                <div>
                    <Navigation alignment={"sm:justify-end"}/>
                    <div className="flex flex-col lg:flex-row min-h-screen w-full gap-16 lg:gap-0 items-center">
                        <div className="flex-1 flex flex-col px-6 sm:px-16 w-full text-left">
                            <p className="hero_text text-light mono w-full hidden">MARIUS LASSL</p>
                            <h1 className="hero_text text-4xl sm:text-9xl w-full py-4">PHOTO<br/>GRAPHY</h1>
                        </div>
                        <div className="testRef p-64 bg-dark rounded-full">
                        </div>
                        <div className="flex-1 flex px-6 sm:px-16 w-full text-justify justify-end">
                            <p className="hero_info w-full sm:w-1/2">
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labor
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center w-full absolute z-20 bottom-0 py-8">
                        <AnimatedButton
                            primary rounded
                            className="hero_button"
                            onClick={(): void => {
                                const kontaktSection = document.getElementById("contact");
                                if (kontaktSection) {
                                    kontaktSection.scrollIntoView({ behavior: "smooth" });
                                }
                                setActive("kontakt");
                            }}
                        >
                            Jetzt Kontakt aufnehmen
                        </AnimatedButton>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Hero;

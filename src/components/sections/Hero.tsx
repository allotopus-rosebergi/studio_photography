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

            tl.from(split.lines, {
                duration: 1,
                y: 100,
                autoAlpha: 0,
                stagger: 0.15
            });

            tl.fromTo(".hero_info",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6 },
            );

            tl.fromTo(".hero_button",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    onComplete: (): void => { gsap.set(".hero_button", { clearProps: "transform" }); }
                },
                "-=0.8"
            );
        });

        return (): void => {
            splitRef.current?.revert();
        };
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '-100%' }}
                transition={{
                    duration: 0.8,
                    ease: [0.83, 0, 0.17, 1],
                }}
                className="absolute bottom-0 left-0 w-full h-full bg-dark  z-10"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.5,
                    duration: 0.6,
                    ease: 'easeOut',
                }}
                className="relative z-10"
            >
                <div>
                    <Navigation alignment={"sm:justify-end"}/>
                    <div className="flex flex-col lg:flex-row min-h-screen w-full gap-16 lg:gap-0">
                        <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 w-full text-left bg-mist-700">
                            <p className="hero_text text-light mono w-full">MARIUS LASSL</p>
                            <h1 className="hero_text text-4xl sm:text-9xl w-full py-4">FOTOGRAFIE</h1>
                        </div>
                        <div className="flex-1 flex px-6 sm:px-16 w-full lg:w-1/2 text-justify  justify-center">
                            <p className="hero_info w-1/3 m-auto">
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

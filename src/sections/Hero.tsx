'use client';
// import { motion } from 'framer-motion';
import { useState, useRef } from "react";
import { gsap } from "gsap";

import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import moonImg from "../assets/img/moon.webp";
import CustomButton from "../components/CustomButton.tsx";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger);

function Hero(){
    const [, setActive] = useState<string>("");
    const splitRef = useRef<InstanceType<typeof SplitText> | null>(null);

    useGSAP(() => {
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
            {y: 300,
            ease:"none",
            scrollTrigger: {
                trigger: ".testRef",
                start: "center center",
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
            {/*<motion.div
                initial={{ y: "100%" }}
                animate={{ y: "-100%" }}
                transition={{
                    duration: 1.1,
                    ease: [0.5, 0, 0.25, 1],
                }}
                className="absolute bottom-0 left-0 w-1/2 h-full bg-dark z-10"
            />

            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                    duration: 1.1,
                    ease: [0.5, 0, 0.25, 1],
                    delay: 0.1,
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
            >*/}
                <div>
                    <div className="flex flex-col lg:flex-row min-h-screen w-full gap-6 lg:gap-0 items-center">
                        <div className="flex-1 flex flex-col w-full text-left z-20">
                            <h1 className="hero_text text-4xl sm:text-9xl w-full py-4">Nature Didn't Pose. <br/> I Made It Work.</h1>
                        </div>

                        <div className="testRef pointer-events-none absolute inset-0 flex items-center justify-center z-10">
                            {/*<div className="p-48 bg-dark-secondary rounded-full" />*/}
                            <img src={moonImg} className="w-1/3" alt="closeup moon marius lassl"/>
                        </div>

                        <div className="flex-1 flex w-full text-justify justify-end z-20 text-gray">
                            <div  className="hero_info w-full sm:w-1/2 text-right pl-12">
                                <p className="text-light text-[1.05rem] font-medium">
                                    <span className="font-extrabold">Consetetur</span> pscing elitr
                                </p>
                                <p className="leading-5">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labor
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center grid-max-width w-full mx-auto absolute z-20 bottom-0 py-8">
                        <CustomButton
                            className="hero_button"
                            onClick={(): void => {
                                const kontaktSection = document.getElementById("contact");
                                if (kontaktSection) {
                                    kontaktSection.scrollIntoView({ behavior: "smooth" });
                                }
                                setActive("kontakt");
                            }}
                        >
                            Contact me.
                        </CustomButton>
                    </div>
                </div>
            {/*</motion.div>*/}
        </>
    );
}

export default Hero;

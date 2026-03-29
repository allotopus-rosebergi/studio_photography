import {type JSX, useEffect} from "react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";

function Contact(): JSX.Element {
    useEffect(() => {
        document.fonts.ready.then((): void => {
            const split = new SplitText(".contactTitle", {
                type: "lines",
                mask: "lines",
                linesClass: "lineChild"
            });

            gsap.from(split.lines, {
                duration: 1,
                y: 100,
                autoAlpha: 0,
                ease: "expo.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".contactTitle",
                    start: "top 95%",
                }
            });
        });
    }, []);

    return (
        <>
            <section id="contact" className="py-8">
                <div className={`padding`}>
                    <h2 className="text-center mb-6 contactTitle"> Let's create something worth remembering. </h2>
                    <p className="text-center mb-[4rem] text-gray contactTitle w-full sm:w-1/3 mx-auto"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna. </p>
                    <div className="w-full flex flex-col justify-center items-center gap-8 sm:gap-0 contactTitle">
                        <div className="flex flex-col sm:flex-row items-center sm:gap-4">
                            <span className="text-gray">Mobil:</span>
                            <div className="flex items-center flex-flow">
                                <span> +43 664 5859370</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:gap-4">
                            <span className="text-gray">Email:</span>
                            <div className="flex items-center flex-flow">
                                <span> office@marius-lassl.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;

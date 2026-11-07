import {Hero, Footer} from "@/sections";
import {Frame, Gallery} from "@/components";
import { AsciiReveal } from 'ascii-reveal';

import { collections } from "@/constants/photography.ts";

const featuredWork = collections.find((c) => c.id === "featured_work");

function Home() {
    return (
            <div className="rounded-default bg-white p-2 md:p-6 text-dark">
                <div className="p-2 md:p-6 grid-max-width flex flex-col gap-12 md:gap-32">
                    <AsciiReveal preset="blueprint">
                        <Hero/>
                    </AsciiReveal>

                    <Frame title="Featured Work" description="Carefully selected, original works. Birds, Architecture and... more birds. ">
                        <Gallery collection={featuredWork} />
                    </Frame>
                    <Footer/>
                </div>
            </div>
    )
}

export default Home;
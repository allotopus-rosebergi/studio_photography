import {Hero, Footer} from "@/sections";
import {Frame, Gallery} from "@/components";
import { AsciiReveal } from 'ascii-reveal';

import { collections } from "@/constants/photography.ts";

const featuredWork = collections.find((c) => c.id === "featured_work");

function Home() {
    return (
        <>
                    <AsciiReveal preset="blueprint">
                        <Hero/>
                    </AsciiReveal>

                    <Frame title="Featured Work" description="Carefully selected, original works. Birds, Architecture and... more birds. ">
                        <Gallery collection={featuredWork} />
                    </Frame>
                    <Footer/>
        </>
    )
}

export default Home;
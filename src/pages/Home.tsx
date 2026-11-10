import {Hero, Footer} from "@/sections";
import {Frame, Gallery} from "@/components";

import { collections } from "@/constants/photography.ts";

const featuredWork = collections.find((c) => c.id === "featured_work");

function Home() {
    return (
        <>
            <Hero/>

            <Frame title="Featured Work" description="Carefully selected, original works. Birds, Architecture and... more birds." className="mb-48 md:mb-32">
                <Gallery collection={featuredWork} />
            </Frame>

            <Footer/>
        </>
    )
}

export default Home;
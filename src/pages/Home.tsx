import {Contact, Footer, Hero} from "../sections";
import Gallery from "../components/Gallery.tsx";
import Navigation from "../sections/Navigation.tsx";


function Home() {
    return (
        <>
            <div className="grainy-background">
                <div className="relative z-0  mx-auto grid-background text-light outter-padding ">
                    <div className={`relative w-full min-h-screen`}>
                        <div className="grid-max-width mx-auto min-h-screen">
                            <Navigation/>
                            <Hero />
                        </div>
                    </div>

                    <div className="relative w-full z-30">
                        <div className="relative z-10 py-48 grid-max-width mx-auto">
                            <Gallery title="Highlights" tag="highlight"/>
                        </div>
                    </div>

                    <div className="relative w-full">
                        <div className="relative z-10 pb-48 grid-max-width mx-auto">
                            <Contact />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full">
                <div className="relative z-10 grid-max-width mx-auto">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Home;
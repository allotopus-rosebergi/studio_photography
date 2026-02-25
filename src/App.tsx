import { HashRouter, Routes, Route } from "react-router-dom";
import { Hero, Contact, Footer } from './components/sections';
import ScrollToHashElement from "./components/ScrollToHashElement";
import Gallery from "./components/Gallery";
import {type JSX} from "react";

function App(): JSX.Element {
    return (
        <HashRouter>
            <ScrollToHashElement/>
            <div className="relative z-0 ">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div className={`relative w-full min-h-screen bg-cover bg-fixed image-background`}>
                                    <div className="max-w-[2000px] mx-auto min-h-screen">
                                        <Hero />
                                    </div>
                                </div>

                                <div className="relative w-full bg-dark text-white min-h-[500px] z-30 section_below_hero">
                                    <div className="relative z-10 p-8 py-48 max-w-[2000px] mx-auto">
                                        <Gallery title="Highlights" tag="highlight"/>
                                    </div>
                                </div>

                                <div className="relative w-full bg-dark text-white min-h-[500px]">
                                    <div className="relative z-10 p-8 max-w-[2000px] mx-auto">
                                        <Contact />
                                    </div>
                                </div>

                                <Footer />
                            </>
                        }
                    />
                </Routes>


            </div>
        </HashRouter>
    );
}

export default App;

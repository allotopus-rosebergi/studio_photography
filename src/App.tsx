import paper_texture from "@/assets/img/white-paper-texture.webp";

import {HashRouter, Routes, Route} from "react-router-dom";
import {Home, CalendarPage} from "@/pages";
import {Navigation} from "@/sections";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Lenis from "lenis";

function App() {

    // Initialize Lenis
    const lenis = new Lenis({
        autoRaf: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
        console.log(e);
    });



    return (
        <HashRouter>
            <ScrollToHashElement/>

            <div id="smooth-wrapper">
                <div id="smooth-content" className="flex-1 min-h-dvh bg-dark p-2 md:py-8 md:px-8 relative">
                    <Navigation/>
                    <div className="rounded-default bg-white p-2 md:p-6 text-dark min-h-[85vh]">
                        <div className="p-2 md:p-6 grid-max-width flex flex-col gap-12 md:gap-32">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Home/>}
                                />
                                <Route
                                    path="/calendar-2027"
                                    element={<CalendarPage/>}
                                />
                            </Routes>
                        </div>
                        <img src={paper_texture} alt="paper texture"
                             className="pointer-events-none absolute top-0 w-full h-full mix-blend-multiply opacity-20 z-50"/>
                    </div>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;

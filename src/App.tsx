import paper_texture from "@/assets/img/white-paper-texture.webp";

import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToHashElement from "./components/ScrollToHashElement";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
//import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function App() {
    // useGSAP(() => {
    //     ScrollSmoother.create({
    //         wrapper: "#smooth-wrapper",
    //         content: "#smooth-content",
    //         smooth: 1.5,
    //     });
    // }, []);

    return (
        <HashRouter>
                <ScrollToHashElement />

                <div id="smooth-wrapper">
                    <div id="smooth-content" className="flex-1 min-h-dvh bg-dark p-2 sm:py-8 sm:px-8 relative">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home />}
                            />
                        </Routes>
                        <img src={paper_texture} alt="paper texture" className="pointer-events-none absolute top-0 w-full h-full mix-blend-multiply opacity-20 z-50"/>
                    </div>

                </div>
        </HashRouter>
    );
}

export default App;

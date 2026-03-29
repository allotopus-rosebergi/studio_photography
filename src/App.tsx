import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToHashElement from "./components/ScrollToHashElement";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function App(){
    useGSAP(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
        });
    }, []);

    return (
        <HashRouter>
            <ScrollToHashElement/>
                <Routes>
                    <Route
                        path="/"
                        element={
                        <div id="smooth-content">
                            <Home/>
                        </div>
                        }
                    />
                </Routes>
        </HashRouter>
    );
}

export default App;

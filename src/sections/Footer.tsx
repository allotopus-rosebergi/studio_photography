import { Phone, Mail, Globe} from "lucide-react";
import Grainient from '../components/Grainient';



function Footer(){
    return (
        <>
            <div className={`mx-auto w-full h-[18vw] text-light `}>
               <div className="w-full relative">
                   <Grainient
                       color1="#221816"
                       color2="#ff6a00"
                       color3="#fff995"
                       timeSpeed={0.9}
                       colorBalance={0.02}
                       warpStrength={1}
                       warpFrequency={5}
                       warpSpeed={2}
                       warpAmplitude={50}
                       blendAngle={0}
                       blendSoftness={0.05}
                       rotationAmount={500}
                       noiseScale={2}
                       grainAmount={0.1}
                       grainScale={1.9}
                       grainAnimated={false}
                       contrast={1.5}
                       gamma={1}
                       saturation={0.45}
                       centerX={0}
                       centerY={0}
                       zoom={0.9}
                   />
                   <div className="h-8 w-full bg-dark-gradient-light rounded-b-[80px] z-40 absolute -top-1"></div>
               </div>

                <div className="flex flex-col sm:flex-row justify-between items-end gap-6 w-full pb-6 outter-padding absolute z-0 bottom-0">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-3">
                            <Phone className="lg:w-5 text-light" />
                            <a href="tel:+436645859370">+43 664 5859370</a>
                        </div>
                        <div className="flex flex-row gap-3">
                            <Mail className="lg:w-5 text-light" />
                            <a href="mailto:office@marius-lassl.com"> office@marius-lassl.com </a>
                        </div>
                        <div className="flex flex-row gap-3">
                            <Globe className="lg:w-5 text-ligt pb-1" />
                            <a href="https://marius-lassl.com" target="_blank" className="hover:underline underline-offset-2 "> www.marius-lassl.com </a>
                        </div>
                    </div>
                    <div className="text-left sm:text-right flex flex-col gap-1">
                        <p>@2026 All rights reserved.</p>
                        <p>Photography Portfolio | Marius Lassl</p>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Footer;

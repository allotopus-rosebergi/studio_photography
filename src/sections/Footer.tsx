import {Frame} from '@/components'
import FooterImg from '@/assets/img/footer.webp'

function Footer(){
    return (
        <div className="relative">
            <div className="min-h-20 sm:min-h-[85vh] flex flex-col mb-12 sm:m-0 justify-between items-center">
                <h2 className="text-7xl leading-16 sm:text-9xl text-center sm:leading-28">Let`s create something worth remembering.</h2>

                <Frame className="w-full mb-4 mt-12">
                    <div className="w-full flex flex-row justify-between gap-1 sm:gap-2 sm:flex-row">
                        <a href="mailto:hello@marius-lassl.com" className="z-40">
                            <span className="staatliches-regular mr-2 text-lg">Mail</span>
                            <span className="hover:underline">hello@marius-lassl.com</span>
                        </a>
                        <a href="tel:+436645859370" className="z-40">
                            <span className="staatliches-regular mr-2 text-lg">Telephone</span>
                            <span className="hover:underline">+43 664 5859370</span>
                        </a>
                    </div>
                </Frame>

                <p className=" text-xs sm:text-white z-40"> © {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="w-full -mb-12 sm:m-0 static sm:absolute -bottom-12 z-30">
                <img src={FooterImg} className="w-[55vw] m-auto"/>
            </div>
        </div>
    );
}

export default Footer;

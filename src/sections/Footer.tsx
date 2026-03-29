import { Phone, Mail, Globe} from "lucide-react";

function Footer(){
    return (
        <>
            <div className={`mx-auto pb-6 pt-16 w-full text-light flex flex-col sm:flex-row justify-between items-end gap-6 min-h-[32vw] bg-mist-700 outter-padding`}>
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
        </>

    );
}

export default Footer;

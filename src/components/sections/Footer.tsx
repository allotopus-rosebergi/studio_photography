import { Phone, Mail } from "lucide-react";
import {type JSX} from "react";

function Footer(): JSX.Element {
    return (
        <div className={`bg-dark`}>
            <div className={`max-w-[2000px] padding-x mx-auto pb-6 pt-16 w-full text-light flex flex-col sm:flex-row justify-between gap-6`}>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-3">
                        <Phone className="lg:w-5 text-light" />
                        <span>+43 664 5859370</span>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Mail className="lg:w-5 text-ligt" />
                        <span> office@marius-lassl.com </span>
                    </div>
                </div>
                <div className="text-left sm:text-right flex flex-col gap-1">
                    <p>Portfolio | Marius Lassl</p>
                    <p>@2025 Alle Rechte vorbehalten</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;

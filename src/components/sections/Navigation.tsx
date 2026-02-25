import { HashLink } from 'react-router-hash-link';
import { RollingText } from '../custom/RollingText.tsx';
import {type JSX, useState} from "react";
import { navLinks } from "../../constants";
import { TextAlignEnd, X } from "lucide-react";

interface NavLink {
    id: string | number;
    slug: string;
    title: string;
}

interface NavigationProps {
    color?: string;
    alignment?: string;
}

function Navigation({ color = 'text-light', alignment = 'sm:justify-center' }: NavigationProps): JSX.Element {
    const [active, setActive] = useState<string>("");
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <>
            <nav
                className={`padding-x py-8 w-full top-0 z-20 transition-transform duration-300 relative lg:absolute flex flex-row justify-end ${alignment}`}
            >
                <ul className="list-none hidden sm:flex flex-row items-center gap-10">
                    {(navLinks as NavLink[]).map((link: NavLink) => (
                        <li
                            key={link.id}
                            className={`${color} cursor-pointer font-bold`}
                            onClick={() => setActive(link.slug)}
                        >
                            <HashLink smooth to={`/#${link.slug}`}><RollingText text={link.title}></RollingText></HashLink>
                        </li>
                    ))}
                </ul>

                <button
                    className="sm:hidden "
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Menü öffnen"
                >
                    <TextAlignEnd size={34}/>
                </button>
            </nav>

            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-dark shadow-lg z-40 transform transition-transform duration-300
                ${drawerOpen ? "translate-x-0 visible opacity-100" : "translate-x-full invisible opacity-0"}
              `}
            >
                <div className="w-full flex justify-between items-center p-6">
                    <span className="text-2xl font-bold text-gray"> Menü </span>
                    <button onClick={() => setDrawerOpen(false)} aria-label="Menü schließen">
                        <X size={32} className="text-gray" />
                    </button>
                </div>

                <ul className="flex flex-col gap-2 p-6">
                    {(navLinks as NavLink[]).map((link: NavLink) => (
                        <li key={link.id}>
                            <HashLink
                                smooth to={`/#${link.slug}`}
                                className={`${
                                    active === link.slug ? "text-light" : "text-light"
                                } block text-4xl text-left`}
                                onClick={() => {
                                    setActive(link.slug);
                                    setDrawerOpen(false);
                                }}
                            >
                                {link.title}
                            </HashLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Navigation;

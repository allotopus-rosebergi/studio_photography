import {NavLink} from "react-router-dom";
import {navLinks} from "@/constants";

const BROWN = "#6b4f2e";

function Navigation() {
    return (
        <nav className="flex items-end px-2 md:px-20">
            {navLinks.map((link, i) => {
                const style = (active: boolean) => ({zIndex: active ? 50 : navLinks.length - i});

                const tabContent = (active: boolean) => (
                    <>
                        <span
                            aria-hidden
                            className={`absolute inset-x-0 bottom-0 -z-10 origin-bottom rounded-t-xl transition-all duration-200 [transform:perspective(40px)_rotateX(8deg)] ${
                                active ? "-top-2 md:-top-4" : "top-0"
                            }`}
                            style={{
                                backgroundColor: active
                                    ? "#fff"
                                    : `color-mix(in srgb, ${BROWN} ${15 + i * 12}%, #fff)`,
                            }}
                        />
                                        <span
                                            className={`inline-block transition-transform duration-200 ${active ? "-translate-y-2" : ""}`}>
                            {link.title}
                        </span>
                    </>
                );

                return (
                    <NavLink
                        key={link.id}
                        to={link.slug}
                        end
                        className="relative isolate -mr-6 px-8 pb-0.5 pt-2 md:px-16 md:pb-2 md:pt-3 font-staatliches text-sm md:text-xl uppercase text-dark"
                        style={({isActive}) => style(isActive)}
                    >
                        {({isActive}) => tabContent(isActive)}
                    </NavLink>
                );
            })}
        </nav>
    );
}

export default Navigation;
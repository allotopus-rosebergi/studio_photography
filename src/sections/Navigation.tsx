import { NavLink } from "react-router-dom";
import { navLinks } from "@/constants";

const BROWN = "#6b4f2e";

function Navigation() {
    return (
        <nav className="flex items-end px-2 md:px-20">
            {navLinks.map((link, i) => {
                const tabClass = (active: boolean) => `relative isolate -mr-6 px-16 pb-2 font-staatliches text-xl uppercase text-dark transition-[padding] duration-200 ${active ? "pt-5" : "pt-3"}`;
                const style = (active: boolean) => ({ zIndex: active ? 50 : navLinks.length - i });
                const tabContent = (active: boolean) => (
                    <>
                        <span aria-hidden className="absolute inset-0 -z-10 origin-bottom rounded-t-xl transition-colors duration-200 [transform:perspective(40px)_rotateX(8deg)]" style={{ backgroundColor: active ? "#fff" : `color-mix(in srgb, ${BROWN} ${15 + i * 12}%, #fff)` }} />
                        {link.title}
                    </>
                );

                return (
                    <NavLink
                        key={link.id}
                        to={link.slug}
                        end
                        className={({ isActive }) => tabClass(isActive)}
                        style={({ isActive }) => style(isActive)}
                    >
                        {({ isActive }) => tabContent(isActive)}
                    </NavLink>
                );
            })}
        </nav>
    );
}

export default Navigation;
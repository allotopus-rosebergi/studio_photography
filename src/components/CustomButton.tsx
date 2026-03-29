import clsx from "clsx";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Theme = "dark" | "light";
type Addon = "plus" | "arrow";
type Size = "small" | "medium" | "large";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    theme?: Theme;
    addon?: Addon;
    size?: Size;
    className?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ children, theme = "dark", addon, size = "medium", className, ...rest }) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const circleRef = useRef<HTMLDivElement>(null);

        useGSAP(
            () => {
                const btn = buttonRef.current;
                const circle = circleRef.current;
                if (!btn || !circle) return;

                gsap.set(circle, { scale: 0 });

                const moveCircle = (e: MouseEvent) => {
                    const rect = btn.getBoundingClientRect();
                    gsap.set(circle, {
                        left: e.clientX - rect.left,
                        top: e.clientY - rect.top,
                    });
                };

                const scaleUp = () => gsap.to(circle, { scale: 1, duration: 0.6, ease: "power2.out" });
                const scaleDown = () => gsap.to(circle, { scale: 0, duration: 0.6, ease: "power2.in" });

                btn.addEventListener("mousemove", moveCircle);
                btn.addEventListener("mouseenter", scaleUp);
                btn.addEventListener("mouseleave", scaleDown);

                return () => {
                    btn.removeEventListener("mousemove", moveCircle);
                    btn.removeEventListener("mouseenter", scaleUp);
                    btn.removeEventListener("mouseleave", scaleDown);
                };
            },
            { scope: buttonRef }
        );

        const sizes = {
            small: "px-3 py-1 text-xs pr-5",
            medium: "px-6 py-2 text-base pr-8",
            large: "px-8 py-2.5 text-lg pr-10",
        };

        const themes = {
            dark: "border-light text-light hover:text-dark",
            light: "border-dark text-dark hover:text-light border-2 font-semibold",
        }

        const classes = clsx(
            "relative overflow-hidden border rounded-full duration-300 font-sans",
            "flex items-center justify-center gap-2",
            "hover:px-8 hover:-rotate-1 hover:font-semibold",
            themes[theme],
            sizes[size],
            className
        );

        const circleThemes = {
            dark: "bg-light",
            light: "bg-dark",
        }

        const circleClasses = clsx(
            "absolute rounded-full z-0 pointer-events-none",
            circleThemes[theme],
        );

        return (
            <button ref={buttonRef} className={classes} {...rest}>
                <span className="relative z-10">{addon === "plus" ? "+" : null}</span>

                <span className="relative z-10">{children}</span>

                {addon === "arrow" && <span className="relative z-10">›</span>}

                <div
                    ref={circleRef}
                    className={circleClasses}
                    style={{
                        width: "170%",
                        aspectRatio: "1",
                        transform: "translate(-50%, -50%) scale(0)",
                        transformOrigin: "0% 0%",
                    }}
                />
            </button>
        );
    }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;

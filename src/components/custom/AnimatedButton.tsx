import classNames from "classnames";
import {useRef, useEffect, type JSX} from "react";
import gsap from "gsap";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    primary?: boolean;
    secondary?: boolean;
    simple_w?: boolean;
    simple_b?: boolean;
    outline?: boolean;
    rounded?: boolean;
    className?: string;
}

function AnimatedButton({
                            children,
                            primary,
                            secondary,
                            simple_w,
                            simple_b,
                            outline,
                            rounded,
                            className,
                            ...rest
                        }: AnimatedButtonProps): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const btn = buttonRef.current;
        const circle = circleRef.current;

        if (!btn || !circle) return;

        const moveCircle = (e: MouseEvent): void => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.set(circle, { left: x, top: y });
        };

        const scaleUp = (): void => {
            gsap.to(circle, { scale: 1, duration: 0.6, ease: "power2.out" });
        };

        const scaleDown = (): void => {
            gsap.to(circle, { scale: 0, duration: 0.6, ease: "power2.in" });
        };

        btn.addEventListener("mousemove", moveCircle);
        btn.addEventListener("mouseenter", scaleUp);
        btn.addEventListener("mouseleave", scaleDown);

        return () => {
            btn.removeEventListener("mousemove", moveCircle);
            btn.removeEventListener("mouseenter", scaleUp);
            btn.removeEventListener("mouseleave", scaleDown);
        };
    }, []);

    const classes = classNames(
        "button relative px-6 hover:px-8 hover:-rotate-1 py-1.5 border duration-300 overflow-hidden font-sans",
        {
            "border-light text-light hover:text-dark hover:font-bold  backdrop-blur-sm": primary && !outline,
            "border-color-gray bg-color-gray text-color-light": secondary && !outline,
            "text-color-light": simple_w && !outline,
            "text-color-dark": simple_b && !outline,

            "bg-white": outline,
            "text-color-dark border-color-dark bg-color-light hover:text-color-light": outline && primary,
            "text-gray-900 border-gray-900": outline && secondary,
            "hover:text-color-dark": !outline,
            "rounded-full": rounded,
        },
        className
    );

    return (
        <button ref={buttonRef} className={classes} {...rest}>
            <span className="relative z-10">{children}</span>
            <div
                ref={circleRef}
                className={classNames(
                    "circle absolute rounded-full z-0 pointer-events-none",
                    {
                        "bg-color-dark": outline,
                        "bg-white": !outline,
                    }
                )}
                style={{
                    width: "170%",
                    aspectRatio: "1",
                    transform: "translate(-50%, -50%) scale(0)",
                    transformOrigin: "0% 0%",
                }}
            ></div>
        </button>
    );
}

export default AnimatedButton;

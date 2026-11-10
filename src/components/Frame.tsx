import { cn } from "@/lib/utils";

type FrameProps = {
    title?: string;
    description?: string;
    children: React.ReactNode;

    className?: string;
}

function Frame({title, description, children, className}:FrameProps) {
    const line = "pointer-events-none absolute z-0 bg-default-border";

    return (
        <section className={cn(className, "relative")}>

            <span aria-hidden className={cn(line, "top-0 md:-left-border-ext md:-right-border-ext -left-border-ext-mobile -right-border-ext-mobile h-px")} />
            <span aria-hidden className={cn(line, "bottom-0 md:-left-border-ext md:-right-border-ext -left-border-ext-mobile -right-border-ext-mobile h-px")} />
            <span aria-hidden className={cn(line, "left-0 md:-top-border-ext md:-bottom-border-ext -top-border-ext-mobile -bottom-border-ext-mobile w-px")} />
            <span aria-hidden className={cn(line, "right-0 md:-top-border-ext md:-bottom-border-ext -top-border-ext-mobile -bottom-border-ext-mobile w-px")} />

            {(title || description) && (
                <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between gap-2 md:gap-12 p-4 md:px-6 md:py-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-1 border-default-border">
                    <h2 className="inline-full text-4xl md:text-5xl"> {title} </h2>
                    <p className="flex-left md:text-right leading-[1.2rem] text-sm">{description}</p>
                </div>
            )}

            <div className="p-4 md:p-6">
                {children}
            </div>
        </section>
    )
}

export default Frame;
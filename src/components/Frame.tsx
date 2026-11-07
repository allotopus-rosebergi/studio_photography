import { cn } from "@/lib/utils";

type FrameProps = {
    title?: string;
    description?: string;
    children: React.ReactNode;

    className?: string;
}

function Frame({title, description, children, className}:FrameProps) {
    const line = "pointer-events-none absolute z-30 bg-default-border";

    return (
        <section className={cn(className, "relative")}>

            <span aria-hidden className={cn(line, "top-0 -left-border-ext -right-border-ext h-px")} />
            <span aria-hidden className={cn(line, "bottom-0 -left-border-ext -right-border-ext h-px")} />
            <span aria-hidden className={cn(line, "left-0 -top-border-ext -bottom-border-ext w-px")} />
            <span aria-hidden className={cn(line, "right-0 -top-border-ext -bottom-border-ext w-px")} />

            {(title || description) && (
                <div className="flex flex-col sm:flex-row items-startsm:items-center w-full justify-between gap-2 sm:gap-12 px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b-1 border-default-border">
                    <h2 className="inline-full"> {title} </h2>
                    <p className="flex-left sm:text-right leading-[1.2rem] text-sm">{description}</p>
                </div>
            )}

            <div className="p-6">
                {children}
            </div>
        </section>
    )
}

export default Frame;
function Hero() {
    return(
        <section className="w-full p-6 pt-18 md:pt-24">
            <h1 className="text-4xl md:text-5xl">
                Hi, I'm Marius Lassl
            </h1>

            <p className=" mt-3 text-sm md:text-xl">
                <span className="merriweather-bold">Photographer and Designer</span>{" "}
                based in Austria.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-70">
                I love bird watching, traveling and climbing. With my photography I
                capture the best parts of these hobbies. My work is deliberate and
                focused on aesthetics.
            </p>

            <div className="flex flex-col gap-1 md:gap-2 text-sm md:flex-row mt-6">
                <a href="mailto:hello@marius-lassl.com">
                    <span className="staatliches-regular mr-2 text-base">Mail</span>
                    <span className="hover:underline">hello@marius-lassl.com</span>
                </a>
                <a href="tel:+436645859370">
                    <span className="staatliches-regular mr-2 text-base">Telephone</span>
                    <span className="hover:underline">+43 664 5859370</span>
                </a>
            </div>
        </section>
    )
}

export default Hero;
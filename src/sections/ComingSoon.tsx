import paper_texture from "@/assets/img/white-paper-texture.webp";

export default function ComingSoon() {
    return (
        <>
            <main className="flex min-h-dvh flex-col bg-dark p-2 sm:p-12 relative">
                <div className="flex flex-1 flex-col items-center justify-between rounded-2xl bg-white px-6 py-6 text-center text-dark">
                    <p className="merriweather-light text-xs text-dark/60 z-10">
                        Portfolio coming soon!
                    </p>

                    <section className="w-full max-w-4xl py-12 z-10">
                        <h1 className="staatliches-regular text-4xl sm:text-5xl">
                            Hi, I'm Marius Lassl
                        </h1>

                        <p className="merriweather-regular mt-3 text-sm sm:text-base">
                            <span className="merriweather-bold">Photographer and Designer</span>{" "}
                            based in Austria.
                        </p>

                        <p className="merriweather-regular mx-auto mt-3 max-w-xl text-sm leading-relaxed opacity-70">
                            I love bird watching, traveling and climbing. With my photography I
                            capture the best parts of these hobbies. My work is deliberate and
                            focused on aesthetics.
                        </p>

                        <hr className="my-6 border-dark/10" />

                        <div className="merriweather-regular flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-center sm:gap-8">
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

                    <p className="merriweather-light text-xs text-dark/60 z-10">
                        © {new Date().getFullYear()} All rights reserved
                    </p>
                </div>
            </main>
            <img src={paper_texture} alt="paper texture" className="absolute top-0 w-full h-full mix-blend-multiply opacity-45" />
        </>
    );
}
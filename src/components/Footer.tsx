export default function Footer() {
    const user = "mpytlak.ar";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;

    return (
        <footer className="mt-16 border-t border-gray-700/50 py-8 text-center text-sm text-gray-400">
            {/* --- Autor i technologia --- */}
            <p>
                © {new Date().getFullYear()} Mateusz Pytlak • Built with{" "}
                <span className="text-sky-400 font-medium">React</span>,{" "}
                <span className="text-sky-400 font-medium">Vite</span> &{" "}
                <span className="text-sky-400 font-medium">Tailwind CSS</span>
            </p>

            {/* --- Linki społecznościowe --- */}
            {/*<p className="mt-2 space-x-2">*/}
            {/*    <a*/}
            {/*        href="https://github.com/mateuszpytlak"*/}
            {/*        target="_blank"*/}
            {/*        rel="noopener noreferrer"*/}
            {/*        className="hover:text-white transition-colors"*/}
            {/*    >*/}
            {/*        GitHub*/}
            {/*    </a>*/}
            {/*    <span>•</span>*/}
            {/*    <a*/}
            {/*        href="https://linkedin.com/in/mateuszpytlak"*/}
            {/*        target="_blank"*/}
            {/*        rel="noopener noreferrer"*/}
            {/*        className="hover:text-white transition-colors"*/}
            {/*    >*/}
            {/*        LinkedIn*/}
            {/*    </a>*/}
            {/*    <span>•</span>*/}
            {/*    <a*/}
            {/*        href={`mailto:${email}`}*/}
            {/*        className="text-sky-400 hover:text-sky-300 font-medium transition-colors"*/}
            {/*    >*/}
            {/*        {email}*/}
            {/*    </a>*/}
            {/*</p>*/}

            {/* --- References i licencje --- */}
            <div className="mt-8 max-w-3xl mx-auto text-gray-500 leading-relaxed text-xs sm:text-sm">
                <p className="font-semibold text-gray-300 mb-1">References: Fair use and License</p>
                <p>
                    Data basis:{" "}
                    <a
                        href="https://arctracker.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300"
                    >
                        ARCTracker.io
                    </a>
                </p>
                <p className="mt-2">
                    Images & Icons: From the official{" "}
                    <a
                        href="https://arcraiders.wiki"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300"
                    >
                        ARC Raiders Wiki
                    </a>
                    . Artwork © their respective owners. Used under the wiki’s content license (
                    <a
                        href="https://arcraiders.wiki/Licensing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300"
                    >
                        Creative Commons BY-SA
                    </a>
                    ). Please see the wiki’s licensing page for details before reusing the art.
                </p>
                <p className="mt-2">
                    Cheat sheet author: Reddit user{" "}
                    <a
                        href="https://www.reddit.com/r/ArcRaiders/comments/1orrcag/oc_arc_raiders_loot_cheat_sheet_v2_keep_sell/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300"
                    >
                        pRoDeeD
                    </a>
                    . Source:{" "}
                    <a
                        href="https://www.reddit.com/r/ArcRaiders/comments/1orrcag/oc_arc_raiders_loot_cheat_sheet_v2_keep_sell/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300"
                    >
                        reddit.com/r/ArcRaiders/comments/1orrcag
                    </a>
                </p>
            </div>
        </footer>
    );
}

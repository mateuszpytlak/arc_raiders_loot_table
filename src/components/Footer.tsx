export default function Footer() {
    // generujemy e-mail bez useState/useEffect — brak ostrzeżeń
    const user = "mateuszpytlak+ar";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;

    return (
        <footer className="mt-16 border-t border-gray-700/50 py-8 text-center text-sm text-gray-400">
            <p>
                © {new Date().getFullYear()} Mateusz Pytlak • Built with{" "}
                <span className="text-sky-400 font-medium">React</span>,{" "}
                <span className="text-sky-400 font-medium">Vite</span> &{" "}
                <span className="text-sky-400 font-medium">Tailwind CSS</span>
            </p>

            <p className="mt-2 space-x-2">
                <a
                    href="https://github.com/mateuszpytlak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                >
                    GitHub
                </a>
                <span>•</span>
                <a
                    href="https://linkedin.com/in/mateuszpytlak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                >
                    LinkedIn
                </a>
                <span>•</span>
                <a
                    href={`mailto:${email}`}
                    className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
                >
                    {email}
                </a>
            </p>
        </footer>
    );
}

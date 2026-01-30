import type { ReactNode } from "react";

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

type Props = {
    title: string;
    collapsed: boolean;
    onToggle: () => void;
    compactMode: boolean;
    children: ReactNode;
};

export default function ItemGroup({
    title,
    collapsed,
    onToggle,
    compactMode,
    children,
}: Props) {
    const contentId = `${slugify(title)}-content`;
    const containerPadding = compactMode ? "p-4" : "p-6";

    return (
        <section
            className={`mb-8 ${containerPadding} rounded-2xl bg-gradient-to-b from-gray-900/70 to-gray-800/40 backdrop-blur-sm shadow-md border border-gray-800/50`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={!collapsed}
                aria-controls={contentId}
                className="w-full flex items-center justify-between cursor-pointer group"
            >
                <h2 className="text-2xl font-bold text-left">{title}</h2>

                <span
                    className={`transition-transform duration-300 text-gray-400 group-hover:text-white ${
                        collapsed ? "rotate-0" : "rotate-90"
                    }`}
                    aria-hidden
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </button>

            <div
                id={contentId}
                className={`transition-all duration-300 ease-in-out overflow-hidden origin-top ${
                    collapsed
                        ? "opacity-0 scale-y-0 h-0"
                        : "opacity-100 scale-y-100 h-auto mt-6"
                }`}
            >
                {collapsed ? null : children}
            </div>
        </section>
    );
}

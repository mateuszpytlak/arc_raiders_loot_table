import type {ReactNode} from "react";

type Props = {
    title: string;
    collapsed: boolean;
    onToggle: () => void;
    children: ReactNode;
};

export default function ItemGroup({title, collapsed, onToggle, children}: Props) {
    return (
        <section
            className="mb-8 p-6 rounded-2xl bg-gradient-to-b from-gray-900/70 to-gray-800/40 backdrop-blur-sm shadow-md border border-gray-800/50">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between cursor-pointer group"
            >
                <h2 className="text-2xl font-bold text-left">
                    {title}
                </h2>

                <span
                    className={`transition-transform duration-300 text-gray-400 group-hover:text-white
                        ${collapsed ? "rotate-0" : "rotate-90"}
                    `}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                </span>

            </button>
            <div
                className={`
                    transition-all duration-500 overflow-hidden
                    ${collapsed ? "max-h-0 opacity-0 mt-0" : "max-h-[2000px] opacity-100 mt-6"}
                `}
            >
                {children}
            </div>
        </section>
    );
}

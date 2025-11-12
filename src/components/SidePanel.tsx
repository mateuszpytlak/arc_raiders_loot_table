interface Props {
    open: boolean;
    onClose: () => void;
    benchLevels: Record<
        "gunsmith" | "medical" | "refinery" | "utility" | "scrappy",
        number
    >;
    setBenchLevels: React.Dispatch<
        React.SetStateAction<
            Record<
                "gunsmith" | "medical" | "refinery" | "utility" | "scrappy",
                number
            >
        >
    >;
}
const benches = [
    { key: "gunsmith", label: "Gunsmith Bench" },
    { key: "medical", label: "Medical Lab" },
    { key: "refinery", label: "Refinery" },
    { key: "utility", label: "Utility Station" },
    { key: "scrappy", label: "Scrappy" },
] as const;

export default function SidePanel({
                                      open,
                                      onClose,
                                      benchLevels,
                                      setBenchLevels,
                                  }: Props) {
    if (!open) return null;

    return (
        <aside
            className={`fixed top-0 right-0 h-full w-1/5 min-w-[320px] bg-gradient-to-b from-gray-900 to-gray-950 border-l border-gray-800 shadow-2xl z-50 transform transition-all duration-500 ease-in-out ${
                open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
        >
            {/* Nagłówek panelu */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-gradient-to-r from-sky-700/30 to-transparent">
                <h2 className="text-lg font-semibold text-sky-300 tracking-wide">
                    Workbench Settings
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white hover:rotate-90 transform transition-transform duration-200"
                >
                    ✕
                </button>
            </div>

            {/* Zawartość */}
            <div className="p-6 space-y-8 text-gray-200 overflow-y-auto h-[calc(100%-64px)]">
                {benches.map(({ key, label }) => {
                    const level = benchLevels[key];
                    return (
                        <div key={key} className="pb-4 border-b border-gray-800/60 last:border-0">
                            <label className="block mb-2 text-sm text-gray-400">
                                {label}
                            </label>
                            <select
                                value={level}
                                onChange={(e) =>
                                    setBenchLevels((prev) => ({
                                        ...prev,
                                        [key]: Number(e.target.value),
                                    }))
                                }
                                className="w-full bg-gray-800/60 border border-gray-700 rounded-md p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                            >
                                <option value={1}>Level 1</option>
                                <option value={2}>Level 2</option>
                                <option value={3}>Level 3</option>
                            </select>

                            {/* Pasek postępu poziomów */}
                            <div className="flex justify-between items-center mt-3">
                                {[1, 2, 3].map((lvl) => (
                                    <div
                                        key={lvl}
                                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                            lvl <= level
                                                ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                                                : "bg-gray-700"
                                        }`}
                                        title={`Level ${lvl}`}
                                    />
                                ))}
                            </div>

                            <div className="relative mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-sky-500 transition-all duration-500"
                                    style={{ width: `${(level / 3) * 100}%` }}
                                ></div>
                            </div>

                            <p className="mt-3 text-xs text-gray-400">
                                Currently on{" "}
                                <span className="text-sky-400 font-semibold">Level {level}</span> — showing materials needed to reach{" "}
                                <span className="text-sky-400 font-semibold">
                                    Level {level < 3 ? 3 : level}
                                </span>.
                            </p>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}

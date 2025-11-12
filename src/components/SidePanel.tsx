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
                    className="cursor-pointer text-gray-400 hover:text-white hover:rotate-90 transform transition-transform duration-200"
                >
                    ✕
                </button>
            </div>

            {/* Zawartość */}
            <div className="p-6 space-y-8 text-gray-200 overflow-y-auto h-[calc(100%-64px)]">
                {benches.map(({ key, label }) => {
                    const level = benchLevels[key];
                    return (
                        <div key={key} className="pb-6 border-b border-gray-800/60 last:border-0">
                            <label className="block mb-3 text-sm text-gray-400 font-medium">
                                {label}
                            </label>

                            {/* 🔹 Klikalne kropki */}
                            <div className="flex items-center justify-between mb-2 select-none">
                                {[1, 2, 3].map((lvl) => (
                                    <button
                                        key={lvl}
                                        onClick={() =>
                                            setBenchLevels((prev) => ({ ...prev, [key]: lvl }))
                                        }
                                        className={`cursor-pointer h-4 w-4 rounded-full transition-all duration-300 
                            ${
                                            lvl <= level
                                                ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)] scale-110"
                                                : "bg-gray-700 hover:bg-gray-600"
                                        }`}
                                        title={`Level ${lvl}`}
                                    />
                                ))}
                            </div>

                            {/* 🔹 Labelki pod kropkami */}
                            <div className="flex justify-between text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                                <span>Lvl 1</span>
                                <span>Lvl 2</span>
                                <span>Lvl 3</span>
                            </div>

                            {/* 🔹 Pasek progresu */}
                            <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
                                <div
                                    className="absolute top-0 left-0 h-full bg-sky-500 transition-all duration-500"
                                    style={{ width: `${(level / 3) * 100}%` }}
                                />
                            </div>

                            {/* 🔹 Opis */}
                            <p className="text-xs text-gray-400">
                                Currently on{" "}
                                <span className="text-sky-400 font-semibold">Level {level}</span> — showing
                                materials needed to reach{" "}
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

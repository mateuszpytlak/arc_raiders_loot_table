import { useCallback, useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";

import { BENCH_DEFINITIONS } from "../constants/benches";
import type { BenchKey, BenchLevels } from "../types/benches";

type Props = {
    open: boolean;
    onClose: () => void;
    benchLevels: BenchLevels;
    setBenchLevels: Dispatch<SetStateAction<BenchLevels>>;
};

const PANEL_TRANSITION =
    "fixed top-0 right-0 h-full w-1/5 min-w-[320px] bg-gradient-to-b from-gray-900 to-gray-950 border-l border-gray-800 shadow-2xl z-50 transform transition-all duration-500 ease-in-out";

export default function SidePanel({
    open,
    onClose,
    benchLevels,
    setBenchLevels,
}: Props) {
    const panelRef = useRef<HTMLElement | null>(null);

    const updateBenchLevel = useCallback(
        (bench: BenchKey, level: number) => {
            setBenchLevels((previous) => ({
                ...previous,
                [bench]: level,
            }));
        },
        [setBenchLevels],
    );

    useEffect(() => {
        if (open) {
            panelRef.current?.focus();
        }
    }, [open]);

    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
                aria-hidden="true"
            />
            <aside
                className={`${PANEL_TRANSITION} ${
                    open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Workbench Settings"
                tabIndex={-1}
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        onClose();
                    }
                }}
                ref={panelRef}
            >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-gradient-to-r from-sky-700/30 to-transparent">
                <h2 className="text-lg font-semibold text-sky-300 tracking-wide">
                    Workbench Settings
                </h2>
                <button
                    onClick={onClose}
                    className="cursor-pointer text-gray-400 hover:text-white hover:rotate-90 transform transition-transform duration-200"
                    aria-label="Close settings"
                    type="button"
                >
                    ✕
                </button>
            </div>

            <div className="p-6 space-y-8 text-gray-200 overflow-y-auto h-[calc(100%-64px)]">
                {BENCH_DEFINITIONS.map(({ key, label, maxLevel }) => {
                    const currentLevel = benchLevels[key];
                    const progress = Math.max(10, (currentLevel / maxLevel) * 100);

                    return (
                        <div key={key} className="pb-6 border-b border-gray-800/60 last:border-0">
                            <label className="block mb-3 text-sm text-gray-400 font-medium">
                                {label}
                            </label>

                            <div className="flex items-center justify-between mb-2 select-none">
                                {Array.from({ length: maxLevel }, (_, index) => index + 1).map(
                                    (level) => (
                                        <button
                                            key={level}
                                            onClick={() => updateBenchLevel(key, level)}
                                            className={`cursor-pointer h-4 w-4 rounded-full transition-all duration-300 ${
                                                level <= currentLevel
                                                    ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)] scale-110"
                                                    : "bg-gray-700 hover:bg-gray-600"
                                            }`}
                                            title={`Level ${level}`}
                                            aria-label={`${label} level ${level}`}
                                            type="button"
                                        />
                                    ),
                                )}
                            </div>

                            <div className="flex justify-between text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                                {Array.from({ length: maxLevel }, (_, index) => (
                                    <span key={index}>Lvl {index + 1}</span>
                                ))}
                            </div>

                            <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
                                <div
                                    className="absolute top-0 left-0 h-full bg-sky-500 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <p className="text-xs text-gray-400">
                                Currently on {" "}
                                <span className="text-sky-400 font-semibold">
                                    Level {currentLevel}
                                </span>{" "}
                                — showing materials needed to reach {" "}
                                <span className="text-sky-400 font-semibold">
                                    Level {maxLevel}
                                </span>.
                            </p>
                        </div>
                    );
                })}
            </div>
        </aside>
        </>
    );
}

import { useCallback, useMemo, useState } from "react";
import ItemCard from "../ItemCard";
import { ITEM_GRID_LAYOUT } from "../../constants/layout";
import { BENCH_BY_WORKSHOP } from "../../constants/benches";
import type { Item } from "../../data/items";
import type { BenchLevels } from "../../types/benches";

type Props = {
    workshop: string;
    items: Item[];
    benchLevels: BenchLevels;
    compactMode: boolean;
};

export default function WorkshopLevelGroup({
    workshop,
    items,
    benchLevels,
    compactMode,
}: Props) {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = useCallback(
        () => setCollapsed((previous) => !previous),
        [],
    );

    const benchDefinition = BENCH_BY_WORKSHOP[workshop];
    const maxLevel = benchDefinition?.maxLevel ?? 3;
    const currentLevel = benchDefinition
        ? benchLevels[benchDefinition.key]
        : 1;

    const levels = useMemo(
        () => Array.from({ length: maxLevel }, (_, index) => index + 1),
        [maxLevel],
    );

    const itemsByLevel = useMemo(() => {
        return items.reduce<Record<number, Item[]>>((accumulator, item) => {
            const level = item.level ?? 1;
            if (!accumulator[level]) {
                accumulator[level] = [];
            }
            accumulator[level]!.push(item);
            return accumulator;
        }, {});
    }, [items]);

    return (
        <div className="mb-3">
            <button
                type="button"
                onClick={toggleCollapsed}
                className="flex items-center justify-between w-full text-left cursor-pointer mb-4"
                aria-expanded={!collapsed}
            >
                <h3 className="text-xl font-semibold text-sky-400">{workshop}</h3>

                <span
                    className={`transition-transform duration-300 ${
                        collapsed ? "-rotate-90" : "rotate-0"
                    }`}
                    aria-hidden
                >
                    ▶
                </span>
            </button>

            <div
                className={`transition-all duration-300 overflow-hidden origin-top ${
                    collapsed
                        ? "opacity-0 scale-y-0 h-0"
                        : "opacity-100 scale-y-100 h-auto"
                }`}
            >
                {levels.map((level) => {
                    const levelItems = itemsByLevel[level] ?? [];
                    if (levelItems.length === 0) {
                        return null;
                    }

                    const isCompleted = level <= currentLevel;

                    return (
                        <div key={level} className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${
                                        isCompleted
                                            ? "bg-gray-800 text-gray-500 border-gray-700"
                                            : "bg-gray-800 text-gray-300 border-gray-700"
                                    }`}
                                >
                                    LEVEL {level}
                                </span>
                                <div className="flex-1 h-px bg-gray-700/50" />
                            </div>

                            <div className={ITEM_GRID_LAYOUT}>
                                {levelItems.map((item) => (
                                    <ItemCard
                                        key={item.name}
                                        {...item}
                                        compact={compactMode}
                                    />
                                ))}
                            </div>

                            {isCompleted && (
                                <p className="text-xs text-gray-500 mt-2 ml-1">
                                    Already completed.
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
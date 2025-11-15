// src/components/ItemSection/WorkshopLevelGroup.tsx
import { useState } from "react";
import ItemCard from "../ItemCard";
import type { Item } from "../../data/items";
import type { BenchLevels } from "../../types/benches";

interface Props {
    workshop: string;
    items: Item[];
    benchLevels: BenchLevels;
    compactMode: boolean;
}

export default function WorkshopLevelGroup({
    workshop,
    items,
    benchLevels,
    compactMode,
}: Props) {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(c => !c);

    // -------------------------------
    // CURRENT & MAX LEVEL LOGIC
    // -------------------------------
    let current = 1;
    let maxLevel = 3;

    switch (workshop) {
        case "Gunsmith Bench":
            current = benchLevels.gunsmith;
            break;
        case "Medical Lab":
            current = benchLevels.medical;
            break;
        case "Refinery":
            current = benchLevels.refinery;
            break;
        case "Utility Station":
            current = benchLevels.utility;
            break;
        case "Explosives Station":
            current = benchLevels.explosives;
            break;
        case "Gear Bench":
            current = benchLevels.gear;
            break;
        case "Scrappy":
            current = benchLevels.scrappy;
            maxLevel = 5;
            break;
    }

    const levels = Array.from({ length: maxLevel }, (_, i) => i + 1);

    // group items by level
    const itemsByLevel: Record<number, Item[]> = {};
    levels.forEach(lvl => {
        itemsByLevel[lvl] = items.filter(i => (i.level ?? 1) === lvl);
    });

    return (
        <div className="mb-3">
            <button
                onClick={toggle}
                className="flex items-center justify-between w-full text-left cursor-pointer mb-4"
            >
                <h3 className="text-xl font-semibold text-sky-400">{workshop}</h3>

                <span
                    className={`
                        transition-transform duration-300
                        ${collapsed ? "-rotate-90" : "rotate-0"}
                    `}
                >
                    ▶
                </span>
            </button>

            <div
                className={`
                    transition-all duration-300 overflow-hidden origin-top
                    ${collapsed ? "opacity-0 scale-y-0 h-0" : "opacity-100 scale-y-100 h-auto"}
                `}
            >
                {levels.map(lvl => {
                    const lvlItems = itemsByLevel[lvl];
                    if (!lvlItems || lvlItems.length === 0) return null;

                    const isGreyed = lvl <= current;

                    return (
                        <div key={lvl} className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border
                                        ${
                                            isGreyed
                                                ? "bg-gray-800 text-gray-500 border-gray-700"
                                                : "bg-gray-800 text-gray-300 border-gray-700"
                                        }
                                    `}
                                >
                                    LEVEL {lvl}
                                </span>
                                <div className="flex-1 h-px bg-gray-700/50" />
                            </div>

                            <div className="w-full">
                                <div
                                className={`
                                        grid gap-4
                                        sm:grid-cols-2 
                                        md:grid-cols-3 
                                        xl:grid-cols-6
                                        max-w-7xl mx-auto
                                        ${
                                            isGreyed ? "opacity-40 saturate-50" : "opacity-100"
                                        }
                                    `}
                                >
                                {lvlItems.map(item => (
                                    <ItemCard key={item.name} {...item} compact={compactMode} />
                                ))}
                            </div>
                            </div>
                            {isGreyed && (
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

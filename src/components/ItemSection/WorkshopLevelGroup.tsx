import { useState } from "react";
import ItemCard from "../ItemCard";
import type { Item } from "../../data/items";

interface Props {
    workshop: string;
    items: Item[];
    benchLevels: Record<
        "gunsmith" | "medical" | "explosives" | "refinery" | "utility" | "scrappy",
        number
    >;
}

export default function WorkshopLevelGroup({ workshop, items, benchLevels }: Props) {
    // 🔹 LOCAL COLLAPSE STATE dla tej jednej pod-grupy
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => setCollapsed((c) => !c);

    // 🔹 Ustalmy bieżący level użytkownika
    let current = 1;
    let maxLevel = 3;

    if (workshop === "Gunsmith Bench") current = benchLevels.gunsmith;
    else if (workshop === "Medical Lab") current = benchLevels.medical;
    else if (workshop === "Refinery") current = benchLevels.refinery;
    else if (workshop === "Utility Station") current = benchLevels.utility;
    else if (workshop === "Explosives Station") current = benchLevels.explosives;
    else if (workshop === "Scrappy") {
        current = benchLevels.scrappy;
        maxLevel = 5;
    }

    // 🔹 Zbierz dostępne levele (1 → maxLevel)
    const levels = Array.from({ length: maxLevel }, (_, i) => i + 1);

    // 🔹 Grupujemy itemy po poziomie
    const itemsByLevel: Record<number, Item[]> = {};
    levels.forEach((lvl) => {
        itemsByLevel[lvl] = items.filter((i) => (i.level ?? 1) === lvl);
    });

    return (
        <div className="mb-3">

            {/* 🔹 Nagłówek warsztatu z toggle */}
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

            {/* 🔹 Zawartość warsztatu (levele + itemy) */}
            <div
                className={`
                    transition-all duration-300 overflow-hidden origin-top
                    ${collapsed ? "opacity-0 scale-y-0 h-0" : "opacity-100 scale-y-100 h-auto"}
                `}
            >
                {levels.map((lvl) => {
                    const lvlItems = itemsByLevel[lvl] ?? [];
                    if (lvlItems.length === 0) return null;

                    const isGreyed = lvl <= current;

                    return (
                        <div key={lvl} className="mb-8">
                            {/* Level label */}
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

                            {/* Grid itemów */}
                            <div
                                className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${
                                    isGreyed ? "opacity-40 saturate-50" : "opacity-100"
                                }`}
                            >
                                {lvlItems.map((item) => (
                                    <ItemCard key={item.name} {...item} />
                                ))}
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

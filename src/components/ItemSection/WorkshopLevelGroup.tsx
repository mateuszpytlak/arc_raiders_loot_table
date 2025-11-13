import ItemCard from "../ItemCard";
import type { Item } from "../../data/items";
import type { BenchLevels } from "../../types/benches";

interface Props {
    workshop: string;
    items: Item[];
    benchLevels: BenchLevels;
}

export default function WorkshopLevelGroup({ workshop, items, benchLevels }: Props) {
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

    const levels = Array.from({ length: maxLevel }, (_, i) => i + 1);

    const itemsByLevel: Record<number, Item[]> = {};
    levels.forEach((lvl) => {
        itemsByLevel[lvl] = items.filter((i) => (i.level ?? 1) === lvl);
    });

    return (
        <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 text-sky-400">
                {workshop}
            </h3>

            {levels.map((lvl) => {
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

                        <div
                            className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 transition-opacity 
                                        ${isGreyed ? "opacity-40 saturate-50" : "opacity-100"}`}
                        >
                            {lvlItems.map((item: Item) => (
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
    );
}

// src/components/ItemSection/ItemSection.tsx

import { useState } from "react";
import type { Item } from "../../data/items";
import type { BenchLevels } from "../../types/benches";

import ItemGroup from "./ItemGroup";
import UpgradingSection from "./UpgradingSection";
import ItemCard from "../ItemCard";

type Props = {
    items: Item[];
    benchLevels: BenchLevels;
};

// Używamy dokładnie tych samych nazw grup, co w typie Item["group"]
const GROUPS: Item["group"][] = [
    "Keep for Quests",
    "Keep for Projects",
    "Upgrading Benches",
    "Safely Recycle",
];

export default function ItemSection({ items, benchLevels }: Props) {
    // Przechowujemy info: która grupa jest zwinięta
    // false = rozwinięta, true = zwinięta
    const [collapsedMap, setCollapsedMap] = useState<Record<Item["group"], boolean>>(() =>
        GROUPS.reduce(
            (acc, group) => ({ ...acc, [group]: false }), // domyślnie wszystko rozwinięte
            {} as Record<Item["group"], boolean>
        )
    );

    const toggleGroup = (group: Item["group"]) => {
        setCollapsedMap(prev => ({
            ...prev,
            [group]: !prev[group],
        }));
    };

    const expandAll = () => {
        setCollapsedMap(
            GROUPS.reduce(
                (acc, group) => ({ ...acc, [group]: false }),
                {} as Record<Item["group"], boolean>
            )
        );
    };

    const collapseAll = () => {
        setCollapsedMap(
            GROUPS.reduce(
                (acc, group) => ({ ...acc, [group]: true }),
                {} as Record<Item["group"], boolean>
            )
        );
    };

    return (
        <div>
            {/* 🔹 DWA globalne przyciski – wpływają na WSZYSTKIE grupy */}
            <div className="flex gap-3 mb-6">
                <button
                    type="button"
                    onClick={expandAll}
                    className="px-3 py-1 text-sm bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 transition"
                >
                    Expand all
                </button>

                <button
                    type="button"
                    onClick={collapseAll}
                    className="px-3 py-1 text-sm bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 transition"
                >
                    Collapse all
                </button>
            </div>

            {/* 🔹 Render 4 głównych grup */}
            {GROUPS.map(group => {
                const groupItems = items.filter(i => i.group === group);
                if (groupItems.length === 0) return null;

                const collapsed = collapsedMap[group];

                return (
                    <ItemGroup
                        key={group}
                        title={group}
                        collapsed={collapsed}
                        onToggle={() => toggleGroup(group)}
                    >
                        {/* Wnętrze sekcji zależne od typu grupy */}
                        {group === "Upgrading Benches" ? (
                            <UpgradingSection
                                items={groupItems}
                                benchLevels={benchLevels}
                            />
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {groupItems.map(item => (
                                    <ItemCard key={item.name} {...item} />
                                ))}
                            </div>
                        )}
                    </ItemGroup>
                );
            })}
        </div>
    );
}

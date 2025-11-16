import { useMemo } from "react";
import ItemCard from "../ItemCard";
import { ITEM_GRID_LAYOUT } from "../../constants/layout";
import { ITEM_GROUPS } from "../../constants/itemGroups";
import type { Item } from "../../data/items";
import type { BenchLevels } from "../../types/benches";
import ItemGroup from "./ItemGroup";
import UpgradingSection from "./UpgradingSection";

type CollapsedState = Record<Item["group"], boolean>;

type Props = {
    items: Item[];
    benchLevels: BenchLevels;
    collapsedGroups: CollapsedState;
    expandAll: () => void;
    collapseAll: () => void;
    onToggleGroup: (group: Item["group"]) => void;
    compactMode: boolean;
};

const groupItemsByCategory = (collection: Item[]) => {
    const map = ITEM_GROUPS.reduce<Record<Item["group"], Item[]>>((acc, group) => {
        acc[group] = [];
        return acc;
    }, {} as Record<Item["group"], Item[]>);

    collection.forEach((item) => {
        map[item.group].push(item);
    });

    return map;
};

export default function ItemsSection({
    items,
    benchLevels,
    collapsedGroups,
    expandAll,
    collapseAll,
    onToggleGroup,
    compactMode,
}: Props) {
    const itemsByGroup = useMemo(() => groupItemsByCategory(items), [items]);

    return (
        <section>
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

            {ITEM_GROUPS.map((group) => {
                const groupItems = itemsByGroup[group] ?? [];
                if (groupItems.length === 0) {
                    return null;
                }

                const collapsed = collapsedGroups[group];

                return (
                    <ItemGroup
                        key={group}
                        title={group}
                        collapsed={collapsed}
                        onToggle={() => onToggleGroup(group)}
                        compactMode={compactMode}
                    >
                        {group === "Upgrading Benches" ? (
                            <UpgradingSection
                                items={groupItems}
                                benchLevels={benchLevels}
                                compactMode={compactMode}
                            />
                        ) : (
                            <div className={ITEM_GRID_LAYOUT}>
                                {groupItems.map((item) => (
                                    <ItemCard
                                        key={item.name}
                                        {...item}
                                        compact={compactMode}
                                    />
                                ))}
                            </div>
                        )}
                    </ItemGroup>
                );
            })}
        </section>
    );
}
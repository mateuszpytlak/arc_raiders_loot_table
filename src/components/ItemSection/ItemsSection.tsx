import type { Item } from "../../data/items";
import type { BenchLevels } from "../../types/benches";
import ItemGroup from "./ItemGroup";
import UpgradingSection from "./UpgradingSection";
import ItemCard from "../ItemCard";

type Props = {
    items: Item[];
    benchLevels: BenchLevels;

    collapsedGroups: Record<Item["group"], boolean>;
    setCollapsedGroups: React.Dispatch<
        React.SetStateAction<Record<Item["group"], boolean>>
    >;

    expandAll: () => void;
    collapseAll: () => void;
};

const GROUPS: Item["group"][] = [
    "Keep for Quests",
    "Keep for Projects",
    "Upgrading Benches",
    "Safely Recycle",
];

export default function ItemsSection({
                                         items,
                                         benchLevels,
                                         collapsedGroups,
                                         setCollapsedGroups,
                                         expandAll,
                                         collapseAll,
                                     }: Props) {

    const toggleGroup = (group: Item["group"]) => {
        setCollapsedGroups((prev) => ({
            ...prev,
            [group]: !prev[group],
        }));
    };

    return (
        <div>
            <div className="flex gap-3 mb-6">
                <button
                    type="button"
                    onClick={expandAll}
                    className="px-3 py-1 text-sm bg-gray-800 border border-gray-700
                               rounded hover:bg-gray-700 transition"
                >
                    Expand all
                </button>

                <button
                    type="button"
                    onClick={collapseAll}
                    className="px-3 py-1 text-sm bg-gray-800 border border-gray-700
                               rounded hover:bg-gray-700 transition"
                >
                    Collapse all
                </button>
            </div>

            {GROUPS.map((group) => {
                const groupItems = items.filter((i) => i.group === group);
                if (groupItems.length === 0) return null;

                const collapsed = collapsedGroups[group];

                return (
                    <ItemGroup
                        key={group}
                        title={group}
                        collapsed={collapsed}
                        onToggle={() => toggleGroup(group)}
                    >
                        {group === "Upgrading Benches" ? (
                            <UpgradingSection
                                items={groupItems}
                                benchLevels={benchLevels}
                            />
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {groupItems.map((item) => (
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

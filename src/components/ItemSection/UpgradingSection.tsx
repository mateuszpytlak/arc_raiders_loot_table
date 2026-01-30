import { useMemo } from "react";
import WorkshopLevelGroup from "./WorkshopLevelGroup";
import type { BenchLevels } from "../../types/benches";
import type { Item } from "../../data/items";

type Props = {
    items: Item[];
    benchLevels: BenchLevels;
    compactMode: boolean;
};

export default function UpgradingSection({ items, benchLevels, compactMode }: Props) {
    const workshops = useMemo(() => {
        return items.reduce<Record<string, Item[]>>((acc, item) => {
            if (!item.workshop) {
                return acc;
            }
            (acc[item.workshop] ??= []).push(item);
            return acc;
        }, {});
    }, [items]);

    return (
        <div className="space-y-6">
            {Object.entries(workshops).map(([workshop, workshopItems]) => {
                return (
                    <WorkshopLevelGroup
                        key={workshop}
                        workshop={workshop}
                        items={workshopItems}
                        benchLevels={benchLevels}
                        compactMode={compactMode}
                    />
                );
            })}
        </div>
    );
}

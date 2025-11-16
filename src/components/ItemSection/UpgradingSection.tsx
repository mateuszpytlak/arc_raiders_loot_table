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
    const workshops = useMemo(
        () =>
            Array.from(
                new Set(
                    items
                        .map((item) => item.workshop)
                        .filter((workshop): workshop is string => Boolean(workshop)),
                ),
            ),
        [items],
    );

    return (
        <div className="space-y-6">
            {workshops.map((workshop) => {
                const workshopItems = items.filter((item) => item.workshop === workshop);

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
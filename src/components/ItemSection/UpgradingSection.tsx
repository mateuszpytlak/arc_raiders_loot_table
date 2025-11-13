import WorkshopLevelGroup from "./WorkshopLevelGroup";
import type { BenchLevels } from "../../types/benches";
import type { Item } from "../../data/items";

type Props = {
    items: Item[];
    benchLevels: BenchLevels;
};

export default function UpgradingSection({ items, benchLevels }: Props) {
    const workshops: string[] = Array.from(
        new Set(
            items
                .map((i) => i.workshop)
                .filter((w): w is string => Boolean(w))
        )
    );

    return (
        <>
            {workshops.map((ws) => {
                const wsItems = items.filter((i) => i.workshop === ws);

                return (
                    <WorkshopLevelGroup
                        key={ws}
                        workshop={ws}
                        items={wsItems}
                        benchLevels={benchLevels}
                    />
                );
            })}
        </>
    );
}

// src/components/ItemCard.tsx
import type { Item } from "../data/items";

const rarityColors: Record<Item["rarity"], string> = {
    common: "border-gray-600",
    uncommon: "border-green-500",
    rare: "border-blue-500",
    epic: "border-purple-500",
};

const rarityBg: Record<Item["rarity"], string> = {
    common: "bg-gray-800",
    uncommon: "bg-green-900/20",
    rare: "bg-blue-900/20",
    epic: "bg-purple-900/25",
};

export default function ItemCard(props: Item & { compact?: boolean }) {
    const { name, category, rarity, image, quantity, compact } = props;

    return (
        <div
            className={`
                rounded-lg overflow-hidden border
                ${rarityColors[rarity]} ${rarityBg[rarity]}
                hover:shadow-md transition
                ${compact ? "p-2" : "p-3"}
                w-full
            `}
        >
            <div
                className={`flex justify-center items-center bg-gray-900/40 ${
                    compact ? "p-1" : "p-3"
                }`}
            >
                <img
                    src={image || "https://placehold.co/128x128?text=Item"}
                    alt={name}
                    className={`${compact ? "w-14 h-14" : "w-24 h-24"} object-contain`}
                />
            </div>

            <div className={`${compact ? "p-2" : "p-4"}`}>
                <h2
                    className={`font-semibold flex justify-between ${
                        compact ? "text-sm" : "text-lg"
                    }`}
                >
                    <span>{name}</span>
                    {quantity && (
                        <span
                            className={`ml-2 ${
                                compact ? "text-sm" : "text-xl"
                            } text-orange-400`}
                        >
                            ×{quantity}
                        </span>
                    )}
                </h2>

                <p className={`${compact ? "text-xs" : "text-sm"} text-gray-400`}>
                    {category}
                </p>
            </div>
        </div>
    );
}

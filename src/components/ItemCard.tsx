import { memo } from "react";

import type { Item } from "../data/items";

type ItemCardProps = Item & {
    compact?: boolean;
    completed?: boolean;
};

const rarityBorder: Record<Item["rarity"], string> = {
    common: "border-gray-600",
    uncommon: "border-green-500",
    rare: "border-blue-500",
    epic: "border-purple-500",
};

const rarityBackground: Record<Item["rarity"], string> = {
    common: "bg-gray-800",
    uncommon: "bg-green-900/20",
    rare: "bg-blue-900/20",
    epic: "bg-purple-900/25",
};

const FALLBACK_IMAGE = "https://placehold.co/128x128?text=Item";

const ItemCardComponent = ({
    name,
    category,
    rarity,
    image,
    quantity,
    compact = false,
    completed = false,
}: ItemCardProps) => {
    const containerPadding = compact ? "p-2" : "p-3";
    const imagePadding = compact ? "p-1" : "p-3";
    const imageSize = compact ? "w-14 h-14" : "w-24 h-24";
    const bodyPadding = compact ? "p-2" : "p-4";
    const titleSize = compact ? "text-sm" : "text-lg";
    const quantitySize = compact ? "text-sm" : "text-xl";
    const categorySize = compact ? "text-xs" : "text-sm";
    const completionStyles = completed
        ? "opacity-45 grayscale"
        : "";

    return (
        <article
            className={`rounded-lg overflow-hidden border ${
                rarityBorder[rarity]
            } ${rarityBackground[rarity]} hover:shadow-md transition ${containerPadding} w-full ${completionStyles}`}
        >
            <div
                className={`flex justify-center items-center bg-gray-900/40 ${imagePadding}`}
            >
                <img
                    src={image ?? FALLBACK_IMAGE}
                    alt={name}
                    className={`${imageSize} object-contain`}
                    loading="lazy"
                />
            </div>

            <div className={bodyPadding}>
                <h2 className={`font-semibold flex justify-between ${titleSize}`}>
                    <span>{name}</span>
                    {quantity != null && (
                        <span className={`${quantitySize} text-orange-400`}>
                            ×{quantity}
                        </span>
                    )}
                </h2>

                <p className={`${categorySize} text-gray-400`}>{category}</p>
            </div>
        </article>
    );
};

export default memo(ItemCardComponent);

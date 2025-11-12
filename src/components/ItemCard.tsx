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

export default function ItemCard({
                                     name,
                                     category,
                                     tier,
                                     value,
                                     rarity,
                                     image,
                                     quantity,
                                 }: Item) {
    return (
        <div
            className={`rounded-xl overflow-hidden border ${rarityColors[rarity]} ${rarityBg[rarity]} hover:shadow-lg transition`}
        >
            <div className="flex justify-center items-center bg-gray-900/50 p-3">
                <img
                    src={image || "https://placehold.co/128x128?text=Item"}
                    alt={name}
                    className="w-24 h-24 object-contain"
                />
            </div>
            <div className="p-4">
                <h2 className="font-semibold text-lg text-white flex items-center justify-between">
                    <span>{name}</span>
                    {quantity && (
                        <span className="text-sm text-gray-400 ml-2">{quantity}×</span>
                    )}
                </h2>
                <p className="text-sm text-gray-400">{category}</p>
                <div className="mt-2 flex justify-between text-sm text-gray-300">
                    <span>Tier: {tier}</span>
                    <span>{value}</span>
                </div>
            </div>
        </div>
    );
}

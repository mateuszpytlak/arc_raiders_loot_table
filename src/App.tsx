import { useState } from "react";
import { items } from "./data/items";
import ItemCard from "./components/ItemCard";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer.tsx";

const rarityOrder = {
    epic: 1,
    rare: 2,
    uncommon: 3,
    common: 4
};

export default function App() {
    const [query, setQuery] = useState("");

    const filtered = items.filter((i) =>
        i.name.toLowerCase().includes(query.toLowerCase())
    );

    const groups = ["Keep for Quests", "Upgrading Benches", "Safely Recycle"];

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">
                    ARC Raiders Loot Cheat Sheet
                </h1>

                <SearchBar query={query} setQuery={setQuery} />

                {groups.map((group) => {
                    const groupItems = filtered
                        .filter((i) => i.group === group)
                        .sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]); // 👈 sortowanie po rarity

                    if (!groupItems.length) return null;

                    return (
                        <section key={group} className="mt-10">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-1">
                                {group}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {groupItems.map((item) => (
                                    <ItemCard key={item.name} {...item} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
            <Footer />
        </div>
    );
}

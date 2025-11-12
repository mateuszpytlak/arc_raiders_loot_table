import { useState, useEffect } from "react";
import { trackPageview } from "./lib/ga";
import { items } from "./data/items";
import ItemCard from "./components/ItemCard";
import Footer from "./components/Footer";

export default function App() {
    const [query, setQuery] = useState("");

    const groups = [
        "Keep for Quests",
        "Keep for Projects",
        "Upgrading Benches",
        "Safely Recycle",
    ];

    useEffect(() => {
        trackPageview();
    }, []);

    const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-white">
            <main className="flex-1 px-6 pb-12 max-w-7xl mx-auto">
                {/* 🔍 Pasek wyszukiwania */}
                <div className="flex justify-center my-8 sticky top-0 bg-gray-950/80 backdrop-blur-sm py-4 z-10">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full max-w-md rounded-lg bg-gray-900 text-gray-200 px-4 py-2 border border-gray-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                    />
                </div>

                {/* 🔹 Sekcje z grupami */}
                {groups.map((group) => {
                    const groupItems = filtered
                        .filter((item) => item.group === group)
                        .sort(
                            (a, b) =>
                                ["epic", "rare", "uncommon", "common"].indexOf(a.rarity) -
                                ["epic", "rare", "uncommon", "common"].indexOf(b.rarity)
                        );

                    if (groupItems.length === 0) return null;

                    // 🧩 jeśli to "Upgrading Benches", grupujemy po workshop
                    const byWorkshop =
                        group === "Upgrading Benches"
                            ? Array.from(new Set(groupItems.map((i) => i.workshop).filter(Boolean)))
                            : [];

                    return (
                        <section
                            key={group}
                            className="mb-16 p-6 rounded-2xl bg-gradient-to-b from-gray-900/70 to-gray-800/40 backdrop-blur-sm shadow-md border border-gray-800/50"
                        >
                            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
                                {group}
                            </h2>

                            {group === "Upgrading Benches" && byWorkshop.length > 0 ? (
                                byWorkshop.map((ws) => {
                                    const wsItems = groupItems.filter((i) => i.workshop === ws);
                                    if (wsItems.length === 0) return null;
                                    return (
                                        <div key={ws} className="mb-10">
                                            <h3 className="text-xl font-semibold mb-6 text-sky-400">{ws}</h3>

                                            {Array.from(new Set(wsItems.map((i) => i.level))).sort((a, b) => (a ?? 0) - (b ?? 0)).map((lvl) => {
                                                const lvlItems = wsItems.filter((i) => i.level === lvl);
                                                if (lvlItems.length === 0) return null;

                                                return (
                                                    <div key={lvl} className="mb-8">
                                                        <div className="flex items-center gap-3 mb-3">
                                                          <span
                                                              className="inline-block bg-gray-800 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full border border-gray-700">
                                                            LEVEL {lvl}
                                                          </span>
                                                            <div className="flex-1 h-px bg-gray-700/50" />
                                                        </div>

                                                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                                            {lvlItems.map((item) => (
                                                                <ItemCard key={item.name} {...item} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                    {groupItems.map((item) => (
                                        <ItemCard key={item.name} {...item} />
                                    ))}
                                </div>
                            )}
                        </section>
                    );
                })}
            </main>

            <Footer />
        </div>
    );
}

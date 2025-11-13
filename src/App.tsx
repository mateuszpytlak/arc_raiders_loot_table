import { useState, useEffect } from "react";
import { trackPageview } from "./lib/ga";
import { items } from "./data/items";

import SearchBar from "./components/SearchBar";
import SettingsButton from "./components/SettingsButton";
import SidePanel from "./components/SidePanel";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";

import type { BenchLevels } from "./types/benches";
import ItemSection from "./components/ItemSection/ItemsSection";
import type { Item } from "./data/items";

const GROUPS: Item["group"][] = [
    "Keep for Quests",
    "Keep for Projects",
    "Upgrading Benches",
    "Safely Recycle",
];

export default function App() {
    const [query, setQuery] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);

    // --- Workbench levels (localStorage persistence)
    const [benchLevels, setBenchLevels] = useState<BenchLevels>(() => {
        const saved = localStorage.getItem("benchLevels");
        return saved
            ? JSON.parse(saved)
            : {
                gunsmith: 1,
                medical: 1,
                explosives: 1,
                refinery: 1,
                utility: 1,
                scrappy: 1,
            };
    });

    // --- Collapsed groups
    const [collapsedGroups, setCollapsedGroups] = useState<
        Record<Item["group"], boolean>
    >(() =>
        Object.fromEntries(GROUPS.map((g) => [g, false])) as Record<
            Item["group"],
            boolean
        >
    );

    // --- Track GA pageview
    useEffect(() => {
        trackPageview();
    }, []);

    // --- Persist bench levels
    useEffect(() => {
        localStorage.setItem("benchLevels", JSON.stringify(benchLevels));
    }, [benchLevels]);

    // --- Filter items by query
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    // --- Search handler with auto-expand logic
    const handleSearch = (value: string) => {
        setQuery(value);

        if (value.trim() === "") {
            // Reset → everything expanded
            const resetState = Object.fromEntries(
                GROUPS.map((g) => [g, false])
            ) as Record<Item["group"], boolean>;
            setCollapsedGroups(resetState);
            return;
        }

        const matchingGroups = new Set(
            items
                .filter((item) =>
                    item.name.toLowerCase().includes(value.toLowerCase())
                )
                .map((item) => item.group)
        );

        const newState = Object.fromEntries(
            GROUPS.map((g) => [g, !matchingGroups.has(g)])
        ) as Record<Item["group"], boolean>;

        setCollapsedGroups(newState);
    };

    // --- Global expand/collapse
    const expandAll = () => {
        setCollapsedGroups(
            Object.fromEntries(GROUPS.map((g) => [g, false])) as Record<
                Item["group"],
                boolean
            >
        );
    };

    const collapseAll = () => {
        setCollapsedGroups(
            Object.fromEntries(GROUPS.map((g) => [g, true])) as Record<
                Item["group"],
                boolean
            >
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-white">
            <SettingsButton onClick={() => setPanelOpen(true)} />

            <main className="flex-1 px-6 pb-12 max-w-7xl mx-auto">
                <SearchBar query={query} setQuery={handleSearch} />

                <ItemSection
                    items={filteredItems}
                    benchLevels={benchLevels}
                    collapsedGroups={collapsedGroups}
                    expandAll={expandAll}
                    collapseAll={collapseAll}
                    setCollapsedGroups={setCollapsedGroups}
                />
            </main>

            <SidePanel
                open={panelOpen}
                onClose={() => setPanelOpen(false)}
                benchLevels={benchLevels}
                setBenchLevels={setBenchLevels}
            />

            <CookieConsent />
            <Footer />
        </div>
    );
}

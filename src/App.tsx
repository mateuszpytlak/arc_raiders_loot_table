import { useCallback, useMemo, useState, useEffect } from "react";
import ItemsSection from "./components/ItemSection/ItemsSection";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import SettingsButton from "./components/SettingsButton";
import SidePanel from "./components/SidePanel";
import { items } from "./data/items";
import { usePersistentState } from "./hooks/usePersistentState";
import { ENABLE_GA, trackPageview } from "./lib/ga";
import { createDefaultBenchLevels, normalizeBenchLevels } from "./constants/benches";
import { createGroupCollapseState, ITEM_GROUPS } from "./constants/itemGroups";
import type { BenchLevels } from "./types/benches";
import type { Item } from "./data/items";

const SEARCH_PLACEHOLDER = "Search items...";

export default function App() {
    const [query, setQuery] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const [compactMode, setCompactMode] = useState(false);

    const [benchLevels, setBenchLevels] = usePersistentState<BenchLevels>(
        "benchLevels",
        () => createDefaultBenchLevels(),
    );

    const [collapsedGroups, setCollapsedGroups] = useState<
        Record<Item["group"], boolean>
    >(() => createGroupCollapseState(true));

    useEffect(() => {
        trackPageview();
    }, []);

    useEffect(() => {
        const normalized = normalizeBenchLevels(benchLevels);
        const isSame = Object.keys(normalized).every(
            (key) =>
                normalized[key as keyof BenchLevels] ===
                benchLevels[key as keyof BenchLevels],
        );
        if (!isSame) {
            setBenchLevels(normalized);
        }
    }, [benchLevels, setBenchLevels]);

    const searchIndex = useMemo(
        () => items.map((item) => ({ item, name: item.name.toLowerCase() })),
        [],
    );

    const filteredItems = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            return items;
        }
        return searchIndex
            .filter(({ name }) => name.includes(normalizedQuery))
            .map(({ item }) => item);
    }, [query, searchIndex]);

    const expandAll = useCallback(() => {
        setCollapsedGroups(createGroupCollapseState(false));
    }, []);

    const collapseAll = useCallback(() => {
        setCollapsedGroups(createGroupCollapseState(true));
    }, []);

    const handleToggleGroup = useCallback((group: Item["group"]) => {
        setCollapsedGroups((previous) => ({
            ...previous,
            [group]: !previous[group],
        }));
    }, []);

    const handleSearch = useCallback(
        (value: string) => {
            setQuery(value);

            const normalizedQuery = value.trim().toLowerCase();
            if (!normalizedQuery) {
                setCollapsedGroups(createGroupCollapseState(true));
                return;
            }

            const matchingGroups = new Set(
                searchIndex
                    .filter(({ name }) => name.includes(normalizedQuery))
                    .map(({ item }) => item.group),
            );

            setCollapsedGroups((previous) => {
                const next = { ...previous };
                ITEM_GROUPS.forEach((group) => {
                    next[group] = !matchingGroups.has(group);
                });
                return next;
            });
        },
        [searchIndex],
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-white">
            <SettingsButton onClick={() => setPanelOpen(true)} />

            <main className="flex-1 w-full px-6 pb-12 max-w-7xl mx-auto">
                <SearchBar
                    placeholder={SEARCH_PLACEHOLDER}
                    query={query}
                    onQueryChange={handleSearch}
                />

                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setCompactMode((current) => !current)}
                        className="px-3 py-1 text-sm bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 transition"
                    >
                        {compactMode
                            ? "Switch to Normal View"
                            : "Switch to Compact View"}
                    </button>
                </div>

                <ItemsSection
                    items={filteredItems}
                    benchLevels={benchLevels}
                    collapsedGroups={collapsedGroups}
                    expandAll={expandAll}
                    collapseAll={collapseAll}
                    onToggleGroup={handleToggleGroup}
                    compactMode={compactMode}
                />
            </main>

            <SidePanel
                open={panelOpen}
                onClose={() => setPanelOpen(false)}
                benchLevels={benchLevels}
                setBenchLevels={setBenchLevels}
            />

            {ENABLE_GA ? <CookieConsent /> : null}
            <Footer />
        </div>
    );
}

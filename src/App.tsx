import { useState, useEffect } from "react";
import { trackPageview } from "./lib/ga";
import { items } from "./data/items";

import SearchBar from "./components/SearchBar";
import SettingsButton from "./components/SettingsButton";
import SidePanel from "./components/SidePanel";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";
import type { BenchLevels } from "./types/benches";
import ItemsSection from "./components/ItemSection/ItemsSection.tsx";

export default function App() {
    const [query, setQuery] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);

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

    useEffect(() => {
        trackPageview();
    }, []);

    useEffect(() => {
        localStorage.setItem("benchLevels", JSON.stringify(benchLevels));
    }, [benchLevels]);

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-950 text-white">
            <SettingsButton onClick={() => setPanelOpen(true)} />
            <main className="flex-1 px-6 pb-12 max-w-7xl mx-auto">
                <SearchBar query={query} setQuery={setQuery} />
                <ItemsSection
                    items={filteredItems}
                    benchLevels={benchLevels}
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

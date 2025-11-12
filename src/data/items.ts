// src/data/items.ts

export interface Item {
    name: string;
    category: string;
    tier: number;
    value: number;
    group: "Keep for Quests" | "Upgrading Benches" | "Safely Recycle";
    rarity: "common" | "uncommon" | "rare" | "epic";
    image?: string;
    quantity?: number; // np. 3 → “3x”
}

const placeholder = "https://placehold.co/128x128?text=Item";

export const items: Item[] = [
    // === KEEP FOR QUESTS ===
    { name: "Wasp Driver", category: "ARC", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "rare", quantity: 3, image: "/images/items/wasp_driver.webp" },
    { name: "Water Pump", category: "Industrial", tier: 2, value: 1000, group: "Keep for Quests", rarity: "rare", quantity: 1, image: "/images/items/water_pump.webp" },
    { name: "Hornet Driver", category: "ARC", tier: 0.75, value: 2000, group: "Keep for Quests", rarity: "rare", quantity: 3, image: "/images/items/hornet_driver.webp" },
    { name: "Bicycle Pump", category: "Residential", tier: 0.75, value: 2000, group: "Keep for Quests", rarity: "rare", quantity: 1, image: "/images/items/bicycle_pump.webp" },
    { name: "Fireball Burner", category: "ARC", tier: 8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1, image: "/images/items/fireball_burner.webp" },
    { name: "Camera Lens", category: "Security", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1, image: "/images/items/camera_lens.webp" },
    { name: "Snitch Scanner", category: "ARC", tier: 0.75, value: 2000, group: "Keep for Quests", rarity: "uncommon", quantity: 2, image: "/images/items/snitch_scanner.webp" },
    { name: "Tick Pod", category: "ARC", tier: 8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1, image: "/images/items/tick_pod.webp" },
    { name: "Deflated Football", category: "Residential", tier: 8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1, image: "/images/items/deflated_football.webp" },


    // === UPGRADING BENCHES ===
    { name: "Bastion Cell", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "epic", quantity: 9 },
    { name: "Bombardier Cell", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "epic", quantity: 5 },
    { name: "Rocketeer Driver", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "epic", quantity: 4 },

    { name: "Wasp Driver", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 8 },
    { name: "Hornet Driver", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 8 },
    { name: "Cooling Fan", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5 },
    { name: "Sentinel Firing Core", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 4 },
    { name: "Fried Motherboard", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3 },
    { name: "Rusted Gear", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3 },

    { name: "Rusted Shut Medical Kit", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3 },
    { name: "Power Cable", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3 },
    { name: "Motor", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3 },
    { name: "Laboratory Reagents", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3 },
    { name: "Cracked Bioscanner", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 2 },
    { name: "Surveyor Vault", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 2 },
    { name: "Toaster", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3 },

    { name: "Tick Pod", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 8 },
    { name: "Snitch Scanner", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 8 },


    { name: "Pop Trigger", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "common", quantity: 8 },


    // === SAFELY RECYCLE ===
    { name: "Ruined Accordion", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare", image: placeholder },
    { name: "Alarm Clock", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare", image: placeholder },
    { name: "ARC Coolant", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare", image: placeholder },
    { name: "ARC Flex Rubber", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare", image: placeholder },
    { name: "ARC Performance Steel", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare", image: placeholder },
    { name: "ARC Synthetic Resin", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare", image: placeholder },
    { name: "ARC Thermo Lining", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare", image: placeholder },
    { name: "Torn Blanket", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare", image: placeholder },
    { name: "Bicycle Pump", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Broken Flashlight", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Broken Guidance System", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Broken Handheld Radio", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Broken Teaser", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Coolant", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Cooling Coil", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Ruined Riot Shield", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Turbo Pump", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Diving Googles", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Expired Respirator", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Frying Pan", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Headphones", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Industrial Charger", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Industrial Magnet", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Polluted Air Filter", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Spring Cushion", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Water Filter", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Portable TV", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Power Bank", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Projector", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Radio", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Remote Control", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Rubber Pad", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},
    { name: "Thermostat", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare", image: placeholder},

    { name: "Ruined HandCuffs", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Burned ARC Circuitry", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Candle Holder", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Crumbled Plastic Bottle", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Damaged ARC Motion Core", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Deflated Football", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Degraded ARC Rubber", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Rusted Bolts", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Dried-Out ARC Resin", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Garlic Press", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Household Cleaner", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Ice Cream Scooper", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Impure ARC Coolant", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Metal Brackets", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Number Plate", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Ripped Safety Vest", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Tattered Clothes", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Tattered ARC Lining", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Spotter Relay", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Rusty ARC Steel", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Ruined Parachute", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Ruined Tactical Vest", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },
    { name: "Ruined Baton", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon", image: placeholder },

    { name: "Damaged Rocketeer Driver", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "common", image: placeholder },
];

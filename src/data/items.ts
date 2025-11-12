export interface Item {
    name: string;
    category: string;
    tier: number;
    value: number;
    group: "Keep for Quests" | "Keep for Projects" | "Upgrading Benches" | "Safely Recycle";
    rarity: "common" | "uncommon" | "rare" | "epic";
    image: string;
    quantity?: number;
    workshop?: string;
    level?: number;
}

const makeImagePath = (name: string): string => {
    const fileName = name
        .toLowerCase()
        .replace(/[^\w\s]/g, "") // usuń znaki specjalne
        .replace(/\s+/g, "_") + ".webp";
    return `/images/items/${fileName}`;
};

const placeholder = "https://placehold.co/128x128?text=Item";

const baseItems = [
// === KEEP FOR QUESTS ===
    { name: "Leaper Pulse Unit", category: "ARC", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "epic", quantity: 1 },
    { name: "Power Rod", category: "ARC", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "epic", quantity: 1 },
    { name: "Rocketeer Driver", category: "ARC", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "epic", quantity: 1 },

    { name: "Surveyor Vault", category: "ARC", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "rare", quantity: 1 },
    { name: "Antiseptic", category: "ARC", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "rare", quantity: 2 },
    { name: "Hornet Driver", category: "ARC", tier: 0.75, value: 2000, group: "Keep for Quests", rarity: "rare", quantity: 2 },
    { name: "Syringe", category: "ARC", tier: 0.75, value: 2000, group: "Keep for Quests", rarity: "rare", quantity: 1 },
    { name: "Wasp Driver", category: "ARC", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "rare", quantity: 2 },
    { name: "Water Pump", category: "Industrial", tier: 2, value: 1000, group: "Keep for Quests", rarity: "rare", quantity: 1 },

    { name: "Snitch Scanner", category: "Industrial", tier: 2, value: 1000, group: "Keep for Quests", rarity: "uncommon", quantity: 2 },

    { name: "Camera Lens", category: "Security", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1 },


    // { name: "Bicycle Pump", category: "Residential", tier: 0.75, value: 2000, group: "Keep for Quests", rarity: "rare", quantity: 1, image: "/images/items/bicycle_pump.webp" },
    // { name: "Fireball Burner", category: "ARC", tier: 8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1, image: "/images/items/fireball_burner.webp" },
    // { name: "Camera Lens", category: "Security", tier: 0.8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1, image: "/images/items/camera_lens.webp" },
    // { name: "Snitch Scanner", category: "ARC", tier: 0.75, value: 2000, group: "Keep for Quests", rarity: "uncommon", quantity: 2, image: "/images/items/snitch_scanner.webp" },
    // { name: "Tick Pod", category: "ARC", tier: 8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1, image: "/images/items/tick_pod.webp" },
    // { name: "Deflated Football", category: "Residential", tier: 8, value: 640, group: "Keep for Quests", rarity: "uncommon", quantity: 1, image: "/images/items/deflated_football.webp" },

    // === KEEP FOR PROJECTS ===
    { name: "Leaper Pulse Unit", category: "ARC", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "epic", quantity: 3 },
    { name: "Magnetic Accelerator", category: "ARC", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "epic", quantity: 3 },
    { name: "Exodus Modules", category: "ARC", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "epic", quantity: 1 },

    { name: "Adv. Electrical Components", category: "Electrical", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "rare", quantity: 5 },
    { name: "Humidifier", category: "Residential", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "rare", quantity: 5 },
    { name: "Sensors", category: "Technological", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "rare", quantity: 20 },
    { name: "Cooling Fan", category: "Technological", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "rare", quantity: 5 },

    { name: "Battery", category: "Technological", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "uncommon", quantity: 30 },
    { name: "Light Bulb", category: "Technological", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "uncommon", quantity: 5 },
    { name: "Electrical Components", category: "Electrical", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "uncommon", quantity: 30 },
    { name: "Wires", category: "Electrical", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "uncommon", quantity: 30 },
    { name: "Durable Cloth", category: "Electrical", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "uncommon", quantity: 35 },
    { name: "Steel Spring", category: "Electrical", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "uncommon", quantity: 15 },
    { name: "ARC Alloy", category: "Electrical", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "uncommon", quantity: 80 },

    { name: "Rubber Parts", category: "Electrical", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "common", quantity: 150 },
    { name: "Metal Parts", category: "Electrical", tier: 0.8, value: 640, group: "Keep for Projects", rarity: "common", quantity: 200 },

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

    // === Scrappy  ===
    { name: "Dog Collar", category: "Residential", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 1, workshop: "Scrappy", level: 2, },
    { name: "Lemon", category: "Nature", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 3, workshop: "Scrappy", level: 3 },
    { name: "Apricot", category: "Nature", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 3, workshop: "Scrappy", level: 3 },
    { name: "Prickly Pear", category: "Nature", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 6, workshop: "Scrappy", level: 4 },
    { name: "Olives", category: "Nature", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 6, workshop: "Scrappy", level: 4 },
    { name: "Cat Bed", category: "Commercial", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 1, workshop: "Scrappy", level: 4 },
    { name: "Mushroom", category: "Nature", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 12, workshop: "Scrappy", level: 5 },
    { name: "Apricot", category: "Nature", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 12, workshop: "Scrappy", level: 5 },
    { name: "Very Comfortable Pillow", category: "Nature", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 3, workshop: "Scrappy", level: 5 },

    // === Gunsmith Bench  ===
    { name: "Rusted Tools", category: "Mechanical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Gunsmith Bench", level: 2 },
    { name: "Mechanical Components", category: "Mechanical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5, workshop: "Gunsmith Bench", level: 2 },
    { name: "Wasp Driver", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 8, workshop: "Gunsmith Bench", level: 2 },
    { name: "Rusted Gear", category: "Industrial", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Gunsmith Bench", level: 3 },
    { name: "Adv. Mechanical Components", category: "Mechanical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5, workshop: "Gunsmith Bench", level: 3 },
    { name: "Sentinel Firing Core", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 4, workshop: "Gunsmith Bench", level: 3 },

    // === Medical Lab  ===
    { name: "Cracked Bioscanner", category: "Medical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 2, workshop: "Medical Lab", level: 2 },
    { name: "Durable Cloth", category: "Medical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 5, workshop: "Medical Lab", level: 2 },
    { name: "Tick Pod", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 8, workshop: "Medical Lab", level: 2 },
    { name: "Rusted Shut Medical Kit", category: "Medical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Medical Lab", level: 3 },
    { name: "Antiseptic", category: "Mechanical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 8, workshop: "Medical Lab", level: 3 },
    { name: "Surveyor Vault", category: "Mechanical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5, workshop: "Medical Lab", level: 3 },

    // === Explosives Station  ===
    { name: "Synthesized Fuel", category: "Exodus", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Explosives Station", level: 2 },
    { name: "Crude Explosives", category: "Industrial", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 5, workshop: "Explosives Station", level: 2 },
    { name: "Pop Trigger", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "common", quantity: 5, workshop: "Explosives Station", level: 2 },
    { name: "Laboratory Reagents", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Explosives Station", level: 3 },
    { name: "Explosive Compound", category: "Industrial", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5, workshop: "Explosives Station", level: 3 },
    { name: "Rocketeer Driver", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "epic", quantity: 3, workshop: "Explosives Station", level: 3 },

    // === Gear Bench  ===
    { name: "Power Cable", category: "Commercial", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Gear Bench", level: 2 },
    { name: "Hornet Driver", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5, workshop: "Gear Bench", level: 2 },
    { name: "Electrical Components", category: "Electrical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 5, workshop: "Gear Bench", level: 2 },
    { name: "Industrial Battery", category: "Industrial", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Gear Bench", level: 3 },
    { name: "Adv. Electrical Components", category: "Electrical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5, workshop: "Gear Bench", level: 3 },
    { name: "Bastion Cell", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "epic", quantity: 6, workshop: "Gear Bench", level: 3},

    // === Refinery  ===
    { name: "Toaster", category: "Residential", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Rafinery", level: 2 },
    { name: "ARC Motion Core", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5, workshop: "Rafinery", level: 2 },
    { name: "Fireball Burner", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 8, workshop: "Rafinery", level: 2 },
    { name: "Motor", category: "Mechanical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3, workshop: "Rafinery", level: 3 },
    { name: "ARC Circuitry", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 10, workshop: "Rafinery", level: 3 },
    { name: "Bombardier Cell", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "epic", quantity: 6, workshop: "Rafinery", level: 3 },

    // === Utility Station  ===
    { name: "Damaged Heat Sink", category: "Technological", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 2 , workshop: "Utility Station", level: 2 },
    { name: "Electrical Components", category: "Electrical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 5 , workshop: "Utility Station", level: 2 },
    { name: "Snitch Scanner", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "uncommon", quantity: 6 , workshop: "Utility Station", level: 2 },
    { name: "Fried Motherboard", category: "Technological", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 3 , workshop: "Utility Station", level: 3 },
    { name: "Adv. Electrical Components", category: "Electrical", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "rare", quantity: 5 , workshop: "Utility Station", level: 3 },
    { name: "Leaper Pulse Unit", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "epic", quantity: 4, workshop: "Utility Station", level: 3 },



    // === SCRAPPY ===

    { name: "Pop Trigger", category: "ARC", tier: 1, value: 5000, group: "Upgrading Benches", rarity: "common", quantity: 8 },

    // === SAFELY RECYCLE ===
    { name: "Accordion", category: "Residential", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare" },
    { name: "Alarm Clock", category: "Residential", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare" },
    { name: "ARC Coolant", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare" },
    { name: "ARC Flex Rubber", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare"  },
    { name: "ARC Performance Steel", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare" },
    { name: "ARC Synthetic Resin", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare" },
    { name: "ARC Thermo Lining", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare" },
    { name: "Bicycle Pump", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Broken Flashlight", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Broken Guidance System", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Broken Handheld Radio", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Broken Teser", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Burned ARC Circuitry", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "uncommon" },
    { name: "Camera Lens", category: "Security", tier: 0.8, value: 640, group: "Safely Recycle", rarity: "uncommon", quantity: 1 },
    { name: "Candle Holder", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Coolant", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Cooling Coil", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Crumpled Plastic Bottle", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "uncommon" },
    { name: "Damaged ARC Motion Core", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Damaged ARC Powercell", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Damaged Rocketeer Driver", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "common"  },
    { name: "Deflated Football", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Degraded ARC Rubber", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Diving Googles", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "rare"  },
    { name: "Dried-Out ARC Resin", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Expired Respirator", category: "Medical", tier: 1, value: 640, group: "Safely Recycle", rarity: "rare"  },
    { name: "Flute", category: "Residential", tier: 1, value: 640, group: "Safely Recycle", rarity: "rare"  },
    { name: "Frying Pan", category: "Residential", tier: 1, value: 640, group: "Safely Recycle", rarity: "rare"  },
    { name: "Garlic Press", category: "Residential", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Headphones", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Ice Cream Scooper", category: "Commercial", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "uncommon" },
    { name: "Household Cleaner", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Impure ARC Coolant", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Industrial Charger", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Industrial Magnet", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Metal Brackets", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "uncommon" },
    { name: "Number Plate", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Polluted Air Filter", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Portable TV", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Power Bank", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Projector", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Radio", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Remote Control", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Ripped Safety Vest", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Rubber Pad", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Ruined Accordion", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare"  },
    { name: "Ruined Baton", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Ruined Handcuffs", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Ruined Parachute", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Ruined Riot Shield", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Ruined Tactical Vest", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "uncommon" },
    { name: "Rusted Bolts", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Rusty ARC Steel", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Spotter Relay", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Spring Cushion", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Tattered ARC Lining", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Tattered Clothes", category: "ARC", tier: 1, value: 640, group: "Safely Recycle", rarity: "uncommon"  },
    { name: "Thermostat", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Torn Blanket", category: "ARC", tier: 1, value: 1000, group: "Safely Recycle", rarity: "rare"  },
    { name: "Turbo Pump", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
    { name: "Water Filter", category: "Residential", tier: 0.75, value: 2000, group: "Safely Recycle", rarity: "rare" },
] as const;

export const items: Item[] = baseItems.map((item) => ({
    ...item,
    image: makeImagePath(item.name) || placeholder,
}));

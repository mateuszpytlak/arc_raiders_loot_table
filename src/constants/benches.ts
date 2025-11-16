import type { BenchKey, BenchLevels } from "../types/benches";

export interface BenchDefinition {
    key: BenchKey;
    label: string;
    maxLevel: number;
}

export const BENCH_DEFINITIONS: BenchDefinition[] = [
    { key: "scrappy", label: "Scrappy", maxLevel: 5 },
    { key: "gunsmith", label: "Gunsmith Bench", maxLevel: 3 },
    { key: "medical", label: "Medical Lab", maxLevel: 3 },
    { key: "explosives", label: "Explosives Station", maxLevel: 3 },
    { key: "gear", label: "Gear Bench", maxLevel: 3 },
    { key: "refinery", label: "Refinery", maxLevel: 3 },
    { key: "utility", label: "Utility Station", maxLevel: 3 },
] as const;

export const BENCH_BY_WORKSHOP: Record<string, BenchDefinition> =
    BENCH_DEFINITIONS.reduce<Record<string, BenchDefinition>>((acc, bench) => {
        acc[bench.label] = bench;
        return acc;
    }, {});

export const createDefaultBenchLevels = (): BenchLevels =>
    BENCH_DEFINITIONS.reduce<BenchLevels>((levels, bench) => {
        levels[bench.key] = 1;
        return levels;
    }, {} as BenchLevels);
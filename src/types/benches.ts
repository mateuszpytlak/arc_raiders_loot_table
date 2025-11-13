export type BenchKey =
    | "gunsmith"
    | "medical"
    | "explosives"
    | "refinery"
    | "utility"
    | "scrappy"
    | "gear";

export type BenchLevels = Record<BenchKey, number>;

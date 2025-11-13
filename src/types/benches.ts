export type BenchKey =
    | "gunsmith"
    | "medical"
    | "explosives"
    | "refinery"
    | "utility"
    | "scrappy";

export type BenchLevels = Record<BenchKey, number>;

import type { Item } from "../data/items";

export const ITEM_GROUPS: readonly Item["group"][] = [
    "Keep for Quests",
    "Keep for Projects",
    "Upgrading Benches",
    "Safely Recycle",
] as const;

export const createGroupCollapseState = (collapsed: boolean) =>
    ITEM_GROUPS.reduce<Record<Item["group"], boolean>>((state, group) => {
        state[group] = collapsed;
        return state;
    }, {} as Record<Item["group"], boolean>);
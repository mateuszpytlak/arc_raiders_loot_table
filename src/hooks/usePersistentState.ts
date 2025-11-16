import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type Initializer<T> = T | (() => T);

const resolveInitializer = <T,>(value: Initializer<T>): T =>
    typeof value === "function" ? (value as () => T)() : value;


export function usePersistentState<T>(
    storageKey: string,
    initialValue: Initializer<T>,
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        if (typeof window === "undefined") {
            return resolveInitializer(initialValue);
        }

        try {
            const stored = window.localStorage.getItem(storageKey);
            if (stored != null) {
                return JSON.parse(stored) as T;
            }
        } catch (error) {
            // Swallow storage errors (quota exceeded, invalid JSON, private mode, etc.)
            console.warn(`[usePersistentState] Failed to read key "${storageKey}":`, error);
        }

        return resolveInitializer(initialValue);
    });

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        try {
            window.localStorage.setItem(storageKey, JSON.stringify(state));
        } catch (error) {
            console.warn(`[usePersistentState] Failed to write key "${storageKey}":`, error);
        }
    }, [storageKey, state]);

    return [state, setState];
}
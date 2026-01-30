// src/lib/ga.ts

// Pobiera ID z .env
export const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

type Gtag = (...args: unknown[]) => void;

/**
 * Wysyła page_view do Google Analytics 4.
 */
export const trackPageview = (path?: string) => {
    if (!GA_ID || typeof window === "undefined") return;
    const gtag = (window as { gtag?: Gtag }).gtag;
    if (!gtag) return;
    gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: path || window.location.pathname,
    });
};

/**
 * Wysyła dowolne zdarzenie niestandardowe.
 */
export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
    if (!GA_ID || typeof window === "undefined") return;
    const gtag = (window as { gtag?: Gtag }).gtag;
    if (!gtag) return;
    gtag("event", eventName, params);
};

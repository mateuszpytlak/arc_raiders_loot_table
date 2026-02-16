export const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
export const ENABLE_GA =
    import.meta.env.PROD &&
    import.meta.env.VITE_DISABLE_GA !== "true" &&
    Boolean(GA_ID);

type Gtag = (...args: unknown[]) => void;

type WindowWithGtag = Window & {
    dataLayer?: unknown[];
    gtag?: Gtag;
};

const ensureGaInitialized = () => {
    if (!ENABLE_GA || !GA_ID || typeof window === "undefined") {
        return;
    }

    const w = window as WindowWithGtag;

    if (!w.dataLayer) {
        w.dataLayer = [];
    }

    if (!w.gtag) {
        w.gtag = (...args: unknown[]) => {
            w.dataLayer?.push(args);
        };
    }

    if (document.getElementById("ga4-script")) {
        return;
    }

    w.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
    });

    w.gtag("js", new Date());
    w.gtag("config", GA_ID, {
        send_page_view: false,
        cookie_domain: window.location.hostname,
    });

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
};

export const trackPageview = (path?: string) => {
    if (!ENABLE_GA || typeof window === "undefined") return;
    ensureGaInitialized();

    const gtag = (window as WindowWithGtag).gtag;
    if (!gtag) return;

    gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: path || window.location.pathname,
    });
};

export const trackEvent = (
    eventName: string,
    params: Record<string, unknown> = {},
) => {
    if (!ENABLE_GA || typeof window === "undefined") return;
    ensureGaInitialized();

    const gtag = (window as WindowWithGtag).gtag;
    if (!gtag) return;

    gtag("event", eventName, params);
};

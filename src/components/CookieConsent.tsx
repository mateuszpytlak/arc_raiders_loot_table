import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cookieConsent";

type ConsentValue = "granted" | "denied";

const isBrowser = () => typeof window !== "undefined";

const readStoredConsent = (): ConsentValue | null => {
    if (!isBrowser()) {
        return null;
    }

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return null;
        }

        return stored === "granted" ? "granted" : "denied";
    } catch (error) {
        console.warn("[CookieConsent] Unable to read stored consent:", error);
        return null;
    }
};

export default function CookieConsent() {
    const [initialConsent] = useState<ConsentValue | null>(() => readStoredConsent());
    const [visible, setVisible] = useState<boolean>(initialConsent === null);
    const [consent, setConsent] = useState<ConsentValue>(
        initialConsent ?? "denied",
    );

    useEffect(() => {
        if (!isBrowser()) {
            return;
        }

        try {
            window.localStorage.setItem(STORAGE_KEY, consent);
        } catch (error) {
            console.warn("[CookieConsent] Unable to persist consent:", error);
        }

        const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
            gtag("consent", "update", {
                analytics_storage: consent,
            });
        }
    }, [consent]);

    const accept = useCallback(() => {
        setConsent("granted");
        setVisible(false);
    }, []);

    const reject = useCallback(() => {
        setConsent("denied");
        setVisible(false);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-gray-300 px-6 py-4 rounded-xl shadow-xl z-50 backdrop-blur-sm w-[90%] max-w-lg">
            <p className="text-sm mb-4">
                This site uses cookies for anonymous analytics (GA4). You can accept or decline tracking.
            </p>

            <div className="flex justify-end gap-3">
                <button
                    onClick={reject}
                    className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm"
                    type="button"
                >
                    Decline
                </button>

                <button
                    onClick={accept}
                    className="cursor-pointer px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-md text-sm text-white"
                    type="button"
                >
                    Accept
                </button>
            </div>
        </div>
    );
}

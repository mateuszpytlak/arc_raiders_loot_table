import { useState, useEffect } from "react";

// Typ zgody
type ConsentValue = "granted" | "denied";

export default function CookieConsent() {
    const [visible, setVisible] = useState<boolean>(() => {
        const stored = localStorage.getItem("cookieConsent");
        return stored ? false : true; // jeśli nie ma zgody → pokaż
    });

    const [consent, setConsent] = useState<ConsentValue>(() => {
        const stored = localStorage.getItem("cookieConsent");
        return (stored as ConsentValue) || "denied";
    });

    // zapisujemy do localStorage + robimy update consent mode
    useEffect(() => {
        localStorage.setItem("cookieConsent", consent);

        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("consent", "update", {
                analytics_storage: consent,
            });
        }
    }, [consent]);

    const accept = () => {
        setConsent("granted");
        setVisible(false);
    };

    const reject = () => {
        setConsent("denied");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-gray-300 px-6 py-4 rounded-xl shadow-xl z-50 backdrop-blur-sm w-[90%] max-w-lg">
            <p className="text-sm mb-4">
                This site uses cookies for anonymous analytics (GA4).
                You can accept or decline tracking.
            </p>

            <div className="flex justify-end gap-3">
                <button
                    onClick={reject}
                    className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm"
                >
                    Decline
                </button>

                <button
                    onClick={accept}
                    className="cursor-pointer px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-md text-sm text-white"
                >
                    Accept
                </button>
            </div>
        </div>
    );
}

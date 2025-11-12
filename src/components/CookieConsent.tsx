import { useEffect, useState } from "react";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setTimeout(() => setVisible(true), 1000);
        }
    }, []);

    const handleConsent = (accepted: boolean) => {
        localStorage.setItem("cookieConsent", accepted ? "accepted" : "rejected");
        setVisible(false);

        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("consent", "update", {
                analytics_storage: accepted ? "granted" : "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
                functionality_storage: "granted",
                security_storage: "granted",
            });

            if (accepted && import.meta.env.VITE_GA_ID) {
                (window as any).gtag("config", import.meta.env.VITE_GA_ID, {
                    send_page_view: true,
                });
            }
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900/95 border-t border-gray-800 text-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between z-50 backdrop-blur">
            <p className="text-sm text-gray-300 max-w-[90%]">
                This site uses cookies for analytics. You can accept or reject tracking.
            </p>

            <div className="mt-3 sm:mt-0 flex gap-3">
                <button
                    onClick={() => handleConsent(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                >
                    Reject
                </button>
                <button
                    onClick={() => handleConsent(true)}
                    className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                >
                    Accept
                </button>
            </div>
        </div>
    );
}

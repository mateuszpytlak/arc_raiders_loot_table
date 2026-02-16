import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";

const ENABLE_VERCEL_ANALYTICS =
    import.meta.env.PROD &&
    import.meta.env.VITE_DISABLE_VERCEL_ANALYTICS !== "true";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
        {ENABLE_VERCEL_ANALYTICS ? <Analytics /> : null}
    </React.StrictMode>
);

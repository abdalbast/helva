import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { reportWebVitals } from "./lib/web-vitals";

// Analytics is now initialized by CookieConsent after user consent
reportWebVitals();

createRoot(document.getElementById("root")!).render(<App />);

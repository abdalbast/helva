import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";
import { reportWebVitals } from "./lib/web-vitals";

initAnalytics();
reportWebVitals();

createRoot(document.getElementById("root")!).render(<App />);

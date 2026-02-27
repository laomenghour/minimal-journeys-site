import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/sora/100.css";
import "@fontsource/sora/200.css";
import "@fontsource/sora/300.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

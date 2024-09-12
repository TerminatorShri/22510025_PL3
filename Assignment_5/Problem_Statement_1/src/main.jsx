import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../src/components/AgentList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

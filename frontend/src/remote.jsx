import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Remote from "./components/Remote";
import { RuntimeConfigProvider } from "./util/RuntimeConfig";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RuntimeConfigProvider>
      <Remote />
    </RuntimeConfigProvider>
  </StrictMode>,
);

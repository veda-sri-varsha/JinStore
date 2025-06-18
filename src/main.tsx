import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "./context/Providers.tsx";
import { SearchProvider } from "./context/SearchContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchProvider>
      <Providers>
        <App />
      </Providers>
    </SearchProvider>
  </StrictMode>
);

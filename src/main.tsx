import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./providers/UserProvider.tsx";
import { QuoteProvider } from "./providers/QuoteProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </UserProvider>
  </React.StrictMode>
);

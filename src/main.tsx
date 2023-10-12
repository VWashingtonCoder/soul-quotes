import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./providers/UserProvider.tsx";
import { QuoteProvider } from "./providers/QuoteProvider.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <UserProvider>
      <QuoteProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuoteProvider>
    </UserProvider>
  </React.StrictMode>
);

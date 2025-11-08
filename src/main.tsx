import React from "react";
import ReactDOM from "react-dom/client";
import AppProviders from "./providers/AppProviders";
import App from "./App";
import "./styles/globals.css";
import { appKit } from "./appkit/appkit"; // initialize AppKit once

// expose for modal open anywhere (optional)
(window as any).appKit = appKit;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);


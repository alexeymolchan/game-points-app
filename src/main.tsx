import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { itemsMap } from "./constants.ts";
import "./index.css";

console.log(`Game Points App v${APP_VERSION}`);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App itemsConfig={itemsMap} />
  </React.StrictMode>
);

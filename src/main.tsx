import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { itemsMap } from "./constants.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App itemsConfig={itemsMap} />
  </React.StrictMode>
);
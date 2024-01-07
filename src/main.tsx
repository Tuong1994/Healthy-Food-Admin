import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GridProvider from "./components/UI/Grid/Provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GridProvider>
      <App />
    </GridProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import GridProvider from "./components/UI/Grid/Provider";
import App from "./App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GridProvider>
        <App />
      </GridProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

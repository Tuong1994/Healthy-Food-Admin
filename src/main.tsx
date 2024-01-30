import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import GridProvider from "./components/UI/Grid/Provider";
import App from "./App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <GridProvider>
          <App />
        </GridProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

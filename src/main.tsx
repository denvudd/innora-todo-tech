import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider as AppStoreProvider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppStoreProvider store={store}>
        <PersistGate loading="loading" persistor={persistor}>
          <App />
        </PersistGate>
      </AppStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);

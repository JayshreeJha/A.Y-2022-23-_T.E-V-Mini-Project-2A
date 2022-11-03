import React from "react";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CLIENT_ID_GOOGLE?: string;
    }
  }
}

const CLIENT_ID: string =
  process.env.REACT_APP_CLIENT_ID_GOOGLE ?? (() => {
    throw new Error("Missing REACT_APP_CLIENT_ID_GOOGLE in environment variables");
  })();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Optional: performance measuring
reportWebVitals();

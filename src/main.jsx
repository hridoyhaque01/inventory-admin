import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store.jsx";
import "./index.css";
import("preline");

const getCurrentLoadPath = (language) => {
  if (window.location.pathname.includes("/eyJhbGciOiJIUzI1NiIsInR5")) {
    return `../assets/langs/${language}/translation.json`;
  } else {
    return `./assets/langs/${language}/translation.json`;
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "bn"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: getCurrentLoadPath("{{lng}}"),
    },
  });

const loadingMarkup = (
  <div className="p-10 text-center">
    <h2>Loading...</h2>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={loadingMarkup}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);

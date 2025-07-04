// utils/i18n.ts

"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../locales/en/translation.json";
import esTranslation from "../locales/es/translation.json";

// Ensure this only runs on the client
const getInitialLanguage = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("language") || "en";
    }
    return "en"; // Default language for SSR
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            es: { translation: esTranslation },
        },
        lng: getInitialLanguage(),
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

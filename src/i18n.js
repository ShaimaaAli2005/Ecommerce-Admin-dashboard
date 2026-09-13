import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import arSidebar from "./locales/ar/sidebar.json";
import enSidebar from "./locales/en/sidebar.json";

import arSettings from "./locales/ar/settings.json";
import enSettings from "./locales/en/settings.json";

import arNavbar from "./locales/ar/navbar.json";
import enNavbar from "./locales/en/navbar.json";



i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        sidebar: arSidebar,
        settings: arSettings,
        navbar: arNavbar,
      },

      en: {
        sidebar: enSidebar,
        settings: enSettings,
        navbar: enNavbar,
      },
    },

    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

const updateDirection = (language) => {
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = language;
};

updateDirection(i18n.language);

i18n.on("languageChanged", (language) => {
  updateDirection(language);
});

export default i18n;
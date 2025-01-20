import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { ENV } from "../utils/constants";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: `${ENV.BASE_API_URL}/locale?key={{lng}}`,
    },
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
    },
  });

export default i18n;

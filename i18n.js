import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "src/locales/en.json";
import frTranslation from "src/locales/fr.json";

const resources = {
  en: {
    translation: enTranslation
  },
  fr: {
    translation: frTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
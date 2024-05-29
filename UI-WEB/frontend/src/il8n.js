import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import arTranslations from './translations/ar.json';

i18n.use(initReactI18next)
 .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    lng: 'ar', // Set the initial language
    fallbackLng: 'ar', // Use 'en' if the language is not available
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },
  });

export default i18n;

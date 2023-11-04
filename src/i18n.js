import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './languages/en.json';
import filTransalation from './languages/fil.json';

// Check if the user's selected language is stored in localStorage
const storedLanguage = localStorage.getItem('userLanguage');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fil: {
        translation: filTransalation,
      },
      en: {
        translation: enTranslation,
      },     
    },
    lng: storedLanguage || 'en', // Use the stored language or the default language
    fallbackLng: 'fil', // Fallback language if the translation is missing
    interpolation: {
      escapeValue: false, // React already escapes the values
    },
  });

export default i18n;



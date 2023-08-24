import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './languages/en.json';
import filTransalation from './languages/fil.json';

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
    lng: 'fil', // Default language
    fallbackLng: 'en', // Fallback language if the translation is missing
    interpolation: {
      escapeValue: false, // React already escapes the values
    },
  });

export default i18n;

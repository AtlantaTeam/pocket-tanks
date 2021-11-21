import i18n from 'i18next';
import { initReactI18next, useTranslation, useSSR } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { RU } from './ru';
import { EN } from './en';

const languages = {
    en: {
        translation: EN,
    },
    ru: {
        translation: RU,
    },
};

(async () => {
    await i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            detection: {
                order: ['htmlTag'],
            },
            fallbackLng: 'en',
            supportedLngs: ['en', 'ru'],
            load: 'languageOnly',
            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
            },
            resources: {
                ...languages,
            },
        });

    // await i18n.changeLanguage('en');
})()
    .then(() => true)
    .catch(() => false);

export {
    i18n, languages, useTranslation, useSSR,
};

import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import * as en from './en.json';
import * as pt from './pt.json';

const i18n = new I18n({
  en: en,
  pt: pt,
});

i18n.locale = getLocales()[0].languageCode;
i18n.fallbacks = true;

export const translate = (key) => i18n.t(key);

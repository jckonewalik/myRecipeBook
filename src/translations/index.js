import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import * as en from './en.json';
import * as pt from './pt.json';

const i18n = new I18n({
  en,
  'pt-BR': pt,
});

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export const translate = (key) => i18n.t(key);

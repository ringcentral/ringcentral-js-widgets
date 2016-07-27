import { SWITCH_LANGUAGE } from './actions';
import data from './data';

export reducer from './reducer';
export function switchLanguage(lang) {
  return {
    type: SWITCH_LANGUAGE,
    lang,
  };
}
export function getString(lang, key) {
  return data[lang][key];
}

import en from './enUS';
import vi from './viVN';

export interface Locale {
  vi: any;
  en: any;
  [key: string]: any;
}
const locale: Locale = { vi, en };

export default locale;

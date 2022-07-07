import { Locale } from 'antd/lib/locale-provider';

export interface ILocale extends Locale {
  [key: string]: any;
}

import { Brand } from '../Brand';

export interface ThemeOptions {}
export interface Deps {
  brand: Brand;
  themeOptions?: ThemeOptions;
}

import { Brand } from '../BrandV2';

export interface TabManagerOptions {
  enableCache?: boolean;
}

export interface Deps {
  brand: Brand;
  tabManagerOptions?: TabManagerOptions;
}

export interface TabEvent {
  name: string;
  args?: any[];
}

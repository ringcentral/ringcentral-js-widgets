import { BrandConfig } from './Brand.interface';

export function createBrandConfig<T extends BrandConfig>(config: T): T {
  return config;
}

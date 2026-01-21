import type { BrandConfig } from './BrandConfig.interface';

export function createBrandConfig<T extends BrandConfig>(config: T): T {
  return config;
}

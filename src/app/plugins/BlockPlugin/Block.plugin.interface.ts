import type { RcLoadingProps } from '@ringcentral/juno';
import type { ComponentType } from 'react';

export type BlockItem = {
  /**
   * does show backdrop or not
   *
   * only works in spring-ui theme system
   *
   * @default true
   */
  backdrop?: boolean;
} & Omit<RcLoadingProps, 'loading' | 'children'>;

export interface BlockPluginOptions {
  component?: ComponentType<RcLoadingProps>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  DehydratedPortal,
  RcViewModule,
} from '@ringcentral-integration/next-core';
import type { ComponentType } from 'react';

import { NonJSXModalItemProps } from './ModalItemView/ModalItem.view.interface';

export type ModalDehydratedPortal<
  T extends Record<string, any> = Record<string, any>,
> = DehydratedPortal<ModalCreatorOptions<T>, T>;

export interface ModalRef {
  /**
   * full custom title header
   */
  header?: ComponentType | null;
  /**
   * full custom footer
   */
  footer?: ComponentType | null;
  [key: string]: any;
}

export interface ModalCreatorOptions<T = any> {
  /**
   * target to render modal view.
   *
   * when need custom `footer` and `title`, can set those field in view module.
   *
   * if you need full custom, you can set `header` and `footer` be null. and custom whole header and footer in view module or function component
   */
  view?: (RcViewModule & ModalRef) | ComponentType<any>;
  /**
   * that props you want to bing on modal
   *
   * ### Remember alway make below all key always be same as previous when you not need rerender.
   *
   * like using `@computed` or static value
   */
  props?: (data: T) => Omit<NonJSXModalItemProps, 'onExited'> & {
    /**
     * callback when modal dom be removed completed
     */
    onExited?: () => void;
  };
}

export interface ModalViewOptions {
  /**
   * Default isCompact value for all modals
   * Controls padding and width of modals
   * @default false
   */
  isCompact?: boolean;
}

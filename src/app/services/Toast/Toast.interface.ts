import {
  DehydratedPortal,
  RcViewModule,
} from '@ringcentral-integration/next-core';

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LiteralUnion, RcSnackbarContentProps } from '@ringcentral/juno';
import type { ComponentType } from 'react';

export interface ToastOptions {
  /**
   * Set default ttl for auto dismiss alert.
   *
   * @default 5000
   */
  ttl?: number;
}

export type ToastLevel = 'success' | 'danger' | 'warning' | 'info' | 'hint';

export type ToastOnCloseType =
  | 'backdropClick'
  | 'escapeKeyDown'
  | 'removeButtonClick'
  | 'programmatic';

export interface ToastItem {
  /**
   * toast uuid
   */
  id: string;
  /**
   * toast text information
   */
  message: string;
  /**
   * payload for toast
   */
  payload?: any;
  /**
   * timestamp for toast
   */
  timestamp: number;
  /**
   * group for toast, be useful when you not want close by toast dismiss with all id, but only close by group
   *
   * @default 'default'
   *
   * - `default` will be dismiss by all
   * - `important` will be must be dismiss by group
   */
  group?: LiteralUnion<'default' | 'important'>;
  /**
   * level type for toast
   */
  level: ToastLevel;
  /**
   * set ttl for auto dismiss toast
   *
   * set `0` will make toast never auto dismiss
   */
  ttl: number;
  /**
   * allow duplicate alert when have same message and same level
   *
   * @default true
   */
  allowDuplicates?: boolean;
  /**
   * show loading with new notification
   *
   * ### when set loading, ttl will be ignored
   */
  loading?: boolean;
  /**
   * backdrop with page,
   *
   * @default false
   */
  backdrop?: boolean;
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   *
   * @default true
   */
  disableBackdropClick?: boolean;
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   *
   * @default true
   */
  disableEscapeKeyDown?: boolean;
  /**
   * TODO: need support that in worker, currently only support
   *
   * action template(right area) with new notification
   */
  action?: React.ReactNode;
  /**
   * TODO: need support that in worker, currently only support
   *
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: (reason: ToastOnCloseType) => void;
}

export type ToastItemPanelProps = {
  dismiss: (id: string, reason: ToastOnCloseType) => void;
} & ToastItem &
  Pick<
    RcSnackbarContentProps,
    'size' | 'messageAlign' | 'fullWidth' | 'className'
  >;

export type NonJSXToastItemProps = {
  /**
   * when set action to null can remove default close button
   */
  action?: null;
} & Partial<
  Omit<ToastItemPanelProps, 'timestamp' | 'payload' | 'id' | 'action'>
>;

export interface ToastRef {
  /**
   * full custom action block
   */
  action?: ComponentType | null;
  [key: string]: any;
}

export interface ToastCreatorOptions<T = any> {
  /**
   * target to render modal view.
   */
  view?: (RcViewModule & ToastRef) | ComponentType<any>;
  /**
   * that props you want to bing on modal
   *
   * ### Remember alway make below all key always be same as previous when you not need rerender.
   *
   * like using `@computed` or static value
   */
  props?: (data: T) => Omit<NonJSXToastItemProps, 'dismiss'>;
}

export type ToastDehydratedPortal<
  T extends Record<string, any> = Record<string, any>,
> = DehydratedPortal<ToastCreatorOptions<T>, T>;

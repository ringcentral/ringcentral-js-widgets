/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

import type { ToastOnCloseType } from '../../../../services';
import type { ToastItemProps } from '../ToastItem.view.interface';

export type ToastViewContextActions = {
  close: (reason?: ToastOnCloseType | null) => void;
};

export type ToastViewContextValue<
  T extends Record<string, any> = Record<string, any>,
> = {
  toastMode: boolean;
  props: Omit<ToastItemProps, 'payload'> & { payload: T; message?: string };
  /**
   * give you actions for do action with current toast.
   * `'close'`: close toast.
   */
  action?: ToastViewContextActions;
};

export const ToastItemViewContext = createContext<ToastViewContextValue<any>>({
  toastMode: false,
  props: {} as any,
  action: {} as any,
});

/**
 * provide you can get toast view context with toast mode state and props
 */
export const useToastItemView = <
  T extends Record<string, any> = Record<string, any>,
>() => useContext<ToastViewContextValue<T>>(ToastItemViewContext as any);

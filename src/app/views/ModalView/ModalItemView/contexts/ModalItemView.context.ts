/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

import type { ModalItemProps } from '../ModalItemPanel/ModalItemPanel';

export type ModalOnCloseType =
  | 'backdropClick'
  | 'escapeKeyDown'
  | 'programmatic'
  | 'confirmClick'
  | 'cancelClick';

export type ModalOnCancelType =
  | 'backdropClick'
  | 'escapeKeyDown'
  | 'cancelClick'
  | 'programmatic';

export type CustomEventProps<T> = Omit<T, 'onCancel' | 'onClose'> & {
  /**
   * Callback fired when the component requests to be cancel.
   * @param {string} reason Can be:
   * `'backdropClick'`
   * `'escapeKeyDown'`
   * `'cancelClick'`
   * `'programmatic'`
   */
  onCancel?: (e: {}, reason: ModalOnCancelType) => void;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {string} reason Can be:
   * `'backdropClick'`
   * `'escapeKeyDown'`
   * `'programmatic'`
   * `'confirmClick'`
   * `'cancelClick'`
   */
  onClose?: (e: {}, reason: ModalOnCloseType) => void;
};

export type ExtendPopupBoxProps<
  T extends Record<string, any> = Record<string, any>,
> = CustomEventProps<ModalItemProps<T>>;

export type ModalViewContextActions = {
  close: (reason?: ModalOnCloseType | null) => void;
  cancel: (reason?: ModalOnCancelType | null) => void;
  confirm: (
    /**
     * the data you want to send to confirm action
     */
    data?: Record<string, any>,
  ) => void | Promise<void>;
};

export type ModalViewContextValue<
  T extends Record<string, any> = Record<string, any>,
> = {
  modalMode: boolean;
  props: ExtendPopupBoxProps<T>;
  /**
   * give you actions for do action with current modal.
   * `'close'`: close modal.
   * `'cancel'`: send cancel and close modal.
   * `'confirm'`: send confirm and close modal.
   */
  action?: ModalViewContextActions;
};

export const ModalItemViewContext = createContext<ModalViewContextValue<any>>({
  modalMode: false,
  props: {} as any,
  action: {} as any,
});

/**
 * provide you can get modal view context with modal mode state and props
 */
export const useModalItemView = <
  T extends Record<string, any> = Record<string, any>,
>() => useContext<ModalViewContextValue<T>>(ModalItemViewContext as any);

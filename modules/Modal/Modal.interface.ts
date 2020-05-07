import { RcModalProps } from '@ringcentral-integration/rcui';

export type ModalItem = Partial<RcModalProps>;

export type ModalMappingType = Record<string, ModalItem>;

export interface State {
  modalIds: string[];
  modalMapping: ModalMappingType;
}

export interface DepsModules {}

export type ConfirmModalProps = Pick<
  RcModalProps,
  | 'size'
  | 'title'
  | 'footer'
  | 'content'
  | 'fillContent'
  | 'loading'
  | 'disableEscapeKeyDown'
  | 'okText'
  | 'okVariant'
  | 'okType'
  | 'okBtnProps'
  | 'disableBackdropClick'
  | 'fullScreen'
  | 'cancelVariant'
  | 'cancelBtnProps'
  | 'cancelText'
  | 'onCancel'
  // | 'confirmOnEnterKeyDownGuard'
  // | 'onClose'
  // | 'onEscTracking'
  // | 'confirmOnEnterKeyDown'
> &
  Required<Pick<RcModalProps, 'onOK'>>;

export type AlertModalProps = Omit<
  ConfirmModalProps,
  'cancelVariant' | 'cancelBtnProps' | 'cancelText' | 'onCancel'
>;

export type ModalTemplate = Pick<
  ConfirmModalProps,
  'title' | 'footer' | 'content'
>;

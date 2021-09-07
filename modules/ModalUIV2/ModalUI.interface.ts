import { RcBaseProps } from '@ringcentral/juno';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';

import { ModalProps } from '../../components/ModalV2/interface';

export interface Deps {
  locale: Locale;
}

export type ModalOptions = RcBaseProps<
  ModalProps,
  | 'cancelButtonText'
  | 'confirmButtonText'
  | 'title'
  | 'children'
  | 'key'
  | 'open'
> & {
  /** confirm button text or the id of `registerRenderer` list  */
  confirmButtonText?: string;
  /** cancel button text or the id of `registerRenderer` list  */
  cancelButtonText?: string;
  /** title text or the id of `registerRenderer` list  */
  title?: string;
  /** when you use id with `title`, that will pass to register title render */
  titleProps?: Record<string, any>;
  /** footer content or the id of `registerRenderer` list  */
  footer?: string;
  /** when you use id with `footer`, that will pass to register footer render */
  footerProps?: Record<string, any>;
  /** main content or the id of `registerRenderer` list  */
  content?: string;
  /** when you use id with `content`, that will pass to register content render */
  contentProps?: Record<string, any>;
  /** trigger when confirm button click  */
  onConfirm?: HandlerFunction;
  /** trigger when cancel button click  */
  onCancel?: HandlerFunction;
  /**
   * variant of modal
   *
   * - `alert` alert modal with `confirm` button
   * - `confirm` confirm modal with `confirm` and `cancel` button
   * - `info` info modal no with any button, and have `close` button
   */
  variant?: 'alert' | 'confirm' | 'info';
  /** auto show loading when `confirm button` click, if that `onConfirm` is promise */
  useLoadingOverlay?: boolean;
  /** auto disableBackdropClick handling when loading, only works when disableBackdropClick is set to false */
  autoDisableBackdropClick?: boolean;
};

export type ConfirmModalOptions = RcBaseProps<ModalOptions, 'variant'>;

export type AlertModalOptions = RcBaseProps<
  ConfirmModalOptions,
  'cancelButtonProps' | 'cancelButtonText' | 'onCancel'
>;

export type InfoModalOptions = RcBaseProps<
  AlertModalOptions,
  'confirmButtonProps' | 'confirmButtonText'
>;

export type DehydratedModalState = RcBaseProps<
  ModalOptions,
  'onCancel' | 'onConfirm' | 'onExited'
> & {
  /** current open state */
  open: boolean;
  /** this modal id */
  id: string;
  /** onConfirm function id */
  onConfirm?: string;
  /** onCancel function id */
  onCancel?: string;
  /** onExited function id */
  onExited?: string;
  /** this modal handler ids */
  handlerIDs: string[];
};

export type CustomRendererProps = {
  /** current locale */
  currentLocale: string;
} & Pick<ModalProps, 'onConfirm' | 'onCancel' | 'title'> &
  Record<string, any>;

export type CustomRenderer<
  T extends CustomRendererProps = CustomRendererProps
> = (props: T) => string | JSX.Element;

export type HandlerFunction = (
  ...args: any
) => boolean | Promise<boolean | void> | void;

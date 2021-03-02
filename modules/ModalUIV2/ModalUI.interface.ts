import { RcButtonProps } from '@ringcentral/juno';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { ModalProps } from '../../components/ModalV2/interface';

export interface Deps {
  locale: Locale;
}

export type ModalButtonProps = Pick<
  RcButtonProps,
  'size' | 'color' | 'disabled' | 'loading' | 'loadingMode' | 'variant'
>;

export type SimpleDialogProps = Pick<
  ModalProps['dialogProps'],
  'className' | 'classes' | 'style'
>;

export type ModalOptions = Pick<
  ModalProps,
  | 'size'
  | 'fillContent'
  | 'loading'
  | 'showLoadingOverlay'
  | 'okText'
  | 'okVariant'
  | 'okType'
  | 'disableBackdropClick'
  | 'fullScreen'
  | 'cancelVariant'
  | 'cancelText'
> & {
  okBtnProps?: ModalButtonProps;
  cancelBtnProps?: ModalButtonProps;
  title?: string;
  footer?: string;
  content?: string;
  onOK?: HandlerFunction;
  onCancel?: HandlerFunction;
  titleProps?: Record<string, any>;
  contentProps?: Record<string, any>;
  footerProps?: Record<string, any>;
  dialogOptions?: SimpleDialogProps;
  variant?: 'alert' | 'confirm' | 'info';
  useLoadingOverlay?: boolean;
};

export type ConfirmModalOptions = Omit<ModalOptions, 'variant'>;

export type AlertModalOptions = Omit<
  ConfirmModalOptions,
  'cancelVariant' | 'cancelBtnProps' | 'cancelText' | 'onCancel' | 'variant'
>;

export type InfoModalOptions = Omit<
  AlertModalOptions,
  'okVariant' | 'okBtnProps' | 'okText'
>;

export type DehydratedModalState = Omit<ModalOptions, 'onCancel' | 'onOK'> & {
  open: boolean;
  id: string;
  onOK?: string;
  onCancel?: string;
  handlerIDs: string[];
};

export interface ModalReturnValue {
  promise: Promise<boolean>;
  id: string;
}

export type CustomRendererProps = {
  currentLocale: string;
  onOK?: ModalProps['onOK'];
  onCancel?: ModalProps['onCancel'];
} & Record<string, any>;

export type CustomRenderer<
  T extends CustomRendererProps = CustomRendererProps
> = (props: T) => string | JSX.Element;

export type HandlerFunction = (
  ...args: any
) => boolean | Promise<boolean | void> | void;

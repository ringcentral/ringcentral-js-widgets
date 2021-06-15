import { RcPopupBoxProps } from '@ringcentral/juno';

export type ModalV2UIProps = {
  modals: ModalProps[];
};

export type ModalV2UIFunctions = {};

export type ModalV2Props = ModalV2UIProps &
  ModalV2UIFunctions &
  Partial<RcPopupBoxProps>;

export type ModalProps = RcPopupBoxProps & {
  key: string;
};

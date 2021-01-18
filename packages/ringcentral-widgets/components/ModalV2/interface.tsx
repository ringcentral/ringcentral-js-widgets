import { RcModalProps } from '@ringcentral/juno';

export type ModalV2UIProps = {
  modals: ModalProps[];
};

export type ModalV2UIFunctions = {};

export type ModalV2Props = ModalV2UIProps &
  ModalV2UIFunctions &
  Pick<RcModalProps, 'dialogProps'>;

export type ModalProps = RcModalProps & {
  key: string;
};

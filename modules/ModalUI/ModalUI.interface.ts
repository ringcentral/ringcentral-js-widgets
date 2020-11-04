import { RcModalProps } from '@ringcentral/juno';

import { Modal } from '../Modal/Modal';

interface State {}

export interface DepModules {
  modal: Modal;
}

export type DepOptions = {} & DepModules;

export type GetModalUIProps = Pick<RcModalProps, 'dialogProps'>;

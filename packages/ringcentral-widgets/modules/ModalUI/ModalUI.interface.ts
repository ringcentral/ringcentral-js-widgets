import { RcModalProps } from '@ringcentral-integration/rcui';

import { Modal } from '../Modal/Modal';

interface State {}

export interface DepsModules {
  modal: Modal;
}

export type GetModalUIProps = Pick<RcModalProps, 'dialogProps'>;

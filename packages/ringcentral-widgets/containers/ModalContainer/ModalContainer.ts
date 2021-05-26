import { RcPopupBoxProps } from '@ringcentral/juno';

import { ModalV2 } from '../../components/ModalV2';
import { connectModule } from '../../lib/phoneContext';

export const ModalContainer = connectModule<any, Partial<RcPopupBoxProps>>(
  (phone: any) => phone.modalUI,
)(ModalV2);

import { ModalV2 } from '../../components/ModalV2';
import { connectModule } from '../../lib/phoneContext';
import { GetModalUIProps } from '../../modules/ModalUI';

export const ModalContainer = connectModule<any, GetModalUIProps>(
  (phone: any) => phone.modalUI,
)(ModalV2);

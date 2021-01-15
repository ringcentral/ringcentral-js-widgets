import { ModalV2 } from '../../components/ModalV2';
import { ModalV2Props } from '../../components/ModalV2/interface';
import { connectModule } from '../../lib/phoneContext';

export const ModalContainer = connectModule<
  any,
  Pick<ModalV2Props, 'dialogProps'>
>((phone: any) => phone.modalUI)(ModalV2);

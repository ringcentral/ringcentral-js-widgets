import { InternalPanel } from '../../components/TransferCallRecipient';
import { connectModule } from '../../lib/connectModule';

export interface TransferInternalRecipientProps {
  id: string;
}

export const TransferInternalRecipientPage = connectModule<
  TransferInternalRecipientProps
>((phone) => phone.evTransferCallUI)(InternalPanel);

import { ManualEntryPanel } from '../../components/TransferCallRecipient';
import { connectModule } from '../../lib/connectModule';

export interface TransferManualEntryRecipientPageProps {
  id: string;
}

export const TransferManualEntryRecipientPage =
  connectModule<TransferManualEntryRecipientPageProps>(
    (phone) => phone.evTransferCallUI,
  )(ManualEntryPanel);

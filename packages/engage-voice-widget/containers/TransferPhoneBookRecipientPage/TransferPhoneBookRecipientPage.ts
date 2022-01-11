import { PhoneBookPanel } from '../../components/TransferCallRecipient';
import { connectModule } from '../../lib/connectModule';

export interface TransferPhoneBookRecipientPageProps {
  id: string;
}

export const TransferPhoneBookRecipientPage =
  connectModule<TransferPhoneBookRecipientPageProps>(
    (phone) => phone.evTransferCallUI,
  )(PhoneBookPanel);

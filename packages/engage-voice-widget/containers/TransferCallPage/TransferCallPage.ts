import { TransferCallPanel } from '../../components/TransferCallPanel';
import { connectModule } from '../../lib/connectModule';

export const TransferCallPage = connectModule(
  (phone) => phone.evTransferCallUI,
)(TransferCallPanel);

import TransferPanel from '../../components/TransferPanel';
import { connectModule } from '../../lib/phoneContext';
import type { TransferUIContainerProps } from '../../modules/TransferUI';

export default connectModule<any, TransferUIContainerProps>(
  (phone) => phone.transferUI,
)(TransferPanel);

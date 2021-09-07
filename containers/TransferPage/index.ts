import TransferPanel from '../../components/TransferPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.transferUI)(TransferPanel);

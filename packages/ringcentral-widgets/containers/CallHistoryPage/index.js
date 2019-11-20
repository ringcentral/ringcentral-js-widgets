import { connectModule } from '../../lib/phoneContext';
import CallsPanel from '../../components/CallsPanel';

export default connectModule((phone) => phone.callHistoryUI)(CallsPanel);

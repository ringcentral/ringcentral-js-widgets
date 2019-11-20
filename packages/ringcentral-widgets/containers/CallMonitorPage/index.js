import CallsPanel from '../../components/CallsPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.callMonitorUI)(CallsPanel);

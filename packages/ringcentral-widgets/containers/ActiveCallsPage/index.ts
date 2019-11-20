import ActiveCallsPanel from '../../components/ActiveCallsPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.activeCallsUI)(ActiveCallsPanel);

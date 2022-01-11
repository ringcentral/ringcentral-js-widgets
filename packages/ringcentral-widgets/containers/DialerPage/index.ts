import DialerPanel from '../../components/DialerPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.dialerUI)(DialerPanel);

import { connectModule } from '../../lib/phoneContext';
import DialerPanel from '../../components/DialerPanel';

export default connectModule(phone => phone.dialerUI)(DialerPanel);

import CallBadge from '../../components/CallBadge';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.callBadgeUI)(CallBadge);

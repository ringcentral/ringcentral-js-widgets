import { connectModule } from '../../lib/phoneContext';
import CallBadge from '../../components/CallBadge';

export default connectModule((phone) => phone.callBadgeUI)(CallBadge);

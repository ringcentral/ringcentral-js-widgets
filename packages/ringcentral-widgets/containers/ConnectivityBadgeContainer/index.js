import { connectModule } from '../../lib/phoneContext';
import ConnectivityBadge from '../../components/ConnectivityBadge';

export default connectModule((phone) => phone.connectivityBadgeUI)(
  ConnectivityBadge,
);

import ConnectivityBadge from '../../components/ConnectivityBadge';
import { connectModule } from '../../lib/phoneContext';

const ConnectivityBadgeContainer = connectModule(
  (phone) => phone.connectivityBadgeUI,
)(ConnectivityBadge);

export { ConnectivityBadgeContainer };

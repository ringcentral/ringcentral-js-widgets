import { connectModule } from '../../lib/phoneContext';
import RecentActivityPanel from '../../components/RecentActivityPanel';

const RecentActivityContainer = connectModule(
  (phone) => phone.recentActivityUI,
)(RecentActivityPanel);

export { RecentActivityContainer };

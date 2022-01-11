import RecentActivityPanel from '../../components/RecentActivityPanel';
import { connectModule } from '../../lib/phoneContext';

const RecentActivityContainer = connectModule(
  (phone) => phone.recentActivityUI,
)(RecentActivityPanel);

export { RecentActivityContainer };

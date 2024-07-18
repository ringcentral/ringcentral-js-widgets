import IssuesTrackingPanel from '../../components/IssuesTrackingPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.issuesTrackingUI)(
  IssuesTrackingPanel,
);

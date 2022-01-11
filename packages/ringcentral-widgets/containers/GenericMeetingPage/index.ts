import { GenericMeetingPanel } from '../../components/GenericMeetingPanel';
import { connectModule } from '../../lib/phoneContext';

const GenericMeetingPage = connectModule((phone) => phone.genericMeetingUI)(
  GenericMeetingPanel,
);

export default GenericMeetingPage;

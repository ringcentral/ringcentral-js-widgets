import { connectModule } from '../../lib/phoneContext';
import MeetingPanel from '../../components/MeetingPanel';

const MeetingPage = connectModule(phone => phone.meetingUI)(MeetingPanel);
export default MeetingPage;

import ConferencePanel from '../../components/ConferencePanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule(phone => phone.conferenceUI)(ConferencePanel);

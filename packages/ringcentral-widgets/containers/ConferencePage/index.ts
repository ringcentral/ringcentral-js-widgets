import ConferencePanel from '../../components/ConferencePanel';
import { connectModule } from '../../lib/phoneContext';

const ConferencePage = connectModule((phone) => phone.conferenceUI)(
  ConferencePanel,
);

export { ConferencePage };

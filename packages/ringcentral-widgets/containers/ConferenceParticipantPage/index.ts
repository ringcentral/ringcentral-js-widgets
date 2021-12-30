import { ConferenceParticipantContainer } from '../../components/ConferenceParticipantContainer';
import { connectModule } from '../../lib/phoneContext';

const ConferenceParticipantPage = connectModule(
  (phone) => phone.conferenceParticipantUI,
)(ConferenceParticipantContainer);

export { ConferenceParticipantPage };

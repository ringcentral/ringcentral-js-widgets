import { connectModule } from '../../lib/phoneContext';
import { ConferenceParticipantContainer } from '../../components/ConferenceParticipantContainer';

const ConferenceParticipantPage = connectModule(
  (phone) => phone.conferenceParticipantUI,
)(ConferenceParticipantContainer);

export { ConferenceParticipantPage };

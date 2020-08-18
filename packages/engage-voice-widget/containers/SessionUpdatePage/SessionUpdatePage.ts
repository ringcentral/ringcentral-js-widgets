import { SessionUpdatePanel } from '../../components/SessionUpdatePanel';
import { connectModule } from '../../lib/connectModule';

export const SessionUpdatePage = connectModule(
  (phone) => phone.evAgentSessionUI,
)(SessionUpdatePanel);

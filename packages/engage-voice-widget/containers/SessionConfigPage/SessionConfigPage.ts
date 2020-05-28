import { SessionConfigPanel } from '../../components/SessionConfigPanel';
import { connectModule } from '../../lib/connectModule';

export const SessionConfigPage = connectModule(
  (phone) => phone.evSessionConfigUI,
)(SessionConfigPanel);

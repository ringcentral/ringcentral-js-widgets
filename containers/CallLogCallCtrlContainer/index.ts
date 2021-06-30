import { connectModule } from '../../lib/phoneContext';
import { CallLogCallCtrlPanel } from '../../components/CallLogCallCtrlPanel';

export const CallLogCallCtrlContainer = connectModule(
  (phone) => phone.callLogCallCtrlUI,
)(CallLogCallCtrlPanel);

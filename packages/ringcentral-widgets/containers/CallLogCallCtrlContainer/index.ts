import { CallLogCallCtrlPanel } from '../../components/CallLogCallCtrlPanel';
import { connectModule } from '../../lib/phoneContext';

export const CallLogCallCtrlContainer = connectModule(
  (phone) => phone.callLogCallCtrlUI,
)(CallLogCallCtrlPanel);

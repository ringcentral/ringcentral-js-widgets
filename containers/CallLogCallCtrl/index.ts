import { connectModule } from '../../lib/phoneContext';
import CallLogCallCtrlPanel from './CallLogCallCtrl';

export const CallLogCallCtrl = connectModule(
  (phone) => phone.callLogCallCtrlUI,
)(CallLogCallCtrlPanel);

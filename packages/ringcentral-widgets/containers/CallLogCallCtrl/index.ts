import { connectModule } from '../../lib/phoneContext';
import CallLogCallCtrlPanel, { CallLogCallCtrlProps } from './CallLogCallCtrl';

export const CallLogCallCtrl = connectModule(
  (phone) => phone.callLogCallCtrlUI,
)(CallLogCallCtrlPanel) as React.FunctionComponent<CallLogCallCtrlProps>;

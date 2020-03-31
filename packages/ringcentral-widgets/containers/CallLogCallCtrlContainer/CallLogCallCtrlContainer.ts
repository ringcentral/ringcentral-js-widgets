import { connectModule } from '../../lib/phoneContext';
import { CallLogCallCtrl, CallLogCallCtrlProps } from './CallLogCallCtrl';

export default connectModule((phone) => phone.callLogCallCtrlUI)(
  CallLogCallCtrl,
) as React.FunctionComponent<Partial<CallLogCallCtrlProps>>;

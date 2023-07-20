import { connectModule } from '../../lib/phoneContext';
import { CallCtrlContainer } from '../../components/CallCtrlContainer';

const CallCtrlPage = connectModule((phone) => phone.callControlUI)(
  CallCtrlContainer,
);

export { CallCtrlPage as default, CallCtrlContainer };

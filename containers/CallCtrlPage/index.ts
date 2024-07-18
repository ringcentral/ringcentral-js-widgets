import { CallCtrlContainer } from '../../components/CallCtrlContainer';
import { connectModule } from '../../lib/phoneContext';

const CallCtrlPage = connectModule((phone) => phone.callControlUI)(
  CallCtrlContainer,
);

export { CallCtrlPage as default, CallCtrlContainer };

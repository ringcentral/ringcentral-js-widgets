import CallCtrlContainer from './CallCtrlContainer';
import { connectModule } from '../../lib/phoneContext';

const CallCtrlPage = connectModule((phone) => phone.callCtrlUI)(
  CallCtrlContainer,
);

export { CallCtrlContainer, CallCtrlPage as default };

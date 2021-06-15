import { connectModule } from '../../lib/phoneContext';
import { IncomingCallView } from '../../components/IncomingCallView';

const IncomingCallContainer = connectModule((phone) => phone.incomingCallUI)(
  IncomingCallView,
);

export { IncomingCallContainer };

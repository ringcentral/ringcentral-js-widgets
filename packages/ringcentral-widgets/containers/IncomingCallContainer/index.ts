import { IncomingCallView } from '../../components/IncomingCallView';
import { connectModule } from '../../lib/phoneContext';

const IncomingCallContainer = connectModule((phone) => phone.incomingCallUI)(
  IncomingCallView,
);

export { IncomingCallContainer };

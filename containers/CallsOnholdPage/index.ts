import { connectModule } from '../../lib/phoneContext';
import CallsOnholdPanel from '../../components/CallsOnholdPanel';

const CallsOnholdPage = connectModule((phone) => phone.callsOnholdUI)(
  CallsOnholdPanel,
);

export { CallsOnholdPage };

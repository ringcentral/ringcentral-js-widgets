import CallsOnholdPanel from '../../components/CallsOnholdPanel';
import { connectModule } from '../../lib/phoneContext';

const CallsOnholdPage = connectModule((phone) => phone.callsOnholdUI)(
  CallsOnholdPanel,
);

export { CallsOnholdPage };

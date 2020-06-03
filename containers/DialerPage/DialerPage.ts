import { DialerPanel } from '../../components/DialerPanel';
import { connectModule } from '../../lib/connectModule';

export const DialerPage = connectModule((phone) => phone.evDialerUI)(
  DialerPanel,
);

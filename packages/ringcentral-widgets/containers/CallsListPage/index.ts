import CallsListPanel from '../../components/CallsListPanel';
import { connectModule } from '../../lib/phoneContext';

const CallsListPage = connectModule((phone) => phone.callsListUI)(
  CallsListPanel,
);

export { CallsListPage, CallsListPage as default };

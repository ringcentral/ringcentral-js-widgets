import { ActiveCallListPanel } from '../../components/ActiveCallListPanel';
import { connectModule } from '../../lib/connectModule';

export const ActiveCallListPage = connectModule(
  (phone) => phone.evActiveCallListUI,
)(ActiveCallListPanel);

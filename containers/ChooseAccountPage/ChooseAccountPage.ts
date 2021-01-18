import { connectModule } from '../../lib/connectModule';
import { ChooseAccountPanel } from '../../components/ChooseAccountPanel';

export const ChooseAccountPage = connectModule(
  (phone) => phone.evChooseAccountUI,
)(ChooseAccountPanel);

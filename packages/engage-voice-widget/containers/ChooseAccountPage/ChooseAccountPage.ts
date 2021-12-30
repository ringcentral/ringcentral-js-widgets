import { ChooseAccountPanel } from '../../components/ChooseAccountPanel';
import { connectModule } from '../../lib/connectModule';

export const ChooseAccountPage = connectModule(
  (phone) => phone.evChooseAccountUI,
)(ChooseAccountPanel);

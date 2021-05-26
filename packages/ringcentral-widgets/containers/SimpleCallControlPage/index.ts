import { SimpleCallControlPanel } from '../../components/SimpleCallControlPanel';
import { connectModule } from '../../lib/phoneContext';

const SimpleCallControlPage = connectModule(
  (phone) => phone.simpleCallControlUI,
)(SimpleCallControlPanel);

export { SimpleCallControlPage };

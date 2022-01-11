import ComposeTextPanel from '../../components/ComposeTextPanel';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.composeTextUI)(ComposeTextPanel);

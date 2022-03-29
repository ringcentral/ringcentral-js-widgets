import { connectModule } from '../../lib/phoneContext';
import { ContactSearchPanel } from '../ContactSearchPanel';

export default connectModule((phone) => phone.contactSearchUI)(
  ContactSearchPanel,
);

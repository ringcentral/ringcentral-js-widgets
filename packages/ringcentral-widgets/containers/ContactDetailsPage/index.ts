import { ContactDetailsView } from '../../components/ContactDetailsView';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.contactDetailsUI)(
  ContactDetailsView,
);

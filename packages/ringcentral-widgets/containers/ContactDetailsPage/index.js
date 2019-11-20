import { connectModule } from '../../lib/phoneContext';
import ContactDetailsView from '../../components/ContactDetailsView';

export default connectModule((phone) => phone.contactDetailsUI)(
  ContactDetailsView,
);

import ContactsView from '../../components/ContactsView';
import { connectModule } from '../../lib/phoneContext';

export default connectModule((phone) => phone.contactListUI)(ContactsView);

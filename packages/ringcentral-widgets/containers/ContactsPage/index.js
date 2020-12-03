import { connectModule } from '../../lib/phoneContext';
import ContactsView from '../../components/ContactsView';

export default connectModule((phone) => phone.contactListUI)(ContactsView);

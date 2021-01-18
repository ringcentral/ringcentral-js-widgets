import { ContactSource } from '../../interfaces/Contact.model';
import { Auth } from '../AuthV2';

export interface ContactsOptions {}

export interface Deps {
  auth: Auth;
  contactSources: ContactSource[];
  contactsOptions: ContactsOptions;
}

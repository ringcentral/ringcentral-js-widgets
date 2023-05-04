import { ContactSource } from '../../interfaces/Contact.model';
import { Auth } from '../Auth';

export interface ContactsOptions {}

export interface Deps {
  auth: Auth;
  contactSources: ContactSource[];
  contactsOptions: ContactsOptions;
}

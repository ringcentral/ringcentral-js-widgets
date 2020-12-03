import { ContactSource } from '../../interfaces/Contact.model';
import { Auth } from '../AuthV2';

export interface UpdateFilterOptions {
  /**
   * source filter, default 'all'
   */
  sourceFilter: string;
  /**
   * search filter, default empty string
   */
  searchFilter: string;
}

export interface ContactsOptions {}

export interface Deps {
  auth: Auth;
  contactSources: ContactSource[];
  contactsOptions: ContactsOptions;
}

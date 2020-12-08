import { IContact, ContactSource } from '../../interfaces/Contact.model';
import Auth from '../Auth';

export interface Deps {
  auth: Auth;
  contactSources: ContactSource[];
}

export interface FilterCriteria {
  sourceFilter?: string;
  searchFilter?: string;
}

export interface StampedFilterCriteria extends FilterCriteria {
  filterStamp?: number;
}

export interface ContactSourceLastStatus {
  sourceReady: boolean;
  contacts: IContact[];
}

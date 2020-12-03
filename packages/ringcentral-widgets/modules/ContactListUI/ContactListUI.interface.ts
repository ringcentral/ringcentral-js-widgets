import Locale from 'ringcentral-integration/modules/Locale';
import ExtensionInfo from 'ringcentral-integration/modules/ExtensionInfo';
import { ContactList } from 'ringcentral-integration/modules/ContactList';
import { ContactDetailsUI } from '../ContactDetailsUI';

export interface Deps {
  locale: Locale;
  extensionInfo: ExtensionInfo;
  contactList: ContactList;
  contactDetailsUI?: ContactDetailsUI;
}

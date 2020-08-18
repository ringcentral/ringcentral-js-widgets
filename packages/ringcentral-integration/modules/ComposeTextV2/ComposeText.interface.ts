import Alert from '../Alert';
import { Auth } from '../AuthV2';
import Storage from '../Storage';
import { MessageSender } from '../MessageSenderV2';
import NumberValidate from '../NumberValidate';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';
import ContactSearch from '../ContactSearch';

export interface Deps {
  alert: Alert;
  auth: Auth;
  storage: Storage;
  messageSender: MessageSender;
  numberValidate: NumberValidate;
  rolesAndPermissions: RolesAndPermissions;
  contactSearch?: ContactSearch;
  composeTextOptions?: ComposeTextOptions;
}

export interface ComposeTextOptions {}

export interface ToNumber {
  id?: string;
  phoneNumber: string;
  entityType?: string;
}

import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { Auth } from '../Auth';
import { ContactSearch } from '../ContactSearch';
import { MessageSender } from '../MessageSender';
import { NumberValidate } from '../NumberValidate';
import { Storage } from '../Storage';

interface RouterInteraction {
  currentPath: string;
}

export interface Deps {
  alert: Alert;
  auth: Auth;
  storage: Storage;
  messageSender: MessageSender;
  numberValidate: NumberValidate;
  appFeatures: AppFeatures;
  contactSearch?: ContactSearch;
  composeTextOptions?: ComposeTextOptions;
  routerInteraction?: RouterInteraction;
}

export interface ComposeTextOptions {}

export interface ToNumber {
  id?: string;
  phoneNumber: string;
  entityType?: string;
  isWarning?: Boolean;
  type?: string;
  name?: string;
  phoneType?: string;
}

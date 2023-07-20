import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { Auth } from '../Auth';
import type { ContactSearch } from '../ContactSearch';
import type { MessageSender } from '../MessageSender';
import type { NumberValidate } from '../NumberValidate';
import type { Storage } from '../Storage';

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
  isWarning?: boolean;
  type?: string;
  name?: string;
  phoneType?: string;
}

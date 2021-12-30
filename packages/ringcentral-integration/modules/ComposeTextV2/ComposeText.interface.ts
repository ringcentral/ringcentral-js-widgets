import { Alert } from '../AlertV2';
import { AppFeatures } from '../AppFeatures';
import { Auth } from '../AuthV2';
import { ContactSearch } from '../ContactSearchV2';
import { MessageSender } from '../MessageSenderV2';
import { NumberValidate } from '../NumberValidate';
import { Storage } from '../StorageV2';

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
}

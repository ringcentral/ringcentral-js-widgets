import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeText';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { Conversations } from '@ringcentral-integration/commons/modules/Conversations';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { MessageSender } from '@ringcentral-integration/commons/modules/MessageSender';
import { MessageStore } from '@ringcentral-integration/commons/modules/MessageStore';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import { RouterInteraction } from '../RouterInteraction';

export interface Deps {
  brand: Brand;
  composeText: ComposeText;
  connectivityMonitor: ConnectivityMonitor;
  contactSearch: ContactSearch;
  conversations: Conversations;
  locale: Locale;
  messageSender: MessageSender;
  messageStore: MessageStore;
  rateLimiter: RateLimiter;
  regionSettings: RegionSettings;
  appFeatures: AppFeatures;
  routerInteraction: RouterInteraction;
  accountInfo: AccountInfo;
}

export interface ComposeTextUIComponentProps {
  inputExpandable?: boolean;
  supportAttachment?: boolean;
  formatContactPhone?: (phoneNumber: string) => string;
  phoneTypeRenderer?: (...arg: any[]) => any;
  phoneSourceNameRenderer?: (...arg: any[]) => any;
  recipientsContactInfoRenderer?: (...arg: any[]) => any;
  recipientsContactPhoneRenderer?: (...arg: any[]) => any;
  useRecipientsInputV2?: boolean;
}

import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeTextV2';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitorV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { Conversations } from '@ringcentral-integration/commons/modules/ConversationsV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { MessageSender } from '@ringcentral-integration/commons/modules/MessageSenderV2';
import { MessageStore } from '@ringcentral-integration/commons/modules/MessageStoreV2';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

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
}

export interface ComposeTextUIComponentProps {
  inputExpandable?: boolean;
  supportAttachment?: boolean;
  formatContactPhone?: (phoneNumber: string) => string;
  phoneTypeRenderer?: (...arg: any[]) => any;
  phoneSourceNameRenderer?: (...arg: any[]) => any;
  recipientsContactInfoRenderer?: (...arg: any[]) => any;
  recipientsContactPhoneRenderer?: (...arg: any[]) => any;
}

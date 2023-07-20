import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { ComposeText } from '@ringcentral-integration/commons/modules/ComposeText';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import type { Conversations } from '@ringcentral-integration/commons/modules/Conversations';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { MessageSender } from '@ringcentral-integration/commons/modules/MessageSender';
import type { MessageStore } from '@ringcentral-integration/commons/modules/MessageStore';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import type { RouterInteraction } from '../RouterInteraction';

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

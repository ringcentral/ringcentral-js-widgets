import { Brand } from '@ringcentral-integration/commons/modules/BrandV2';
import {
  ComposeText,
  ToNumber,
} from '@ringcentral-integration/commons/modules/ComposeTextV2';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitorV2';
import {
  ContactSearch,
  Entities,
} from '../../../ringcentral-integration/modules/ContactSearchV2';
import { Conversations } from '../../../ringcentral-integration/modules/ConversationsV2';
import { ExtensionFeatures } from '../../../ringcentral-integration/modules/ExtensionFeatures';
import { Locale } from '../../../ringcentral-integration/modules/LocaleV2';
import {
  Attachment,
  MessageSender,
  SenderNumber,
} from '../../../ringcentral-integration/modules/MessageSenderV2';
import { MessageStore } from '../../../ringcentral-integration/modules/MessageStoreV2';
import { RateLimiter } from '../../../ringcentral-integration/modules/RateLimiterV2';
import { RegionSettings } from '../../../ringcentral-integration/modules/RegionSettingsV2';
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
  extensionFeatures: ExtensionFeatures;
  routerInteraction: RouterInteraction;
}
// TODO: Move to and align with ComposeTextPanel when refactoring ComposeTextPanel to TypeScript

export interface ComposeTextPanelProps {
  brand: string;
  currentLocale: string;
  sendButtonDisabled: boolean;
  senderNumbers: SenderNumber[];
  senderNumber: string;
  typingToNumber: string;
  toNumbers: ToNumber[];
  messageText: string;
  outboundSMS: boolean;
  // TODO: investigate Entities and Entity
  searchContactList: Entities;
  showSpinner: boolean;
  inputExpandable: boolean;
  attachments: Attachment[];
  supportAttachment: boolean;
  send: (text: string, attachments: Attachment[]) => Promise<void>;
  formatPhone: (phoneNumber: string) => string;
  formatContactPhone: (phoneNumber: string) => string;
  detectPhoneNumbers: (input: string) => Promise<boolean>;
  searchContact: (searchString: string) => Promise<void>;
  updateSenderNumber: ({
    phoneNumber,
  }: {
    phoneNumber?: string;
  }) => Promise<void>;
  updateTypingToNumber: (number: string) => Promise<void>;
  cleanTypingToNumber: () => Promise<void>;
  addToNumber: (number: ToNumber) => Promise<boolean>;
  removeToNumber: (number: ToNumber) => Promise<void>;
  updateMessageText: (text: string) => Promise<void>;
  // TODO: Properly annotate type for these renderers
  phoneTypeRenderer?: any;
  phoneSourceNameRenderer?: any;
  recipientsContactInfoRenderer?: any;
  recipientsContactPhoneRenderer?: any;
  addAttachment: (attachment: Attachment) => Promise<void>;
  removeAttachment: (attachment: Attachment) => Promise<void>;
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

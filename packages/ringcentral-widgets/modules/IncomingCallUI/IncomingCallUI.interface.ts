import { ComponentType, ReactElement } from 'react';
import { Webphone } from 'ringcentral-integration/modules/WebphoneV2';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { ContactSearch } from 'ringcentral-integration/modules/ContactSearchV2';
import { RegionSettings } from 'ringcentral-integration/modules/RegionSettingsV2';
import { ForwardingNumber } from 'ringcentral-integration/modules/ForwardingNumberV2';
import { Brand } from 'ringcentral-integration/modules/BrandV2';
import { ExtensionInfo } from 'ringcentral-integration/modules/ExtensionInfoV2';
import { ConferenceCall } from 'ringcentral-integration/modules/ConferenceCallV2';
import { ContactMatcher } from 'ringcentral-integration/modules/ContactMatcherV2';
import { IContact } from 'ringcentral-integration/interfaces/Contact.model';
import { Entity } from 'ringcentral-integration/interfaces/Entity.interface';
import { NormalizedSession } from 'ringcentral-integration/interfaces/Webphone.interface';
import { ForwardingNumberInfo } from '@rc-ex/core/definitions';

export interface IncomingCallUIOptions {
  //
}

export interface Deps {
  webphone: Webphone;
  locale: Locale;
  contactSearch: ContactSearch;
  regionSettings: RegionSettings;
  forwardingNumber: ForwardingNumber;
  brand: Brand;
  extensionInfo: ExtensionInfo;
  conferenceCall?: ConferenceCall;
  contactMatcher?: ContactMatcher;
  IncomingCallUIOptions?: IncomingCallUIOptions;
}

export interface IncomingCallContainerProps {
  showContactDisplayPlaceholder?: boolean;
  phoneSourceNameRenderer?: (type: string) => string;
  showCallQueueName: boolean;
  getAvatarUrl?: (contact: IContact) => Promise<string | null>;
  sourceIcons?: Record<string, ComponentType>;
  phoneTypeRenderer?: (type: string) => ReactElement;
}

export interface IncomingCallUIPanelProps {
  brand: string;
  nameMatches: Entity[];
  currentLocale: string;
  session: Partial<NormalizedSession>;
  activeSessionId: string;
  areaCode: string;
  countryCode: string;
  forwardingNumbers: ForwardingNumberInfo[];
  showContactDisplayPlaceholder: boolean;
  searchContactList: {
    id: string;
    name: string;
    phoneNumber: string;
  }[];
  sourceIcons?: Record<string, ComponentType>;
  phoneTypeRenderer?: (type: string) => ReactElement;
  phoneSourceNameRenderer: (type: string) => string;
  showCallQueueName: boolean;
  formatPhone: (phoneNumber: string) => string;
  answer: (sessionId: string) => void;
  reject: Webphone['reject'];
  toVoiceMail: Webphone['toVoiceMail'];
  onForward: Webphone['forward'];
  replyWithMessage: Webphone['replyWithMessage'];
  toggleMinimized: Webphone['toggleMinimized'];
  updateSessionMatchedContact: Webphone['updateSessionMatchedContact'];
  getAvatarUrl: (contact: IContact) => Promise<string | null>;
  hangup: Webphone['hangup'];
  onHold: Webphone['hold'];
  searchContact: (pattern: string) => Promise<void>;
}

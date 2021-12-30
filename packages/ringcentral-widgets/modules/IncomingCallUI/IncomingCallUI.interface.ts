import { ComponentType, ReactElement } from 'react';

import { ForwardingNumberInfo } from '@rc-ex/core/definitions';
import { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCallV2';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcherV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumberV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';

export interface IncomingCallUIOptions {
  //
}

export interface Deps {
  appFeatures: AppFeatures;
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
  phoneNumber?: string;
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

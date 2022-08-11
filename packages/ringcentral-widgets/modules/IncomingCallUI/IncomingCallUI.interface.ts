import { ComponentType, ReactElement } from 'react';
import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCall';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

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
  accountInfo: AccountInfo;
  extensionInfo: ExtensionInfo;
  conferenceCall?: ConferenceCall;
  contactMatcher?: ContactMatcher;
  IncomingCallUIOptions?: IncomingCallUIOptions;
}

export interface IncomingCallContainerProps
  extends Pick<IncomingCallUIPanelProps, 'getAvatarUrl'> {
  showContactDisplayPlaceholder?: boolean;
  phoneSourceNameRenderer?: (type: string) => string;
  showCallQueueName: boolean;
  sourceIcons?: Record<string, ComponentType>;
  phoneTypeRenderer?: (type: string) => ReactElement;
}

export interface IncomingCallUIPanelProps {
  brand: string;
  nameMatches: Entity[];
  currentLocale: string;
  session: Partial<NormalizedSession>;
  activeSessionId: string | null | undefined;
  areaCode: string;
  countryCode: string;
  forwardingNumbers: ForwardingNumberInfo[];
  showContactDisplayPlaceholder: boolean;
  searchContactList: {
    id: string;
    name: string;
    phoneNumber: string;
  }[];
  phoneNumber?: string | null;
  /**
   * current call should should name if not match any contact
   */
  name: string | undefined | null;
  sourceIcons?: Record<string, ComponentType>;
  phoneTypeRenderer?: (type: string) => ReactElement;
  phoneSourceNameRenderer?: (type: string) => string;
  showCallQueueName: boolean;
  formatPhone: (phoneNumber: string) => string | undefined;
  answer: (sessionId: string) => void;
  reject: Webphone['reject'];
  toVoiceMail: Webphone['toVoiceMail'];
  onForward: Webphone['forward'];
  replyWithMessage: Webphone['replyWithMessage'];
  toggleMinimized: Webphone['toggleMinimized'];
  updateSessionMatchedContact: Webphone['updateSessionMatchedContact'];
  getAvatarUrl: (contact: IContact) => Promise<string | null> | null;
  hangup: Webphone['hangup'];
  onHold: Webphone['hold'];
  searchContact: (pattern: string) => Promise<void>;
}

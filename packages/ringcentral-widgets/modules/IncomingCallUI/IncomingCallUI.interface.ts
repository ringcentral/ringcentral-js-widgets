import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCall';
import type { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import type { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import type { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import type { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import type { ComponentType, ReactElement } from 'react';

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
  showCallerIdName?: boolean;
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
  callerIdName: string | undefined | null;
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

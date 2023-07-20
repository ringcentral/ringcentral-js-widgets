import type { ReactNode } from 'react';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures/AppFeatures';
import type { Brand } from '@ringcentral-integration/commons/modules/Brand';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCall';
import type { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import type { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import type { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import type { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import type { ConnectivityManager } from '../ConnectivityManager';
import type { RouterInteraction } from '../RouterInteraction';

export interface CallControlUIOptions {}

export interface CallControlComponentProps {
  params?: {
    sessionId?: string;
  };
  showCallQueueName?: boolean;
  showPark?: boolean;
  getAvatarUrl?: () => string;
  onBackButtonClick?: () => any;
  phoneTypeRenderer?: () => ReactNode;
  phoneSourceNameRenderer?: () => ReactNode;
  children?: ReactNode;
}

export interface Deps {
  appFeatures: AppFeatures;
  webphone: Webphone;
  locale: Locale;
  contactMatcher: ContactMatcher;
  regionSettings: RegionSettings;
  brand: Brand;
  contactSearch: ContactSearch;
  callingSettings: CallingSettings;
  connectivityManager: ConnectivityManager;
  forwardingNumber: ForwardingNumber;
  callMonitor: CallMonitor;
  extensionInfo: ExtensionInfo;
  conferenceCall?: ConferenceCall;
  routerInteraction?: RouterInteraction;
  callControlUIOptions: CallControlUIOptions;
  accountInfo: AccountInfo;
}
export function getLastCallInfoFromWebphoneSession(
  webphoneSession: NormalizedSession,
) {
  const sessionNumber =
    webphoneSession.direction === callDirections.outbound
      ? webphoneSession.to
      : webphoneSession.from;
  const sessionStatus = webphoneSession.callStatus;
  const matchedContact = webphoneSession.contactMatch;
  const calleeType = matchedContact
    ? calleeTypes.contacts
    : calleeTypes.unknown;
  return {
    calleeType,
    avatarUrl: matchedContact && matchedContact.profileImageUrl,
    name: matchedContact && matchedContact.name,
    status: sessionStatus,
    phoneNumber: sessionNumber,
  };
}

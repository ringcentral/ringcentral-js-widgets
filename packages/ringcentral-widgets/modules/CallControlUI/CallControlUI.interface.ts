import { ReactNode } from 'react';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCall';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcher';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import { ConnectivityManager } from '../ConnectivityManager';
import { RouterInteraction } from '../RouterInteraction';

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

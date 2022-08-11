import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettings';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { Call, Recipient } from '@ringcentral-integration/commons/modules/Call';
import { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCall';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import { ConnectivityManager } from '../ConnectivityManager';

export interface DialerUIOptions {
  useV2: boolean;
}

export interface Deps {
  callingSettings: CallingSettings;
  connectivityManager: ConnectivityManager;
  locale: Locale;
  rateLimiter: RateLimiter;
  regionSettings: RegionSettings;
  alert: Alert;
  call: Call;
  extensionFeatures: ExtensionFeatures;
  audioSettings?: AudioSettings;
  contactSearch?: ContactSearch;
  conferenceCall?: ConferenceCall;
  dialerUIOptions?: DialerUIOptions;
  accountInfo: AccountInfo;
}

export interface DialerUIPanelProps {
  currentLocale: string;
  callingMode: string;
  isWebphoneMode: boolean;
  callButtonDisabled: boolean;
  fromNumber: string;
  fromNumbers: UserPhoneNumberInfo[];
  toNumber: string;
  recipient: Recipient;
  recipients: Recipient[];
  searchContactList: {
    id: string;
    name: string;
    phoneNumber: string;
  }[];
  showSpinner: boolean;
  dialButtonVolume: number;
  dialButtonMuted: boolean;
  isLastInputFromDialpad: boolean;
  disableFromField: boolean;
  useV2: boolean;
  showAnonymous: boolean;
  onToNumberChange: (
    phoneNumber: string,
    fromDialPad?: boolean,
  ) => Promise<void>;
  clearToNumber: () => Promise<void>;
  onCallButtonClick: (options: OnCallButtonClickOptions) => Promise<void>;
  changeFromNumber: (number: { phoneNumber?: string }) => Promise<void>;
  formatPhone: (phoneNumber: string) => string;
  setRecipient: (recipient: Recipient) => Promise<void>;
  clearRecipient: () => Promise<void>;
  searchContact: (searchString: string) => Promise<void>;
}

export interface OnCallButtonClickOptions {
  fromNumber?: string;
  fromSessionId?: string;
  clickDialerToCall?: boolean;
  isStandAlone?: boolean;
}

import type { UserPhoneNumberInfo } from '@rc-ex/core/definitions';
import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettingsV2';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import {
  Call,
  Recipient,
} from '@ringcentral-integration/commons/modules/CallV2';
import { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCallV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { ExtensionFeatures } from '@ringcentral-integration/commons/modules/ExtensionFeatures';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiterV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

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
  onCallButtonClick: () => Promise<void>;
  changeFromNumber: (number: { phoneNumber?: string }) => Promise<void>;
  formatPhone: (phoneNumber: string) => string;
  setRecipient: (recipient: Recipient) => Promise<void>;
  clearRecipient: () => Promise<void>;
  searchContact: (searchString: string) => Promise<void>;
}

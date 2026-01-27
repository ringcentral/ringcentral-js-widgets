import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import type { ContactSearchEntity } from '@ringcentral-integration/micro-contacts/src/app/services';
import type { DialerPanel } from '@ringcentral-integration/widgets/components/DialerPanel';

import type { Recipient } from '../../services';

export interface DialerViewOptions {
  useV2: boolean;
  component?: typeof DialerPanel;
}

export interface DialerViewPanelProps {
  currentLocale: string;
  callingMode: string | null;
  isWebphoneMode: boolean;
  callButtonDisabled: boolean;
  fromNumber: string;
  fromNumbers: UserPhoneNumberInfo[];
  toNumber: string;
  recipient: Recipient | null;
  recipients: Recipient[];
  searchContactList: ContactSearchEntity[];
  showSpinner: boolean;
  callVolume: number;
  outputDeviceId: string;
  isLastInputFromDialpad: boolean;
  disableFromField: boolean;
  useV2: boolean;
  showAnonymous: boolean;
  onToNumberChange: (
    phoneNumber: string,
    fromDialPad?: boolean,
  ) => Promise<void>;
  clearToNumber: () => Promise<void>;
  triggerEventTracking: (eventName: string, contactType: string) => any;
  onCallButtonClick: (options: OnCallButtonClickOptions) => Promise<unknown>;
  changeFromNumber: (number: { phoneNumber?: string }) => Promise<void>;
  formatPhone: (phoneNumber: string) => string;
  setRecipient: (recipient: Recipient) => Promise<void>;
  clearRecipient: () => Promise<void>;
  searchContact: (searchString: string) => Promise<void>;
  // spring-ui only
  isSmartNoteEnabled: boolean;
  ContactSearch?: (props: any) => JSX.Element;
}

export interface OnCallButtonClickOptions {
  fromNumber?: string;
  fromSessionId?: string;
  clickDialerToCall?: boolean;
}

export interface DialerViewProps {
  //
}

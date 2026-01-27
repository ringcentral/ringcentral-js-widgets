import type {
  OnCallActionType,
  Recipient,
  UserPhoneNumberInfo,
} from '../../../../services';

import type { AddCallPage } from './AddCallPanel';

export interface AddCallViewOptions {
  component?: typeof AddCallPage;
}

export interface AddCallViewPanelProps {
  callVolume: number;
  outputDeviceId: string;
  actionButtonDisabled: boolean;
  onAction: OnCallActionType;
  toNumber: string;
  onToNumberChange: (toNumber: string) => void;
  recipients: Recipient[];
  onRecipientsChange: (recipient: Recipient[]) => Promise<void>;
  // callerId related
  isWebphoneMode: boolean;
  showAnonymous: boolean;
  disableFromField: boolean;
  fromNumber: string;
  fromNumbers: UserPhoneNumberInfo[];
  onFromNumberChange: (phoneNumber: string | null) => void;
  //

  ContactSearch?: (props: any) => JSX.Element;
}

export interface AddCallViewProps {}

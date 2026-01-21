import type ContactResource from '@rc-ex/core/lib/definitions/ContactResource';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { TransferPanel } from '@ringcentral-integration/widgets/components/TransferPanel';

import type { ActiveSession } from '../../services';
import type { RecipientProps } from '../AddCallView/AddCall.view.interface';

export interface TransferViewOptions {
  component?: typeof TransferPanel;
}

export interface TransferViewPanelProps {
  callVolume: number;
  outputDeviceId: string;
  sessionId: string;
  companyContacts: ContactResource[];
  currentLocale: string;
  searchContactList: {
    id: string;
    name: string;
    phoneNumber: string;
  }[];
  session: Partial<ActiveSession> | NormalizedSession | null | undefined;
  controlBusy: boolean;
  enableWarmTransfer: boolean;
  setActiveSessionId: (sessionId: string) => void;
  onTransfer: (transferNumber: string, sessionId: string) => void;
  onToVoicemail: (voicemailId?: string, sessionId?: string) => void;
  onWarmTransfer: (transferNumber: string, sessionId: string) => void;
  onBack: () => void;
  formatPhone: (phoneNumber: string) => string;
  searchContact: (searchString: string) => void;
  triggerEventTracking: (eventName: string, contactType: string) => any;
  onTransferDataTrack?: (
    recipients: RecipientProps[],
    toNumber: string,
  ) => void;
  onToVoicemailDataTrack?: (
    recipients: RecipientProps[],
    toNumber: string,
  ) => void;
  onWarmTransferDataTrack?: (
    recipients: RecipientProps[],
    toNumber: string,
  ) => void;
  ContactSearch?: (props: any) => JSX.Element;
}

export interface TransferViewProps {
  enableWarmTransfer?: boolean;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
}

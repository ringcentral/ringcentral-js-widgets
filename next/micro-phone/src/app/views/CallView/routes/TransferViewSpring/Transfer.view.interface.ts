import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import type {
  CallMetaInfo,
  OnCallActionType,
  Recipient,
} from '../../../../services';

import type { TransferPage } from './TransferPage';

export interface TransferViewOptions {
  component?: typeof TransferPage;
  onTransferDataTrack?: (recipients: Recipient[], toNumber: string) => void;
  onToVoicemailDataTrack?: (recipients: Recipient[], toNumber: string) => void;
  onWarmTransferDataTrack?: (recipients: Recipient[], toNumber: string) => void;
}

export interface TransferViewPanelProps {
  enableWarmTransfer: boolean;
  callVolume: number;
  outputDeviceId: string;
  actionButtonDisabled: boolean;
  onAction: OnCallActionType;
  toNumber: string;
  onToNumberChange: (toNumber: string) => void;
  recipients: Recipient[];
  onRecipientsChange: (recipient: Recipient[]) => Promise<void>;

  ContactSearch?: (props: any) => JSX.Element;
}

export type TransferViewProps = {
  call: Call;
} & Pick<CallMetaInfo, 'actionsDisabled'>;

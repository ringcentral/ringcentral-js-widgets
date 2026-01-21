import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import type {
  CallMetaInfo,
  OnCallActionType,
  Recipient,
} from '../../../../services';

import type { ForwardPage } from './ForwardPanel';

export interface ForwardViewOptions {
  component?: typeof ForwardPage;
}

export interface ForwardViewPanelProps {
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

export type ForwardViewProps = {
  call: Call;
} & Pick<CallMetaInfo, 'actionsDisabled'>;

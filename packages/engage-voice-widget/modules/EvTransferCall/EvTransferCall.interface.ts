import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { ModalUI } from '@ringcentral-integration/widgets/modules/ModalUI';

import type { DirectTransferTypes } from '../../enums/directTransferTypes';
import type {
  EvClient,
  EvDirectAgentListItem,
  EvDirectAgentTransferResponse,
  EvReceivedTransferCall,
} from '../../lib/EvClient';
import type { EvDirectAgentTransferCallback } from '../../lib/EvClient/enums/evDirectAgentTransferCallback';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvStorage } from '../EvStorage';
import type { EvSubscription } from '../EvSubscription';
import type { EvWorkingState } from '../EvWorkingState';

export type InternalTransferCallbacks = Partial<
  Record<DirectTransferTypes, EvDirectAgentTransferCallback>
>;

export type EvTransferFailHandler = (e: EvDirectAgentTransferResponse) => void;

export interface State {
  /**
   * A client transfers a call to target client.
   */
  receivedCall: EvReceivedTransferCall;
  /**
   * cancelable for a transferring call.
   */
  isTransferCancelable: boolean;
  /**
   * transfer status for any transfer call type.
   */
  transferStatus: string;
  /**
   * internal, phone book and manual entry one of them.
   */
  transferType: string;
  /**
   * in internal mode, transfer event pass target agent id(direct transfer call).
   */
  transferAgentId: string;
  /**
   * Agent list for transer internal call.
   */
  transferAgentList: EvDirectAgentListItem[];
  /**
   * in phone book mode, transfer event pass dialDest, callerId and sipHeaders with `transferPhoneBookSelected` list index from phone book selected item.
   */
  transferPhoneBookSelectedIndex: number;
  /**
   * in manual entry mode, transfer event pass the `transferRecipientNumber` value.
   */
  transferRecipientNumber: string;
  /**
   * if stayOnCall is true, the call should keep on call when the call transfered successfully.
   * otherwise, the call should be not disconnected.
   */
  stayOnCall: boolean;
  transferRecipientCountryId: string;
}

export interface EvTransferCallOptions {
  //
}

export interface Deps {
  evClient: EvClient;
  evCallMonitor: EvCallMonitor;
  evCall: EvCall;
  evSubscription: EvSubscription;
  evWorkingState: EvWorkingState;
  storage: EvStorage;
  modalUI: ModalUI;
  locale: Locale;
  alert: Alert;
  evAuth: EvAuth;
  evAgentSession: EvAgentSession;
  evTransferCallOptions?: EvTransferCallOptions;
}

export interface TransferCall extends State {
  //
}

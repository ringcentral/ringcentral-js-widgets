import Alert from 'ringcentral-integration/modules/Alert';
import Locale from 'ringcentral-integration/modules/Locale';
import Storage from 'ringcentral-integration/modules/Storage';
import { Modal } from 'ringcentral-widgets/modules/Modal';

import { DirectTransferTypes } from '../../enums/directTransferTypes';
import {
  EvClient,
  EvDirectAgentListItem,
  EvReceivedTransferCall,
} from '../../lib/EvClient';
import {
  EvDirectAgentTransferCall,
  EvDirectAgentTransferCallback,
} from '../../lib/EvClient/enums/evDirectAgentTransferCallback';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvSubscription } from '../EvSubscription';
import { EvWorkingState } from '../EvWorkingState';

export type InternalTransferCallbacks = Partial<
  Record<DirectTransferTypes, EvDirectAgentTransferCallback>
>;

export type EvTransferFailHandler = (e: EvDirectAgentTransferCall) => void;

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

export interface DepsModules {
  evClient: EvClient;
  evCallMonitor: EvCallMonitor;
  evCall: EvCall;
  evSubscription: EvSubscription;
  evWorkingState: EvWorkingState;
  storage: Storage;
  modal: Modal;
  locale: Locale;
  alert: Alert;
  evAuth: EvAuth;
  evSessionConfig: EvSessionConfig;
}

export interface TransferCall extends State {
  //
}

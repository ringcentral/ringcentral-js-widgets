import { ModalTemplate } from 'ringcentral-widgets/modules/Modal/Modal.interface';

import { EvTransferType } from '../enums';
import {
  EvAvailableCountry,
  EvDirectAgentListItem,
  EvTransferPhoneBookItem,
  EvAvailableRequeueQueue,
  EvGate,
} from '../lib/EvClient';

export type TextField = {
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  router?: string;
};

export type EvTransferOption = {
  type: string;
  label: string;
  textFields: TextField[];
};

export interface EvTransferCallUIProps {
  currentLocale: string;
  transferring: boolean;
  transferOptions: EvTransferOption[];
  isStayOnCall: boolean;
  selectedTransferType: EvTransferType;
  textFields: TextField[];
  transferPhoneBook: EvTransferPhoneBookItem[];
  transferAgentList: EvDirectAgentListItem[];
  transferAgentListUpdateTTL: number;
  transferRecipientCountryId: string;
  transferRecipientNumber: string;
  transferPhoneBookSelectedIndex: number;
  transferAgentId: string;
  transferCountryOptions: EvAvailableCountry[];
  allowManualInternationalTransfer: boolean;
  transferCallDisabled: boolean;
  isWide?: boolean;
  // requeue
  requeuing: boolean;
  selectedQueueGroupId: string;
  selectedGateId: string;
  queueGroups: EvAvailableRequeueQueue[];
  selectedQueueGroup: EvAvailableRequeueQueue;
  selectedGate: EvGate;
  gateDisabled: boolean;
  selectQueueGroupDisabled: boolean;
}

export interface EvTransferCallUIFunctions {
  goBack(): void;
  clickCallRecipient(router: string): void;
  clickTransferTypeFiled(type: string): void;
  setStayOnCall(status: boolean): void;
  fetchAgentList(): void;
  changeTransferAgentId(agentId: string): void;
  changeRecipientNumber(recipientNumber: string): void;
  changeTransferPhoneBookSelected(index: number): void;
  changeRecipientCountryId(countryId: string): void;
  searchAgent(option: EvDirectAgentListItem, text: string): void;
  searchPhoneBook(option: EvTransferPhoneBookItem, text: string): void;
  transferCall(): void;
  setCancelTemplate(templates: React.ReactNode): void;
  cancelTransfer(): void;
  cancelTransferPage(): void;
  // requeue
  goToActivityCallLogPage(): void;
  goToRequeueGroupPage(): void;
  goToRequeueCallPage(): void;
  goToRequeueGroupDetailPage(params: GoToRequeueGroupDetailPageParams): void;
  searchGroup(option: EvAvailableRequeueQueue, text: string): boolean;
  searchGate(option: EvGate, text: string): boolean;
  submitSelection(queueId: string): void;
}

export interface GoToRequeueGroupDetailPageParams {
  groupId: string;
  isCheckDisable?: boolean;
}

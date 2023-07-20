import type { EvTransferType } from '../enums';
import type {
  EvAvailableCountry,
  EvAvailableRequeueQueue,
  EvDirectAgentListItem,
  EvGate,
  EvTransferPhoneBookItem,
} from '../lib/EvClient';

export type TextFieldModel = {
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
  textFields: TextFieldModel[];
};

export interface EvTransferCallUIProps {
  currentLocale: string;
  transferring: boolean;
  transferOptions: EvTransferOption[];
  isStayOnCall: boolean;
  selectedTransferType: EvTransferType;
  textFields: TextFieldModel[];
  transferPhoneBook: EvTransferViewPhoneBookItem[];
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
}

export interface EvTransferCallUIFunctions {
  goBack(): void;
  clickCallRecipient(router: string): void;
  clickTransferTypeFiled(type: EvTransferType): void;
  setStayOnCall(status: boolean): void;
  fetchAgentList(): void;
  changeTransferAgentId(agentId: string): void;
  changeRecipientNumber(recipientNumber: string): void;
  changeTransferPhoneBookSelected(index: number): void;
  changeRecipientCountryId(countryId: string): void;
  searchAgent(option: EvDirectAgentListItem, text: string): boolean;
  searchPhoneBook(option: EvTransferViewPhoneBookItem, text: string): boolean;
  transferCall(): Promise<void>;
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

export type EvTransferViewPhoneBookItem = {
  phoneBookName: string;
  parsedDestination: string;
  phoneBookItemIndex: number;
} & EvTransferPhoneBookItem;

export interface GoToRequeueGroupDetailPageParams {
  groupId: string;
  isCheckDisable?: boolean;
}

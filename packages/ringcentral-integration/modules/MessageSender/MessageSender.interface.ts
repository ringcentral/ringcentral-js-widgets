import type { RingCentralClient } from '../../lib/RingCentralClient';
import type { AccountInfo } from '../AccountInfo';
import type { Alert } from '../Alert';
import type { AvailabilityMonitor } from '../AvailabilityMonitor';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import type { NumberValidate } from '../NumberValidate';
import type { AppFeatures } from '../AppFeatures';
import type { CompanyContacts } from '../CompanyContacts';

export interface Deps {
  alert: Alert;
  client: RingCentralClient;
  extensionInfo: ExtensionInfo;
  extensionPhoneNumber: ExtensionPhoneNumber;
  numberValidate: NumberValidate;
  appFeatures: AppFeatures;
  availabilityMonitor?: AvailabilityMonitor;
  messageSenderOptions?: MessageSenderOptions;
  accountInfo?: AccountInfo;
  companyContacts?: CompanyContacts;
}

interface SendErrorResponseError {
  errorCode: string;
  parameterName: string;
}

export interface SendErrorResponse {
  errorCode: string;
  errors?: SendErrorResponseError[];
}

export interface MessageSenderOptions {}

export interface SenderNumber {
  phoneNumber: string;
}

export interface Attachment {
  name: string;
  size: number;
  file: File;
}

export interface EventParameter {
  eventId: string;
  fromNumber: string;
  toNumbers: string[];
  text: string;
  replyOnMessageId?: string;
  multipart?: boolean;
}

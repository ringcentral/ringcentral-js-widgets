import { RingCentralClient } from '../../lib/RingCentralClient';
import { AccountInfo } from '../AccountInfo';
import { Alert } from '../Alert';
import { AvailabilityMonitor } from '../AvailabilityMonitor';
import { ExtensionInfo } from '../ExtensionInfo';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import { NumberValidate } from '../NumberValidate';
import { AppFeatures } from '../AppFeatures';
import { CompanyContacts } from '../CompanyContacts';

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

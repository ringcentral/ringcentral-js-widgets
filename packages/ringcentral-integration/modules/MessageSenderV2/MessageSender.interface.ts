import { RingCentralClient } from '../../lib/RingCentralClient';
import { Alert } from '../AlertV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumberV2';
import { NumberValidate } from '../NumberValidateV2';
import { AvailabilityMonitor } from '../AvailabilityMonitorV2';

export interface Deps {
  alert: Alert;
  client: RingCentralClient;
  extensionInfo: ExtensionInfo;
  extensionPhoneNumber: ExtensionPhoneNumber;
  numberValidate: NumberValidate;
  availabilityMonitor?: AvailabilityMonitor;
  messageSenderOptions?: MessageSenderOptions;
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

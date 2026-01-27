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
  base64Url?: string;
}

export interface EventParameter {
  eventId: string;
  fromNumber: string;
  toNumbers: string[];
  text: string;
  replyOnMessageId?: string;
  multipart?: boolean;
}

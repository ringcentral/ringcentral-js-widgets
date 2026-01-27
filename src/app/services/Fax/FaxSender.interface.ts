import type { PostBody } from 'ringcentral-client/build/paths/Fax';

export interface FaxMessagePayload extends PostBody {
  attachments: File[];
}
export interface Recipient {
  id?: string;
  phoneNumber: string;
  entityType?: string;
  isWarning?: boolean;
  type?: string;
  name?: string;
  freeSolo?: boolean;
  phoneType?: string;
  /**
   * error state for the recipient
   * @default false
   */
  error?: boolean;
}

export type FileItem = {
  name: string;
  id: string;
  size: number;
  file: File;
  type: string;
  /**
   * use for save data into storage
   */
  base64?: string;
  /**
   * only for image file
   */
  width?: number;
  height?: number;
};

export interface FaxEditingInfo {
  senderNumber: string;
  recipients: Recipient[];
  coverIndex: number;
  coverNotes?: string;
  attachments: FileItem[];
}

export interface FaxSenderOptions {
  maxRecipients?: number;
}

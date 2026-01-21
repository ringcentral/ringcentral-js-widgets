import UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';

import type { FaxEditingInfo, FileItem, Recipient } from '../../services';
import type { CoverInfo } from '../../services/Fax/FaxCover';

export type FaxSendPanelProps = {
  showSpinner?: boolean;
  acceptFileTypes: string;
  faxInfo: FaxEditingInfo;
  covers?: CoverInfo[];
  currentFilesSize?: number;
  maxAllowedAttachmentSize?: number;
  showCoverTextInput?: boolean;
  typingToNumber: string;
  maxRecipients?: number;
  senderNumber: string;
  senderNumbers: UserPhoneNumberInfo[];
  formatPhone: (...args: any[]) => any;
  addToNumbers: (recipient: Recipient[]) => Promise<boolean>;
  removeToNumber: (recipient: Recipient) => void;
  cleanTypingToNumber: () => void;
  updateSenderNumber: (args: { phoneNumber: string }) => void;
  updateTypingToNumber: (toNumber: string) => void;
  onCoverTextChange: (value: string) => void;
  onCoverIndexChange: (index: number) => void;
  onUploadFiles?: (files: FileItem[]) => void | Promise<void>;
  onRemoveFile?: (id: string) => void | Promise<void>;
  canSendNow?: boolean;
  onCancel?: () => void;
  onSendNow?: () => void;
  onSendLater?: () => void;
  ContactSearch?: (props: any) => JSX.Element;
};

export type FaxSendTimeType = 'Send Later' | 'Send Now';
export type FaxSendLocationType = 'Fax Category' | 'Fax List' | 'Fax Forward';

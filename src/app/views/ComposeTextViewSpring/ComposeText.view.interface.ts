import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import { PortalHostResolveData } from '@ringcentral-integration/next-core';

import { Attachment, ToNumber } from '../../services';

export interface ComposeTextViewSpringOptions {
  onDncVerify: (toNumbers: ToNumber[]) => Promise<PortalHostResolveData>;
  getNumbersToRemove: (toNumbers: ToNumber[]) => Promise<ToNumber[]>;
  component?: React.ComponentType<any>;
}
export interface ComposeTextViewSpringProps {}

export interface ComposeTextPanelSpringProps {
  onBackClick: () => void;
  className?: string;
  send: (text: string, attachments: Attachment[]) => any;
  senderNumbers: UserPhoneNumberInfo[];
  sendButtonDisabled: boolean;
  updateSenderNumber: (phoneNumber: string) => any;
  updateTypingToNumber: (phoneNumber: string) => any;
  cleanTypingToNumber: () => any;
  addToNumbers: (numbers: ToNumber[]) => any;
  removeToNumber: (number: ToNumber) => any;
  updateMessageText: (text: string) => any;
  messageText: string;
  typingToNumber: string;
  senderNumber: string;
  toNumbers: ToNumber[];
  showSpinner?: boolean;
  attachments?: Attachment[];
  addAttachments: (files: Attachment[]) => any;
  removeAttachment: (file: Attachment) => any;
  onCreateGroupTextOptionChanged: (checked: boolean) => void;
  allowedCreateGroupText?: boolean;
  createGroupChecked?: boolean;
  maxRecipients?: number;
  acceptFileTypes: string;
  supportAttachment?: boolean;
  ContactSearch?: (props: any) => JSX.Element;
  toolbar?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  disabledGroupMessage?: boolean;
}
export interface SalesforceContact {
  id: string;
  name: string;
  type: string;
  phoneNumber: string;
  phoneType: string;
  accountName: string;
  doNotCall: boolean;
  entityType: string;
  isPrimary: boolean;
  resourceType: string;
}

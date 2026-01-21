import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import type { ToNumber } from '@ringcentral-integration/commons/modules/ComposeText';
import type { ContactSearchEntity } from '@ringcentral-integration/micro-contacts/src/app/services';
import type ComposeTextPanel from '@ringcentral-integration/widgets/components/ComposeTextPanel';

export interface ComposeTextViewOptions {
  component?: typeof ComposeTextPanel;
}

export interface ComposeTextViewProps {
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  inputExpandable?: boolean;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  supportAttachment?: boolean;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  supportEmoji?: boolean;
  formatContactPhone?: (phoneNumber: string) => string;
  phoneTypeRenderer?: (...arg: any[]) => any;
  phoneSourceNameRenderer?: (...arg: any[]) => any;
  recipientsContactInfoRenderer?: (...arg: any[]) => any;
  recipientsContactPhoneRenderer?: (...arg: any[]) => any;
  useRecipientsInputV2?: boolean;
}

export interface ComposeTextPanelProps {
  triggerEventTracking: (eventName: string, contactType: string) => any;
  onBackClick: () => void;
  brand?: string;
  className?: string;
  send: (...args: any[]) => any;
  senderNumbers: UserPhoneNumberInfo[];
  sendButtonDisabled: boolean;
  formatPhone: (...args: any[]) => any;
  formatContactPhone: (...args: any[]) => any;
  detectPhoneNumbers: (...args: any[]) => any;
  searchContact: (...args: any[]) => any;
  searchContactList: ContactSearchEntity[];
  currentLocale: string;
  updateSenderNumber: (...args: any[]) => any;
  updateTypingToNumber: (...args: any[]) => any;
  cleanTypingToNumber: (...args: any[]) => any;
  addToNumber: (...args: any[]) => any;
  removeToNumber: (...args: any[]) => any;
  updateMessageText: (...args: any[]) => any;
  messageText: string;
  typingToNumber: string;
  senderNumber: string;
  toNumbers: ToNumber[];
  outboundSMS?: boolean;
  showSpinner?: boolean;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  recipientsContactInfoRenderer?: (...args: any[]) => any;
  recipientsContactPhoneRenderer?: (...args: any[]) => any;
  autoFocus?: boolean;
  inputExpandable?: boolean;
  supportAttachment?: boolean;
  supportEmoji?: boolean;
  attachments?: {
    name: string;
    size: number;
  }[];
  addAttachments?: (...args: any[]) => any;
  removeAttachment?: (...args: any[]) => any;
  onCreateGroupTextOptionChanged: (checked: boolean) => void;
  useRecipientsInputV2?: boolean;
  allowedCreateGroupText?: boolean;
  createGroupChecked?: boolean;
  maxRecipients?: number;
  acceptFileTypes: string;
  ContactSearch?: (props: any) => JSX.Element;
}

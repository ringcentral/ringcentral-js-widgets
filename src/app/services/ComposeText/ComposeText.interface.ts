import type { SuggestionListItemData } from '@ringcentral-integration/micro-contacts/src/app/views';

export interface ComposeTextOptions {
  /**
   * The maximum number of recipients allowed to send messages
   */
  maxRecipients?: number;
  /**
   * If true, the function of group message will be disabled
   */
  disabledGroupMessage?: boolean;
  /**
   * processor for the to numbers when get the `toNumbers`
   */
  toNumbersProcessor?: (toNumbers: ToNumber) => ToNumber;
}

export interface ToNumber extends SuggestionListItemData {
  id?: string;
  phoneNumber: string;
  entityType?: string;
  isWarning?: boolean;
  type?: string;
  name?: string;
  freeSolo?: boolean;
  phoneType?: string;
  /**
   * the reason why the phone number is invalid
   */
  errorReason?: 'optOut' | 'invalidPhoneNumber';
}

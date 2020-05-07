import { FunctionComponent, ReactNode, MouseEvent } from 'react';

export interface Recipient {
  name: string;
  entityType?: string;
  phoneType?: string;
  phoneNumber: string;
}

export interface BaseRecipientsInputProps {
  enableTitle: boolean;
  currentLocale: string;
  formatContactPhone: (phoneNumber: string) => ReactNode;
  phoneSourceNameRenderer?: (entityType: string) => ReactNode;
  phoneTypeRenderer?: (phoneType: string) => ReactNode;
}

export interface BaseRecipientOptionProps
  extends BaseRecipientsInputProps,
    Recipient {
  splitter: string;
}

export interface RecipientInfoProps extends BaseRecipientOptionProps {}

export interface RecipientPhoneProps extends BaseRecipientOptionProps {}

export interface RendererOverrides {
  recipientInfoRenderer?: FunctionComponent<BaseRecipientOptionProps>;
  recipientPhoneRenderer?: FunctionComponent<BaseRecipientOptionProps>;
}

export interface RecipientOptionProps
  extends BaseRecipientOptionProps,
    RendererOverrides {
  active: boolean;
  onClick: (ev: MouseEvent) => void;
  onHover: (ev: MouseEvent) => void;
}

export interface DropdownListHandles {
  scrollUp: () => void;
  scrollDown: () => void;
  setScrollPosition: (scrollTop: number) => void;
}

export interface DropdownListProps
  extends BaseRecipientsInputProps,
    RendererOverrides {
  className?: string;
  visibility: boolean;
  addToRecipients: (item: Recipient) => void;
  recipientOptions: Recipient[];
  setSelectedIndex: (index: number) => void;
  selectedIndex: number;
}

export interface RecipientsInputV2Handles {
  focus: () => void;
  blur: () => void;
}
export interface RecipientsInputV2Props extends BaseRecipientsInputProps {
  className?: string;
  recipients: Recipient[];
  searchContactList: Recipient[];
  contactInfoRenderer?: FunctionComponent<BaseRecipientOptionProps>;
  contactPhoneRenderer?: FunctionComponent<BaseRecipientOptionProps>;
  addToRecipients: (item: Recipient) => void;
  multiple?: boolean;
  label?: string;
  onInputChange: (newValue: string) => void;
  onInputClear: () => void;
  useRCUI?: boolean;
  value: string;
  removeFromRecipients: (phoneNumber: string) => void;
  recipientsClassName?: string;
  placeholder?: ReactNode;
  isLastInputFromDialpad?: boolean;
}

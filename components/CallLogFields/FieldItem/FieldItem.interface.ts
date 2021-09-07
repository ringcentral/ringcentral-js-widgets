import { RcTextFieldProps } from '@ringcentral/juno';

export type PickListOption = {
  label: string;
  value: any;
  disabled?: boolean;
  title?: string;
};

export type FieldItemType =
  | 'reference'
  | 'picklist'
  | 'textarea'
  | 'date'
  | 'string'
  | 'integer'
  | 'double'
  | 'long'
  | 'combobox'
  | 'radio'
  | 'ticketSelectList';

export type FieldItemOption = {
  label: string;
  title?: string;
  type: FieldItemType;
  /** value key for task, that will get currentLog.task[value] to set this field value */
  value: string;
  sort?: number;
  required?: boolean;
  maxLength?: number;
  picklistOptions?: (string | number | PickListOption)[];
  enableScrollError?: boolean;
  referenceObjs?: string[];
  defaultValue?: string;
  renderCondition?: string;
  onlyShowInMultipleMatches?: boolean;
  showOtherSection?: boolean;
  onChange?: (value?: any) => any;
  multiple?: boolean;
} & Pick<RcTextFieldProps, 'helperText' | 'error' | 'disabled' | 'placeholder'>;

export type FieldsMap = { [p in FieldItemType]: () => JSX.Element };

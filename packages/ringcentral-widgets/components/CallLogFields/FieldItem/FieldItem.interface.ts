import { RcTextFieldProps } from '@ringcentral-integration/rcui';

export type PickListOption = {
  label: string;
  value: any;
};

export type FieldItemOption = {
  label: string;
  type: FieldItemType;
  value: string;
  sort?: number;
  required?: boolean;
  maxLength?: number;
  picklistOptions?: (string | number | PickListOption)[];

  referenceObjs?: string[];
  defaultValue?: string;
  onChange?: (value?: any) => any;
} & Pick<RcTextFieldProps, 'helperText' | 'error' | 'disabled'>;

export type FieldItemType =
  | 'reference'
  | 'picklist'
  | 'textarea'
  | 'date'
  | 'string'
  | 'integer'
  | 'double'
  | 'combobox';

export type FieldsMap = { [p in FieldItemType]: () => JSX.Element };

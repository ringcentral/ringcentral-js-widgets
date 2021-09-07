import { RcDatePickerProps } from '@ringcentral/juno';
import { ReactElementLike } from 'prop-types';
import { MutableRefObject, ReactNode } from 'react';

import { CallLog, Task } from '../CallLogPanel';

export type CallLogFieldsProps = {
  currentLocale: string;
  currentLog?: CallLog;
  onUpdateCallLog?: (...args: any[]) => any;
  onSaveCallLog?: (...args: any[]) => any;
  onSelectViewVisible?: (visible: boolean, fieldName: string) => any;
  customInputDataStruct?: (...args: any[]) => any;
  subjectDropdownsTracker?: (...args: any[]) => any;
  startAdornmentRender?: (...args: any[]) => any;
  referenceFieldOptions: { [key: string]: FieldOption };
  contactSearch: () => Promise<Array<any>>;
  showFoundFromServer: boolean;
  editSectionScrollBy?: (top: number) => void;
  fieldSize: RcDatePickerProps['size'];
  classes?: {
    root?: string;
  };
  refs?: {
    [key: string]: MutableRefObject<any>;
  };
  disabled: boolean;
};

export interface FieldOption {
  getLabel: (item: any, length?: number, currentLog?: CallLog) => string;
  getSelectedOptionLabel?: (
    item: any,
    length?: number,
    currentLog?: CallLog,
  ) => string;
  getType?: (item: any) => string;
  onChange: (item: any) => any;
  metadata?: FieldMetadata;
  currentOptionFinder: (task: Task) => (item: any) => boolean;
  matchedEntitiesGetter: (currentLog: CallLog) => any;
  otherEntitiesGetter?: (currentLog: CallLog) => any;
  associatedEntitiesGetter?: (currentLog: CallLog) => any;
  searchOptionFinder?: (option: any, text: string) => boolean;
  shouldShowAssociatedSection?: (currentLog: CallLog) => boolean;
  rightIconRender?: (item: any) => ReactElementLike;
  onBackClick?: () => void;
  backHeaderClassName?: string;
  shouldDisable?: (task?: Task) => boolean;
  disableReason?: ReactNode | string;
  getValue?: (item: any) => any;
  foundFromServerEntityGetter?: (currentLog: CallLog) => any[];
  multiple?: boolean;
}

export interface FieldMetadata {
  title: string;
  placeholder: string;
  valueField: string;
}

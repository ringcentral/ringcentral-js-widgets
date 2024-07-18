import type { RcDatePickerProps } from '@ringcentral/juno';
import type { ReactElementLike } from 'prop-types';
import type { MutableRefObject, ReactNode } from 'react';

import type { CallLog, Task } from '../CallLogPanel';

export type CallLogFieldsProps = {
  currentLocale: string;
  currentLog?: CallLog;
  currentDelaySavingState?: any;
  onUpdateCallLog?: (data: { task: Task }, id: string) => any;
  onSaveCallLog?: (...args: any[]) => any;
  onSelectViewVisible?: (visible: boolean, fieldName: string) => any;
  customInputDataStruct?: (...args: any[]) => any;
  subjectDropdownsTracker?: (...args: any[]) => any;
  startAdornmentRender?: (...args: any[]) => any;
  referenceFieldOptions: { [key: string]: FieldOption };
  contactSearch: ({
    searchString,
  }: {
    searchString: string;
  }) => Promise<Array<any>> | Promise<void>;
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
  onSelectListOpen?(fieldValue: string): void;
  onTextAreaFocus?: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onFullSelectFieldClick?(field: string): void;
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
  shouldDisable?: (task?: Task, call?: CallLog['call']) => boolean;
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

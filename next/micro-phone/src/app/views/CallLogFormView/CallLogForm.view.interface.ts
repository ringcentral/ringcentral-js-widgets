import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { InputSelectWidgetProps } from '../../components/InputSelectWidgetSpring/InputSelectWidget.interface';
import type { ReferenceWidgetProps } from '../../components/ReferenceWidgetSpring';
import type { HistoryCall } from '../../services';

export interface CallLogFormViewOptions {
  component?: any;
}

export interface CallLogFormViewProps {
  info?: Call | HistoryCall;
  /**
   * the render view variant
   */
  variant?: 'expanded' | 'history' | 'postCall';
}

export type UpdateCallLogOptions = {
  markDirty?: boolean;
  /**
   * The task field keys the user actually edited. When provided, only these
   * keys are considered for dirty-tracking and merged into the task, so
   * untouched fields (e.g. async contact-match results) are not clobbered.
   */
  changedKeys?: string[];
};

export type CallLogFormViewPanelProps = PropsWithChildren<
  {
    disabled: boolean;
    formKey?: string;
    formRef?: React.ReactElement;
    editSectionSchema: {
      uiOrder: string[];
      uiSchema: any;
      renderSchema?: any;
    };
    task: Record<string, any>;
    referenceFields: Record<
      string,
      ReferenceWidgetProps | InputSelectWidgetProps
    >;
    onUpdateCallLog: (formData: any, options?: UpdateCallLogOptions) => void;
  } & CallLogFormViewProps
>;

export { ReferenceWidgetProps };

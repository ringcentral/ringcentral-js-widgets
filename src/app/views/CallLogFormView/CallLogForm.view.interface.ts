import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
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

export type CallLogFormViewPanelProps = {
  disabled: boolean;
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
  onUpdateCallLog: (formData: any) => void;
} & CallLogFormViewProps;

export { ReferenceWidgetProps };

import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  injectable,
  RcViewModule,
  UIProps,
  useConnector,
  optional,
} from '@ringcentral-integration/next-core';
import { Button } from '@ringcentral/spring-ui';
import React, { useRef } from 'react';

import i18n from './i18n';
import type {
  SmartNotesLogViewProps,
  SmartNotesLogViewOptions,
} from './SmartNotesLog.view.interface';

export interface LogNotesStatus {
  isSaving: boolean;
  isSucceed: boolean;
}

export interface SmartNotesLogViewPanelProps {
  telephonySessionId: string;
  status: LogNotesStatus;
  saveButtonDisabled: boolean;
  sessionId: string;
  shouldShowSaveToCrmButton: boolean;
}

@injectable({
  name: 'SmartNotesLogView',
})
export class SmartNotesLogView extends RcViewModule {
  constructor(
    @optional('SmartNotesLogTasks')
    protected _smartNotesLogTasks: any,
    @optional('SmartNotesLogViewOptions')
    protected _smartNotesLogViewOptions?: SmartNotesLogViewOptions,
  ) {
    super();
  }

  getUIProps(
    props: SmartNotesLogViewProps,
  ): UIProps<SmartNotesLogViewPanelProps> {
    const status = this._smartNotesLogTasks.getLogNotesStatus(
      props.telephonySessionId,
    );

    const sessionId = props.sessionId;
    const telephonySessionId = props.telephonySessionId;

    return {
      telephonySessionId: props.telephonySessionId,
      sessionId: props.sessionId,
      status: this._smartNotesLogTasks.getLogNotesStatus(
        props.telephonySessionId,
      ),
      saveButtonDisabled: status.isSaving || status.isSucceed,

      shouldShowSaveToCrmButton:
        this._smartNotesLogViewOptions?.shouldShowSaveToCrmButton?.({
          sessionId,
          telephonySessionId,
        }) ?? false,
    };
  }

  getUIFunctions(props: SmartNotesLogViewProps) {
    return {
      onSave: () =>
        this._handleSave({
          sessionId: props.sessionId,
          telephonySessionId: props.telephonySessionId,
        }),
    };
  }

  async _handleSave(params: { sessionId: string; telephonySessionId: string }) {
    const { sessionId, telephonySessionId } = params;
    try {
      await this._smartNotesLogTasks.saveToCrm({
        sessionId,
        telephonySessionId,
        mode: 'manual',
      });
    } catch {
      // toast error message
    }
  }

  component(props: SmartNotesLogViewProps) {
    const { t } = useLocale(i18n);
    const uiProps = useConnector(() => this.getUIProps(props));
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));
    const { status, saveButtonDisabled } = uiProps;
    const saveButtonLabel = status.isSucceed ? t('saved') : t('saveToCRM');

    if (!uiProps.shouldShowSaveToCrmButton) {
      return null;
    }

    return (
      <div className="p-3 flex-none border-t border-neutral-b4/50 mt-auto">
        <Button
          fullWidth
          color="primary"
          data-sign="ai-notes-save-button"
          data-state={
            status.isSaving ? 'saving' : status.isSucceed ? 'saved' : 'save'
          }
          loading={status.isSaving}
          disabled={saveButtonDisabled}
          onClick={uiFunctions.onSave}
          size="medium"
          className="typography-subtitleMini"
        >
          {saveButtonLabel}
        </Button>
      </div>
    );
  }
}

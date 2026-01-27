import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import {
  ConnectivityMonitor,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  CallLogSyncTabId,
  SyncTabId,
  SyncTabView,
} from '@ringcentral-integration/micro-core/src/app/views';
import {
  delegate,
  injectable,
  optional,
  RcViewModule,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import { Button } from '@ringcentral/spring-ui';
import { EventEmitter } from 'events';
import React, { forwardRef, useRef } from 'react';

import { CallAction } from '../../services';
import { CallLogTasks } from '../../services/CallLogTasks';

import type {
  CallLogFormViewOptions,
  CallLogFormViewPanelProps,
  CallLogFormViewProps,
} from './CallLogForm.view.interface';
import { CallLogFormPage } from './CallLogFormPage';
import panelI18n from './CallLogFormPage/i18n';
import { I18nKey, t } from './i18n';

@injectable({
  name: 'CallLogFormView',
})
export class CallLogFormView extends RcViewModule {
  public eventEmitter = new EventEmitter();

  @delegate('server')
  async onUpdateCallLog(newData: CallLogFormViewPanelProps['task']) {
    this._onUpdateCallLog(newData);
  }

  @delegate('server')
  async onSaveCallLog() {
    this._onSaveCallLog();
  }

  _onSaveCallLog() {
    // should be override
  }
  _onUpdateCallLog(_newData: CallLogFormViewPanelProps['task']) {
    // should be override
  }

  constructor(
    protected _callAction: CallAction,
    protected _syncTabView: SyncTabView,
    protected _connectivityMonitor: ConnectivityMonitor,
    @optional() protected _callLogTasks: CallLogTasks,
    @optional('CallLogFormViewOptions')
    protected _callLogFormViewOptions?: CallLogFormViewOptions,
  ) {
    super();
  }

  getUIProps({
    variant,
  }: CallLogFormViewProps): UIProps<CallLogFormViewPanelProps> {
    return {
      task: this.task,
      referenceFields: this.referenceFields,
      editSectionSchema: this.editSectionSchema,
      disabled: this.networkDisabled,
      variant,
    };
  }

  get networkDisabled() {
    return !this._connectivityMonitor.connectivity;
  }

  get saveButtonDisabled() {
    return false;
  }

  getUIFunctions(
    _: CallLogFormViewProps,
  ): UIFunctions<CallLogFormViewPanelProps> {
    return {
      onUpdateCallLog: (newData: CallLogFormViewPanelProps['task']) =>
        this.onUpdateCallLog(newData),
    };
  }

  // should be override
  get editSectionSchema(): CallLogFormViewPanelProps['editSectionSchema'] {
    return {
      uiOrder: [],
      uiSchema: {},
      renderSchema: {},
    };
  }

  // should be override
  get referenceFields(): CallLogFormViewPanelProps['referenceFields'] {
    return {};
  }

  get task(): CallLogFormViewPanelProps['task'] {
    return {};
  }

  get currentIdentify() {
    return this._callAction.displayFormCall?.sessionId;
  }

  get currentLogState() {
    return this.currentIdentify
      ? this._callLogTasks?.callsMappingState[this.currentIdentify]
      : undefined;
  }

  getDisplayListLabel(key: I18nKey) {
    return t(key);
  }

  Save = forwardRef<HTMLDivElement, {}>((_, ref) => {
    const { t } = useLocale(panelI18n);

    const { isSaving, disabled, show } = useConnector(() => {
      const currentLogState = this.currentLogState;

      const isSaving = currentLogState?.isSaving;
      const isSaved = currentLogState?.isSucceed && !currentLogState.isEdited;

      const activeSyncTab = this._syncTabView.getActive(SyncTabId.CALL_LOG);
      return {
        disabled:
          this.networkDisabled ||
          this.saveButtonDisabled ||
          isSaved ||
          isSaving,
        isSaving,
        show: !activeSyncTab || activeSyncTab === CallLogSyncTabId.LOG,
      };
    });

    // currently we only show save button in log tab, once we support log AI note, we need to update this logic
    return show ? (
      <div
        ref={ref}
        className="p-4 border-t border-neutral-b4/50 mt-auto flex-none"
      >
        <Button
          fullWidth
          data-sign="save-button"
          disabled={disabled}
          loading={isSaving}
          onClick={() => this.onSaveCallLog()}
        >
          {t('save')}
        </Button>
      </div>
    ) : null;
  });

  component(props: CallLogFormViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._callLogFormViewOptions?.component || CallLogFormPage;

    return <Component {..._props} {...uiFunctions} />;
  }
}

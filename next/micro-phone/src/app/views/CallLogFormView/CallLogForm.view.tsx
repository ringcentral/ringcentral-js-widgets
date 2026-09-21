import { ConnectivityMonitor } from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  CallLogSyncTabId,
  SyncTabId,
  SyncTabView,
} from '@ringcentral-integration/micro-core/src/app/views';
import type { ExperienceFeedbackView } from '@ringcentral-integration/micro-setting/src/app/views';
import {
  computed,
  delegate,
  dynamic,
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
  UpdateCallLogOptions,
} from './CallLogForm.view.interface';
import { CallLogFormPage } from './CallLogFormPage';
import i18n, { I18nKey, t } from './i18n';

@injectable({
  name: 'CallLogFormView',
})
export class CallLogFormView extends RcViewModule {
  public eventEmitter = new EventEmitter();

  @dynamic('ExperienceFeedbackView')
  private _experienceFeedbackView?: ExperienceFeedbackView;

  @delegate('server')
  async onUpdateCallLog(
    newData: CallLogFormViewPanelProps['task'],
    options?: UpdateCallLogOptions,
  ) {
    this._onUpdateCallLog(newData, options);
  }

  @delegate('server')
  private async onSaveCallLog() {
    return this._onSaveCallLog();
  }

  async _onSaveCallLog() {
    // should be override

    return false;
  }
  _onUpdateCallLog(
    _newData: CallLogFormViewPanelProps['task'],
    _options?: UpdateCallLogOptions,
  ) {
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
      onUpdateCallLog: (
        newData: CallLogFormViewPanelProps['task'],
        options?: UpdateCallLogOptions,
      ) => this.onUpdateCallLog(newData, options),
    };
  }

  // should be override
  @computed
  get editSectionSchema(): CallLogFormViewPanelProps['editSectionSchema'] {
    return {
      uiOrder: [],
      uiSchema: {},
      renderSchema: {},
    };
  }

  // should be override
  @computed
  get referenceFields(): CallLogFormViewPanelProps['referenceFields'] {
    return {};
  }

  @computed
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
    const { t } = useLocale(i18n);

    const { isSaved, isSaving, disabled, show } = useConnector(() => {
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
        isSaved,
        isSaving,
        show: !activeSyncTab || activeSyncTab === CallLogSyncTabId.LOG,
      };
    });

    const label = t(isSaved ? 'saved' : 'saveToCRM');

    // currently we only show save button in log tab, once we support log AI note, we need to update this logic
    return show ? (
      <div
        ref={ref}
        className="p-3 border-t border-neutral-b4/50 mt-auto flex-none"
      >
        <Button
          fullWidth
          data-sign="save-button"
          disabled={disabled}
          loading={isSaving}
          onClick={async () => {
            const result = await this.onSaveCallLog();

            if (result) this._experienceFeedbackView?.track();
          }}
        >
          {label}
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

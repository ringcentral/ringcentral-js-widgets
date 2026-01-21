import { isInbound } from '@ringcentral-integration/commons/lib/callLogHelpers';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  action,
  computed,
  delegate,
  injectable,
  RcViewModule,
  state,
  StoragePlugin,
  useConnector,
  userStorage,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import type { MergeCallConfirmationProps } from '../../components/MergeCallConfirmation';
import { MergeCallConfirmation } from '../../components/MergeCallConfirmation';
import { ActiveCallControl, CallMonitor } from '../../services';

import type {
  ConfirmContextData,
  MergeCallConfirmViewProps,
} from './MergeCallConfirm.view.interface';

@injectable({
  name: 'MergeCallConfirmView',
})
export class MergeCallConfirmView extends RcViewModule {
  _resolve?: (value: boolean) => void;

  constructor(
    protected _storage: StoragePlugin,
    protected _callMonitor: CallMonitor,
    protected _activeCallControl: ActiveCallControl,
  ) {
    super();
    this._storage.enable(this, {
      whitelist: ['doNotAskAgain'],
    });
  }

  @state
  contextData: ConfirmContextData | null = null;

  @action
  private _setContextData(val: ConfirmContextData | null) {
    this.contextData = val;
  }

  @userStorage
  @state
  doNotAskAgain = false;

  @action
  _setDoNotAskAgain(value: boolean) {
    this.doNotAskAgain = value;
  }

  @delegate('server')
  async setDoNotAskAgain(value: boolean) {
    this._setDoNotAskAgain(value);
  }

  @state
  isOpen = false;

  @action
  _setIsOpen(value: boolean) {
    this.isOpen = value;
  }

  @delegate('server')
  async setIsOpen(value: boolean) {
    this._setIsOpen(value);
  }

  @delegate('server')
  async confirm(contextData: ConfirmContextData) {
    if (this.doNotAskAgain) {
      // has been confirmed
      return true;
    }

    this._setContextData(contextData);
    await this.setIsOpen(true);

    // not yet confirmed
    return new Promise<boolean>((resolve) => {
      this._resolve = resolve;
    }).finally(() => {
      this._resolve = undefined;
      this._setContextData(null);
    });
  }

  @computed
  get contactName() {
    const contextData = this.contextData;
    if (!contextData) return;

    const call = this._callMonitor.allCalls.find(
      (x) =>
        (contextData.telephonySessionId &&
          contextData.telephonySessionId === x.telephonySessionId) ||
        (contextData.webphoneSessionId &&
          contextData.webphoneSessionId === x.webphoneSession?.id),
    );

    if (!call) return;

    const contactName = isInbound(call)
      ? call.fromName ?? call.from?.phoneNumber
      : call.toName ?? call.to?.phoneNumber;
    return contactName;
  }

  @computed
  get isConferenceCall() {
    const contextData = this.contextData;
    if (!contextData) return false;

    const session = this._activeCallControl.getSession(
      contextData.telephonySessionId!,
    );
    return !!session?.isConferenceCall;
  }

  @delegate('server')
  async onClose() {
    await this.setIsOpen(false);
    this._resolve?.(false);
  }

  @delegate('server')
  async onMerge(doNotAskAgain: boolean) {
    await this.setDoNotAskAgain(doNotAskAgain);
    await this.setIsOpen(false);
    this._resolve?.(true);
  }

  getUIProps(
    _props: MergeCallConfirmViewProps,
  ): UIProps<MergeCallConfirmationProps> {
    return {
      isOpen: this.isOpen,
      contactName: this.contactName || '',
      isConferenceCall: this.isConferenceCall,
    };
  }

  getUIFunctions(
    _props: MergeCallConfirmViewProps,
  ): UIFunctions<MergeCallConfirmationProps> {
    return {
      onClose: async () => await this.onClose(),
      onCancel: async () => await this.onClose(),
      onMerge: async (doNotAskAgain) => await this.onMerge(doNotAskAgain),
    };
  }

  component(props: MergeCallConfirmViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));
    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);
      return {
        ...props,
        ...uiProps,
      };
    });
    return <MergeCallConfirmation {..._props} {...uiFunctions} />;
  }
}

import { ContactSearchView } from '@ringcentral-integration/micro-contacts/src/app/views';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  delegate,
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import {
  AudioSettings,
  Call,
  CallAction,
  CallingSettings,
  OnCallActionType,
} from '../../../../services';
import { DialerView } from '../../../DialerView';
import { CallViewState } from '../../services';

import type {
  AddCallViewOptions,
  AddCallViewPanelProps,
  AddCallViewProps,
} from './AddCall.view.interface';
import { AddCallPage } from './AddCallPanel';

@injectable({
  name: 'AddCallView',
})
export class AddCallView extends RcViewModule {
  get toNumber() {
    return this._dialerView.toNumberField;
  }
  get recipients() {
    return this._dialerView.recipients;
  }
  get transferTargetNumber() {
    return (
      (this.recipients.length > 0 && this.recipients[0].phoneNumber) ||
      this.toNumber
    );
  }

  constructor(
    private _callingSettings: CallingSettings,
    private _callAction: CallAction,
    private _callViewState: CallViewState,
    private _call: Call,
    private _dialerView: DialerView,
    private _contactSearchView: ContactSearchView,
    @optional() private _audioSettings?: AudioSettings,
    @optional('AddCallViewOptions')
    private _addCallViewOptions?: AddCallViewOptions,
  ) {
    super();
  }

  getUIProps(): UIProps<AddCallViewPanelProps> {
    return {
      toNumber: this.toNumber,
      recipients: this._dialerView.recipients,
      callVolume: this._audioSettings?.callVolume ?? 1,
      outputDeviceId: this._audioSettings?.outputDeviceId ?? '',
      actionButtonDisabled:
        this._callAction.callActionsDisabled || !this._call.isIdle,
      isWebphoneMode: this._callingSettings.isWebphoneMode,
      showAnonymous: this._dialerView.isShowAnonymous,
      disableFromField: this._dialerView.disableFromField,
      fromNumber: this._callingSettings.fromNumber!,
      fromNumbers: this._callingSettings.fromNumbers,
    };
  }

  @delegate('server')
  async startAdd() {
    const makeCallSuccess = await this._dialerView.onCallButtonClick({
      clickDialerToCall: true,
    });
    if (makeCallSuccess) this._callViewState._setView('activeCall');
  }

  getUIFunctions(): UIFunctions<AddCallViewPanelProps> {
    const onAction: OnCallActionType = async (actionType) => {
      switch (actionType) {
        case 'startAdd':
          this._dialerView.trackCallingEvent('Add call');
          await this.startAdd();
          break;
        default:
          await this._callAction.onActiveActions(actionType);
          break;
      }

      return false;
    };

    return {
      onToNumberChange: this._dialerView.setToNumberField.bind(
        this._dialerView,
      ),
      onRecipientsChange: async ([recipient]) => {
        await this._dialerView.setRecipient(recipient || null);
        if (recipient) await onAction('startAdd');
      },
      onAction,
      onFromNumberChange: async (phoneNumber) => {
        if (!phoneNumber) return;

        await this._callingSettings.updateFromNumber({ phoneNumber });
      },
    };
  }

  component(props: AddCallViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component = this._addCallViewOptions?.component || AddCallPage;

    return (
      <Component
        {..._props}
        {...uiFunctions}
        ContactSearch={this._contactSearchView.component}
      />
    );
  }
}

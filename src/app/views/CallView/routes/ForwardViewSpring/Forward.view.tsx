import { ContactSearchView } from '@ringcentral-integration/micro-contacts/src/app/views';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
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
  OnCallActionType,
} from '../../../../services';
import { CallViewState } from '../../services';

import type {
  ForwardViewOptions,
  ForwardViewPanelProps,
  ForwardViewProps,
} from './Forward.view.interface';
import { ForwardPage } from './ForwardPanel';

@injectable({
  name: 'ForwardView',
})
export class ForwardView extends RcViewModule {
  constructor(
    private _callAction: CallAction,
    private _call: Call,
    private _contactSearchView: ContactSearchView,
    private _callViewState: CallViewState,
    @optional() private _audioSettings?: AudioSettings,
    @optional('ForwardViewOptions')
    private _forwardViewOptions?: ForwardViewOptions,
  ) {
    super();
  }

  getForwardTargetNumber(call: ForwardViewProps['call']) {
    const callViewState = this._callViewState.getCallViewState(
      call.telephonySessionId!,
    );
    return (
      (callViewState.forwardRecipients.length > 0 &&
        callViewState.forwardRecipients[0].phoneNumber) ||
      callViewState.forwardToNumber
    );
  }

  getUIProps({
    call,
    actionsDisabled,
  }: ForwardViewProps): UIProps<ForwardViewPanelProps> {
    const callViewState = this._callViewState.getCallViewState(
      call.telephonySessionId!,
    );

    return {
      toNumber: callViewState.forwardToNumber,
      recipients: callViewState.forwardRecipients,
      callVolume: this._audioSettings?.callVolume ?? 1,
      outputDeviceId: this._audioSettings?.outputDeviceId ?? '',
      actionButtonDisabled: actionsDisabled || !this._call.isIdle,
    };
  }

  getUIFunctions({
    call,
  }: ForwardViewProps): UIFunctions<ForwardViewPanelProps> {
    const telephonySessionId = call.telephonySessionId!;

    const onAction: OnCallActionType = async (actionType) => {
      const handler = this._callAction.createActionsHandler(telephonySessionId);
      switch (actionType) {
        case 'startForward':
          await handler('startForward', this.getForwardTargetNumber(call));
          break;
        default:
          await handler(actionType);
          break;
      }
      return false;
    };

    return {
      onToNumberChange: (val) => {
        this._callViewState.setCallViewState(telephonySessionId, {
          forwardToNumber: val,
        });
      },
      onRecipientsChange: async (recipients) => {
        await this._callViewState.setCallViewState(telephonySessionId, {
          forwardRecipients: recipients,
          // Clear toNumber when recipients change
          forwardToNumber: '',
        });
        if (recipients[0]) await onAction('startForward');
      },
      onAction,
    };
  }

  component(props: ForwardViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component = this._forwardViewOptions?.component || ForwardPage;

    return (
      <Component
        {..._props}
        {...uiFunctions}
        ContactSearch={this._contactSearchView.component}
      />
    );
  }
}

import { AppFeatures } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  Root,
  type UIFunctions,
  type UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import { useResultRef } from '@ringcentral/juno';
import React from 'react';
import type { SetOptional } from 'type-fest';

import { ICallAction } from '../../../../hooks';
import {
  CallAction,
  CallingSettings,
  CallMonitor,
  ForwardingNumber,
  isOtherDeviceCall,
  isQueueCall,
} from '../../../../services';

import type {
  IncomingCallViewOptions,
  IncomingCallViewPanelProps,
  IncomingCallViewProps,
} from './IncomingCall.view.interface';
import { IncomingCallPage } from './IncomingCallPage';
import { t } from './IncomingCallPage/i18n';

@injectable({
  name: 'IncomingCallView',
})
export class IncomingCallView extends RcViewModule {
  @computed
  get forwardingNumbers() {
    return [
      ...this._forwardingNumber.forwardingNumbers,
      {
        phoneNumber: 'custom',
        label: `${t('custom')}...`,
      },
    ];
  }

  constructor(
    private _root: Root,
    private _callAction: CallAction,
    private _callMonitor: CallMonitor,
    private _forwardingNumber: ForwardingNumber,
    private _appFeatures: AppFeatures,
    private _callingSettings: CallingSettings,
    @optional('IncomingCallViewOptions')
    private _incomingCallViewOptions?: IncomingCallViewOptions,
  ) {
    super();
  }

  private useCallActions({
    call,
    actionsDisabled,
  }: IncomingCallViewProps): ICallAction[] {
    const { hasActiveCalls, isCallForwardingEnabled } = useConnector(() => ({
      hasActiveCalls: this._callMonitor.currDeviceHasActiveCalls,
      isCallForwardingEnabled: this._appFeatures.isCallForwardingEnabled,
    }));

    const disabled = actionsDisabled;

    const beQueueCall = isQueueCall(call);
    const onOtherDevice = isOtherDeviceCall(call);

    if (beQueueCall) {
      return [
        { type: 'ignoreQueue', disabled },
        { type: 'answer', disabled },
      ];
    }

    if (onOtherDevice) {
      return [{ type: 'voicemail', disabled }];
    }

    if (hasActiveCalls) {
      return [
        { type: 'ignore', disabled },
        { type: 'endAndAnswer', disabled },
        { type: 'voicemail', disabled },
        { type: 'holdAndAnswer', disabled },
        {
          type: 'forward',
          disabled: disabled || !isCallForwardingEnabled,
        },
        { type: 'reply', disabled },
      ];
    }

    return [
      { type: 'ignore', disabled },
      { type: 'voicemail', disabled },
      { type: 'answer', disabled },
      {
        type: 'forward',
        disabled: disabled || !isCallForwardingEnabled,
      },
      { type: 'reply', disabled },
    ];
  }

  classes = {
    miniContainer: this._root.expandedLayoutMainClass,
  };

  getUIProps({
    call,
    minimized,
  }: IncomingCallViewProps): UIProps<
    SetOptional<IncomingCallViewPanelProps, 'actions'>
  > {
    const beQueueCall = isQueueCall(call);
    return {
      call,
      minimized,
      showCloseButton: !this._callingSettings.isWebphoneMode,
      // when be queue call, should show queue call mode first, ignore multiple call or single call
      mode: beQueueCall
        ? 'queue'
        : this._callMonitor.currDeviceHasActiveCalls
        ? 'multiple'
        : 'single',
      expanded: Boolean(this._root.expanded),
      forwardingNumbers: this.forwardingNumbers,
      classes: this.classes,
    };
  }

  getUIFunctions({
    call,
  }: IncomingCallViewProps): UIFunctions<IncomingCallViewPanelProps> {
    const telephonySessionId = call.telephonySessionId!;

    const toggleExpanded = this._callAction.toggleExpanded;
    return {
      onMinimized: async (minimized) => {
        // when not minimized, should close the active call actions
        if (minimized === false) {
          if (this._callAction.activeCallInfo) {
            await this._callAction.onActiveActions('back');
          }

          // mark current call as active call
          await this._callAction.onActiveActions(
            'activeCall',
            telephonySessionId,
          );
        }

        await this._callAction.updateCallMetaInfo(telephonySessionId, {
          minimized,
        });
      },
      onExpand: toggleExpanded
        ? () => toggleExpanded(telephonySessionId)
        : undefined,
      onAction: (...args) =>
        this._callAction.createActionsHandler(telephonySessionId)(...args),
    };
  }

  component(props: IncomingCallViewProps) {
    const { current: uiFunctions } = useResultRef(() =>
      this.getUIFunctions(props),
    );

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const actions = this.useCallActions(props);

    const Component =
      this._incomingCallViewOptions?.component || IncomingCallPage;

    return <Component {..._props} actions={actions} {...uiFunctions} />;
  }
}

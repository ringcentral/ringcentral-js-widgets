import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { isOnHold } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { AppFeatures } from '@ringcentral-integration/micro-auth/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
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
  isOtherDeviceCall,
  isQueueCall,
  isRingingCall,
  OnCallActionType,
} from '../../../../services';
import { ConferenceCallAction } from '../../../../services/CallAction/ConferenceCallAction';

import type {
  ActiveCallsPanelProps,
  ActiveCallsViewOptions,
  ActiveCallsViewProps,
} from './ActiveCalls.view.interface';
import { ActiveCallsPanel } from './ActiveCallsPanel';

@injectable({
  name: 'ActiveCallsView',
})
export class ActiveCallsView extends RcViewModule {
  get backToCallInfo() {
    return (
      this._callAction.activeCallInfo || this._callAction.latestOpenedCallInfo
    );
  }

  @computed
  get mergeTargetTelephonySessionId() {
    const activeTelephonySessionId =
      this._callMonitor.activeCurrentCallTelephonySessionId;
    const displayTelephonySessionId =
      this._callAction.activeCallInfo?.call?.telephonySessionId;
    const currMergeTarget =
      activeTelephonySessionId || displayTelephonySessionId;
    return currMergeTarget;
  }

  constructor(
    private _callMonitor: CallMonitor,
    private _callAction: CallAction,
    private _callingSettings: CallingSettings,
    private _appFeatures: AppFeatures,
    private _conferenceCallAction: ConferenceCallAction,
    @optional('ActiveCallsViewOptions')
    private _activeCallsViewOptions?: ActiveCallsViewOptions,
  ) {
    super();
  }

  useActiveCallItemActions = (call: Call): ICallAction[] => {
    const telephonySessionId = call.telephonySessionId!;
    const { info, hasActiveCalls, mergeable, isCallForwardingEnabled } =
      useConnector(() => ({
        info: this._callAction.getCallMetaInfo(telephonySessionId),
        hasActiveCalls: this._callMonitor.currDeviceHasActiveCalls,
        mergeable: this._callAction.isCallMergeable(
          call,
          this.mergeTargetTelephonySessionId,
        ),
        isCallForwardingEnabled: this._appFeatures.isCallForwardingEnabled,
      }));

    const disabled = info?.actionsDisabled;

    const ringing = isRingingCall(call);
    const otherDevice = isOtherDeviceCall(call);

    if (ringing) {
      if (otherDevice) {
        const actions: ICallAction[] = [];
        if (this._callingSettings.isWebphoneMode) {
          actions.push({ type: 'switch', disabled });
        }

        actions.push({ type: 'voicemail', disabled });

        return actions;
      }

      const beQueueCall = isQueueCall(call);
      if (beQueueCall) {
        return [
          { type: 'answer', disabled },
          { type: 'ignoreQueue', disabled },
        ];
      }

      if (hasActiveCalls) {
        return [
          { type: 'holdAndAnswer', disabled },
          { type: 'voicemail', disabled },
          { type: 'endAndAnswer', disabled },
          { type: 'ignore', disabled },
          {
            type: 'forward',
            disabled: disabled || !isCallForwardingEnabled,
          },
          { type: 'reply', disabled },
        ];
      }

      return [
        { type: 'answer', disabled },
        { type: 'voicemail', disabled },
        { type: 'ignore', disabled },
        {
          type: 'forward',
          disabled: disabled || !isCallForwardingEnabled,
        },
        { type: 'reply', disabled },
      ];
    }

    const actions: ICallAction[] = [
      { type: isOnHold(call) ? 'unHold' : 'hold', disabled },
    ];

    if (mergeable) {
      actions.push({ type: 'merge', disabled });
    }

    if (otherDevice && this._callingSettings.isWebphoneMode) {
      actions.push({ type: 'switch', disabled });
    }

    actions.push({ type: 'hangUp', disabled });

    return actions;
  };

  private useActionsHandler = (telephonySessionId?: string | null) => {
    const onAction: OnCallActionType = async (actionType, ...args) => {
      switch (actionType) {
        case 'merge': {
          const handler = this._callAction.createActionsHandler(
            this.mergeTargetTelephonySessionId,
          );
          return await handler('startMerge', telephonySessionId as string);
        }
        default: {
          const handler =
            this._callAction.createActionsHandler(telephonySessionId);
          return await handler(actionType, ...args);
        }
      }
    };

    return onAction;
  };

  getUIProps(
    _: ActiveCallsViewProps,
  ): UIProps<SetOptional<ActiveCallsPanelProps, 'backToCall'>> {
    return {
      backToCall: this.backToCallInfo?.call,
      calls: this._callAction.displayCallList,
    };
  }

  getUIFunctions(_: ActiveCallsViewProps): UIFunctions<ActiveCallsPanelProps> {
    return {
      useActionsHandler: this.useActionsHandler,
      useActiveCallItemActions: this.useActiveCallItemActions,
    };
  }

  component(props: ActiveCallsViewProps) {
    const { current: uiFunctions } = useResultRef(() =>
      this.getUIFunctions(props),
    );

    const { backToCall, ..._props } = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    if (!backToCall) return null;

    const Component =
      this._activeCallsViewOptions?.component || ActiveCallsPanel;

    return <Component backToCall={backToCall} {..._props} {...uiFunctions} />;
  }
}

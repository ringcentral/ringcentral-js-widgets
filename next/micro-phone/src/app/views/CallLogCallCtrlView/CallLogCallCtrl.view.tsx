import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import {
  ConnectivityMonitor,
  ExtensionFeatures,
  RateLimiter,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { CallLogCallCtrlPanel } from '@ringcentral-integration/widgets/components/CallLogCallCtrlPanel';
import React from 'react';

import {
  ActiveCallControl,
  ActiveSession,
  callingModes,
  CallingSettings,
  CallMonitor,
  ForwardingNumber,
} from '../../services';
import { MergeCallConfirmView } from '../MergeCallConfirmView';

import type {
  CallLogCallCtrlPanelProps,
  CallLogCallCtrlViewOptions,
  CallLogCallCtrlViewProps,
} from './CallLogCallCtrl.view.interface';

@injectable({
  name: 'CallLogCallCtrlView',
})
class CallLogCallCtrlView extends RcViewModule {
  constructor(
    protected _activeCallControl: ActiveCallControl,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _rateLimiter: RateLimiter,
    protected _router: RouterPlugin,
    protected _callingSettings: CallingSettings,
    protected _forwardingNumber: ForwardingNumber,
    protected _callMonitor: CallMonitor,
    protected _extensionFeatures: ExtensionFeatures,
    @optional('CallLogCallCtrlViewOptions')
    protected _callLogCallCtrlViewOptions?: CallLogCallCtrlViewOptions,
    @optional() protected _mergeCallConfirmView?: MergeCallConfirmView,
  ) {
    super();
  }

  private _onTransfer = (telephonySessionId: string) => {
    this._activeCallControl.clickTransferTrack();
    return this._router.push(`/transfer/${telephonySessionId}/active`);
  };

  getUIProps({
    telephonySessionId,
  }: CallLogCallCtrlViewProps): UIProps<CallLogCallCtrlPanelProps> {
    const isWebphone =
      this._callingSettings.callingMode === callingModes.webphone;
    const currentSession =
      this._activeCallControl.getActiveSession(telephonySessionId);
    // we can get real callee call status from telephony session
    const realOutboundCallStatus: string =
      this._activeCallControl?.getSession(telephonySessionId)?.otherParties[0]
        ?.status?.code;
    const { activeOnHoldCalls, activeCurrentCalls } = this._callMonitor;
    const controlBusy = this._activeCallControl?.busy || false;

    const otherActiveCalls =
      currentSession &&
      !!activeOnHoldCalls
        .concat(activeCurrentCalls)
        .filter((call: any) => call.sessionId !== currentSession.sessionId)
        .length;
    const isEnablePickup =
      !!this._activeCallControl.pickUpCallDataMap[telephonySessionId];
    const allowPickupCall = isEnablePickup && isWebphone;
    const isCurrentCall =
      this._callMonitor.activeCurrentCallTelephonySessionId ===
      telephonySessionId;

    const isCallQueueCall =
      !!this._activeCallControl.getSession(telephonySessionId)?.callQueueName;

    return {
      isWebphone,
      currentSession: currentSession as ActiveSession,
      disableLinks:
        !this._connectivityMonitor.connectivity ||
        this._rateLimiter.restricted ||
        controlBusy,
      telephonySessionId,
      forwardingNumbers: this._forwardingNumber.forwardingNumbers,
      otherActiveCalls: otherActiveCalls!,
      realOutboundCallStatus,
      allowPickupCall,
      showConferenceCall: this._callLogCallCtrlViewOptions?.showConferenceCall,
      isCurrentCall,
      isCallQueueCall,
    };
  }

  getUIFunctions({
    telephonySessionId,
  }: CallLogCallCtrlViewProps): UIFunctions<CallLogCallCtrlPanelProps> {
    return {
      mute: this._activeCallControl.mute.bind(this._activeCallControl),
      unmute: this._activeCallControl.unmute.bind(this._activeCallControl),
      hangUp: this._activeCallControl.hangUp.bind(this._activeCallControl),
      reject: this._activeCallControl.reject.bind(this._activeCallControl),
      onHold: this._activeCallControl.hold.bind(this._activeCallControl),
      onUnHold: this._activeCallControl.unhold.bind(this._activeCallControl),
      startRecord: this._activeCallControl.startRecord.bind(
        this._activeCallControl,
      ),
      stopRecord: this._activeCallControl.stopRecord.bind(
        this._activeCallControl,
      ),
      onCompleteWarmTransfer: (telephonySession: string) => {
        this.completeWarmTransferTrack();
        return this._activeCallControl.completeWarmTransfer(telephonySession);
      },
      onTransfer: this._onTransfer,
      onAddCall: async () => {
        this._router.push(`/addCall`);
      },
      sendDTMF: (dtmfValue, telephonySessionId) =>
        this._activeCallControl.sendDTMF(dtmfValue, telephonySessionId),
      answer: this._activeCallControl.answer.bind(this._activeCallControl),
      forward: (phoneNumber, telephonySessionId) => {
        if (phoneNumber === 'custom') {
          this._router.push(`/forward/${telephonySessionId}`);
        } else {
          this._activeCallControl.forward.call(
            this._activeCallControl,
            phoneNumber,
            telephonySessionId,
          );
        }
      },
      reply: (telephonySessionId) => {
        this._router.push(`/replyWithMessage/${telephonySessionId}/active`);
      },
      ignore: this._activeCallControl.ignore.bind(this._activeCallControl),
      answerAndHold: this._activeCallControl.answerAndHold.bind(
        this._activeCallControl,
      ),
      answerAndEnd: this._activeCallControl.answerAndEnd.bind(
        this._activeCallControl,
      ),
      dialpadToggleTrack: (open) => {
        if (open) {
          this._activeCallControl.dialpadOpenTrack();
        } else {
          this._activeCallControl.dialpadCloseTrack();
        }
      },
      clickForwardTrack: this._activeCallControl.clickForwardTrack.bind(
        this._activeCallControl,
      ),
      onMergeCall: async () => {
        this._activeCallControl.clickConferenceCallMerge('Call log page');
        const telephonySessionIdToMergeWith =
          this._callMonitor.activeCurrentCalls[0].telephonySessionId;
        if (!telephonySessionIdToMergeWith) {
          console.warn('[ActiveCalls.view] No active call to merge.');
          return;
        }
        const confirmed = await this._mergeCallConfirmView?.confirm({
          telephonySessionId,
          // telephonySessionIdToMergeWith,
        });
        if (confirmed) {
          this._activeCallControl.mergeCalls(
            telephonySessionId,
            telephonySessionIdToMergeWith,
          );
        }
      },
    };
  }

  @track(trackEvents.completeWarmTransfer)
  completeWarmTransferTrack() {
    //
  }

  component(props: CallLogCallCtrlViewProps) {
    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);
      const uiFunctions = this.getUIFunctions(props);
      return {
        ...props,
        ...uiProps,
        ...uiFunctions,
      };
    });
    const Component =
      this._callLogCallCtrlViewOptions?.component || CallLogCallCtrlPanel;

    return <Component {..._props} />;
  }
}

export { CallLogCallCtrlView };

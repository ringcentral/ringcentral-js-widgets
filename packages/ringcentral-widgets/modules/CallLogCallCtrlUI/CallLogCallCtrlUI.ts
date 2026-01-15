import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2, track } from '@ringcentral-integration/core';

import type {
  CallLogCallCtrlContainerProps,
  CallLogCallCtrlPanelProps,
  Deps,
} from './CallLogCallCtrlUI.interface';

@Module({
  name: 'CallLogCallCtrlUI',
  deps: [
    'ActiveCallControl',
    'ConnectivityMonitor',
    'RateLimiter',
    'RouterInteraction',
    'CallingSettings',
    'ForwardingNumber',
    'CallMonitor',
    'ExtensionFeatures',
  ],
})
class CallLogCallCtrlUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  private _onTransfer = (telephonySessionId: string) => {
    this._deps.activeCallControl.clickTransferTrack();
    return this._deps.routerInteraction.push(
      `/transfer/${telephonySessionId}/active`,
    );
  };

  getUIProps({
    telephonySessionId,
  }: CallLogCallCtrlContainerProps): UIProps<CallLogCallCtrlPanelProps> {
    const isWebphone =
      this._deps.callingSettings.callingMode === callingModes.webphone;
    const currentSession =
      this._deps.activeCallControl.getActiveSession(telephonySessionId);
    // we can get real callee call status from telephony session
    const realOutboundCallStatus: string =
      this._deps.activeCallControl?.getSession(telephonySessionId)
        ?.otherParties[0]?.status?.code;
    const { activeOnHoldCalls, activeCurrentCalls } = this._deps.callMonitor;
    const controlBusy = this._deps.activeCallControl?.busy || false;
    const isEnablePickup =
      !!this._deps.activeCallControl.pickUpCallDataMap[telephonySessionId];
    const allowPickupCall = isEnablePickup && isWebphone;

    const otherActiveCalls =
      currentSession &&
      !!activeOnHoldCalls
        .concat(activeCurrentCalls)
        .filter((call: any) => call.sessionId !== currentSession.sessionId)
        .length;

    return {
      isWebphone,
      // @ts-expect-error TS(2322): Type 'Partial<ActiveSession> | null' is not assign... Remove this comment to see the full error message
      currentSession,
      disableLinks:
        !this._deps.connectivityMonitor.connectivity ||
        this._deps.rateLimiter.throttling ||
        controlBusy,
      telephonySessionId,
      forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
      // @ts-expect-error TS(2322): Type 'boolean | null' is not assignable to type 'b... Remove this comment to see the full error message
      otherActiveCalls,
      realOutboundCallStatus,
      allowPickupCall,
    };
  }

  getUIFunctions(): UIFunctions<CallLogCallCtrlPanelProps> {
    return {
      mute: this._deps.activeCallControl.mute.bind(
        this._deps.activeCallControl,
      ),
      unmute: this._deps.activeCallControl.unmute.bind(
        this._deps.activeCallControl,
      ),
      hangUp: this._deps.activeCallControl.hangUp.bind(
        this._deps.activeCallControl,
      ),
      reject: this._deps.activeCallControl.reject.bind(
        this._deps.activeCallControl,
      ),
      onHold: this._deps.activeCallControl.hold.bind(
        this._deps.activeCallControl,
      ),
      onUnHold: this._deps.activeCallControl.unhold.bind(
        this._deps.activeCallControl,
      ),
      startRecord: this._deps.activeCallControl.startRecord.bind(
        this._deps.activeCallControl,
      ),
      stopRecord: this._deps.activeCallControl.stopRecord.bind(
        this._deps.activeCallControl,
      ),
      onCompleteWarmTransfer: (telephonySession: string) => {
        this.completeWarmTransferTrack();
        return this._deps.activeCallControl.completeWarmTransfer(
          telephonySession,
        );
      },
      onTransfer: this._onTransfer,
      sendDTMF: (dtmfValue, telephonySessionId) =>
        this._deps.activeCallControl.sendDTMF(dtmfValue, telephonySessionId),
      answer: this._deps.activeCallControl.answer.bind(
        this._deps.activeCallControl,
      ),
      forward: (phoneNumber, telephonySessionId) => {
        if (phoneNumber === 'custom') {
          this._deps.routerInteraction.push(`/forward/${telephonySessionId}`);
        } else {
          this._deps.activeCallControl.forward.call(
            this._deps.activeCallControl,
            phoneNumber,
            telephonySessionId,
          );
        }
      },
      reply: (telephonySessionId) => {
        this._deps.routerInteraction.push(
          `/replyWithMessage/${telephonySessionId}/active`,
        );
      },
      ignore: this._deps.activeCallControl.ignore.bind(
        this._deps.activeCallControl,
      ),
      answerAndHold: this._deps.activeCallControl.answerAndHold.bind(
        this._deps.activeCallControl,
      ),
      answerAndEnd: this._deps.activeCallControl.answerAndEnd.bind(
        this._deps.activeCallControl,
      ),
      dialpadToggleTrack: (open) => {
        if (open) {
          this._deps.activeCallControl.dialpadOpenTrack();
        } else {
          this._deps.activeCallControl.dialpadCloseTrack();
        }
      },
      clickForwardTrack: this._deps.activeCallControl.clickForwardTrack.bind(
        this._deps.activeCallControl,
      ),
    };
  }

  @track(trackEvents.completeWarmTransfer)
  completeWarmTransferTrack() {}
}

export { CallLogCallCtrlUI };

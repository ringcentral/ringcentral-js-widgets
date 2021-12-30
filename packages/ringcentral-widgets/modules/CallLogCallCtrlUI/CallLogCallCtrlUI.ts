import { Module } from '@ringcentral-integration/commons/lib/di';
import callingModes from '@ringcentral-integration/commons/modules/CallingSettings/callingModes';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import {
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
    const otherActiveCalls =
      currentSession &&
      !!activeOnHoldCalls
        .concat(activeCurrentCalls)
        .filter((call: any) => call.sessionId !== currentSession.sessionId)
        .length;
    return {
      isWebphone,
      currentSession,
      disableLinks:
        !this._deps.connectivityMonitor.connectivity ||
        this._deps.rateLimiter.throttling,
      telephonySessionId,
      forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
      otherActiveCalls,
      realOutboundCallStatus,
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
}

export { CallLogCallCtrlUI };

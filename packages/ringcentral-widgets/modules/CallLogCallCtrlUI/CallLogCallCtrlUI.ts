import { Module } from 'ringcentral-integration/lib/di';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import RcUIModule from '../../lib/RcUIModule';

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
  ],
})
export default class CallLogCallCtrlUI extends RcUIModule {
  private _activeCallControl: any;
  private _connectivityMonitor: any;
  private _rateLimiter: any;
  private _routerInteraction: any;
  private _callingSettings: any;
  private _forwardingNumber: any;
  private _callMonitor: any;

  constructor({
    activeCallControl,
    connectivityMonitor,
    rateLimiter,
    routerInteraction,
    callingSettings,
    forwardingNumber,
    callMonitor,
    ...options
  }) {
    super({ ...options });
    this._activeCallControl = activeCallControl;
    this._connectivityMonitor = connectivityMonitor;
    this._rateLimiter = rateLimiter;
    this._routerInteraction = routerInteraction;
    this._callingSettings = callingSettings;
    this._forwardingNumber = forwardingNumber;
    this._callMonitor = callMonitor;
  }

  private onTransfer = (telephonySessionId: string) => {
    this._activeCallControl.clickTransferTrack();
    return this._routerInteraction.push(
      `/transfer/${telephonySessionId}/active`,
    );
  };

  getUIProps({ telephonySessionId }: { telephonySessionId: string }) {
    const isWebphone =
      this._callingSettings.callingMode === callingModes.webphone;
    const currentSession = this._activeCallControl.getActiveSession(
      telephonySessionId,
    );
    // we can get real callee call status from telephony session
    const realOutboundCallStatus = this._activeCallControl?.getRcCallSession(
      telephonySessionId,
    )?.otherParties[0]?.['status']['code'];
    const { activeOnHoldCalls, activeCurrentCalls } = this._callMonitor;
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
        !this._connectivityMonitor.connectivity || this._rateLimiter.throttling,
      telephonySessionId,
      forwardingNumbers: this._forwardingNumber.forwardingNumbers,
      otherActiveCalls,
      realOutboundCallStatus,
    };
  }

  getUIFunctions() {
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
      onTransfer: this.onTransfer,
      sendDTMF: (dtmfValue: string, telephonySessionId: string) =>
        this._activeCallControl.sendDTMF(dtmfValue, telephonySessionId),
      answer: this._activeCallControl.answer.bind(this._activeCallControl),
      forward: (phoneNumber: string, telephonySessionId: string) => {
        if (phoneNumber === 'custom') {
          this._routerInteraction.push(`/forward/${telephonySessionId}`);
        } else {
          this._activeCallControl.forward.call(
            this._activeCallControl,
            phoneNumber,
            telephonySessionId,
          );
        }
      },
      ignore: this._activeCallControl.ignore.bind(this._activeCallControl),
      answerAndHold: this._activeCallControl.answerAndHold.bind(
        this._activeCallControl,
      ),
      answerAndEnd: this._activeCallControl.answerAndEnd.bind(
        this._activeCallControl,
      ),
      dialpadToggleTrack: (open: boolean) => {
        if (open) {
          this._activeCallControl.dialpadOpenTrack();
        } else {
          this._activeCallControl.dialpadCloseTrack();
        }
      },
      clickForwardTrack: this._activeCallControl.clickForwardTrack.bind(
        this._activeCallControl,
      ),
    };
  }
}

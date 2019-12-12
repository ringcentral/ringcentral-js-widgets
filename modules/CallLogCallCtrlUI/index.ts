import { Module } from 'ringcentral-integration/lib/di';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'CallLogCallCtrlUI',
  deps: [
    'ActiveCallControl',
    'ConnectivityMonitor',
    'RateLimiter',
    'RouterInteraction',
  ],
})
export default class CallLogCallCtrlUI extends RcUIModule {
  private _activeCallControl: any;
  private _connectivityMonitor: any;
  private _rateLimiter: any;
  private _routerInteraction: any;
  constructor({
    activeCallControl,
    connectivityMonitor,
    rateLimiter,
    routerInteraction,
    ...options
  }) {
    super({ ...options });
    this._activeCallControl = activeCallControl;
    this._connectivityMonitor = connectivityMonitor;
    this._rateLimiter = rateLimiter;
    this._routerInteraction = routerInteraction;
  }

  private onTransfer(telephonySessionId: string) {
    return this._routerInteraction.push(
      `/transfer/${telephonySessionId}/active`,
    );
  }

  getUIProps({ telephonySessionId }) {
    const currentSession = this._activeCallControl.getActiveSession(
      telephonySessionId,
    );
    return {
      currentSession,
      disableLinks:
        !this._connectivityMonitor.connectivity || this._rateLimiter.throttling,
      telephonySessionId,
    };
  }

  getUIFunctions(props) {
    return {
      mute: this._activeCallControl.mute.bind(this._activeCallControl),
      unmute: this._activeCallControl.unmute.bind(this._activeCallControl),
      hangUp: this._activeCallControl.hangUp.bind(this._activeCallControl),
      reject: this._activeCallControl.reject.bind(this._activeCallControl),
      onHold: this._activeCallControl.hold.bind(this._activeCallControl),
      onUnHold: this._activeCallControl.unhold.bind(this._activeCallControl),
      onTransfer: this.onTransfer.bind(this._activeCallControl),
    };
  }
}

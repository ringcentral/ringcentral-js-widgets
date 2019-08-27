import bowser from 'bowser';
import sleep from '../../lib/sleep';
import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import moduleStatuses from '../../enums/moduleStatuses';
import actionTypes from './actionTypes';
import getSoftphoneReducer from './getSoftphoneReducer';
import proxify from '../../lib/proxy/proxify';

/**
 * @class
 * @description Softphone module to call softphone
 */
@Module({
  name: 'Softphone',
  deps: [
    'Brand',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'SoftphoneOptions', optional: true },
  ],
})
export default class Softphone extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Brnad} params.brand - brand module instance
   * @param {Bool} params.extensionMode - default false
   * @param {Function} param.callHandler - custom call handler, optional
   * @param {MontactMatcher} param.contactMatcher - contactMatcher module instance, optional
   */
  constructor({
    brand,
    extensionMode = false,
    callHandler,
    contactMatcher,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._brand = brand;
    this._extensionMode = extensionMode;
    this._callHandler = callHandler;
    this._contactMatcher = contactMatcher;
    this._reducer = getSoftphoneReducer(this.actionTypes);
  }

  detectPlatform() {
    return bowser.parse(
      (global.navigator && global.navigator.userAgent) || 'unknown',
    ).platform.type;
  }

  _onStateChange() {
    /* do nothing */
  }

  get protocol() {
    switch (this._brand.id) {
      case '3420': // ATT
        return 'attvr20';
      case '7710': // BT
        return 'rcbtmobile';
      case '7310': // TELUS
        return 'rctelus';
      default:
        return 'rcmobile';
    }
  }

  @proxify
  async makeCall(phoneNumber) {
    this.store.dispatch({
      type: this.actionTypes.startToConnect,
      phoneNumber,
    });

    const cmd = `call?number=${encodeURIComponent(phoneNumber)}`;
    const uri = `${this.protocol}://${cmd}`;

    if (this._callHandler) {
      this._callHandler({
        protocol: this.protocol,
        command: cmd,
        phoneNumber,
      });
    } else if (this._extensionMode || this.detectPlatform() !== 'desktop') {
      /**
       * 1. Use window.open in extension background scripts to avoid crashing Browsers
       * 2. Use window.open in non-desktop platforms
       */
      window.open(uri);
    } else if (window.navigator.msLaunchUri) {
      // to support ie to start the service
      window.navigator.msLaunchUri(uri);
    } else if (window.ActiveXObject || 'ActiveXObject' in window) {
      // to support ie on Windows < 8
      window.open(uri);
    } else {
      const frame = document.createElement('iframe');
      frame.style.display = 'none';

      document.body.appendChild(frame);
      await sleep(100);
      frame.contentWindow.location.href = uri;
      await sleep(300);
      document.body.removeChild(frame);
    }

    if (this._contactMatcher) {
      await this._contactMatcher.forceMatchNumber({
        phoneNumber,
      });
    }

    this.store.dispatch({
      type: this.actionTypes.connectComplete,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get status() {
    return moduleStatuses.ready;
  }

  get connectingPhoneNumber() {
    return this.state.connectingPhoneNumber;
  }

  get softphoneStatus() {
    return this.state.softphoneStatus;
  }
}

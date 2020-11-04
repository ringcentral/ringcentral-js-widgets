import bowser from 'bowser';
import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import sleep from '../../lib/sleep';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import callingModes from '../CallingSettings/callingModes';
import { Deps } from './Softphone.interface';
import { softphoneStatus } from './softphoneStatus';

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
export class Softphone extends RcModuleV2<Deps> {
  protected _callHandler: (...args: any) => any;
  protected _extensionMode: boolean;

  constructor(deps: Deps) {
    super({
      deps,
    });
    this._extensionMode = this._deps.softphoneOptions?.extensionMode ?? false;
    this._callHandler = this._deps.softphoneOptions?.callHandler;
  }

  @state
  connectingPhoneNumber: string = null;

  @state
  softphoneStatus = softphoneStatus.idle;

  @action
  startToConnect(phoneNumber: string) {
    this.softphoneStatus = softphoneStatus.connecting;
    this.connectingPhoneNumber = phoneNumber;
  }

  @action
  connectComplete() {
    this.softphoneStatus = softphoneStatus.idle;
    this.connectingPhoneNumber = null;
  }

  detectPlatform() {
    return bowser.parse(
      (window.navigator && window.navigator.userAgent) || 'unknown',
    ).platform.type;
  }

  get spartanProtocol() {
    switch (this._deps.brand.code) {
      case 'att':
        return 'attvr20';
      case 'bt':
        return 'rcbtmobile';
      case 'telus':
        return 'rctelus';
      default:
        return 'rcmobile';
    }
  }

  // currently we only have RingCentral App(rc brand)'s universal link
  get jupiterUniversalLink() {
    switch (this._deps.brand.code) {
      case 'att':
        return null;
      case 'bt':
        return null;
      case 'telus':
        return null;
      default:
        return 'https://app.ringcentral.com/r/';
    }
  }

  // currently we only have RingCentral App(rc brand)'s protocol
  get jupiterProtocol() {
    switch (this._deps.brand.code) {
      case 'att':
        return null;
      case 'bt':
        return null;
      case 'telus':
        return null;
      default:
        return 'rcapp';
    }
  }

  @proxify
  async makeCall(phoneNumber: string, callingMode: string) {
    this.startToConnect(phoneNumber);

    const isCallWithJupiter = callingMode === callingModes.jupiter;
    const protocol = isCallWithJupiter
      ? this.jupiterProtocol
      : this.spartanProtocol;
    const command = isCallWithJupiter
      ? `call?number=${phoneNumber}` // jupiter doesn't recognize encoded string for now
      : `call?number=${encodeURIComponent(phoneNumber)}`;
    const uri = isCallWithJupiter
      ? `${protocol}://r/${command}`
      : `${protocol}://${command}`;

    if (this._callHandler) {
      this._callHandler({
        protocol,
        command,
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
    } else if ((window as any).ActiveXObject || 'ActiveXObject' in window) {
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

    if (this._deps.contactMatcher) {
      await this._deps.contactMatcher.forceMatchNumber({
        phoneNumber,
      });
    }

    this.connectComplete();
  }
}

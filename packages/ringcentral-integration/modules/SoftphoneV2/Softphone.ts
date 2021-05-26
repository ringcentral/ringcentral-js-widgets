import bowser from 'bowser';
import {
  action,
  identifierKey,
  noReadyModulesKey,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
import sleep from '../../lib/sleep';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import callingModes from '../CallingSettings/callingModes';
import { Deps, CallHandlerContext } from './Softphone.interface';
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
  protected _callHandler: (context: CallHandlerContext) => any;
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
        return 'attvr20://';
      case 'bt':
        return 'rcbtmobile://';
      case 'telus':
        return 'rctelus://';
      default:
        return 'rcmobile://';
    }
  }

  // TODO: move `ContactMatcher` deps to `Call`
  _shouldInit() {
    const areAllReady =
      this[noReadyModulesKey].filter(
        (module) => module && module[identifierKey] !== 'contactMatcher',
      ).length === 0;
    return areAllReady && this.pending;
  }

  _shouldReset() {
    const areNotReady =
      this[noReadyModulesKey].filter(
        (module) => module && module[identifierKey] !== 'contactMatcher',
      ).length > 0;
    return areNotReady && this.ready;
  }

  // currently we only have RingCentral App(rc brand)'s & AT&T universal link
  get jupiterUniversalLink() {
    switch (this._deps.brand.code) {
      case 'att':
        return 'https://app.officeathand.att.com/';
      case 'bt':
        return null;
      case 'telus':
        return null;
      default:
        return 'https://app.ringcentral.com/';
    }
  }

  // currently we don't have Bt brand uri scheme
  get jupiterProtocol() {
    switch (this._deps.brand.code) {
      case 'att':
        return 'officeathand://';
      case 'bt':
        return null;
      case 'telus':
        return 'rctelus://';
      default:
        return 'rcapp://';
    }
  }

  getMakeCallUri(
    phoneNumber: string,
    callingMode: string,
  ): { command: string; protocol: string; uri: string } {
    // spartan
    let command = `call?number=${encodeURIComponent(phoneNumber)}`;
    let protocol = this.spartanProtocol;

    // jupiter
    const isCallWithJupiter = callingMode === callingModes.jupiter;
    if (isCallWithJupiter) {
      const isRcBrand = this._deps.brand.code === 'rc';
      // jupiter doesn't recognize encoded string for now
      command = `r/call?number=${phoneNumber}`;
      // rc brand use scheme, partner brand use universal link
      protocol = isRcBrand ? this.jupiterProtocol : this.jupiterUniversalLink;
    }
    return {
      command,
      protocol,
      uri: `${protocol}${command}`,
    };
  }

  @proxify
  async makeCall(phoneNumber: string, callingMode: string) {
    this.startToConnect(phoneNumber);

    const { protocol, command, uri } = this.getMakeCallUri(
      phoneNumber,
      callingMode,
    );

    if (this._callHandler) {
      this._callHandler({
        callingMode,
        protocol,
        command,
        uri,
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

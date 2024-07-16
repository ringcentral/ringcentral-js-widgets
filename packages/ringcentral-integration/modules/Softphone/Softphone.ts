import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import { sleep, normalizeUniversalLink } from '@ringcentral-integration/utils';
import bowser from 'bowser';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { callingModes } from '../CallingSettings/callingModes';

import type {
  CallHandlerContext,
  CallUriInfo,
  Deps,
} from './Softphone.interface';
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
export class Softphone<T extends Deps = Deps> extends RcModuleV2<T> {
  protected _callHandler: (context: CallHandlerContext) => any;
  protected _extensionMode: boolean;

  constructor(deps: T) {
    super({
      deps,
    });
    // @ts-expect-error TS(2345): Argument of type 'ContactMatcher<Entity, Deps> | u... Remove this comment to see the full error message
    this._ignoreModuleReadiness(deps.contactMatcher);
    this._extensionMode = this._deps.softphoneOptions?.extensionMode ?? false;
    // @ts-expect-error TS(2322): Type '((context: CallHandlerContext) => any) | und... Remove this comment to see the full error message
    this._callHandler = this._deps.softphoneOptions?.callHandler;
  }

  @state
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
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
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
    this.connectingPhoneNumber = null;
  }

  detectPlatform() {
    return bowser.parse(
      (window.navigator && window.navigator.userAgent) || 'unknown',
    ).platform.type;
  }

  get spartanProtocol() {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    return this._deps.brand.brandConfig.callWithSoftphone.protocol;
  }

  // currently we only have RingCentral App(rc brand)'s & AT&T universal link
  get jupiterUniversalLink() {
    return this._deps.brand.brandConfig.callWithJupiter?.link;
  }

  get jupiterAppName() {
    return this._deps.brand.brandConfig.callWithJupiter?.name;
  }

  // currently we don't have Bt brand uri scheme
  get jupiterProtocol() {
    return this._deps.brand.brandConfig.callWithJupiter?.protocol;
  }

  getMakeCallUri(phoneNumber: string, callingMode: string): CallUriInfo {
    // spartan
    let command = `call?number=${encodeURIComponent(phoneNumber)}`;
    let protocol = this.spartanProtocol;
    let isJupiterUniversalLink = false;

    // jupiter
    const isCallWithJupiter = [
      callingModes.jupiter,
      callingModes.jupiterUniversalLink,
    ].includes(callingMode);
    if (isCallWithJupiter) {
      // jupiter doesn't recognize encoded string for now
      command = `r/call?number=${phoneNumber}`;
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      isJupiterUniversalLink = this._useJupiterUniversalLink(callingMode);
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      protocol = isJupiterUniversalLink
        ? normalizeUniversalLink(this.jupiterUniversalLink!)
        : this.jupiterProtocol;
    }
    return {
      command,
      protocol,
      isJupiterUniversalLink,
      uri: `${protocol}${command}`,
    };
  }

  private _useJupiterUniversalLink(callingMode: string) {
    // rc brand: call with jupiter, use scheme
    // rc brand: call with jupiter web, use universal link
    // partner brand: use universal link
    if (callingMode === callingModes.jupiterUniversalLink) {
      return true;
    }
    return (
      this._deps.softphoneOptions?.useJupiterUniversalLink ??
      this._deps.brand.brandConfig.allowJupiterUniversalLink
    );
  }

  @proxify
  async makeCall(phoneNumber: string, callingMode: string) {
    this.startToConnect(phoneNumber);

    const { protocol, command, uri, isJupiterUniversalLink } =
      this.getMakeCallUri(phoneNumber, callingMode);

    if (this._callHandler) {
      this._callHandler({
        callingMode,
        protocol,
        command,
        uri,
        isJupiterUniversalLink,
        phoneNumber,
      });
    } else {
      /**
       * 1. Use window.open in extension background scripts to avoid crashing Browsers
       * 2. Use window.open in non-desktop platforms
       * 3. to support ie on Windows < 8
       * 4. for Jupiter universal link, should open link directly
       */
      const openLink =
        isJupiterUniversalLink ||
        this._extensionMode ||
        this.detectPlatform() !== 'desktop' ||
        (window as any).ActiveXObject ||
        'ActiveXObject' in window;

      if (openLink) {
        window.open(uri);
        // @ts-expect-error TS(2339): Property 'msLaunchUri' does not exist on type 'Nav... Remove this comment to see the full error message
      } else if (window.navigator.msLaunchUri) {
        // to support ie to start the service
        // @ts-expect-error TS(2339): Property 'msLaunchUri' does not exist on type 'Nav... Remove this comment to see the full error message
        window.navigator.msLaunchUri(uri);
      } else {
        // open via iframe
        const frame = document.createElement('iframe');
        frame.style.display = 'none';
        document.body.appendChild(frame);
        await sleep(100);
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        frame.contentWindow.location.href = uri;
        await sleep(300);
        document.body.removeChild(frame);
      }
    }

    if (this._deps.contactMatcher) {
      await this._deps.contactMatcher.forceMatchNumber({
        phoneNumber,
      });
    }

    this.connectComplete();
  }
}

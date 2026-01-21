import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  injectable,
  optional,
  RcModule,
  state,
} from '@ringcentral-integration/next-core';
import { normalizeUniversalLink, sleep } from '@ringcentral-integration/utils';
import bowser from 'bowser';

import { callingModes } from '../CallingSettings/callingModes';

import type {
  CallHandlerContext,
  CallUriInfo,
  SoftphoneOptions,
} from './Softphone.interface';
import { softphoneStatus } from './softphoneStatus';

@injectable({
  name: 'Softphone',
})
export class Softphone extends RcModule {
  protected _callHandler?: (context: CallHandlerContext) => any | null;
  protected _extensionMode: boolean;

  constructor(
    protected _brand: Brand,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional('SoftphoneOptions')
    protected _softphoneOptions?: SoftphoneOptions,
  ) {
    super();
    // TODO: revert the logic
    // this._ignoreModuleReadiness(this._contactMatcher);
    this._extensionMode = this._softphoneOptions?.extensionMode ?? false;
    this._callHandler = this._softphoneOptions?.callHandler;
  }

  @state
  connectingPhoneNumber: string | null = null;

  @state
  softphoneStatus = softphoneStatus.idle;

  @delegate('server')
  async startToConnect(phoneNumber: string) {
    this._startToConnect(phoneNumber);
  }

  @action
  protected _startToConnect(phoneNumber: string) {
    this.softphoneStatus = softphoneStatus.connecting;
    this.connectingPhoneNumber = phoneNumber;
  }

  @delegate('server')
  async connectComplete() {
    this._connectComplete();
  }

  @action
  protected _connectComplete() {
    this.softphoneStatus = softphoneStatus.idle;
    this.connectingPhoneNumber = null;
  }

  @delegate('mainClient')
  async detectPlatform() {
    return bowser.parse(
      (window.navigator && window.navigator.userAgent) || 'unknown',
    ).platform.type;
  }

  get spartanProtocol() {
    return this._brand?.brandConfig.callWithSoftphone?.protocol;
  }

  // currently we only have RingCentral App(rc brand)'s & AT&T universal link
  get jupiterUniversalLink() {
    return this._brand.brandConfig.callWithJupiter?.link;
  }

  get jupiterAppName() {
    return this._brand.brandConfig.callWithJupiter?.name;
  }

  // currently we don't have Bt brand uri scheme
  get jupiterProtocol() {
    return this._brand.brandConfig.callWithJupiter?.protocol;
  }

  getMakeCallUri(phoneNumber: string, callingMode: string): CallUriInfo {
    // spartan
    let command = `call?number=${encodeURIComponent(phoneNumber)}`;
    let protocol: string = this.spartanProtocol!;
    let isJupiterUniversalLink = false;
    // jupiter
    const isCallWithJupiter = [
      callingModes.jupiter,
      callingModes.jupiterUniversalLink,
    ].includes(callingMode);
    if (isCallWithJupiter) {
      // jupiter doesn't recognize encoded string for now
      command = `r/call?number=${phoneNumber}`;
      isJupiterUniversalLink = !!this._useJupiterUniversalLink(callingMode);
      protocol = isJupiterUniversalLink
        ? normalizeUniversalLink(this.jupiterUniversalLink!)
        : this.jupiterProtocol!;
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
      this._softphoneOptions?.useJupiterUniversalLink ??
      this._brand.brandConfig.allowJupiterUniversalLink
    );
  }

  @delegate('mainClient')
  async makeCall(phoneNumber: string, callingMode: string) {
    await this.startToConnect(phoneNumber);

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
       * TODO: Consider bring most of these logic outside to not do it on every call
       */
      const openLink =
        isJupiterUniversalLink ||
        this._extensionMode ||
        (await this.detectPlatform()) !== 'desktop' ||
        (window as any).ActiveXObject ||
        'ActiveXObject' in window;

      if (openLink) {
        window.open(uri);
        // TODO: fix type
        // @ts-ignore
      } else if (window.navigator.msLaunchUri) {
        // to support ie to start the service
        // TODO: fix type
        // @ts-ignore
        window.navigator.msLaunchUri(uri);
      } else {
        // open via iframe
        const frame = document.createElement('iframe');
        frame.style.display = 'none';
        document.body.appendChild(frame);
        await sleep(100);
        frame.contentWindow!.location.href = uri;
        await sleep(300);
        document.body.removeChild(frame);
      }
    }

    if (this._contactMatcher) {
      await this._contactMatcher.forceMatchNumber({
        phoneNumber,
      });
    }

    this.connectComplete();
  }
}

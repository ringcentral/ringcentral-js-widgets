import {
  action,
  computed,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
import bowser from 'bowser';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import sleep from '../../lib/sleep';
import callingModes from '../CallingSettings/callingModes';
import { CallHandlerContext, CallUriInfo, Deps } from './Softphone.interface';
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
    { dep: 'AccountInfo', optional: true },
    { dep: 'DynamicConfig', optional: true },
    { dep: 'SoftphoneOptions', optional: true },
  ],
})
export class Softphone<T extends Deps = Deps> extends RcModuleV2<T> {
  protected _callHandler: (context: CallHandlerContext) => any;
  protected _extensionMode: boolean;
  protected _useBrandedJupiter: boolean;

  constructor(deps: T) {
    super({
      deps,
    });
    this._ignoreModuleReadiness(deps.contactMatcher);
    this._extensionMode = this._deps.softphoneOptions?.extensionMode ?? false;
    this._useBrandedJupiter =
      this._deps.softphoneOptions?.useBrandedJupiter ?? false;
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
    return this.brandConfig.spartanProtocol;
  }

  @computed((that: Softphone) => [
    that._deps.brand.brandConfig,
    that._deps.accountInfo?.serviceInfo,
    that._deps.dynamicConfig?.data,
  ])
  get callWithJupiterConfig() {
    const brandId = this._deps.accountInfo?.serviceInfo.brand?.id;
    if (this._useBrandedJupiter && brandId) {
      const brandConfigs =
        this._deps.dynamicConfig?.data.callWithJupiter ??
        this.brandConfig.callWithJupiter;
      if (brandConfigs) {
        return brandConfigs[brandId] ?? brandConfigs.default;
      }
    }
    return this.brandConfig.callWithJupiter.default;
  }

  get brandConfig() {
    return this._deps.brand.brandConfig;
  }

  // currently we only have RingCentral App(rc brand)'s & AT&T universal link
  get jupiterUniversalLink() {
    return this.callWithJupiterConfig.link;
  }

  @computed(({ callWithJupiterConfig }: Softphone) => [callWithJupiterConfig])
  get jupiterAppName() {
    return this.callWithJupiterConfig?.name
      ? `${this.callWithJupiterConfig?.name} App`
      : null;
  }

  // currently we don't have Bt brand uri scheme
  get jupiterProtocol() {
    return this.callWithJupiterConfig.protocol;
  }

  getMakeCallUri(phoneNumber: string, callingMode: string): CallUriInfo {
    // spartan
    let command = `call?number=${encodeURIComponent(phoneNumber)}`;
    let protocol = this.spartanProtocol;
    let isJupiterUniversalLink = false;
    // jupiter
    const isCallWithJupiter = callingMode === callingModes.jupiter;
    if (isCallWithJupiter) {
      // jupiter doesn't recognize encoded string for now
      command = `r/call?number=${phoneNumber}`;
      isJupiterUniversalLink = this.useJupiterUniversalLink;
      protocol = isJupiterUniversalLink
        ? this.jupiterUniversalLink
        : this.jupiterProtocol;
    }
    return {
      command,
      protocol,
      isJupiterUniversalLink,
      uri: `${protocol}${command}`,
    };
  }

  get useJupiterUniversalLink() {
    // rc brand use scheme, partner brand use universal link
    return (
      this._deps.softphoneOptions?.useJupiterUniversalLink ??
      this.brandConfig.allowJupiterUniversalLink
    );
  }

  @proxify
  async makeCall(phoneNumber: string, callingMode: string) {
    this.startToConnect(phoneNumber);

    const {
      protocol,
      command,
      uri,
      isJupiterUniversalLink,
    } = this.getMakeCallUri(phoneNumber, callingMode);

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
      } else if (window.navigator.msLaunchUri) {
        // to support ie to start the service
        window.navigator.msLaunchUri(uri);
      } else {
        // open via iframe
        const frame = document.createElement('iframe');
        frame.style.display = 'none';
        document.body.appendChild(frame);
        await sleep(100);
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

import url from 'url';
import * as uuid from 'uuid';

import background from '@ringcentral-integration/commons/lib/background';
import { Module } from '@ringcentral-integration/commons/lib/di';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import { action, state, watch } from '@ringcentral-integration/core';

import { OAuthBase } from '../../lib/OAuthBase';
import { Deps } from './ProxyFrameOAuth.interface';

const DEFAULT_PROXY_RETRY = 5000;

type CallbackParams = {
  origin: string;
  data: any;
};

@Module({
  name: 'OAuth',
  deps: [
    'Client',
    'RouterInteraction',
    { dep: 'OAuthOptions', optional: true },
  ],
})
export class ProxyFrameOAuth<T extends Deps = Deps> extends OAuthBase<T> {
  private _retryTimeoutId: ReturnType<typeof setTimeout> = null;
  private _implicitRefreshTimeoutId: ReturnType<typeof setTimeout> = null;

  private _uuid = uuid.v4();
  private _proxyFrame: HTMLIFrameElement;
  private _implicitRefreshFrame: HTMLIFrameElement;
  protected _loggedIn = false;

  constructor({
    oAuthOptions: {
      loginPath = '/',
      redirectUri = './redirect.html',
      proxyUri = './proxy.html',
      defaultProxyRetry = DEFAULT_PROXY_RETRY,
      ...restOAuthOptions
    } = {},
    ...deps
  }: T) {
    super({
      ...deps,
      oAuthOptions: {
        loginPath,
        redirectUri,
        proxyUri,
        defaultProxyRetry,
        ...restOAuthOptions,
      },
    } as T);
  }

  onInitOnce() {
    super.onInitOnce && super.onInitOnce();

    watch(
      this,
      () => [
        this.ready,
        this._deps.auth.loggedIn,
        this._deps.routerInteraction.currentPath,
        this._deps.oAuthOptions?.loginPath,
        this.oAuthReady,
        this._proxyFrame,
      ],
      () => {
        const atLoginPage =
          this._deps.routerInteraction.currentPath ===
          this._deps.oAuthOptions?.loginPath;

        if (
          this.ready &&
          !this._deps.auth.loggedIn &&
          atLoginPage &&
          !this.oAuthReady &&
          !this._proxyFrame
        ) {
          this.setupOAuth();
        } else if (
          this._proxyFrame &&
          (this._deps.auth.loggedIn || !atLoginPage)
        ) {
          this.destroyOAuth();
        }

        if (this._deps.auth.loggedIn === this._loggedIn) return;

        this._loggedIn = this._deps.auth.loggedIn;

        if (this._deps.auth.isImplicit) {
          if (this._loggedIn) {
            this._createImplicitRefreshTimeout();
          } else if (!this._loggedIn) {
            this._clearImplicitRefreshIframe();

            if (this._implicitRefreshTimeoutId) {
              clearTimeout(this._implicitRefreshTimeoutId);
            }
          }
        }
      },
      { multiple: true },
    );
  }

  async _handleCallbackUri(callbackUri: string, refresh = false) {
    await super._handleCallbackUri(callbackUri, refresh);

    if (this._deps.auth.isImplicit && this._deps.auth.loggedIn) {
      this._createImplicitRefreshTimeout();
    }
  }

  get name() {
    return 'proxyFrameOAuth';
  }

  get prefix() {
    return this._deps.oAuthOptions?.prefix;
  }

  get proxyUri() {
    const prefix = encodeURIComponent(this.prefix);

    const proxyUri = url.resolve(
      window.location.href,
      this._deps.oAuthOptions?.proxyUri,
    );

    const hash = encodeURIComponent(btoa(this._uuid));

    return `${proxyUri}?hash=${hash}&prefix=${prefix}`;
  }

  @state
  proxyRetryCount: number = 0;

  @action
  setProxyRetryCount(val: number) {
    this.proxyRetryCount = val;
  }

  @action
  setOAuthReady(val: boolean) {
    super.setOAuthReady(val);
    this.setProxyRetryCount(0);
  }

  private _callbackHandler = async ({ origin, data }: CallbackParams) => {
    // TODO: origin check
    if (!data) return;

    const { callbackUri, proxyLoaded } = data;
    if (callbackUri) {
      this._handleCallbackUri(callbackUri);
    } else if (proxyLoaded) {
      clearTimeout(this._retryTimeoutId);
      this._retryTimeoutId = null;

      this.setOAuthReady(true);
    }
  };

  private _createProxyFrame = () => {
    this._proxyFrame = document.createElement('iframe');
    this._proxyFrame.src = this.proxyUri;
    this._proxyFrame.style.display = 'none';
    const isEdge =
      window &&
      window.navigator &&
      window.navigator.userAgent.indexOf('Edge') > -1;
    const isIE =
      window &&
      window.navigator &&
      /MSIE|Trident/i.test(window.navigator.userAgent);
    if (!isEdge && !isIE) {
      this._proxyFrame.setAttribute(
        'sandbox',
        [
          'allow-scripts',
          'allow-popups',
          'allow-same-origin',
          'allow-forms',
        ].join(' '),
      );
    }
    document.body.appendChild(this._proxyFrame);

    window.addEventListener('message', this._callbackHandler);

    this._retryTimeoutId = setTimeout(() => {
      this._retrySetupProxyFrame();
    }, this._deps.oAuthOptions?.defaultProxyRetry);
  };

  private _retrySetupProxyFrame() {
    this._retryTimeoutId = null;
    if (this.oAuthReady) return;

    this.setProxyRetryCount(this.proxyRetryCount + 1);
    this._destroyProxyFrame();
    this._createProxyFrame();
  }

  private _destroyProxyFrame() {
    document.body.removeChild(this._proxyFrame);
    this._proxyFrame = null;
    window.removeEventListener('message', this._callbackHandler);
  }

  @background
  async setupOAuth() {
    if (this._proxyFrame) return;

    this._createProxyFrame();
    this.setProxyRetryCount(0);
  }

  @background
  async destroyOAuth() {
    if (!this._proxyFrame) return;

    if (this._retryTimeoutId) {
      clearTimeout(this._retryTimeoutId);
      this._retryTimeoutId = null;
    }

    this._destroyProxyFrame();
    this.setOAuthReady(false);
  }

  @proxify
  async openOAuthPage() {
    if (!this.oAuthReady) return;

    if (this._deps.client.service.platform().discovery()) {
      await this._deps.client.service.platform().loginUrlWithDiscovery();
    }

    this._proxyFrame.contentWindow.postMessage(
      {
        oAuthUri: this.oAuthUri,
      },
      '*',
    );
  }

  private _implicitRefreshCallBack = ({ data }: CallbackParams) => {
    const { refreshCallbackUri } = data;
    if (refreshCallbackUri && this._deps.auth.loggedIn) {
      this._handleCallbackUri(refreshCallbackUri, true);
      this._clearImplicitRefreshIframe();
    }
  };

  private _createImplicitRefreshIframe() {
    this._clearImplicitRefreshIframe();
    this._implicitRefreshFrame = document.createElement('iframe');
    this._implicitRefreshFrame.src = this.implicitRefreshOAuthUri;
    this._implicitRefreshFrame.style.display = 'none';
    document.body.appendChild(this._implicitRefreshFrame);
    // eslint-disable-next-line

    window.addEventListener('message', this._implicitRefreshCallBack);
  }

  private _clearImplicitRefreshIframe() {
    if (!this._implicitRefreshFrame) return;

    document.body.removeChild(this._implicitRefreshFrame);
    this._implicitRefreshFrame = null;
    window.removeEventListener('message', this._implicitRefreshCallBack);
    this._callbackHandler = null;
  }

  // create a time out to refresh implicit flow token
  private _createImplicitRefreshTimeout() {
    if (this._implicitRefreshTimeoutId) {
      clearTimeout(this._implicitRefreshTimeoutId);
    }
    const authData = this._deps.auth.token;
    const refreshTokenExpiresIn = authData.expiresIn;
    const { expireTime } = authData;

    if (!refreshTokenExpiresIn || !expireTime) return;

    // * set refresh time to (token expose time) / 3
    let refreshTokenTimeoutTime =
      (parseInt(`${refreshTokenExpiresIn}`, 10) * 1000) / 3;

    if (refreshTokenTimeoutTime + Date.now() > expireTime) {
      refreshTokenTimeoutTime = expireTime - Date.now() - 5000;
      if (refreshTokenTimeoutTime < 0) return;
    }

    this._implicitRefreshTimeoutId = setTimeout(() => {
      if (!this._deps.auth.loggedIn) return;

      if (!this._deps.tabManager?.active) {
        this._createImplicitRefreshTimeout();
        return;
      }

      this._createImplicitRefreshIframe();
      this._implicitRefreshTimeoutId = null;
    }, refreshTokenTimeoutTime);
  }
}

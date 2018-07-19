import background from 'ringcentral-integration/lib/background';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import { Module } from 'ringcentral-integration/lib/di';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import url from 'url';
import uuid from 'uuid';
import actionTypes from './actionTypes';
import getProxyFrameOAuthReducer from './getProxyFrameOAuthReducer';

import OAuthBase from '../../lib/OAuthBase';

const DEFAULT_PROXY_RETRY = 5000;

@Module({
  name: 'OAuth',
  deps: [
    { dep: 'OAuthOptions', optional: true },
  ],
})
export default class ProxyFrameOAuth extends OAuthBase {
  constructor({
    redirectUri = './redirect.html',
    proxyUri = './proxy.html',
    defaultProxyRetry = DEFAULT_PROXY_RETRY,
    ...options
  }) {
    super({
      redirectUri,
      ...options,
    });
    this._uuid = uuid.v4();
    this._proxyUri = ensureExist(proxyUri, 'proxyUri');
    this._defaultProxyRetry = defaultProxyRetry;

    this._reducer = getProxyFrameOAuthReducer(this.actionTypes);

    this._loggedIn = false;
  }

  _onStateChange() {
    super._onStateChange();
    if (this._auth.loggedIn === this._loggedIn) {
      return;
    }
    this._loggedIn = this._auth.loggedIn;
    if (this._loggedIn && this._auth.isImplicit) {
      console.log('new login, start refresh token timeout');
      this._createImplicitRefreshTimeout();
    }
    if (!this._loggedIn && this._auth.isImplicit) {
      this._clearImplicitRefreshIframe();
      if (this._implicitRefreshTimeoutId) {
        clearTimeout(this._implicitRefreshTimeoutId);
      }
    }
  }

  async _handleCallbackUri(options) {
    await super._handleCallbackUri(options);
    if (this._auth.isImplicit && this._auth.loggedIn) {
      this._createImplicitRefreshTimeout();
    }
  }

  get name() {
    return 'proxyFrameOAuth';
  }

  get _actionTypes() {
    return actionTypes;
  }

  get proxyUri() {
    return `${url.resolve(window.location.href, this._proxyUri)}?hash=${encodeURIComponent(btoa(this._uuid))}&prefix=${encodeURIComponent(this.prefix)}`;
  }

  get proxyRetryCount() {
    return this.state.proxyRetryCount;
  }

  _callbackHandler = async ({ origin, data }) => {
    // TODO origin check
    if (data) {
      const {
        callbackUri,
        proxyLoaded,
      } = data;
      if (
        callbackUri
      ) {
        this._handleCallbackUri(callbackUri);
      } else if (proxyLoaded) {
        clearTimeout(this._retryTimeoutId);
        this._retryTimeoutId = null;
        this.store.dispatch({
          type: this.actionTypes.setupOAuth,
        });
      }
    }
  }
  _createProxyFrame = () => {
    this._proxyFrame = document.createElement('iframe');
    this._proxyFrame.src = this.proxyUri;
    this._proxyFrame.style.display = 'none';
    const isEdge = window && window.navigator && window.navigator.userAgent.indexOf('Edge') > -1;
    if (!isEdge) {
      this._proxyFrame.setAttribute('sandbox', [
        'allow-scripts',
        'allow-popups',
        'allow-same-origin',
        'allow-forms',
      ].join(' '));
    }
    document.body.appendChild(this._proxyFrame);
    window.addEventListener('message', this._callbackHandler);
    this._retryTimeoutId = setTimeout(() => {
      this._retrySetupProxyFrame();
    }, this._defaultProxyRetry);
  }
  _retrySetupProxyFrame() {
    this._retryTimeoutId = null;
    if (!this.oAuthReady) {
      this.store.dispatch({
        type: this.actionTypes.proxyRetry,
      });
      this._destroyProxyFrame();
      this._createProxyFrame();
    }
  }
  _destroyProxyFrame() {
    document.body.removeChild(this._proxyFrame);
    this._proxyFrame = null;
    window.removeEventListener('message', this._callbackHandler);
  }

  @background
  async setupOAuth() {
    if (
      !this._proxyFrame
    ) {
      this.store.dispatch({
        type: this.actionTypes.setupProxy,
      });
      this._createProxyFrame();
    }
  }

  @background
  async destroyOAuth() {
    if (this._proxyFrame) {
      if (this._retryTimeoutId) {
        clearTimeout(this._retryTimeoutId);
        this._retryTimeoutId = null;
      }
      this._destroyProxyFrame();
      this.store.dispatch({
        type: this.actionTypes.destroyOAuth,
      });
    }
  }

  @proxify
  openOAuthPage() {
    if (this.oAuthReady) {
      this._proxyFrame.contentWindow.postMessage({
        oAuthUri: this.oAuthUri,
      }, '*');
    }
  }

  _createImplicitRefreshIframe() {
    this._clearImplicitRefreshIframe();
    this._implicitRefreshFrame = document.createElement('iframe');
    this._implicitRefreshFrame.src = this.implictRefreshOAuthUri;
    this._implicitRefreshFrame.style.display = 'none';
    document.body.appendChild(this._implicitRefreshFrame);
    // eslint-disable-next-line
    this._implictitRefreshCallBack = ({ origin, data }) => {
      const { refreshCallbackUri } = data;
      if (refreshCallbackUri && this._auth.loggedIn) {
        this._handleCallbackUri(refreshCallbackUri, true);
        this._clearImplicitRefreshIframe();
      }
    };
    window.addEventListener('message', this._implictitRefreshCallBack);
  }

  _clearImplicitRefreshIframe() {
    if (this._implicitRefreshFrame) {
      document.body.removeChild(this._implicitRefreshFrame);
      this._implicitRefreshFrame = null;
      window.removeEventListener('message', this._implictitRefreshCallBack);
      this._callbackHandler = null;
    }
  }

  // create a time out to refresh implicit flow token
  _createImplicitRefreshTimeout() {
    if (this._implicitRefreshTimeoutId) {
      clearTimeout(this._implicitRefreshTimeoutId);
    }
    const authData = this._auth.token;
    const refreshTokenExpiresIn = authData.expiresIn;
    const { expireTime } = authData;
    if (!refreshTokenExpiresIn || !expireTime) {
      return;
    }
    // set refresh time to (token exposre time) / 3
    let refreshTokenTimeoutTime = (parseInt(refreshTokenExpiresIn, 10) * 1000) / 3;
    if (refreshTokenTimeoutTime + Date.now() > expireTime) {
      refreshTokenTimeoutTime = expireTime - Date.now() - 5000;
      if (refreshTokenTimeoutTime < 0) {
        return;
      }
    }
    this._implicitRefreshTimeoutId = setTimeout(() => {
      if (!this._auth.loggedIn) {
        return;
      }
      if (this._tabManager && !this._tabManager.active) {
        this._createImplicitRefreshTimeout();
        return;
      }
      this._createImplicitRefreshIframe();
      this._implicitRefreshTimeoutId = null;
    }, refreshTokenTimeoutTime);
  }
}

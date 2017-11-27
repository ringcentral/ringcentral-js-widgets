import background from 'ringcentral-integration/lib/background';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import { Module } from 'ringcentral-integration/lib/di';
import ensureExist from 'ringcentral-integration/lib/ensureExist';
import url from 'url';
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
    this._proxyUri = ensureExist(proxyUri, 'proxyUri');
    this._defaultProxyRetry = defaultProxyRetry;

    this._reducer = getProxyFrameOAuthReducer(this.actionTypes);
  }

  get name() {
    return 'proxyFrameOAuth';
  }

  get _actionTypes() {
    return actionTypes;
  }

  get proxyUri() {
    return url.resolve(location.href, this._proxyUri);
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
        fromLocalStorage,
      } = data;
      if (
        callbackUri &&
        (
          fromLocalStorage !== true ||
          (!this._tabManager || this._tabManager.active)
        )
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
    this._proxyFrame.setAttribute('sandbox', [
      'allow-scripts',
      'allow-popups',
      'allow-same-origin',
      'allow-forms',
    ].join(' '));
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
}

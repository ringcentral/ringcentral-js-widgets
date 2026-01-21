import {
  Brand,
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  injectable,
  isSharedWorker,
  isWebWorker,
  optional,
  PortManager,
  RouterPlugin,
  watch,
  logger,
} from '@ringcentral-integration/next-core';
import { isElectron } from '@ringcentral-integration/utils';
import { popWindow } from '@ringcentral-integration/widgets/lib/popWindow';
import { v4 } from 'uuid';

import { Auth } from '../Auth';
import { Client } from '../Client';
import { OAuthBase } from '../OAuthBase';

import type { CombinedAuthState, OAuthOptions } from './OAuth.interface';

@injectable({
  name: 'OAuth',
})
export class OAuth extends OAuthBase {
  private _uuid = v4();
  private _loginWindow: Window | null = null;
  private _redirectCheckTimeout: NodeJS.Timeout | null = null;
  private _isInElectron = isElectron();

  constructor(
    protected _client: Client,
    protected _router: RouterPlugin,
    protected _portManager: PortManager,
    protected override _auth: Auth,
    protected override _toast: Toast,
    protected override _locale: Locale,
    protected override _brand: Brand,
    @optional('TabManager')
    protected override _tabManager?: any,
    @optional('OAuthOptions')
    protected override _oAuthOptions?: OAuthOptions,
  ) {
    _oAuthOptions = _oAuthOptions ?? {};
    if (_oAuthOptions) {
      _oAuthOptions.loginPath = _oAuthOptions.loginPath ?? '/';
      _oAuthOptions.redirectUri =
        _oAuthOptions.redirectUri ?? `${global.origin}/redirect.html`;
      _oAuthOptions.restrictSameOriginRedirectUri =
        _oAuthOptions.restrictSameOriginRedirectUri ?? true;
    }
    super(_auth, _toast, _locale, _brand, _tabManager, _oAuthOptions);
    if (!isSharedWorker && !isWebWorker) {
      if (this._portManager.shared && this._portManager.isWorkerMode) {
        this._portManager.onClient(() => {
          // execute this code when client is opened
          this.initialize();
        });
      } else {
        this.initialize();
      }
    }
  }

  get prefix() {
    return this._oAuthOptions?.prefix;
  }

  get restrictSameOriginRedirectUri() {
    return this._oAuthOptions?.restrictSameOriginRedirectUri;
  }

  get isRedirectUriSameOrigin() {
    return this.restrictSameOriginRedirectUri
      ? this.redirectUri.indexOf(global.origin) === 0
      : true;
  }

  protected combinedState() {
    const json = JSON.stringify({
      now: Date.now(),
      uuid: this._uuid,
      prefix: this.prefix,
      origin: global.origin,
      ...this._oAuthOptions?.extraStateProps,
    } satisfies CombinedAuthState);
    const encoded = global.btoa(json);
    return encoded;
  }

  protected prefixedUuidState() {
    return `${this.prefix}-${encodeURIComponent(btoa(this._uuid))}`;
  }

  override get authState() {
    return `${this.combinedState()}-${this.prefixedUuidState()}`;
  }

  initialize() {
    // close login window when unload and login window exist
    window.addEventListener('beforeunload', () => {
      if (this._loginWindow) {
        try {
          this._loginWindow.close();
        } catch (error) {
          /* ignore error */
        }
      }
    });

    // listen callback uri from redirect page, works with coss origin redirect page
    window.addEventListener('message', ({ data = {} }) => {
      if (!data) {
        return;
      }
      const { callbackUri } = data;
      if (callbackUri) {
        this._clearRedirectCheckTimeout();
        this.handleCallbackLogin(callbackUri);
      }
    });

    // listen callback uri from storage, works only with same origin
    window.addEventListener('storage', (e) => {
      const callbackUriStorageKey = `${this.prefixedUuidState()}-callbackUri`;
      if (e.key === callbackUriStorageKey && e.newValue) {
        const callbackUri = e.newValue;
        localStorage.removeItem(callbackUriStorageKey);
        this._clearRedirectCheckTimeout();
        this.handleCallbackLogin(callbackUri);
      }
    });

    // When a new tab is opened, there may be no dispatch running at this time.
    // So watch is not checking at the time and needs to be checked once manually.
    this.watchOAuth();

    watch(
      this,
      () =>
        [
          this.ready,
          this._auth.loggedIn,
          this._router.currentPath,
          this.oAuthReady,
        ] as const,
      () => this.watchOAuth(),
      { multiple: true },
    );
  }

  watchOAuth() {
    const atLoginPage =
      this._router.currentPath === this._oAuthOptions?.loginPath;

    if (this.ready && !this._auth.loggedIn && atLoginPage && !this.oAuthReady) {
      this.setupOAuth();
    } else if (this._auth.loggedIn || !atLoginPage) {
      this.destroyOAuth();
    }
    // Make sure that window.oAuthCallback is set in every client.
    if (this.oAuthReady && !window.oAuthCallback) {
      this.setupOAuth();
    }
  }

  async setupOAuth() {
    if (this.oAuthReady && window.oAuthCallback) return;

    window.oAuthCallback = (callbackUri) => {
      this._clearRedirectCheckTimeout();
      this.handleCallbackLogin(callbackUri);
    };

    this.setOAuthReady(true);
  }

  async destroyOAuth() {
    if (!this.oAuthReady && !window.oAuthCallback) return;
    window.oAuthCallback = null;
    this.setOAuthReady(false);
  }

  async openOAuthPage() {
    if (!this.oAuthReady) return;
    await this.openOAuthPageInOtherRouter();
  }

  async openOAuthPageInOtherRouter() {
    await this._client.checkLoginUrlWithDiscovery();

    const uri = await this.getOAuthUri();
    this._loginWindow = popWindow(uri, 'rc-oauth', 700, 700);

    logger.log('setup redirect check timeout', this.isRedirectUriSameOrigin);
    if (this.isRedirectUriSameOrigin) {
      this._setupRedirectCheckTimeout();
    }
  }

  private _clearRedirectCheckTimeout() {
    if (this._redirectCheckTimeout === null) return;

    clearTimeout(this._redirectCheckTimeout);
  }

  private async _setupRedirectCheckTimeout() {
    this._clearRedirectCheckTimeout();
    this._redirectCheckTimeout = setTimeout(() => {
      this._redirectCheckTimeout = null;

      if (
        !this._loginWindow ||
        this._loginWindow.closed ||
        // for electron, the .window is always undefined
        (!this._isInElectron && !this._loginWindow.window)
      ) {
        this._loginWindow = null;
        logger.log('no login window or electron, closed');
        return;
      }

      try {
        const callbackUri = this._loginWindow.location.href;
        if (callbackUri.indexOf(this.redirectUri) !== -1) {
          this._loginWindow.close();
          this._loginWindow = null;
          this.handleCallbackLogin(callbackUri);
          logger.log('get call back uri, closed');
          return;
        }
      } catch (e) {
        // ignore e
        // console.log('checking redirect uri');
      }
      this._setupRedirectCheckTimeout();
    }, 1000);
  }
}

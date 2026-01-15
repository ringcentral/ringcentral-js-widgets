import background from '@ringcentral-integration/commons/lib/background';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import { watch } from '@ringcentral-integration/core';
import { isElectron } from '@ringcentral-integration/utils';
import { v4 } from 'uuid';

import { OAuthBase } from '../../lib/OAuthBase';
import { popWindow } from '../../lib/popWindow';

import type { CombinedAuthState, Deps } from './OAuth.interface';

@Module({
  name: 'OAuth',
  deps: [
    'Client',
    'RouterInteraction',
    { dep: 'OAuthOptions', optional: true },
  ],
})
export class OAuth<T extends Deps = Deps> extends OAuthBase<T> {
  private _uuid = v4();

  private _loginWindow: Window | null = null;
  private _redirectCheckTimeout: ReturnType<typeof setTimeout> | null = null;
  private _isInElectron = isElectron();

  constructor({
    oAuthOptions: {
      loginPath = '/',
      redirectUri = './redirect.html',
      restrictSameOriginRedirectUri = true,
      ...restOAuthOptions
    } = {},
    ...deps
  }: Deps) {
    // @ts-expect-error TS(2345): Argument of type '{ oAuthOptions: { prefix?: strin... Remove this comment to see the full error message
    super({
      ...deps,
      oAuthOptions: {
        loginPath,
        redirectUri,
        restrictSameOriginRedirectUri,
        ...restOAuthOptions,
      },
    });
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  get name() {
    return 'OAuth';
  }

  get prefix() {
    return this._deps.oAuthOptions?.prefix;
  }

  get restrictSameOriginRedirectUri() {
    return this._deps.oAuthOptions?.restrictSameOriginRedirectUri;
  }

  get isRedirectUriSameOrigin() {
    return this.restrictSameOriginRedirectUri
      ? this.redirectUri.indexOf(window.origin) === 0
      : true;
  }

  protected combinedState() {
    const json = JSON.stringify({
      now: Date.now(),
      uuid: this._uuid,
      prefix: this.prefix,
      origin: window.origin,
    } satisfies CombinedAuthState);
    const encoded = window.btoa(json);
    return encoded;
  }

  protected prefixedUuidState() {
    return `${this.prefix}-${encodeURIComponent(btoa(this._uuid))}`;
  }

  override get authState() {
    return `${this.combinedState()}-${this.prefixedUuidState()}`;
  }

  override onInitOnce() {
    super.onInitOnce && super.onInitOnce();
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
        this._handleCallbackUri(callbackUri);
      }
    });

    // listen callback uri from storage, works only with same origin
    window.addEventListener('storage', (e) => {
      const callbackUriStorageKey = `${this.prefixedUuidState()}-callbackUri`;
      if (e.key === callbackUriStorageKey && e.newValue) {
        const callbackUri = e.newValue;
        localStorage.removeItem(callbackUriStorageKey);
        this._clearRedirectCheckTimeout();
        this._handleCallbackUri(callbackUri);
      }
    });

    watch(
      this,
      () => [
        this.ready,
        this._deps.auth.loggedIn,
        this._deps.routerInteraction.currentPath,
        this._deps.oAuthOptions?.loginPath,
        this.oAuthReady,
      ],
      () => {
        const atLoginPage =
          this._deps.routerInteraction.currentPath ===
          this._deps.oAuthOptions?.loginPath;

        if (
          this.ready &&
          !this._deps.auth.loggedIn &&
          atLoginPage &&
          !this.oAuthReady
        ) {
          this.setupOAuth();
        } else if (this._deps.auth.loggedIn || !atLoginPage) {
          this.destroyOAuth();
        }
      },
      { multiple: true },
    );
  }

  @background
  async setupOAuth() {
    if (this.oAuthReady) return;

    window.oAuthCallback = (callbackUri) => {
      this._clearRedirectCheckTimeout();
      this._handleCallbackUri(callbackUri);
    };

    this.setOAuthReady(true);
  }

  @background
  override async destroyOAuth() {
    if (!this.oAuthReady) return;
    // @ts-ignore
    window.oAuthCallback = null;
    this.setOAuthReady(false);
  }

  @proxify
  override async openOAuthPage() {
    if (!this.oAuthReady) return;
    await this.openOAuthPageInOtherRouter();
  }

  @proxify
  async openOAuthPageInOtherRouter() {
    if (this._deps.client.service.platform().discovery()) {
      await this._deps.client.service.platform().loginUrlWithDiscovery();
    }
    this._loginWindow = popWindow(this.oAuthUri, 'rc-oauth', 700, 700);

    if (this.isRedirectUriSameOrigin) {
      this._setupRedirectCheckTimeout();
    }
  }

  private _clearRedirectCheckTimeout() {
    if (this._redirectCheckTimeout === null) return;

    clearTimeout(this._redirectCheckTimeout);
  }

  private _setupRedirectCheckTimeout() {
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
        return;
      }

      try {
        const callbackUri = this._loginWindow.location.href;
        if (callbackUri.indexOf(this.redirectUri) !== -1) {
          this._loginWindow.close();
          this._loginWindow = null;
          this._handleCallbackUri(callbackUri);
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

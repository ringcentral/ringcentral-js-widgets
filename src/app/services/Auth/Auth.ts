import type AccountDirectoryProfileImageResource from '@rc-ex/core/lib/definitions/AccountDirectoryProfileImageResource';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { ContactAvatarSize } from '@ringcentral-integration/commons/interfaces/Contact.model';
import {
  CheckRefreshTokenResult,
  createRefreshTokenHelper,
} from '@ringcentral-integration/commons/lib/createRefreshTokenHelper';
import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { BlockPlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  type BrowserLogger,
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  dynamic,
  fromWatchValue,
  inject,
  injectable,
  logger,
  optional,
  RcModule,
  Root,
  state,
  StoragePlugin,
} from '@ringcentral-integration/next-core';
import type { ApiError } from '@ringcentral/sdk';
import { filter, Subject, switchMap, tap } from 'rxjs';
import { v4 } from 'uuid';

import { Analytics, track, trackEvent } from '../Analytics';
import { Client } from '../Client';
import { Environment } from '../Environment';
import { RateLimiter } from '../RateLimiter';
import type { SignOutSource } from '../TrackPropsService';

import type {
  AfterLoggedInHandler,
  AuthOptions,
  BeforeLogoutHandler,
  LoginOptions,
  LoginUrlOptions,
  RefreshErrorHandler,
  RequestLog,
  Token,
  TokenInfo,
} from './Auth.interface';
import {
  AUTH_ERRORS,
  matchKnownRequestErrors,
  type ResponseErrorCode,
} from './authErrors';
import { getProfileImage } from './getProfileImage';
import { t } from './i18n';
import { loginStatus } from './loginStatus';

export const LoginStatusChangeEvent = 'loginStatusChange';
export const TriggerSyncTokenEvent = 'triggerSyncTokenEvent';

const REQUEST_LOG_KEY = Symbol('requestLog');

export type RequestWithLog = Request & { [REQUEST_LOG_KEY]?: RequestLog };

export function extractHeaders<T extends Request | Response>(source?: T) {
  const result: Record<string, string> = {};
  if (source?.headers) {
    source.headers.forEach((value, key) => {
      if (key === 'authorization') {
        // mask bearer token for security and privacy, also less noise in logs
        result[key] = value.startsWith('bearer ')
          ? value.replace(/^bearer (.{5}).*(.{5})$/, 'bearer $1**$2')
          : value;
      } else {
        result[key] = value;
      }
    });
  }
  return result;
}

export async function extractBody<T extends Request | Response>(
  // ringcentral-js sdk sometimes put the original request body into originalBody
  source?: T & { originalBody?: string },
) {
  if (!source || !source.body) return null;

  if (source.bodyUsed) {
    return source.originalBody ?? null;
  } else if ((source.originalBody as any)?.values) {
    const blobContent = [...(source.originalBody as any).values()].find(
      (x) => x instanceof Blob,
    );
    if (blobContent) {
      return `body contains blob, size is ${blobContent.size}, type is ${blobContent.type}`;
    }
  }

  try {
    // use text() to allow more formats to be read
    const data = await source.clone().text();
    return data;
  } catch (e) {
    return 'unable to read body';
  }
}

export type AuthLogoutOptions = {
  dismissAllAlert?: boolean;
  reason: SignOutSource;
  payload?: Record<string, any>;
};

/**
 * Authentication service that handles login, logout and token management
 *
 * @class
 */
@injectable({
  name: 'Auth',
})
export class Auth extends RcModule {
  @dynamic('BlockPlugin')
  private _block?: BlockPlugin;

  /**
   * Observable that emits the owner ID when it changes
   * @type {Observable<string>}
   */
  ownerId$ = this.ready$.pipe(
    switchMap(() => fromWatchValue(this, () => this.ownerId || null)),
  );

  /**
   * Indicates if the user is currently logged in
   * @type {boolean}
   */
  notLoggedIn$ = fromWatchValue(this, () => this.notLoggedIn).pipe(
    filter(Boolean),
  );

  /**
   * Observable that emits the login status
   * @type {Observable<boolean>}
   */
  readonly loggedIn$ = fromWatchValue(this, () => this.loggedIn);

  /**
   * Observable that emits the login status
   * @type {Observable<boolean>}
   */
  isLoggedIn$ = this.loggedIn$.pipe(filter(Boolean));

  /**
   * Observable that emits when the user logs out.
   * It is created by piping the `isLoggedIn$` observable into `switchMap` and then into `notLoggedIn$`.
   * @type {Observable<void>}
   */
  afterLogout$ = this.isLoggedIn$.pipe(switchMap(() => this.notLoggedIn$));

  beforeLogout$ = this.isLoggedIn$.pipe(
    switchMap(() =>
      fromWatchValue(
        this,
        () => this.loginStatus === loginStatus.beforeLogout,
      ).pipe(filter(Boolean)),
    ),
  );

  protected _loggedIn = false;
  _beforeLogoutHandlers: Set<BeforeLogoutHandler> = new Set();
  _afterLoggedInHandlers: Set<AfterLoggedInHandler> = new Set();
  _onRefreshErrorHandlers: Set<RefreshErrorHandler> = new Set();
  _onEnsureLoggedInFail?: (state: CheckRefreshTokenResult) => void;
  _unbindEvents?: () => void;
  _lastEnvironmentCounter = 0;
  /**
   * emit event when sdk refresh error, like refresh token expired
   */
  refreshError$ = new Subject<
    [reason: 'expired' | 'others', error: ApiError]
  >();

  /**
   * emit when request error
   */
  requestError$ = new Subject<
    [reason: ResponseErrorCode | 'revoke' | 'others', error: ApiError]
  >();

  private refreshTokenHelper = createRefreshTokenHelper(
    () => this._client.service.platform(),
    logger,
  );

  constructor(
    protected _client: Client,
    protected _toast: Toast,
    protected _locale: Locale,
    protected _storage: StoragePlugin,
    protected _root: Root,
    @inject('SdkConfig') protected _sdkConfig: SDKConfig,
    @optional() protected _rateLimiter?: RateLimiter,
    @optional() protected _environment?: Environment,
    @optional() protected _analytics?: Analytics,
    @optional('AuthOptions') protected _authOptions?: AuthOptions,
  ) {
    super();
    if (!this._authOptions?.disabledAutoStorageUserId) {
      this._storage.getUserId = () => this.ownerId;
    }

    this.requestError$
      .pipe(
        tap(([reason, error]) =>
          this.logger.error('auth requestError', reason, error),
        ),
        this._root.takeUntilAppDestroy,
      )
      .subscribe();

    this.refreshError$
      .pipe(
        tap(([reason, error]) =>
          this.logger.error('token refreshError', reason, error),
        ),
        this._root.takeUntilAppDestroy,
      )
      .subscribe();

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      this.afterLogout$
        .pipe(
          tap(() => {
            this._root.setExpanded(false);
          }),
          this._root.takeUntilAppDestroy,
        )
        .subscribe();
    }
  }

  /**
   * Current login status
   * @type {loginStatus}
   */
  @state
  loginStatus: string | null = null;

  /**
   * Indicates if the current login is a fresh login (not a token refresh)
   * @type {boolean|null}
   */
  @state
  isFreshLogin: boolean | null = null;

  /**
   * Current auth token information
   * @type {TokenInfo}
   */
  @state
  token: Token = {};

  @state
  _triggerSyncToken = false;

  @action
  _setToken(token: TokenInfo, triggerSyncToken = true) {
    this.token = {
      ownerId: token.owner_id,
      endpointId: token.endpoint_id,
      accessToken: token.access_token,
      tokenType: token.token_type,
      expireTime: token.expire_time,
      expiresIn: token.expires_in,
      scope: token.scope,
    } satisfies Token;
    this._triggerSyncToken = triggerSyncToken;
  }

  @track(trackEvents.authentication)
  @action
  setLoginSuccess(token: TokenInfo) {
    this.loginStatus = loginStatus.loggedIn;
    this._setToken(token);
  }

  @action
  setLoginError() {
    this.loginStatus = loginStatus.notLoggedIn;
    this._setToken({});
    this.isFreshLogin = null;
  }

  @action
  setLogoutSuccess() {
    this.loginStatus = loginStatus.notLoggedIn;
    this._setToken({});
    this.isFreshLogin = null;
  }

  @action
  setRefreshSuccess(token: TokenInfo) {
    this.loginStatus = loginStatus.loggedIn;
    this._setToken(token);
  }

  @action
  setRefreshError(refreshTokenValid: boolean) {
    this.isFreshLogin = null;
    if (!refreshTokenValid) {
      this._setToken({});
      this.logger.error('setRefreshError set to not logged in');
      this.loginStatus = loginStatus.notLoggedIn;
    }
  }

  @action
  setLogoutError() {
    this.loginStatus = loginStatus.notLoggedIn;
    this._setToken({});
    this.isFreshLogin = null;
  }

  @action
  setLogin() {
    this.loginStatus = loginStatus.loggingIn;
    this.isFreshLogin = true;
  }

  @action
  setBeforeLogout() {
    this.logger.log('setBeforeLogout');
    this.loginStatus = loginStatus.beforeLogout;
  }

  @action
  setCancelLogout() {
    this.loginStatus = loginStatus.loggedIn;
  }

  @track(trackEvents.logout)
  @action
  setLogout() {
    this.loginStatus = loginStatus.loggingOut;
  }

  @action
  setInitLogin({ loggedIn, token }: { loggedIn: boolean; token: TokenInfo }) {
    this.loginStatus = loggedIn
      ? loginStatus.loggedIn
      : loginStatus.notLoggedIn;

    this.logger.log(`setInitLogin loginStatus to: ${this.loginStatus}`);
    this.isFreshLogin = loggedIn ? false : null;
    this._setToken(token ?? {}, false);
  }

  @dynamic('BrowserLogger')
  protected _browserLogger?: BrowserLogger;

  protected _logBeforeRequest = async (request: RequestWithLog) => {
    if (!this._browserLogger?.enabled) return;

    const log: RequestLog = {
      id: v4(),
      startTime: Date.now(),
      requestHeaders: extractHeaders(request),
      requestBody: await extractBody(request),
    };
    request[REQUEST_LOG_KEY] = log;
    this.logger.log('beforeRequest', request.method, request.url, log);
  };

  protected _logRequest = async (
    request?: RequestWithLog,
    response?: Response,
    requestError?: string,
  ) => {
    if (!this._browserLogger?.enabled) return;

    const log: RequestLog = request?.[REQUEST_LOG_KEY] ?? {
      id: v4(),
      startTime: undefined,
      requestHeaders: extractHeaders(request),
      requestBody: await extractBody(request),
    };

    log.endTime = Date.now();
    log.duration = log.startTime ? log.endTime - log.startTime : undefined;
    log.responseHeaders = extractHeaders(response);
    log.responseBody = await extractBody(response);
    if (requestError) {
      log.requestError = requestError;
    }
    // some mocks may not have response in tests
    log.status = response?.status;

    this.logger.log(
      `afterRequest ${log.duration}ms`,
      request?.method,
      request?.url,
      log,
    );
  };

  private _bindEvents() {
    if (this._unbindEvents) this._unbindEvents();

    const platform = this._client.service.platform();
    const client = this._client.service.client();

    const onLoginSuccess = async () => {
      const token: TokenInfo = await platform.auth().data();
      this.setLoginSuccess(token);
      const handlers = [...this._afterLoggedInHandlers];
      for (const handler of handlers) {
        handler();
      }
    };
    const onLoginError = () => {
      this.setLoginError();
    };
    const onLogoutSuccess = () => {
      this.setLogoutSuccess();
    };
    const onLogoutError = () => {
      this.logger.log('onLogoutError');
      platform._cache.clean();
      this.setLogoutError();
    };
    const onRefreshSuccess = async () => {
      const token: TokenInfo = await platform.auth().data();
      this.setRefreshSuccess(token);
    };
    const onRefreshError = async (error: ApiError) => {
      this.logger.error(
        'refresh token error',
        error?.request?.url,
        error?.message,
        error?.response?.status,
      );
      // user is still considered logged in if the refreshToken is still valid
      const { refreshTokenValid, resStatus } =
        await this.refreshTokenHelper.getRefreshTokenState(error);

      this.logger.log('RefreshTokenValid:', refreshTokenValid);

      const handlers = [...this._onRefreshErrorHandlers];
      const results = await Promise.allSettled(
        handlers.map(async (handler) => await handler(refreshTokenValid)),
      );
      results.forEach((x) => {
        if (x.status === 'rejected') {
          this.logger.warn('Trigger [RefreshErrorHandler] failed', x.reason);
        }
      });

      this.setRefreshError(refreshTokenValid);

      const expired = await this.refreshTokenHelper.processRefreshError({
        error,
        refreshTokenValid,
        resStatus,
        onSessionExpired: () => {
          this.refreshError$.next(['expired', error]);

          trackEvent('Int_signOut', {
            signOutSource: 'Token expired',
          });

          this._toast.danger({
            message: t('sessionExpired'),
            ttl: 0,
          });
        },
      });

      if (!expired) {
        this.refreshError$.next(['others', error]);

        this.logger.error('refresh token error', error);
      }
    };

    const onBeforeRequest = async (request: Request) => {
      await this._logBeforeRequest(request);
    };

    const onRequestSuccess = async (response: Response, request: Request) => {
      await this._logRequest(request, response);
    };

    const onRequestError = async (error: ApiError) => {
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        this.logger.log('onRequestError', error);
      } else {
        await this._logRequest(error.request!, error.response!, error.message);
      }
      const matches = await matchKnownRequestErrors(error, this.authErrors);
      // logout solution
      const logoutRequired = matches.some(
        ([_0, _1, solutions]) => solutions?.logout,
      );
      if (logoutRequired && this.loginStatus === loginStatus.loggedIn) {
        await this.logout({
          reason: 'Request error',
        });
      }
      // alert solution
      const messages = matches
        .map(([_0, _1, solutions]) => solutions?.message?.())
        .filter((x) => !!x);

      messages.forEach((message) => {
        this._toast.warning({
          message,
          allowDuplicates: false,
          ttl: 0,
        });
      });
      // track error
      matches.forEach(([, errorCode]) => {
        this.requestError$.next([errorCode as ResponseErrorCode, error]);
      });
      if (logoutRequired) {
        this.requestError$.next(['revoke', error]);
      } else {
        this.requestError$.next(['others', error]);
      }
    };
    platform.addListener(platform.events.loginSuccess, onLoginSuccess);
    platform.addListener(platform.events.loginError, onLoginError);
    platform.addListener(platform.events.logoutSuccess, onLogoutSuccess);
    platform.addListener(platform.events.logoutError, onLogoutError);
    platform.addListener(platform.events.refreshSuccess, onRefreshSuccess);
    platform.addListener(platform.events.refreshError, onRefreshError);
    client.addListener(client.events.beforeRequest, onBeforeRequest);
    client.addListener(client.events.requestSuccess, onRequestSuccess);
    client.addListener(client.events.requestError, onRequestError);
    this._unbindEvents = () => {
      platform.removeListener(platform.events.loginSuccess, onLoginSuccess);
      platform.removeListener(platform.events.loginError, onLoginError);
      platform.removeListener(platform.events.logoutSuccess, onLogoutSuccess);
      platform.removeListener(platform.events.logoutError, onLogoutError);
      platform.removeListener(platform.events.refreshSuccess, onRefreshSuccess);
      platform.removeListener(platform.events.refreshError, onRefreshError);
      client.removeListener(client.events.beforeRequest, onBeforeRequest);
      client.removeListener(client.events.requestSuccess, onRequestSuccess);
      client.removeListener(client.events.requestError, onRequestError);
    };
  }

  override _shouldInit() {
    return (
      this.pending &&
      this._locale.ready &&
      (!this._environment || this._environment.ready)
    );
  }

  override _shouldReset() {
    return (
      this.ready &&
      (!this._locale.ready || !(!this._environment || this._environment.ready))
    );
  }

  override async onStateChange() {
    if (
      this.ready &&
      this._environment &&
      this._environment.changeCounter !== this._lastEnvironmentCounter
    ) {
      this._lastEnvironmentCounter = this._environment.changeCounter;
      this._bindEvents();
    }
  }

  override async onInit() {
    this._loggedIn = await this.refreshTokenHelper.loggedIn((result) => {
      if (!result?.refreshTokenValid) {
        // track refresh token invalid logout actions
        this._onEnsureLoggedInFail?.(result);
      }
    });
    this.logger.log(`Auth::onInit, checked is loggedIn: ${this._loggedIn}`);

    this._bindEvents();

    // must check token from storage before that module ready, put that inside onInit lifeCycle
    await this.fetchToken();
  }

  async fetchToken() {
    const platform = this._client.service.platform();
    const token: TokenInfo = this._loggedIn
      ? await platform.auth().data()
      : null;
    this.setInitLogin({
      loggedIn: this._loggedIn,
      token,
    });
  }

  /**
   * Gets the user's owner ID (usually the extension ID)
   * @type {string}
   */
  get ownerId() {
    return this.token.ownerId;
  }

  /**
   * Gets the endpoint ID from the token
   * @type {string}
   */
  get endpointId() {
    return this.token.endpointId;
  }

  /**
   * Gets the access token for API calls
   * @type {string}
   */
  get accessToken() {
    return this.token.accessToken;
  }

  /**
   * @description Login either with username/password or with authorization code
   */
  @delegate('server')
  async login({
    username,
    password,
    extension,
    remember,
    code,
    redirectUri,
    accessToken,
    expiresIn,
    endpointId,
    tokenType,
    scope,
    tokenUri,
    discoveryUri,
  }: // TODO: should use SDK Type if that can be work
  Partial<LoginOptions>) {
    this.setLogin();
    let ownerId: number | undefined;
    if (accessToken) {
      await this._client.service.platform().auth().setData({
        token_type: tokenType,
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token_expires_in: expiresIn,
        scope,
      });
      const extensionData = await this._client.account().extension().get();
      ownerId = extensionData.id;
    }

    // TODO: support to set redirectUri in js sdk v4 login function
    if (redirectUri) {
      this._client.confirmRedirectUri(redirectUri);
    }

    return this._client.service.platform().login({
      username,
      password,
      extension,
      remember,
      code,
      redirectUri,
      endpoint_id: endpointId,
      expires_in: expiresIn,
      access_token: accessToken,
      token_type: tokenType,
      owner_id: ownerId,
      token_uri: tokenUri,
      discovery_uri: discoveryUri,
    });
  }

  @delegate('server')
  async refreshToken() {
    const token = await this._client.service
      .platform()
      .refresh()
      .then((response: Response) => response.json());
    return token;
  }

  @delegate('server')
  async getLoginUrl({
    redirectUri,
    force,
    implicit = false,
    ...options
  }: LoginUrlOptions) {
    // TODO: support to set redirectUri in js sdk v4 login function
    if (redirectUri) {
      this._client.confirmRedirectUri(redirectUri);
    }

    return `${this._client.service.platform().loginUrl({
      ...options,
      redirectUri,
      implicit,
      usePKCE: this.usePKCE,
    })}${force ? '&force=true' : ''}`;
  }

  /**
   * @description Triggers the beforeLogoutHandlers to run
   *  and then proceed to logout from ringcentral.
   */
  @delegate('server')
  async logout({
    dismissAllAlert = true,
    reason = 'Unknown',
    payload,
  }: AuthLogoutOptions): Promise<void> {
    this.logger.log('Int.auth.logout is called! Reason=', reason);

    trackEvent('Int_signOut', {
      signOutSource: reason,
      payload,
    });

    const logout = async () => {
      this.setBeforeLogout();
      if (dismissAllAlert) {
        const rateLimiterId = this._rateLimiter?.identifier;
        // fix bug [https://jira_domain/browse/RCINT-17381]
        if (rateLimiterId) {
          await this._toast.dismissAllExpectSpecifiedGroup(rateLimiterId);
        } else {
          await this._toast.dismissByGroup('*');
        }
      }
      const handlers = [...this._beforeLogoutHandlers];
      try {
        for (const handler of handlers) {
          const result = await (async () => handler())();
          if (result) {
            this.setCancelLogout();

            return Promise.reject(result);
          }
        }
      } catch (error) {
        this.logger.error('Auth|Logout error.', error);
      }
      this.setLogout();
      if (this.isImplicit) {
        this._client.service.platform()._cache.clean();
        this.setLogoutSuccess();
        return;
      }
      await this._client.service.platform().logout();
    };

    // in new version app, logout will block the app
    if (process.env.THEME_SYSTEM === 'spring-ui' && this._block) {
      await this._block.next(logout);
    } else {
      await logout();
    }
  }

  /**
   * Add handler on "before logout" event
   * - Return anything not empty in the handler to cancel the logout as needed
   * @param handler event handler function
   * @returns cancel current handler, call that will delete the handler from that event
   */
  addBeforeLogoutHandler(handler: BeforeLogoutHandler) {
    this._beforeLogoutHandlers.add(handler);
    return () => {
      this.removeBeforeLogoutHandler(handler);
    };
  }

  /**
   * Remove handler from "before logout" event
   * @param handler event handler function
   */
  removeBeforeLogoutHandler(handler: BeforeLogoutHandler) {
    this._beforeLogoutHandlers.delete(handler);
  }

  /**
   * Add handler on "after logged in" event
   * @param handler event handler function
   * @returns cancel current handler, call that will delete the handler from that event
   */
  addAfterLoggedInHandler(handler: AfterLoggedInHandler) {
    this._afterLoggedInHandlers.add(handler);
    return () => {
      this.removeAfterLoggedInHandler(handler);
    };
  }

  /**
   * Remove handler from "after logged in" event
   * @param handler event handler function
   */
  removeAfterLoggedInHandler(handler: AfterLoggedInHandler) {
    this._afterLoggedInHandlers.delete(handler);
  }

  /**
   * Add handler on "refresh error" event
   * @param handler event handler function
   * @returns cancel current handler, call that will delete the handler from that event
   */
  addRefreshErrorHandler(handler: RefreshErrorHandler) {
    this._onRefreshErrorHandlers.add(handler);
    return () => {
      this.removeRefreshErrorHandler(handler);
    };
  }

  /**
   * Remove handler from "refresh error" event
   * @param handler event handler function
   */
  removeRefreshErrorHandler(handler: RefreshErrorHandler) {
    this._onRefreshErrorHandlers.delete(handler);
  }

  @delegate('server')
  async refreshImplicitToken({
    tokenType,
    accessToken,
    expiresIn,
    endpointId,
  }: {
    tokenType: TokenInfo['token_type'];
    accessToken: TokenInfo['access_token'];
    expiresIn: TokenInfo['expires_in'];
    endpointId: TokenInfo['endpoint_id'];
  }) {
    try {
      const extensionData = await this._client.account().extension().get();
      const ownerId = String(extensionData.id);
      if (ownerId !== String(this.ownerId)) {
        return;
      }
      const platform = this._client.service.platform();
      const newAuthData = {
        token_type: tokenType,
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token_expires_in: expiresIn,
        endpoint_id: endpointId,
      };
      await platform.auth().setData(newAuthData);
      platform.emit(platform.events.refreshSuccess, newAuthData);
    } catch (error) {
      this.logger.error('refreshImplicitToken error:', error);
    }
  }

  @delegate('server')
  async checkIsLoggedIn() {
    // SDK would return false when there's temporary network issues,
    // but we should not return use back to welcome string and should
    // still consider the user as being logged in.
    await this._client.service.platform().loggedIn();
    return this.loginStatus === loginStatus.loggedIn;
  }

  /**
   * Ensures the access token is valid by checking and refreshing if necessary
   * This method should be used before directly accessing this.accessToken
   * @throws {Error} If token validation fails and logout is required
   */
  @delegate('server')
  async ensureValidAccessToken(): Promise<void> {
    try {
      // First check if we're currently logged in
      if (!this.loggedIn) {
        this.logger.error('[Auth] User is not logged in, cannot proceed');
        throw new Error('User is not authenticated');
      }

      // Check if token is actually valid by making a test API call
      const isValidToken = await this.checkIsLoggedIn();

      if (!isValidToken) {
        // Try to refresh the token
        this.logger.log('[Auth] Token appears invalid, attempting refresh');
        try {
          await this.refreshToken();
          this.logger.log('[Auth] Token refreshed successfully');
        } catch (refreshError) {
          // If refresh fails, trigger logout
          this.logger.error(
            '[Auth] Token refresh failed, triggering logout',
            refreshError,
          );
          await this.logout({
            reason: 'Token expired',
          });
          throw new Error('Authentication failed, user has been logged out');
        }
      }

      this.logger.log('[Auth] Access token is valid');
    } catch (error) {
      this.logger.error('[Auth] Error in token validation:', error);
      throw error;
    }
  }

  /**
   * the user is loggedIn, both `loggedIn` and `beforeLogout` be true
   */
  get loggedIn() {
    return (
      this.loginStatus === loginStatus.loggedIn ||
      this.loginStatus === loginStatus.beforeLogout
    );
  }

  get notLoggedIn() {
    return this.loginStatus === loginStatus.notLoggedIn;
  }

  get isImplicit() {
    return !(
      this.usePKCE || this._client.service.platform()._clientSecret?.length > 0
    );
  }

  get usePKCE() {
    return this._authOptions?.usePKCE ?? false;
  }

  get authErrors() {
    const additionalAuthErrors = this._authOptions?.additionalAuthErrors;
    return additionalAuthErrors
      ? {
          ...AUTH_ERRORS,
          ...additionalAuthErrors,
        }
      : AUTH_ERRORS;
  }

  protected async _generateAuthCode(clientId: string, ttl = 180) {
    try {
      const resp = await this._client.service
        .platform()
        .post('/restapi/v1.0/interop/generate-code', {
          ttl,
          clientId,
        });
      const { code } = await resp.json();
      return code as string;
    } catch (error) {
      this.logger.error('generateAuthCode fail', error);
      throw error;
    }
  }

  protected async _getDiscoveryData() {
    let tokenUri: string | undefined;
    let discoveryUri: string | undefined;
    try {
      const platform = this._client.service.platform();
      const discoveryData = await platform.discovery()?.externalData();
      if (discoveryData) {
        tokenUri = discoveryData.authApi.tokenUri;
        discoveryUri = discoveryData.discoveryApi.externalUri;
      } else {
        if (platform.discovery()?._discoveryInitPromise) {
          await platform.discovery()?._discoveryInitPromise;
        }
        const initialDiscoveryData = await platform.discovery()?.initialData();
        if (initialDiscoveryData) {
          tokenUri = initialDiscoveryData.authApi.defaultTokenUri;
          discoveryUri = initialDiscoveryData.discoveryApi.defaultExternalUri;
        }
      }
    } catch (err) {
      this.logger.error('get discovery endpoint error', err);
    }

    return { tokenUri, discoveryUri };
  }

  getAuthCode(options: { discovery?: boolean } = {}) {
    return this.getAuthCodeForClient(this._sdkConfig.clientId!, options);
  }

  async getAuthCodeForClient(
    clientId: string,
    { discovery = true }: { discovery?: boolean } = {},
  ) {
    const code = await this._generateAuthCode(clientId);

    if (discovery) {
      const { tokenUri, discoveryUri } = await this._getDiscoveryData();
      return {
        code,
        tokenUri,
        discoveryUri,
      };
    }

    return {
      code,
      tokenUri: undefined,
      discoveryUri: undefined,
    };
  }

  /**
   * Gets the profile image URL synchronously
   * @returns {string|null} The profile image URL or null
   */
  getProfileImageSync(
    profileImage: AccountDirectoryProfileImageResource,
    size?: ContactAvatarSize,
  ) {
    return getProfileImage({
      profileImage,
      accessToken: this.accessToken,
      size,
    });
  }
}

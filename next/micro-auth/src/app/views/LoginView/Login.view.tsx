import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  dynamic,
  fromWatchValue,
  injectable,
  logger,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  UIFunctions,
  UIProps,
  useConnector,
  useMainTabSyncState,
} from '@ringcentral-integration/next-core';
import { AuthPage as JunoAuthPage } from '@ringcentral-integration/next-widgets/deprecated/Auth/AuthPage';
import React, { useRef } from 'react';
import {
  concatMap,
  delay,
  EMPTY,
  filter,
  identity,
  map,
  merge,
  of,
  switchMap,
} from 'rxjs';

import {
  AppFeatures,
  Auth,
  ConnectivityMonitor,
  loginStatus,
  OAuth,
  RateLimiter,
} from '../../services';

import { AuthPage } from './AuthPage';
import type {
  LoginViewOptions,
  LoginViewPanelProps,
  LoginViewProps,
} from './Login.view.interface';

/**
 * View module for handling login functionality and UI
 * Supports both Spring UI and Juno themes
 *
 * @class
 */
@injectable({
  name: 'LoginView',
})
export class LoginView extends RcViewModule {
  @dynamic('AppFeatures')
  private _appFeatures?: AppFeatures;

  constructor(
    public _brand: Brand,
    protected _auth: Auth,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _locale: Locale,
    protected _oAuth: OAuth,
    protected _rateLimiter: RateLimiter,
    protected _portManager: PortManager,
    protected _router: RouterPlugin,
    @optional('LoginViewOptions')
    protected _loginViewOptions?: LoginViewOptions,
  ) {
    super();
    if (!this._loginViewOptions?.disabledRouteGuard) {
      if (this._portManager.shared) {
        this._portManager.onServer(() => {
          this.initialize();
        });
      } else {
        this.initialize();
      }
    }
  }

  protected async initialize() {
    merge(
      this._auth.ownerId$,
      fromWatchValue(this, () => this._router.currentPath),
    )
      .pipe(
        switchMap(() => {
          if (this._auth.ownerId && this._router.currentPath === '/') {
            // in spring-ui, we must wait the appFeatures ready
            if (process.env.THEME_SYSTEM === 'spring-ui' && this._appFeatures) {
              if (!this._appFeatures.ready) {
                logger.log('[LoginView]: wait appFeatures ready to redirect');
              }

              return this._appFeatures.ready$.pipe(
                map(() => this.routeAfterLogin),
                filter((path) => typeof path === 'string'),
              );
            }

            if (typeof this.routeAfterLogin === 'string') {
              return of(this.routeAfterLogin);
            }
          }

          if (!this._auth.ownerId && this._router.currentPath !== '/') {
            return of('/');
          }
          return EMPTY;
        }),
        filter(Boolean),
        // when app is not shared, we need to wait for the router sync up from history(this is a issue in react-router v5)
        this._portManager.shared || process.env.NODE_ENV === 'test'
          ? identity
          : delay(0),
        // use concatMap to make sure the path replace one by one
        concatMap(async (path) => {
          if (this._router.currentPath !== path) {
            logger.log(`[LoginView]: path replace to ${path}`);
            await this._router.replace(path);
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  get routeAfterLogin() {
    return (
      this._loginViewOptions?.routeAfterLogin ??
      // in spring-ui default to /dialer
      (process.env.THEME_SYSTEM === 'spring-ui'
        ? process.env.NODE_ENV === 'test'
          ? // TODO: welcome page not include in this stage, but in test env we already have that test to check all exist case of welcome page can be passed to reduce wrong update in the future
            '/welcome'
          : this._appFeatures?.getAppDefaultRoutePath()
        : '/home')
    );
  }

  @state
  showMicroCore = false;

  @action
  setShowMicroCore(showMicroCore: boolean) {
    this.showMicroCore = showMicroCore;
  }

  getUIProps(): UIProps<LoginViewPanelProps> {
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      return {
        description: this._loginViewOptions?.getDescription?.(),
        welcomePicture: this._loginViewOptions?.welcomePicture,
        currentLocale: this._locale.currentLocale,
        brandName: this._brand.name,
        appName: this._brand.appName as string,
        disabled:
          !this._oAuth.oAuthReady ||
          this._rateLimiter.restricted ||
          !this._connectivityMonitor.connectivity,
        showSpinner:
          !this._auth.ready ||
          this._auth.loginStatus === loginStatus.loggingIn ||
          this._auth.loginStatus === loginStatus.loggingOut ||
          this._auth.loginStatus === loginStatus.beforeLogout ||
          this._auth.loginStatus === loginStatus.loggedIn,
        logoUrl: this._brand.assets?.['logo'] as string,
        showSignUp: !!this._brand.brandConfig.signupUrl,
      };
    }

    return {
      currentLocale: this._locale.currentLocale,
      brandName: this._brand.name,
      appName: this._brand.appName as string,
      disabled:
        !this._oAuth.oAuthReady ||
        this._rateLimiter.restricted ||
        !this._connectivityMonitor.connectivity,
      showSpinner:
        !this._auth.ready ||
        this._auth.loginStatus === loginStatus.loggingIn ||
        this._auth.loginStatus === loginStatus.loggingOut ||
        this._auth.loginStatus === loginStatus.beforeLogout ||
        this._auth.loginStatus === loginStatus.loggedIn,
      showSignUp: !!this._brand.brandConfig.signupUrl,
    };
  }

  getUIFunctions(): UIFunctions<LoginViewPanelProps> {
    return {
      openOAuthPage: () => {
        this._oAuth.openOAuthPage();
      },
      onSignUpButtonClick: () => {
        const signupUrl = this._brand.brandConfig.signupUrl;
        if (!signupUrl) return;
        window.open(signupUrl);
      },
    };
  }

  /**
   * Renders the login component with the appropriate theming
   * Handles state synchronization and spinner display
   *
   * @param {LoginViewProps} props - Props for the login view
   * @returns {React.ReactNode} Rendered component
   */
  component(props: LoginViewProps) {
    const syncCompleted = useMainTabSyncState();
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
        showMicroCore: this.showMicroCore,
      };
    });

    const showSpinner = !syncCompleted || _props.showSpinner;

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const Component = this._loginViewOptions?.component || AuthPage;

      return (
        <Component {..._props} {...uiFunctions} showSpinner={showSpinner} />
      );
    }

    const Component = this._loginViewOptions?.component || JunoAuthPage;

    return <Component {..._props} {...uiFunctions} showSpinner={showSpinner} />;
  }
}

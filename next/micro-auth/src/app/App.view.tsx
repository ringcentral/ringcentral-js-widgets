import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { MFEAppRootView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  injectable,
  PortManager,
  delegate,
  Route,
  RouterPlugin as Router,
  Switch,
  autobind,
} from '@ringcentral-integration/next-core';
import {
  RcMicroAppView,
  useMicroApp,
} from '@ringcentral-integration/next-micro';
import React from 'react';

import { GlobalStyle } from '../styles';

import i18n from './i18n';
import { Auth } from './services';
import { LoginView } from './views';

@injectable({
  name: 'AuthAppView',
})
export class AuthAppView extends RcMicroAppView {
  constructor(
    private _theme: Theme,
    private _portManager: PortManager,
    private _auth: Auth,
    private _router: Router,
    private _loginView: LoginView,
    private _mfeAppRootView: MFEAppRootView,
  ) {
    super();
    this._mfeAppRootView.setRoutes(this, this.Routes);
    this._mfeAppRootView.setDefaultRoutes(this.DefaultRoutes);
    this.interaction();
  }

  protected interaction() {
    // TODO: add interaction
  }

  @autobind
  DefaultRoutes() {
    return (
      <Switch>
        <Route
          exact
          path={'/'}
          component={() => <this._loginView.component />}
        />
      </Switch>
    );
  }

  @autobind
  Routes() {
    if (!this.isAppShell) return <></>;
    return (
      <Switch>
        <Route
          path={'/home'}
          component={() => {
            const { t } = useLocale(i18n);
            return <>{t('loginSuccess')}</>;
          }}
        />
      </Switch>
    );
  }

  @delegate('server')
  async setThemeType(type: string) {
    this._theme.setThemeType(type);
  }

  component() {
    const MicroCore = useMicroApp(this, {
      name: '@ringcentral-integration/micro-core',
      loader: () => import('@ringcentral-integration/micro-core/src/bootstrap'),
    });
    if (!this.isAppShell) return <MicroCore />;
    return (
      <>
        <GlobalStyle />
        <MicroCore />
        <this._mfeAppRootView.DefaultRoute />
        <this._mfeAppRootView.Routes appShell={this} />
      </>
    );
  }
}

import { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { MFEAppRootView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  autobind,
  delegate,
  injectable,
  Route,
  Switch,
} from '@ringcentral-integration/next-core';
import {
  RcMicroAppView,
  useMicroApp,
} from '@ringcentral-integration/next-micro';
import React from 'react';

import { GlobalStyle } from '../styles';

import { GenericMeetingView } from './views';

@injectable({
  name: 'MeetingAppView',
})
export class MeetingAppView extends RcMicroAppView {
  constructor(
    private _theme: Theme,
    private _genericMeetingView: GenericMeetingView,
    private _mfeAppRootView: MFEAppRootView,
  ) {
    super();
    this._mfeAppRootView.setRoutes(this, this.Routes);
  }

  @delegate('server')
  async setThemeType(type: string) {
    this._theme.setThemeType(type);
  }

  @autobind
  Routes() {
    return (
      <Switch>
        <Route
          path="/meeting"
          component={() => <this._genericMeetingView.component />}
        />
      </Switch>
    );
  }

  component() {
    const MicroAuth = useMicroApp(this, {
      name: '@ringcentral-integration/micro-auth',
      loader: () => import('@ringcentral-integration/micro-auth/src/bootstrap'),
    });
    if (!this.isAppShell) return <MicroAuth />;
    return (
      <>
        <GlobalStyle />
        <MicroAuth />
        <this._mfeAppRootView.DefaultRoute />
        <this._mfeAppRootView.Routes appShell={this} />
      </>
    );
  }
}

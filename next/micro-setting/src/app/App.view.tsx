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

import {
  AudioSettingsView,
  CallingSettingsView,
  FeedbackView,
  IssuesTrackingView,
  RegionSettingsView,
  SettingsView,
} from './views';
import { CallQueueManagementView } from './views/CallQueueManagementView';

@injectable({
  name: 'SettingAppView',
})
export class SettingAppView extends RcMicroAppView {
  constructor(
    private _theme: Theme,
    private _settingsView: SettingsView,
    private _callingSettingsView: CallingSettingsView,
    private _regionSettingsView: RegionSettingsView,
    private _audioSettingsView: AudioSettingsView,
    private _feedbackView: FeedbackView,
    private _issuesTrackingView: IssuesTrackingView,
    private _callQueueManagementView: CallQueueManagementView,
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
          path="/settings"
          component={() => (
            <Switch>
              <Route
                path="/settings"
                exact
                component={() => (
                  <this._settingsView.component
                    // appCode={appCode}
                    showQuickAccess
                    showAudio={this._audioSettingsView.showSetting}
                  />
                )}
              />
              {this._callingSettingsView.showSetting && (
                <Route
                  path="/settings/calling"
                  component={() => <this._callingSettingsView.component />}
                />
              )}
              <Route
                path="/settings/region"
                component={() => <this._regionSettingsView.component />}
              />
              {this._audioSettingsView.showSetting && (
                <Route
                  path="/settings/audio"
                  component={() => <this._audioSettingsView.component />}
                />
              )}
              <Route
                path="/settings/feedback"
                component={() => <this._feedbackView.component />}
              />
              <Route
                path="/settings/issuesTracking"
                component={() => <this._issuesTrackingView.component />}
              />
              <Route
                path="/settings/callQueueManagement"
                component={() => <this._callQueueManagementView.component />}
              />
            </Switch>
          )}
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

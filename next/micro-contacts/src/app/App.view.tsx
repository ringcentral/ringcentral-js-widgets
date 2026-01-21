import { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { MFEAppRootView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  injectable,
  delegate,
  autobind,
  Route,
  Switch,
} from '@ringcentral-integration/next-core';
import {
  RcMicroAppView,
  useMicroApp,
} from '@ringcentral-integration/next-micro';
import { ContactSourceFilter } from '@ringcentral-integration/widgets/components/ContactSourceFilter';
import React from 'react';

import { GlobalStyle } from '../styles';

import { ContactListView } from './views';

@injectable({
  name: 'ContactsAppView',
})
export class ContactsAppView extends RcMicroAppView {
  constructor(
    private _theme: Theme,
    private _contactListView: ContactListView,
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
          path="/contacts"
          component={() => (
            <this._contactListView.component
              contactSourceFilterRenderer={ContactSourceFilter}
            />
          )}
        />
        {/* <Route
            path={'/contacts/:contactType/:contactId'}
            component={() => (
              <this._contactDetailsView.component>
                <this._recentActivityView.component
                  entry="Contact Details"
                  navigateTo={(path) => {
                    this._router.push(path);
                  }}
                  getContact={() => currentContact}
                  useContact
                />
              </this._contactDetailsView.component>
            )}
          /> */}
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

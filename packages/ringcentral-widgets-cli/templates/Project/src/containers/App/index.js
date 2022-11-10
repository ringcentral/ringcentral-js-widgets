import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import { PhoneProvider } from '@ringcentral-integration/widgets/lib/phoneContext';
import { RegionSettingsPage } from '@ringcentral-integration/widgets/containers/RegionSettingsPage';

import SettingsPage from '@ringcentral-integration/widgets/containers/SettingsPage';
import { LoginPage } from '@ringcentral-integration/widgets/containers/LoginPage';

import AlertContainer from '@ringcentral-integration/widgets/containers/AlertContainer';
import { ConnectivityBadgeContainer } from '@ringcentral-integration/widgets/containers/ConnectivityBadgeContainer';

import MainView from '../MainView';
import AppView from '../AppView';

const App = ({ phone, hostingUrl }) => {
  return (
    <PhoneProvider phone={phone}>
      <Provider store={phone.store}>
        <Router history={phone.routerInteraction.history}>
          <Route
            component={(routerProps) => (
              <AppView hostingUrl={hostingUrl}>
                {routerProps.children}
                <ConnectivityBadgeContainer />
              </AppView>
            )}
          >
            <Route
              path="/"
              component={() => (
                <LoginPage>
                  <AlertContainer />
                </LoginPage>
              )}
            />
            <Route
              path="/"
              component={(routerProps) => (
                <MainView>
                  {routerProps.children}
                  <AlertContainer />
                </MainView>
              )}
            >
              <Route
                path="/settings"
                component={(routerProps) => (
                  <SettingsPage
                    params={routerProps.location.query}
                    regionSettingsUrl="/settings/region"
                    callingSettingsUrl="/settings/calling"
                    showAudio={false}
                    showUserGuide={false}
                    showFeedback={false}
                  />
                )}
              />
              <Route path="/settings/region" component={RegionSettingsPage} />
            </Route>
          </Route>
        </Router>
      </Provider>
    </PhoneProvider>
  );
};

App.propTypes = {
  phone: PropTypes.object.isRequired,
  hostingUrl: PropTypes.string.isRequired,
};

export default App;

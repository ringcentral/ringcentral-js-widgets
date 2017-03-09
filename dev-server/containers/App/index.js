import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';

import WelcomePage from '../../../src/containers/WelcomePage';
import CallingSettingsPage from '../../../src/containers/CallingSettingsPage';
import RegionSettingsPage from '../../../src/containers/RegionSettingsPage';
import DialerPage from '../../../src/containers/DialerPage';
import ComposeTextPage from '../../../src/containers/ComposeTextPage';
import ConversationPage from '../../../src/containers/ConversationPage';
import ConferencePage from '../../../src/containers/ConferencePage';
import MessagesPage from '../../../src/containers/MessagesPage';

import MainView from '../MainView';
import SettingsPage from '../../../src/containers/SettingsPage';
import AppView from '../AppView';

export default function App({
  phone,
}) {
  // TODO find a more reason place to do this
  phone.store.subscribe(() => {
    if (phone.auth.ready) {
      if (
        phone.router.currentPath !== '/welcome' &&
        phone.auth.loginStatus === loginStatus.notLoggedIn
      ) {
        phone.router.history.push('/welcome');
      } else if (
        phone.router.currentPath === '/welcome' &&
        phone.auth.loginStatus === loginStatus.loggedIn
      ) {
        phone.router.history.push('/');
      }
    }
  });

  const ensureLogin = async (nextState, replace, cb) => {
    if (!(await phone.auth.checkIsLoggedIn())) {
      replace('/welcome');
    }
    cb();
  };
  return (
    <Provider store={phone.store} >
      <Router history={phone.router.history} >
        <Route
          component={props => (
            <AppView
              auth={phone.auth}
              alert={phone.alert}
              locale={phone.locale}
              environment={phone.environment}
              brand={phone.brand}
              callingSettings={phone.callingSettings}>
              {props.children}
            </AppView>
          )} >
          <Route
            path="/"
            component={props => (
              <MainView
                router={phone.router}
                messageStore={phone.messageStore}
                auth={phone.auth} >
                {props.children}
              </MainView>
            )} >
            <IndexRoute
              onEnter={ensureLogin}
              component={() => (
                <DialerPage
                  call={phone.call}
                  callingSettings={phone.callingSettings}
                  connectivityMonitor={phone.connectivityMonitor}
                  locale={phone.locale}
                  rateLimiter={phone.rateLimiter}
                />
              )} />
            <Route
              path="/settings"
              onEnter={ensureLogin}
              component={() => (
                <SettingsPage
                  auth={phone.auth}
                  extensionInfo={phone.extensionInfo}
                  accountInfo={phone.accountInfo}
                  regionSettings={phone.regionSettings}
                  version={phone.version}
                  locale={phone.locale}
                  brand={phone.brand}
                  router={phone.router}
                  regionSettingsUrl="/settings/region"
                  callingSettingsUrl="/settings/calling"
                  />
              )} />
            <Route
              path="/settings/region"
              onEnter={ensureLogin}
              component={() => (
                <RegionSettingsPage
                  regionSettings={phone.regionSettings}
                  locale={phone.locale}
                  router={phone.router}
                />
              )} />
            <Route
              path="/settings/calling"
              onEnter={ensureLogin}
              component={() => (
                <CallingSettingsPage
                  brand={phone.brand}
                  callingSettings={phone.callingSettings}
                  locale={phone.locale}
                  router={phone.router}
                />
              )} />
            <Route
              path="/conference"
              onEnter={ensureLogin}
              component={() => (
                <ConferencePage
                  conference={phone.conference}
                  regionSettings={phone.regionSettings}
                  locale={phone.locale}
                  composeText={phone.composeText}
                  router={phone.router}
                />
            )} />
            <Route
              path="/composeText"
              onEnter={ensureLogin}
              component={() => (
                <ComposeTextPage
                  locale={phone.locale}
                  auth={phone.auth}
                  composeText={phone.composeText}
                  messageStore={phone.messageStore}
                  router={phone.router}
                  regionSettings={phone.regionSettings}
                  contactSearch={phone.contactSearch}
                  messageSender={phone.messageSender}
                />
              )} />
            <Route
              path="/conversations/:conversationId"
              onEnter={ensureLogin}
              component={props => (
                <ConversationPage
                  locale={phone.locale}
                  auth={phone.auth}
                  params={props.params}
                  regionSettings={phone.regionSettings}
                  conversation={phone.conversation}
                  messageStore={phone.messageStore}
                  dateTimeIntl={phone.dateTimeIntl}
                  // contactMatcher={phone.contactMatcher}
                />
            )} />
            <Route
              path="/messages"
              onEnter={ensureLogin}
              component={() => (
                <MessagesPage
                  locale={phone.locale}
                  auth={phone.auth}
                  messages={phone.messages}
                  messageStore={phone.messageStore}
                  extensionInfo={phone.extensionInfo}
                  regionSettings={phone.regionSettings}
                  contactMatcher={phone.contactMatcher}
                  dateTimeIntl={phone.dateTimeIntl}
                  // contactMatcher={phone.contactMatcher}
                />
            )} />
          </Route>
          <Route
            path="/welcome"
            onEnter={async (nextState, replace, cb) => {
              if (await phone.auth.checkIsLoggedIn()) {
                replace('/');
              }
              cb();
            }}
            component={() => (
              <WelcomePage
                auth={phone.auth}
                locale={phone.locale}
                rateLimiter={phone.rateLimiter} />
            )}
          />
        </Route>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  phone: PropTypes.object.isRequired,
};

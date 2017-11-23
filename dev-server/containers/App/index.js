import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import sleep from 'ringcentral-integration/lib/sleep';

import AlertContainer from '../../../src/containers/AlertContainer';
import WelcomePage from '../../../src/containers/WelcomePage';
import CallingSettingsPage from '../../../src/containers/CallingSettingsPage';
import RegionSettingsPage from '../../../src/containers/RegionSettingsPage';
import AudioSettingsPage from '../../../src/containers/AudioSettingsPage';
import DialerPage from '../../../src/containers/DialerPage';
import ComposeTextPage from '../../../src/containers/ComposeTextPage';
import ConversationPage from '../../../src/containers/ConversationPage';
import ConferencePage from '../../../src/containers/ConferencePage';
import MeetingPage from '../../../src/containers/MeetingPage';
import MessagesPage from '../../../src/containers/MessagesPage';
import SettingsPage from '../../../src/containers/SettingsPage';
import ActiveCallsPage from '../../../src/containers/ActiveCallsPage';
import CallHistoryPage from '../../../src/containers/CallHistoryPage';
import IncomingCallPage from '../../../src/containers/IncomingCallPage';
import CallCtrlPage from '../../../src/containers/CallCtrlPage';
import CallBadgeContainer from '../../../src/containers/CallBadgeContainer';
import RecentActivityContainer from '../../../src/containers/RecentActivityContainer';
import ContactsPage from '../../../src/containers/ContactsPage';
import ContactDetailsPage from '../../../src/containers/ContactDetailsPage';
import ContactSourceFilter from '../../../src/components/ContactSourceFilter';
import MainView from '../MainView';
import AppView from '../AppView';
import PhoneProvider from '../../../src/lib/PhoneProvider';

export default function App({
  phone,
  icon
}) {
  const sourceIcons = {
    brandIcon: icon
  };
  return (
    <PhoneProvider phone={phone}>
      <Provider store={phone.store} >
        <Router history={phone.routerInteraction.history} >
          <Route
            component={routerProps => (
              <AppView>
                {routerProps.children}
                <CallBadgeContainer
                  hidden={routerProps.location.pathname === '/calls/active'}
                  goToCallCtrl={() => {
                    phone.routerInteraction.push('/calls/active');
                  }}
                />
                <IncomingCallPage
                  showContactDisplayPlaceholder={false}
                  sourceIcons={sourceIcons}
                  getAvatarUrl={
                    async (contact) => {
                      const avatarUrl = await phone.contacts.getProfileImage(contact, false);
                      return avatarUrl;
                    }
                  }
                >
                  <AlertContainer
                    callingSettingsUrl="/settings/calling"
                    regionSettingsUrl="/settings/region"
                  />
                  <RecentActivityContainer
                    getSession={() => (phone.webphone.ringSession || {})}
                    navigateTo={(path) => {
                      phone.webphone.toggleMinimized(
                        phone.webphone.ringSession && phone.webphone.ringSession.id
                      );
                      phone.routerInteraction.push(path);
                    }}
                    useContact
                  />
                </IncomingCallPage>
              </AppView>
            )} >
            <Route
              path="/"
              component={() => (
                <WelcomePage
                  version={phone.version} >
                  <AlertContainer
                    callingSettingsUrl="/settings/calling"
                    regionSettingsUrl="/settings/region"
                  />
                </WelcomePage>
              )}
            />
            <Route
              path="/"
              component={props => (
                <MainView>
                  {props.children}
                  <AlertContainer
                    callingSettingsUrl="/settings/calling"
                    regionSettingsUrl="/settings/region"
                  />
                </MainView>
              )} >
              <Route
                path="dialer"
                component={() => (
                  <DialerPage />
                )} />
              <Route
                path="/settings"
                component={routerProps => (
                  <SettingsPage
                    params={routerProps.location.query}
                  />
                )}
              />
              <Route
                path="/settings/region"
                component={RegionSettingsPage} />
              <Route
                path="/settings/calling"
                component={CallingSettingsPage} />
              <Route
                path="/settings/audio"
                component={AudioSettingsPage} />
              <Route
                path="/calls"
                component={() => (
                  <ActiveCallsPage
                    onLogCall={async () => { await sleep(1000); }}
                    onCreateContact={() => { }}
                    onCallsEmpty={() => {}}
                    sourceIcons={sourceIcons}
                  />
                )} />
              <Route
                path="/calls/active"
                component={() => (
                  <CallCtrlPage
                    showContactDisplayPlaceholder={false}
                    sourceIcons={sourceIcons}
                    onAdd={() => {
                      phone.routerInteraction.push('/dialer');
                    }}
                    onBackButtonClick={() => {
                      phone.routerInteraction.push('/calls');
                    }}
                    getAvatarUrl={
                      async (contact) => {
                        const avatarUrl = await phone.contacts.getProfileImage(contact, false);
                        return avatarUrl;
                      }
                    }
                  >
                    <RecentActivityContainer
                      getSession={() => (phone.webphone.activeSession || {})}
                      navigateTo={(path) => {
                        phone.routerInteraction.push(path);
                      }}
                    />
                  </CallCtrlPage>
                )} />
              <Route
                path="/history"
                component={() => (
                  <CallHistoryPage
                    showContactDisplayPlaceholder={false}
                    onLogCall={async () => { await sleep(1000); }}
                    onCreateContact={() => { }}
                  />
                )} />
              <Route
                path="/conference"
                component={ConferencePage} />
              <Route
                path="/composeText"
                component={ComposeTextPage} />
              <Route
                path="/conversations/:conversationId"
                component={props => (
                  <ConversationPage
                    params={props.params}
                    onLogConversation={async () => { sleep(1000); }}
                    showContactDisplayPlaceholder={false}
                    sourceIcons={sourceIcons}
                  />
                )} />
              <Route
                path="/messages"
                component={() => (
                  <MessagesPage
                    showContactDisplayPlaceholder={false}
                    onLogConversation={async () => { await sleep(1000); }}
                    onCreateContact={() => { }}
                    sourceIcons={sourceIcons}
                  />
                )} />
              <Route
                path="/contacts"
                component={() => (
                  <ContactsPage
                    contactSourceFilterRenderer={props => (
                      <ContactSourceFilter {...props} />
                    )}
                  />
                )} />
              <Route
                path="/contacts/:contactType/:contactId"
                component={props => (
                  <ContactDetailsPage
                    params={props.params}
                  />
                )} />
              <Route
                path="/meeting"
                component={MeetingPage}
              />
            </Route>
          </Route>
        </Router>
      </Provider>
    </PhoneProvider>
  );
}

App.propTypes = {
  phone: PropTypes.object.isRequired,
  icon: PropTypes.func
};

App.defaultProps = {
  icon: undefined
};

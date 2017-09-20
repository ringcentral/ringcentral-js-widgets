import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import sleep from 'ringcentral-integration/lib/sleep';

import AlertContainer from '../../../src/containers/AlertContainer';
import WelcomePage from '../../../src/containers/WelcomePage';
import CallingSettingsPage from '../../../src/containers/CallingSettingsPage';
import RegionSettingsPage from '../../../src/containers/RegionSettingsPage';
import DialerPage from '../../../src/containers/DialerPage';
import ComposeTextPage from '../../../src/containers/ComposeTextPage';
import ConversationPage from '../../../src/containers/ConversationPage';
import ConferencePage from '../../../src/containers/ConferencePage';
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
import MainView from '../MainView';
import AppView from '../AppView';

export default function App({
  phone,
}) {
  return (
    <Provider store={phone.store} >
      <Router history={phone.router.history} >
        <Route
          component={routerProps => (
            <AppView
              auth={phone.auth}
              alert={phone.alert}
              locale={phone.locale}
              environment={phone.environment}
              brand={phone.brand}
              rateLimiter={phone.rateLimiter}
              connectivityMonitor={phone.connectivityMonitor}
              callingSettings={phone.callingSettings}>
              {routerProps.children}
              <CallBadgeContainer
                locale={phone.locale}
                webphone={phone.webphone}
                hidden={routerProps.location.pathname === '/calls/active'}
                goToCallCtrl={() => {
                  phone.router.push('/calls/active');
                }}
              />
              <IncomingCallPage
                locale={phone.locale}
                brand={phone.brand}
                webphone={phone.webphone}
                forwardingNumber={phone.forwardingNumber}
                regionSettings={phone.regionSettings}
                router={phone.router}
                contactMatcher={phone.contactMatcher}
                showContactDisplayPlaceholder={false}
                getAvatarUrl={
                  async (contact) => {
                    const avatarUrl = await phone.contacts.getImageProfile(contact);
                    return avatarUrl;
                  }
                }
              >
                <AlertContainer
                  locale={phone.locale}
                  alert={phone.alert}
                  rateLimiter={phone.rateLimiter}
                  brand={phone.brand}
                  router={phone.router}
                  callingSettingsUrl="/settings/calling"
                  regionSettingsUrl="/settings/region"
                />
                <RecentActivityContainer
                  locale={phone.locale}
                  dateTimeFormat={phone.dateTimeFormat}
                  contactMatcher={phone.contactMatcher}
                  recentMessages={phone.recentMessages}
                  recentCalls={phone.recentCalls}
                  getSession={() => (phone.webphone.ringSession || {})}
                  navigateTo={(path) => {
                    phone.webphone.toggleMinimized(
                      phone.webphone.ringSession && phone.webphone.ringSession.id
                    );
                    phone.router.push(path);
                  }}
                />
              </IncomingCallPage>
            </AppView>
          )} >
          <Route
            path="/"
            component={() => (
              <WelcomePage
                auth={phone.auth}
                locale={phone.locale}
                rateLimiter={phone.rateLimiter}
                connectivityMonitor={phone.connectivityMonitor}
                version={phone.version} >
                <AlertContainer
                  locale={phone.locale}
                  alert={phone.alert}
                  rateLimiter={phone.rateLimiter}
                  brand={phone.brand}
                  router={phone.router}
                  callingSettingsUrl="/settings/calling"
                  regionSettingsUrl="/settings/region"
                />
              </WelcomePage>
            )}
          />
          <Route
            path="/"
            component={props => (
              <MainView
                router={phone.router}
                messageStore={phone.messageStore}
                auth={phone.auth}
                rolesAndPermissions={phone.rolesAndPermissions} >
                {props.children}
                <AlertContainer
                  locale={phone.locale}
                  alert={phone.alert}
                  rateLimiter={phone.rateLimiter}
                  brand={phone.brand}
                  router={phone.router}
                  callingSettingsUrl="/settings/calling"
                  regionSettingsUrl="/settings/region"
                />
              </MainView>
            )} >
            <Route
              path="dialer"
              component={() => (
                <DialerPage
                  call={phone.call}
                  callingSettings={phone.callingSettings}
                  connectivityMonitor={phone.connectivityMonitor}
                  locale={phone.locale}
                  rateLimiter={phone.rateLimiter}
                  regionSettings={phone.regionSettings}
                  webphone={phone.webphone}
                />
              )} />
            <Route
              path="/settings"
              component={routerProps => (
                <SettingsPage
                  params={routerProps.location.query}
                  auth={phone.auth}
                  extensionInfo={phone.extensionInfo}
                  accountInfo={phone.accountInfo}
                  regionSettings={phone.regionSettings}
                  version={phone.version}
                  locale={phone.locale}
                  brand={phone.brand}
                  router={phone.router}
                  rolesAndPermissions={phone.rolesAndPermissions}
                  callingSettings={phone.callingSettings}
                  presence={phone.presence}
                  regionSettingsUrl="/settings/region"
                  callingSettingsUrl="/settings/calling"
                />
              )}
            />
            <Route
              path="/settings/region"
              component={() => (
                <RegionSettingsPage
                  regionSettings={phone.regionSettings}
                  locale={phone.locale}
                  router={phone.router}
                />
              )} />
            <Route
              path="/settings/calling"
              component={() => (
                <CallingSettingsPage
                  brand={phone.brand}
                  callingSettings={phone.callingSettings}
                  locale={phone.locale}
                  router={phone.router}
                  webphone={phone.webphone}
                />
              )} />
            <Route
              path="/calls"
              component={() => (
                <ActiveCallsPage
                  locale={phone.locale}
                  callMonitor={phone.callMonitor}
                  contactMatcher={phone.contactMatcher}
                  contactSearch={phone.contactSearch}
                  regionSettings={phone.regionSettings}
                  connectivityMonitor={phone.connectivityMonitor}
                  rateLimiter={phone.rateLimiter}
                  onLogCall={async () => { await sleep(1000); }}
                  onViewContact={() => { }}
                  onCreateContact={() => { }}
                  router={phone.router}
                  composeText={phone.composeText}
                  rolesAndPermissions={phone.rolesAndPermissions}
                  webphone={phone.webphone}
                  brand={phone.brand}
                  onCallsEmpty={() => {
                    if (phone.webphone && phone.webphone._webphone) {
                      phone.router.push('/dialer');
                    }
                  }}
                />
              )} />
            <Route
              path="/calls/active"
              component={() => (
                <CallCtrlPage
                  brand={phone.brand}
                  locale={phone.locale}
                  contactMatcher={phone.contactMatcher}
                  webphone={phone.webphone}
                  regionSettings={phone.regionSettings}
                  forwardingNumber={phone.forwardingNumber}
                  showContactDisplayPlaceholder={false}
                  onAdd={() => {
                    phone.router.push('/dialer');
                  }}
                  onBackButtonClick={() => {
                    phone.router.push('/calls');
                  }}
                  getAvatarUrl={
                    async (contact) => {
                      const avatarUrl = await phone.contacts.getImageProfile(contact);
                      return avatarUrl;
                    }
                  }
                >
                  <RecentActivityContainer
                    locale={phone.locale}
                    dateTimeFormat={phone.dateTimeFormat}
                    contactMatcher={phone.contactMatcher}
                    recentMessages={phone.recentMessages}
                    recentCalls={phone.recentCalls}
                    getSession={() => (phone.webphone.activeSession || {})}
                    navigateTo={(path) => {
                      phone.router.push(path);
                    }}
                  />
                </CallCtrlPage>
              )} />
            <Route
              path="/history"
              component={() => (
                <CallHistoryPage
                  brand={phone.brand}
                  locale={phone.locale}
                  callHistory={phone.callHistory}
                  contactMatcher={phone.contactMatcher}
                  contactSearch={phone.contactSearch}
                  regionSettings={phone.regionSettings}
                  connectivityMonitor={phone.connectivityMonitor}
                  rateLimiter={phone.rateLimiter}
                  dateTimeFormat={phone.dateTimeFormat}
                  call={phone.call}
                  composeText={phone.composeText}
                  rolesAndPermissions={phone.rolesAndPermissions}
                  router={phone.router}
                  showContactDisplayPlaceholder={false}
                  onLogCall={async () => { await sleep(1000); }}
                  onViewContact={() => { }}
                  onCreateContact={() => { }}
                />
              )} />
            <Route
              path="/conference"
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
              component={() => (
                <ComposeTextPage
                  locale={phone.locale}
                  auth={phone.auth}
                  composeText={phone.composeText}
                  messageStore={phone.messageStore}
                  router={phone.router}
                  regionSettings={phone.regionSettings}
                  contactSearch={phone.contactSearch}
                  rolesAndPermissions={phone.rolesAndPermissions}
                  messageSender={phone.messageSender}
                  connectivityMonitor={phone.connectivityMonitor}
                  rateLimiter={phone.rateLimiter}
                />
              )} />
            <Route
              path="/conversations/:conversationId"
              component={props => (
                <ConversationPage
                  brand={phone.brand}
                  locale={phone.locale}
                  auth={phone.auth}
                  params={props.params}
                  regionSettings={phone.regionSettings}
                  conversation={phone.conversation}
                  messageStore={phone.messageStore}
                  dateTimeFormat={phone.dateTimeFormat}
                  contactMatcher={phone.contactMatcher}
                  messages={phone.messages}
                  conversationLogger={phone.conversationLogger}
                  rateLimiter={phone.rateLimiter}
                  connectivityMonitor={phone.connectivityMonitor}
                  onLogConversation={async () => { sleep(1000); }}
                  showContactDisplayPlaceholder={false}
                  router={phone.router}
                />
              )} />
            <Route
              path="/messages"
              component={() => (
                <MessagesPage
                  brand={phone.brand}
                  locale={phone.locale}
                  router={phone.router}
                  messages={phone.messages}
                  regionSettings={phone.regionSettings}
                  dateTimeFormat={phone.dateTimeFormat}
                  connectivityMonitor={phone.connectivityMonitor}
                  rateLimiter={phone.rateLimiter}
                  call={phone.call}
                  conversationLogger={phone.conversationLogger}
                  rolesAndPermissions={phone.rolesAndPermissions}
                  showContactDisplayPlaceholder={false}
                  onLogConversation={async () => { await sleep(1000); }}
                  onViewContact={() => { }}
                  onCreateContact={() => { }}
                />
              )} />
            <Route
              path="/contacts"
              component={() => (
                <ContactsPage
                  locale={phone.locale}
                  router={phone.router}
                  contacts={phone.contacts}
                  contactSearch={phone.contactSearch}
                />
              )} />
            <Route
              path="/contacts/:contactType/:contactId"
              component={props => (
                <ContactDetailsPage
                  params={props.params}
                  locale={phone.locale}
                  router={phone.router}
                  contacts={phone.contacts}
                />
              )} />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  phone: PropTypes.object.isRequired,
};

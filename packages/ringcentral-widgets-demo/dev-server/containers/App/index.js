import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import sleep from 'ringcentral-integration/lib/sleep';

import AlertContainer from 'ringcentral-widgets/containers/AlertContainer';
import WelcomePage from 'ringcentral-widgets/containers/WelcomePage';
import CallingSettingsPage from 'ringcentral-widgets/containers/CallingSettingsPage';
import RegionSettingsPage from 'ringcentral-widgets/containers/RegionSettingsPage';
import AudioSettingsPage from 'ringcentral-widgets/containers/AudioSettingsPage';
import DialerPage from 'ringcentral-widgets/containers/DialerPage';
import ComposeTextPage from 'ringcentral-widgets/containers/ComposeTextPage';
import ConversationPage from 'ringcentral-widgets/containers/ConversationPage';
import ConferencePage from 'ringcentral-widgets/containers/ConferencePage';
import ConferenceCommands from 'ringcentral-widgets/components/ConferenceCommands';
import MeetingPage from 'ringcentral-widgets/containers/MeetingPage';
import ConversationsPage from 'ringcentral-widgets/containers/ConversationsPage';
import SettingsPage from 'ringcentral-widgets/containers/SettingsPage';
import ActiveCallsPage from 'ringcentral-widgets/containers/ActiveCallsPage';
import CallHistoryPage from 'ringcentral-widgets/containers/CallHistoryPage';
import IncomingCallPage from 'ringcentral-widgets/containers/IncomingCallPage';
import CallCtrlPage from 'ringcentral-widgets/containers/CallCtrlPage';
import CallBadgeContainer from 'ringcentral-widgets/containers/CallBadgeContainer';
import RecentActivityContainer from 'ringcentral-widgets/containers/RecentActivityContainer';
import ContactsPage from 'ringcentral-widgets/containers/ContactsPage';
import ContactDetailsPage from 'ringcentral-widgets/containers/ContactDetailsPage';
import FeedbackPage from 'ringcentral-widgets/containers/FeedbackPage';
import UserGuidePage from 'ringcentral-widgets/containers/UserGuidePage';
import ConferenceCallDialerPage from 'ringcentral-widgets/containers/ConferenceCallDialerPage';
import ConferenceCallMergeCtrlPage from 'ringcentral-widgets/containers/ConferenceCallMergeCtrlPage';
import CallsOnholdPage from 'ringcentral-widgets/containers/CallsOnholdPage';
import DialerAndCallsTabContainer from 'ringcentral-widgets/containers/DialerAndCallsTabContainer';
import ConferenceParticipantPage from 'ringcentral-widgets/containers/ConferenceParticipantPage';

import ContactSourceFilter from 'ringcentral-widgets/components/ContactSourceFilter';
import MeetingScheduleButton from 'ringcentral-widgets/components/MeetingScheduleButton';
import PhoneProvider from 'ringcentral-widgets/lib/PhoneProvider';

import MainView from '../MainView';
import AppView from '../AppView';

export default function App({
  phone,
  icon
}) {
  const sourceIcons = {
    brandIcon: icon
  };
  const getAvatarUrl = async (contact) => {
    const avatarUrl = await phone.contacts.getProfileImage(contact, false);
    return avatarUrl;
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
                  defaultOffsetX={0}
                  defaultOffsetY={73}
                  hidden={(
                    routerProps.location.pathname === '/calls/active' ||
                    routerProps.location.pathname === '/conferenceCall/mergeCtrl' ||
                    routerProps.location.pathname.indexOf('/conferenceCall/callsOnhold') === 0 ||
                    routerProps.location.pathname.indexOf('/conferenceCall/dialer') === 0 ||
                    routerProps.location.pathname === '/conferenceCall/participants'
                  )}
                  goToCallCtrl={() => {
                    phone.routerInteraction.push('/calls/active');
                  }}
                />
                <IncomingCallPage
                  showContactDisplayPlaceholder={false}
                  sourceIcons={sourceIcons}
                  getAvatarUrl={getAvatarUrl}
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
                <UserGuidePage />
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
                path="/dialer"
                component={() => (
                  <DialerAndCallsTabContainer>
                    <DialerPage />
                  </DialerAndCallsTabContainer>
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
                path="/settings/feedback"
                component={FeedbackPage} />
              <Route
                path="/calls"
                component={() => (
                  <DialerAndCallsTabContainer>
                    <ActiveCallsPage
                      onLogCall={async () => { await sleep(1000); }}
                      onCreateContact={() => { }}
                      onCallsEmpty={() => { }}
                      sourceIcons={sourceIcons}
                    />
                  </DialerAndCallsTabContainer>
                )} />
              <Route
                path="/calls/active"
                component={() => (
                  <CallCtrlPage
                    showContactDisplayPlaceholder={false}
                    sourceIcons={sourceIcons}
                    getAvatarUrl={getAvatarUrl}
                    onAdd={() => {
                      phone.routerInteraction.push('/dialer');
                    }}
                    onBackButtonClick={() => {
                      phone.routerInteraction.push('/calls');
                    }}
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
                path="/conference/commands"
                component={() => (
                  <ConferenceCommands
                    currentLocale={phone.locale.currentLocale}
                    onBack={() => phone.routerInteraction.goBack()} />
                )} />
              <Route
                path="/composeText"
                component={ComposeTextPage} />
              <Route
                path="/conversations/:conversationId"
                component={routerProps => (
                  <ConversationPage
                    params={routerProps.params}
                    onLogConversation={async () => { sleep(1000); }}
                    showContactDisplayPlaceholder={false}
                    sourceIcons={sourceIcons}
                    showGroupNumberName
                  />
                )} />
              <Route
                path="/messages"
                component={() => (
                  <ConversationsPage
                    showContactDisplayPlaceholder={false}
                    onLogConversation={async () => { await sleep(1000); }}
                    onCreateContact={() => { }}
                    sourceIcons={sourceIcons}
                    showGroupNumberName
                  />
                )} />
              <Route
                path="/contacts"
                component={props =>
                  (!props.location.query.direct
                    ? (
                      <ContactsPage
                        contactSourceFilterRenderer={props => (
                          <ContactSourceFilter {...props} />
                        )}
                      >
                        {props.children}
                      </ContactsPage>
                    ) : props.children)
                }>
                <Route
                  path=":contactType/:contactId"
                  component={routerProps => (
                    <ContactDetailsPage
                      params={routerProps.params}
                    >
                      <RecentActivityContainer
                        navigateTo={(path) => {
                          phone.routerInteraction.push(path);
                        }}
                        contact={phone.contactDetails.contact}
                        useContact
                      />
                    </ContactDetailsPage>
                  )}
                />
              </Route>
              <Route
                path="/meeting"
                component={() => (
                  <MeetingPage scheduleButton={MeetingScheduleButton} />
                )}
              />
              <Route
                path="/conferenceCall/dialer/:fromNumber"
                component={routerProps => (
                  <ConferenceCallDialerPage
                    params={routerProps.params}
                    onBack={() => {
                      phone.routerInteraction.push('/calls/active');
                    }} />
                )} />
              <Route
                path="/conferenceCall/mergeCtrl"
                component={() => (
                  <ConferenceCallMergeCtrlPage
                    showContactDisplayPlaceholder={false}
                    sourceIcons={sourceIcons}
                    getAvatarUrl={getAvatarUrl}
                    onBackButtonClick={() => {
                      phone.routerInteraction.push('/calls');
                    }}
                    onLastCallEnded={() => {
                      phone.routerInteraction.push('/calls/active');
                    }}
                  />
                )} />
              <Route
                path="/conferenceCall/participants"
                component={() => (
                  <ConferenceParticipantPage />
                )} />
              <Route
                path="/conferenceCall/callsOnhold/:fromNumber/:fromSessionId"
                component={routerProps => (
                  <CallsOnholdPage
                    params={routerProps.params}
                    onLogCall={async () => { await sleep(1000); }}
                    onCreateContact={() => { }}
                    onCallsEmpty={() => { }}
                    sourceIcons={sourceIcons}
                    getAvatarUrl={getAvatarUrl}
                  />
                )} />
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

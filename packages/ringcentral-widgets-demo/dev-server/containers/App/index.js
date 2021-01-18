import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import sleep from 'ringcentral-integration/lib/sleep';

import AlertContainer from 'ringcentral-widgets/containers/AlertContainer';
import ConnectivityBadgeContainer from 'ringcentral-widgets/containers/ConnectivityBadgeContainer';
import LoginPage from 'ringcentral-widgets/containers/LoginPage';
import CallingSettingsPage from 'ringcentral-widgets/containers/CallingSettingsPage';
import RegionSettingsPage from 'ringcentral-widgets/containers/RegionSettingsPage';
import AudioSettingsPage from 'ringcentral-widgets/containers/AudioSettingsPage';
import DialerPage from 'ringcentral-widgets/containers/DialerPage';
import ComposeTextPage from 'ringcentral-widgets/containers/ComposeTextPage';
import ConversationPage from 'ringcentral-widgets/containers/ConversationPage';
import ConferencePage from 'ringcentral-widgets/containers/ConferencePage';
import ConferenceCommands from 'ringcentral-widgets/components/ConferenceCommands';
import ConversationsPage from 'ringcentral-widgets/containers/ConversationsPage';
import SettingsPage from 'ringcentral-widgets/containers/SettingsPage';
import ActiveCallsPage from 'ringcentral-widgets/containers/ActiveCallsPage';
import CallsListPage from 'ringcentral-widgets/containers/CallsListPage';
import IncomingCallPage from 'ringcentral-widgets/containers/IncomingCallPage';
import CallCtrlPage from 'ringcentral-widgets/containers/CallCtrlPage';
import CallBadgeContainer from 'ringcentral-widgets/containers/CallBadgeContainer';
import RecentActivityContainer from 'ringcentral-widgets/containers/RecentActivityContainer';
import ContactsPage from 'ringcentral-widgets/containers/ContactsPage';
import ContactDetailsPage from 'ringcentral-widgets/containers/ContactDetailsPage';
import FeedbackPage from 'ringcentral-widgets/containers/FeedbackPage';
import UserGuidePage from 'ringcentral-widgets/containers/UserGuidePage';
import ConferenceCallDialerPage from 'ringcentral-widgets/containers/ConferenceCallDialerPage';
import CallsOnholdPage from 'ringcentral-widgets/containers/CallsOnholdPage';
import DialerAndCallsTabContainer from 'ringcentral-widgets/containers/DialerAndCallsTabContainer';
import ConferenceParticipantPage from 'ringcentral-widgets/containers/ConferenceParticipantPage';
import TransferPage from 'ringcentral-widgets/containers/TransferPage';
import FlipPage from 'ringcentral-widgets/containers/FlipPage';
import SimpleActiveCallCtrlPage from 'ringcentral-widgets/containers/SimpleActiveCallCtrlPage';
import MeetingPage from 'ringcentral-widgets/containers/MeetingPage';

import ContactSourceFilter from 'ringcentral-widgets/components/ContactSourceFilter';
import MeetingScheduleButton from 'ringcentral-widgets/components/MeetingScheduleButton';
import { PhoneProvider } from 'ringcentral-widgets/lib/phoneContext';

import MainView from '../MainView';
import AppView from '../AppView';

const App = ({ phone, icon }) => {
  const sourceIcons = {
    brandIcon: icon,
  };
  const getAvatarUrl = async (contact) => {
    const avatarUrl = await phone.contacts.getProfileImage(contact, true);
    return avatarUrl;
  };
  return (
    <PhoneProvider phone={phone}>
      <Provider store={phone.store}>
        <Router history={phone.routerInteraction.history}>
          <Route
            component={(routerProps) => (
              <AppView>
                {routerProps.children}
                <CallBadgeContainer
                  defaultOffsetX={0}
                  defaultOffsetY={73}
                  hidden={
                    routerProps.location.pathname.indexOf('/calls/active') ===
                      0 ||
                    routerProps.location.pathname.indexOf(
                      '/conferenceCall/dialer',
                    ) === 0 ||
                    routerProps.location.pathname.indexOf(
                      '/conferenceCall/callsOnhold',
                    ) === 0 ||
                    routerProps.location.pathname.indexOf(
                      '/conferenceCall/participants',
                    ) === 0
                  }
                  goToCallCtrl={(sessionId) => {
                    phone.routerInteraction.push(`/calls/active/${sessionId}`);
                  }}
                />
                <IncomingCallPage
                  showContactDisplayPlaceholder={false}
                  sourceIcons={sourceIcons}
                  getAvatarUrl={getAvatarUrl}
                  showCallQueueName
                >
                  <AlertContainer />
                  <RecentActivityContainer
                    getSession={() => phone.webphone.ringSession || {}}
                    navigateTo={(path) => {
                      phone.webphone.toggleMinimized(
                        phone.webphone.ringSession &&
                          phone.webphone.ringSession.id,
                      );
                      phone.routerInteraction.push(path);
                    }}
                    useContact
                  />
                </IncomingCallPage>
                <UserGuidePage />
                <ConnectivityBadgeContainer />
              </AppView>
            )}
          >
            <Route
              path="/"
              component={() => (
                <LoginPage version={phone.version}>
                  <AlertContainer />
                </LoginPage>
              )}
            />
            <Route
              path="/"
              component={(props) => (
                <MainView>
                  {props.children}
                  <AlertContainer />
                </MainView>
              )}
            >
              <Route
                path="/dialer"
                component={() => (
                  <DialerAndCallsTabContainer>
                    {({ showTabs }) => <DialerPage withTabs={showTabs} />}
                  </DialerAndCallsTabContainer>
                )}
              />
              <Route
                path="/settings"
                component={(routerProps) => (
                  <SettingsPage
                    params={routerProps.location.query}
                    showQuickAccess
                  />
                )}
              />
              <Route path="/settings/region" component={RegionSettingsPage} />
              <Route path="/settings/calling" component={CallingSettingsPage} />
              <Route path="/settings/audio" component={AudioSettingsPage} />
              <Route path="/settings/feedback" component={FeedbackPage} />
              <Route
                path="/calls"
                component={() => (
                  <DialerAndCallsTabContainer>
                    <ActiveCallsPage
                      showRingoutCallControl
                      onLogCall={async () => {
                        await sleep(1000);
                      }}
                      onCreateContact={() => {}}
                      onCallsEmpty={() => {}}
                      sourceIcons={sourceIcons}
                      getAvatarUrl={getAvatarUrl}
                      useV2
                      showSwitchCall
                    />
                  </DialerAndCallsTabContainer>
                )}
              />
              <Route
                path="/calls/active(/:sessionId)"
                component={(routerProps) => (
                  <CallCtrlPage
                    showContactDisplayPlaceholder={false}
                    sourceIcons={sourceIcons}
                    getAvatarUrl={getAvatarUrl}
                    params={routerProps.params}
                    onBackButtonClick={() => {
                      phone.routerInteraction.push('/calls');
                    }}
                    showCallQueueName
                    showPark
                  >
                    <RecentActivityContainer
                      getSession={() => phone.webphone.activeSession || {}}
                      navigateTo={(path) => {
                        phone.routerInteraction.push(path);
                      }}
                    />
                  </CallCtrlPage>
                )}
              />
              <Route
                path="/transfer/:sessionId(/:type)"
                component={(routerProps) => (
                  <TransferPage params={routerProps.params} />
                )}
              />
              <Route
                path="/flip/:sessionId"
                component={(routerProps) => (
                  <FlipPage params={routerProps.params} />
                )}
              />
              <Route
                path="/simplifycallctrl/:sessionId"
                component={(routerProps) => (
                  <SimpleActiveCallCtrlPage params={routerProps.params} />
                )}
              />
              <Route
                path="/history"
                component={() => (
                  <CallsListPage
                    showContactDisplayPlaceholder={false}
                    onLogCall={async () => {
                      await sleep(1000);
                    }}
                    onCreateContact={() => {}}
                  />
                )}
              />
              <Route
                path="/conference"
                component={() => <ConferencePage enableAutoEnterHostKey />}
              />
              <Route
                path="/conference/commands"
                component={() => (
                  <ConferenceCommands
                    currentLocale={phone.locale.currentLocale}
                    onBack={() => phone.routerInteraction.goBack()}
                  />
                )}
              />
              <Route
                path="/composeText"
                component={() => <ComposeTextPage supportAttachment />}
              />
              <Route
                path="/conversations/:conversationId"
                component={(routerProps) => (
                  <ConversationPage
                    params={routerProps.params}
                    onLogConversation={async () => {
                      sleep(1000);
                    }}
                    showContactDisplayPlaceholder={false}
                    sourceIcons={sourceIcons}
                    showGroupNumberName
                    supportAttachment
                  />
                )}
              />
              <Route
                path="/messages"
                component={() => (
                  <ConversationsPage
                    showContactDisplayPlaceholder={false}
                    onLogConversation={async () => {
                      await sleep(1000);
                    }}
                    onCreateContact={() => {}}
                    sourceIcons={sourceIcons}
                    showGroupNumberName
                  />
                )}
              />
              <Route
                path="/contacts"
                component={(props) =>
                  !props.location.query.direct ? (
                    <ContactsPage
                      contactSourceFilterRenderer={(props) => (
                        <ContactSourceFilter {...props} />
                      )}
                    >
                      {props.children}
                    </ContactsPage>
                  ) : (
                    props.children
                  )
                }
              >
                <Route
                  path=":contactType/:contactId"
                  component={(routerProps) => (
                    <ContactDetailsPage params={routerProps.params}>
                      <RecentActivityContainer
                        navigateTo={(path) => {
                          phone.routerInteraction.push(path);
                        }}
                        contact={phone.contactDetailsUI.currentContact}
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
                path="/conferenceCall/dialer/:fromNumber/:fromSessionId"
                component={ConferenceCallDialerPage}
              />
              <Route
                path="/conferenceCall/participants"
                component={() => <ConferenceParticipantPage />}
              />
              <Route
                path="/conferenceCall/callsOnhold/:fromNumber/:fromSessionId"
                component={(routerProps) => (
                  <CallsOnholdPage
                    params={routerProps.params}
                    onLogCall={async () => {
                      await sleep(1000);
                    }}
                    onCreateContact={() => {}}
                    onCallsEmpty={() => {}}
                    sourceIcons={sourceIcons}
                    getAvatarUrl={getAvatarUrl}
                  />
                )}
              />
            </Route>
          </Route>
        </Router>
      </Provider>
    </PhoneProvider>
  );
};

App.propTypes = {
  phone: PropTypes.object.isRequired,
  icon: PropTypes.func,
};

App.defaultProps = {
  icon: undefined,
};

export default App;

import { sleep } from '@ringcentral-integration/commons/utils';
import { ContactSourceFilter } from '@ringcentral-integration/widgets/components/ContactSourceFilter';
import MeetingScheduleButton from '@ringcentral-integration/widgets/components/MeetingScheduleButton';
import ActiveCallsPage from '@ringcentral-integration/widgets/containers/ActiveCallsPage';
import AlertContainer from '@ringcentral-integration/widgets/containers/AlertContainer';
import AudioSettingsPage from '@ringcentral-integration/widgets/containers/AudioSettingsPage';
import CallBadgeContainer from '@ringcentral-integration/widgets/containers/CallBadgeContainer';
import CallCtrlPage from '@ringcentral-integration/widgets/containers/CallCtrlPage';
import CallingSettingsPage from '@ringcentral-integration/widgets/containers/CallingSettingsPage';
import CallsListPage from '@ringcentral-integration/widgets/containers/CallsListPage';
import { CallsOnholdPage } from '@ringcentral-integration/widgets/containers/CallsOnholdPage';
import ComposeTextPage from '@ringcentral-integration/widgets/containers/ComposeTextPage';
import ConferenceCallDialerPage from '@ringcentral-integration/widgets/containers/ConferenceCallDialerPage';
import { ConferenceParticipantPage } from '@ringcentral-integration/widgets/containers/ConferenceParticipantPage';
import { ConnectivityBadgeContainer } from '@ringcentral-integration/widgets/containers/ConnectivityBadgeContainer';
import ContactDetailsPage from '@ringcentral-integration/widgets/containers/ContactDetailsPage';
import ContactsPage from '@ringcentral-integration/widgets/containers/ContactsPage';
import { ConversationPage } from '@ringcentral-integration/widgets/containers/ConversationPage';
import ConversationsPage from '@ringcentral-integration/widgets/containers/ConversationsPage';
import { DialerAndCallsTabContainer } from '@ringcentral-integration/widgets/containers/DialerAndCallsTabContainer';
import DialerPage from '@ringcentral-integration/widgets/containers/DialerPage';
import { FeedbackPage } from '@ringcentral-integration/widgets/containers/FeedbackPage';
import FlipPage from '@ringcentral-integration/widgets/containers/FlipPage';
import { IncomingCallContainer } from '@ringcentral-integration/widgets/containers/IncomingCallContainer';
import { LoginPage } from '@ringcentral-integration/widgets/containers/LoginPage';
import GenericMeetingPage from '@ringcentral-integration/widgets/containers/GenericMeetingPage';
import { ModalContainer } from '@ringcentral-integration/widgets/containers/ModalContainer';
import { RecentActivityContainer } from '@ringcentral-integration/widgets/containers/RecentActivityContainer';
import { RegionSettingsPage } from '@ringcentral-integration/widgets/containers/RegionSettingsPage';
import SettingsPage from '@ringcentral-integration/widgets/containers/SettingsPage';
import { SimpleCallControlPage } from '@ringcentral-integration/widgets/containers/SimpleCallControlPage';
import TransferPage from '@ringcentral-integration/widgets/containers/TransferPage';
import { UserGuidePage } from '@ringcentral-integration/widgets/containers/UserGuidePage';
import { PhoneProvider } from '@ringcentral-integration/widgets/lib/phoneContext';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import AppView from '../AppView';
import MainView from '../MainView';

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
                <ModalContainer />
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
                <IncomingCallContainer
                  showContactDisplayPlaceholder={false}
                  sourceIcons={sourceIcons}
                  getAvatarUrl={getAvatarUrl}
                  showCallQueueName
                >
                  <AlertContainer />
                  <RecentActivityContainer
                    entry="Incoming Call"
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
                </IncomingCallContainer>
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
                      entry="Call Control"
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
                  <TransferPage
                    params={routerProps.params}
                    enableWarmTransfer
                  />
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
                  <SimpleCallControlPage params={routerProps.params} />
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
                        entry="Contact Details"
                        navigateTo={(path) => {
                          phone.routerInteraction.push(path);
                        }}
                        getContact={() => phone.contactDetailsUI.currentContact}
                        useContact
                      />
                    </ContactDetailsPage>
                  )}
                />
              </Route>
              <Route
                path="/meeting"
                component={() => (
                  <GenericMeetingPage scheduleButton={MeetingScheduleButton} />
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

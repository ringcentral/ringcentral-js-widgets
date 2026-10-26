import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import {
  Auth,
  OAuth,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ConnectivityBadgeView,
  EnvironmentView,
  LoginView,
} from '@ringcentral-integration/micro-auth/src/app/views';
import { Contacts } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  ContactDetailsView,
  ContactListView,
} from '@ringcentral-integration/micro-contacts/src/app/views';
import {
  AppRootView,
  HeaderNavView,
  HeaderView,
} from '@ringcentral-integration/micro-core/src/app/views';
import { GenericMeetingView } from '@ringcentral-integration/micro-meeting/src/app/views';
import {
  ComposeTextView,
  ConversationsView,
  ConversationView,
} from '@ringcentral-integration/micro-message/src/app/views';
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  ActiveCallsView,
  CallBadgeView,
  CallControlView,
  CallHistoryView,
  CallsListView,
  DialerAndCallsTabView,
  DialerView,
  FlipView,
  IncomingCallView,
  RecentActivityView,
  SimpleCallControlView,
  TransferView,
} from '@ringcentral-integration/micro-phone/src/app/views';
import {
  AudioSettingsView,
  CallingSettingsView,
  IssuesTrackingView,
  RegionSettingsView,
  SettingsView,
  UserGuideView,
} from '@ringcentral-integration/micro-setting/src/app/views';
import {
  injectable,
  PortManager,
  RcViewModule,
  Route,
  RouterPlugin,
  Switch,
  type Transport,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';
import { ContactSourceFilter } from '@ringcentral-integration/widgets/components/ContactSourceFilter';
import React from 'react';

@injectable({
  name: 'AppView',
})
export class AppView extends RcViewModule {
  constructor(
    private _appRootView: AppRootView,
    private _oAuth: OAuth,
    private _portManager: PortManager,
    private _router: RouterPlugin,
    private _genericMeetingView: GenericMeetingView,
    private _auth: Auth,
    private _callBadgeView: CallBadgeView,
    private _dialerView: DialerView,
    private _callsListView: CallsListView,
    private _userGuideView: UserGuideView,
    private _connectivityBadgeView: ConnectivityBadgeView,
    private _callHistoryView: CallHistoryView,
    private _conversationsView: ConversationsView,
    private _conversationView: ConversationView,
    private _contactListView: ContactListView,
    private _contactDetailsView: ContactDetailsView,
    private _dialerAndCallsTabView: DialerAndCallsTabView,
    private _callControlView: CallControlView,
    private _settingsView: SettingsView,
    private _callingSettingsView: CallingSettingsView,
    private _regionSettingsView: RegionSettingsView,
    private _audioSettingsView: AudioSettingsView,
    private _transferView: TransferView,
    private _flipView: FlipView,
    private _simpleCallControlView: SimpleCallControlView,
    private _incomingCallView: IncomingCallView,
    private _environmentView: EnvironmentView,
    private _composeTextView: ComposeTextView,
    private _recentActivityView: RecentActivityView,
    private _activeCallsView: ActiveCallsView,
    private _loginView: LoginView,
    private _webphone: Webphone,
    private _contacts: Contacts,
    private _headerView: HeaderView,
    private _headerNavView: HeaderNavView,
    private _issuesTrackingView: IssuesTrackingView,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onMainTab(() => this.initializeOnMainTab());
      this._portManager.onServer((transport) => {
        (
          transport as Transport<{
            listen: {
              initClient: (exampleArg: string) => string;
            };
          }>
        ).listen('initClient', (exampleArg) => {
          // handle some logic here
          return `${exampleArg} from server`;
        });
      });
      this._portManager.onClient((transport) => {
        (
          transport as Transport<{
            emit: {
              initClient: (exampleArg: string) => string;
            };
          }>
        )
          .emit('initClient', 'test')
          .then((data) => {
            // handle some logic here
            console.log('response data from server', data);
          });
      });
    } else {
      this.initializeOnMainTab();
    }
  }

  protected initializeOnMainTab() {
    // TODO: those should move to an module, like callControl modules
    // Webphone configuration
    this._webphone.onCallEnd((session, currentSession, ringSession) => {
      const callsOnholdReg = /^\/conferenceCall\/callsOnhold\/(.+)\/(.+)$/;
      const execCallsOnhold = callsOnholdReg.exec(this._router.currentPath);

      if (execCallsOnhold) {
        const fromSessionIdOfCallsOnhold = execCallsOnhold[2];
        if (!currentSession || session.id === currentSession.id) {
          this._router.go(-2);
          return;
        }
        if (session.id === fromSessionIdOfCallsOnhold) {
          this._router.replace('/calls/active');
          return;
        }
      }

      const withinCallCtrl = !![
        '/calls/active',
        '/conferenceCall/dialer/',
        '/conferenceCall/callsOnhold',
        '/conferenceCall/participants',
      ].find((path) => this._router.currentPath.indexOf(path) === 0);

      if (
        withinCallCtrl &&
        (!currentSession || session.id === currentSession.id) &&
        !ringSession
      ) {
        if (!currentSession) {
          this._router.replace('/dialer');
          return;
        }
        if (this._router.currentPath.indexOf('/calls/active') === -1) {
          this._router.replace('/calls/active');
          return;
        }
        // if (conferenceCall.isMerging) {
        //   // Do nothing, let the merge() to do the jump
        //   return;
        // }
        this._router.goBack();
        return;
      }

      if (
        currentSession &&
        currentSession.id !== session.id &&
        this._router.currentPath === `/calls/active/${session.id}`
      ) {
        this._router.replace(`/calls/active/${currentSession.id}`);
        return;
      }

      if (!currentSession && ringSession) {
        this._router.push('/calls');
      }
    });

    const toActivePage = (session: NormalizedSession) => {
      const path = `/calls/active/${session.id}`;
      if (this._router.currentPath !== path) {
        if (this._router.currentPath.indexOf('/calls/active') === 0) {
          this._router.replace(path);
        } else {
          this._router.push(path);
        }
      }
    };

    this._webphone.onCallInit(toActivePage);

    this._webphone.onCallStart((session) => {
      if (session.direction === callDirection.outbound) {
        return;
      }
      toActivePage(session);
    });

    this._webphone.onCallRing(() => {
      if (this._webphone.ringSessions.length > 1) {
        if (this._router.currentPath !== '/calls') {
          this._router.push('/calls');
        }
        this._webphone.ringSessions.forEach((session) => {
          if (!session.minimized) {
            this._webphone.toggleMinimized(session.id);
          }
        });
      }
    });

    this._webphone.onBeforeCallResume((session) => {
      const sessionId = session && session.id;
      // const mergingPair = conferenceCall && conferenceCall.mergingPair;
      // if (mergingPair && sessionId !== mergingPair.toSessionId) {
      //   // close merging pair to close the merge call.
      //   conferenceCall.closeMergingPair();
      // }
    });

    this._webphone.onBeforeCallEnd((session) => {
      // const mergingPair = conferenceCall && conferenceCall.mergingPair;
      // if (
      //   session &&
      //   mergingPair &&
      //   Object.values(mergingPair).indexOf(session.id) !== -1
      // ) {
      //   // close merging pair to close the merge call.
      //   conferenceCall.closeMergingPair();
      // }
    });
  }

  protected _openOAuthPage() {
    this._oAuth.openOAuthPage();
  }

  component() {
    const sourceIcons = {
      brandIcon: null,
    };

    const getAvatarUrl = async (contact: IContact) => {
      const avatarUrl = await this._contacts.getProfileImage(contact, true);
      return avatarUrl ?? null;
    };

    return (
      <this._appRootView.component>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              // version={phone.version}
              <this._loginView.component />
            )}
          />
          <Route
            path="/"
            component={() => (
              <this._headerView.component standAlone>
                <this._headerNavView.component maxTabCount={5} />
                <main className="flex flex-col flex-auto overflow-auto h-full">
                  <Switch>
                    <Route
                      path="/dialer"
                      component={() => (
                        <this._dialerAndCallsTabView.component>
                          {({ showTabs }) => (
                            <this._dialerView.component withTabs={showTabs} />
                          )}
                        </this._dialerAndCallsTabView.component>
                      )}
                    />
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
                              />
                            )}
                          />
                          <Route
                            path="/settings/calling"
                            component={() => (
                              <this._callingSettingsView.component />
                            )}
                          />
                          <Route
                            path="/settings/region"
                            component={() => (
                              <this._regionSettingsView.component />
                            )}
                          />
                          <Route
                            path="/settings/audio"
                            component={() => (
                              <this._audioSettingsView.component />
                            )}
                          />
                          <Route
                            path="/settings/issuesTracking"
                            component={this._issuesTrackingView.component}
                          />
                        </Switch>
                      )}
                    />
                    <Route
                      path="/calls/active/:sessionId"
                      component={() => (
                        <this._callControlView.component
                          showContactDisplayPlaceholder={false}
                          sourceIcons={sourceIcons}
                          getAvatarUrl={getAvatarUrl}
                          onBackButtonClick={() => {
                            this._router.push('/calls');
                          }}
                          showCallQueueName
                          showPark
                        >
                          <this._recentActivityView.component
                            entry="Call Control"
                            getSession={() =>
                              this._webphone.activeSession || ({} as any)
                            }
                            navigateTo={(path: string) => {
                              this._router.push(path);
                            }}
                          />
                        </this._callControlView.component>
                      )}
                    />
                    <Route
                      path="/calls"
                      component={() => (
                        <this._dialerAndCallsTabView.component>
                          <this._activeCallsView.component
                            showRingoutCallControl
                            onLogCall={async () => {
                              await sleep(1000);
                            }}
                            onCreateContact={async () => {}}
                            onCallsEmpty={() => {}}
                            sourceIcons={sourceIcons}
                            getAvatarUrl={getAvatarUrl}
                            useV2
                            showSwitchCall
                          />
                        </this._dialerAndCallsTabView.component>
                      )}
                    />
                    <Route
                      path="/transfer/:sessionId/:type"
                      component={() => (
                        <this._transferView.component enableWarmTransfer />
                      )}
                    />
                    <Route
                      path="/flip/:sessionId"
                      component={() => <this._flipView.component />}
                    />
                    <Route
                      path="/simplifycallctrl/:sessionId"
                      component={() => (
                        <this._simpleCallControlView.component />
                      )}
                    />
                    <Route
                      path="/history"
                      component={() => (
                        <this._callsListView.component
                          showContactDisplayPlaceholder={false}
                          onLogCall={async () => {
                            await sleep(1000);
                          }}
                          onCreateContact={async () => {}}
                        />
                      )}
                    />
                    <Route
                      path="/composeText"
                      component={() => (
                        <this._composeTextView.component inputExpandable />
                      )}
                    />
                    <Route
                      path="/conversations/:conversationId"
                      component={() => (
                        <this._conversationView.component
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
                    {/* TODO: Tab active state issue */}
                    <Route
                      path="/messages"
                      component={() => (
                        <this._conversationsView.component
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
                      path="/contacts/:contactType/:contactId"
                      component={() => (
                        <this._contactDetailsView.component>
                          <this._recentActivityView.component
                            entry="Contact Details"
                            navigateTo={(path) => {
                              this._router.push(path);
                            }}
                            getContact={() =>
                              this._contactDetailsView
                                .currentContact as unknown as Entity
                            }
                            useContact
                          />
                        </this._contactDetailsView.component>
                      )}
                    />

                    <Route
                      path="/contacts"
                      component={() => (
                        <this._contactListView.component
                          contactSourceFilterRenderer={(props) => (
                            <ContactSourceFilter {...props} />
                          )}
                        />
                      )}
                    />
                    {/* TODO: bottom schedule button */}
                    <Route
                      path="/meeting"
                      component={() => <this._genericMeetingView.component />}
                    />
                    {/* <Route
                      path="/conferenceCall/dialer/:fromNumber/:fromSessionId"
                      component={() => <this._conferenceDialerView.component />}
                    />
                    <Route
                      path="/conferenceCall/participants"
                      component={() => (
                        <this._conferenceParticipantView.component />
                      )}
                    />
                    <Route
                      path="/conferenceCall/callsOnhold/:fromNumber/:fromSessionId"
                      component={() => (
                        <this._callsOnholdView.component
                          onLogCall={async () => {
                            await sleep(1000);
                          }}
                          onCreateContact={() => {}}
                          onCallsEmpty={() => {}}
                          sourceIcons={sourceIcons}
                          getAvatarUrl={getAvatarUrl}
                        />
                      )}
                    /> */}
                    {/* <Redirect from="*" to="/dialer" /> */}
                  </Switch>
                </main>
              </this._headerView.component>
            )}
          />
        </Switch>
        <this._callBadgeView.component
          defaultOffsetX={0}
          defaultOffsetY={73}
          hidden
          // TODO: fix that into
          // hidden={
          //   routerProps.location.pathname.indexOf('/calls/active') === 0 ||
          //   routerProps.location.pathname.indexOf('/conferenceCall/dialer') ===
          //     0 ||
          //   routerProps.location.pathname.indexOf(
          //     '/conferenceCall/callsOnhold',
          //   ) === 0 ||
          //   routerProps.location.pathname.indexOf(
          //     '/conferenceCall/participants',
          //   ) === 0
          // }
          goToCallCtrl={(sessionId?: string) => {
            this._router.push(`/calls/active/${sessionId}`);
          }}
        />
        <this._incomingCallView.component
          showContactDisplayPlaceholder={false}
          sourceIcons={sourceIcons}
          getAvatarUrl={getAvatarUrl}
          showCallQueueName
        >
          <this._recentActivityView.component
            entry="Incoming Call"
            getSession={() => this._webphone.ringSession || ({} as any)}
            navigateTo={(path) => {
              this._webphone.toggleMinimized(this._webphone.ringSession!.id!);
              this._router.push(path);
            }}
            useContact
          />
        </this._incomingCallView.component>
        <this._userGuideView.component />
        <this._connectivityBadgeView.component />
        <this._environmentView.component />
      </this._appRootView.component>
    );
  }
}

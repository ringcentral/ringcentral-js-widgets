/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// TODO: fix type
import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { ConnectivityBadgeView } from '@ringcentral-integration/micro-auth/src/app/views';
import { Contacts } from '@ringcentral-integration/micro-contacts/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { MFEAppRootView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  autobind,
  delegate,
  injectable,
  matchPath,
  Route,
  RouterPlugin as Router,
  Switch,
} from '@ringcentral-integration/next-core';
import {
  globalTransport,
  RcMicroAppView,
  useMicroApp,
} from '@ringcentral-integration/next-micro';
import React from 'react';

import { GlobalStyle } from '../styles';

import i18n from './i18n';
import { CallMonitor, Webphone } from './services';
import {
  ActiveCallsView,
  CallBadgeView,
  CallControlView,
  CallDisposerView,
  CallsListView,
  DialerAndCallsTabView,
  DialerView,
  FlipView,
  IncomingCallView,
  RecentActivityView,
  SimpleCallControlView,
  TransferView,
} from './views';

export interface IInteractions {
  emit: {};
  listen: {
    clickToDial: (phoneNumber: string) => Promise<void>;
  };
}

@injectable({
  name: 'PhoneAppView',
})
export class PhoneAppView extends RcMicroAppView {
  constructor(
    private _theme: Theme,
    private _mfeAppRootView: MFEAppRootView,
    private _router: Router,
    private _contacts: Contacts,
    private _dialerAndCallsTabView: DialerAndCallsTabView,
    private _dialerView: DialerView,
    private _callControlView: CallControlView,
    private _callBadgeView: CallBadgeView,
    private _recentActivityView: RecentActivityView,
    private _activeCallsView: ActiveCallsView,
    private _transferView: TransferView,
    private _flipView: FlipView,
    private _simpleCallControlView: SimpleCallControlView,
    private _callsListView: CallsListView,
    private _incomingCallView: IncomingCallView,
    private _connectivityBadgeView: ConnectivityBadgeView,
    private _webphone: Webphone,
    private _callMonitor: CallMonitor,
    private _callDisposerView: CallDisposerView,
  ) {
    super();
    this._callMonitor.onCallEnded(() => {
      const match = matchPath(this._router.currentPath, {
        path: '/calls/active/:sessionId',
        exact: true,
        strict: false,
      });
      if (match?.isExact) {
        this._router.push('/dialer');
      }
    });
    this._mfeAppRootView.setRoutes(this, this.Routes);
    (globalTransport as GlobalTransport<IInteractions>).listen(
      'clickToDial',
      (phoneNumber: string) => {
        this._dialerView.call({ phoneNumber });
      },
    );
  }

  @delegate('server')
  async setThemeType(type: string) {
    this._theme.setThemeType(type);
  }

  @autobind
  Routes() {
    const sourceIcons = {
      brandIcon: null,
    };

    const getAvatarUrl = async (contact: IContact) => {
      const avatarUrl = await this._contacts.getProfileImage(contact, true);
      return avatarUrl;
    };
    return (
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
                getSession={() => this._webphone.activeSession || ({} as any)}
                navigateTo={(path: string) => {
                  this._router.push(path);
                }}
              />
            </this._callControlView.component>
          )}
        />
        <Route
          path="/calllog/:telephonySessionId"
          component={() => <this._callDisposerView.component />}
        />
        <Route
          path="/calls"
          component={() => (
            <this._dialerAndCallsTabView.component>
              <this._activeCallsView.component
                showRingoutCallControl
                onLogCall={async ({ call }) => {
                  await this._router.push(
                    `/calllog/${call.telephonySessionId}`,
                  );
                }}
                onCreateContact={() => {
                  //
                }}
                onCallsEmpty={() => {
                  //
                }}
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
          component={() => <this._transferView.component enableWarmTransfer />}
        />
        <Route
          path="/flip/:sessionId"
          component={() => <this._flipView.component />}
        />
        <Route
          path="/simplifycallctrl/:sessionId"
          component={() => <this._simpleCallControlView.component />}
        />
        <Route
          path="/history"
          component={() => (
            <this._callsListView.component
              showContactDisplayPlaceholder={false}
              onLogCall={async ({ call }) => {
                await this._router.push(`/calllog/${call.telephonySessionId}`);
              }}
              onCreateContact={async () => {
                //
              }}
            />
          )}
        />
        {/* <Route
            path="/conferenceCall/dialer/:fromNumber/:fromSessionId"
            component={() => <this._conferenceDialerView.component />}
          />
          <Route
            path="/conferenceCall/participants"
            component={() => <this._conferenceParticipantView.component />}
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
      </Switch>
    );
  }

  component() {
    const { t } = useLocale(i18n);
    const MicroContacts = useMicroApp(this, {
      name: '@ringcentral-integration/micro-contacts',
      loader: () =>
        import('@ringcentral-integration/micro-contacts/src/bootstrap'),
    });
    const sourceIcons = {
      brandIcon: null,
    };

    const getAvatarUrl = async (contact: IContact) => {
      const avatarUrl = await this._contacts.getProfileImage(contact, true);
      return avatarUrl;
    };
    if (!this.isAppShell) return <MicroContacts />;
    return (
      <this._mfeAppRootView.component>
        <GlobalStyle />
        <MicroContacts />
        <this._mfeAppRootView.DefaultRoute />
        <this._mfeAppRootView.Routes appShell={this} />
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
          goToCallCtrl={(sessionId) => {
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
        <this._connectivityBadgeView.component />
      </this._mfeAppRootView.component>
    );
  }
}

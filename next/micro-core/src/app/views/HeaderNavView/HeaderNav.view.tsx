import type { Manifest } from '@ringcentral-integration/integration-sdk';
import type { AppFeatures } from '@ringcentral-integration/micro-auth/src/app/services';
import type { MessageStore } from '@ringcentral-integration/micro-message/src/app/services';
import type {
  CallingSettings,
  CallMonitor,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { HeaderNav } from '@ringcentral-integration/next-widgets/deprecated/components/HeaderNav';
import type {
  HeaderNavProps,
  TabItem,
} from '@ringcentral-integration/next-widgets/deprecated/components/HeaderNav';
import { hasActiveCalls } from '@ringcentral-integration/widgets/lib/hasActiveCalls';
import React, { useRef } from 'react';

import { Locale } from '../../services';

import type { HeaderNavViewOptions } from './HeaderNav.view.interface';
import { t } from './i18n';
import { defaultTabMap } from './utils/tabs';

@injectable({
  name: 'HeaderNavView',
})
export class HeaderNavView extends RcViewModule {
  @dynamic('MessageStore')
  protected readonly _messageStore?: MessageStore;

  @dynamic('AppFeatures')
  protected readonly _appFeatures?: AppFeatures;

  @dynamic('CallingSettings')
  protected readonly _callingSettings?: CallingSettings;

  @dynamic('Webphone')
  protected readonly _webphone?: Webphone;

  @dynamic('CallMonitor')
  protected readonly _callMonitor?: CallMonitor;

  constructor(
    protected _locale: Locale,
    protected _router: RouterPlugin,
    @optional('Manifest') private _manifest?: Manifest,
    @optional('HeaderNavViewOptions')
    protected _headerNavViewOptions?: HeaderNavViewOptions,
  ) {
    super();
  }

  get unreadCounts() {
    return this._messageStore?.unreadCounts ?? 0;
  }

  get currentLocale() {
    return this._locale.currentLocale;
  }

  private get _dialerActive() {
    return this._router.currentPath === '/dialer';
  }

  @computed((that: HeaderNavView) => [that._router.currentPath])
  private get _callsActive() {
    const { currentPath } = this._router;
    return currentPath === '/calls' || currentPath === '/calls/active';
  }

  @computed((that: HeaderNavView) => [that._router.currentPath])
  private get _messageActive() {
    const { currentPath } = this._router;
    return (
      currentPath === '/messages' ||
      // * here is new logic difference with the old one
      currentPath === '/composeText' ||
      currentPath.indexOf('/conversations/') !== -1
    );
  }

  @computed((that: HeaderNavView) => [that._router.currentPath])
  private get _contactsActive() {
    const { currentPath } = this._router;
    return currentPath.substring(0, 9) === '/contacts';
  }

  @computed((that: HeaderNavView) => [that._router.currentPath])
  private get _settingsActive() {
    const { currentPath } = this._router;
    return currentPath.substring(0, 9) === '/settings';
  }

  @computed((that: HeaderNavView) => [that._dialerActive, that.currentLocale])
  get dialTab(): TabItem {
    return {
      ...defaultTabMap.dialer,
      title: t('dialpadLabel'),
      to: '/dialer',
      active: this._dialerActive,
      dataSign: 'dialerTab',
    };
  }

  @computed((that: HeaderNavView) => [that._callsActive, that.currentLocale])
  get callsTab(): TabItem {
    return {
      ...defaultTabMap.calls,
      title: t('callsLabel'),
      to: '/calls',
      active: this._callsActive,
      dataSign: 'callsTab',
    };
  }

  @computed((that: HeaderNavView) => [that.currentLocale])
  get historyTab(): TabItem {
    return {
      ...defaultTabMap.history,
      title: t('historyLabel'),
      to: '/history',
      dataSign: 'historyTab',
    };
  }

  @computed((that: HeaderNavView) => [
    that._messageActive,
    that.unreadCounts,
    that.currentLocale,
  ])
  get messageTab(): TabItem {
    return {
      ...defaultTabMap.messages,
      title: t('messagesLabel'),
      to: '/messages',
      BadgeProps: {
        badgeContent: this.unreadCounts,
      },
      active: this._messageActive,
      dataSign: 'messagesTab',
    };
  }

  @computed((that: HeaderNavView) => [that._contactsActive, that.currentLocale])
  get contactsTab(): TabItem {
    return {
      ...defaultTabMap.contacts,
      title: t('contactsLabel'),
      to: '/contacts',
      active: this._contactsActive,
      dataSign: 'contactsTab',
    };
  }

  @computed((that: HeaderNavView) => [that.currentLocale])
  get meetingTab(): TabItem {
    return {
      ...defaultTabMap.meeting,
      title: t('meetingLabel'),
      to: '/meeting',
      dataSign: 'meetingTab',
    };
  }

  @computed((that: HeaderNavView) => [that._settingsActive, that.currentLocale])
  get settingsTab(): TabItem {
    return {
      ...defaultTabMap.settings,
      title: t('settingsLabel'),
      to: '/settings',
      active: this._settingsActive,
      dataSign: 'settingsTab',
    };
  }

  @computed((that: HeaderNavView) => [
    that._appFeatures?.isCallingEnabled,
    that._appFeatures?.hasReadExtensionCallLog,
    that._appFeatures?.hasReadMessagesPermission,
    that._appFeatures?.isContactsEnabled,
    that._appFeatures?.hasMeetingsPermission,
    that._appFeatures?.isCallingEnabled,
    that._callingSettings?.ready,
    that._callingSettings?.callWith,
    that.dialTab,
    that.callsTab,
    that.historyTab,
    that.messageTab,
    that.contactsTab,
    that.meetingTab,
    that.settingsTab,
  ])
  get tabs() {
    const showDialPad = this._appFeatures?.isCallingEnabled;
    const showHistory = this._appFeatures?.hasReadExtensionCallLog;
    const showMessages = this._appFeatures?.hasReadMessagesPermission;
    const showContacts = this._appFeatures?.isContactsEnabled;
    const showMeeting = this._appFeatures?.hasMeetingsPermission;
    // const showCalls =
    //   this._appFeatures.isCallingEnabled &&
    //   this._callingSettings.ready &&
    //   this._callingSettings.callWith !== callingOptions.browser;

    const tabs: TabItem[] = [];

    showDialPad && tabs.push(this.dialTab);
    // TODO: calls still not implemented, should check after
    // showCalls && tabs.push(this.callsTab);
    showHistory && tabs.push(this.historyTab);
    showMessages && tabs.push(this.messageTab);
    showContacts && tabs.push(this.contactsTab);
    showMeeting && tabs.push(this.meetingTab);
    tabs.push(this.settingsTab);
    const tabLayout = this._manifest?.config.tabLayout;
    if (tabLayout) {
      const _tabLayout = tabLayout.map((item) => `/${item}`);
      return tabs
        .sort((a, b) => _tabLayout.indexOf(a.to) - _tabLayout.indexOf(b.to))
        .filter((tab) => _tabLayout.indexOf(tab.to) !== -1);
    }
    return tabs;
  }

  getUIProps(): UIProps<HeaderNavProps> {
    return {
      tabs: this.tabs,
      currentPath: this._router.currentPath,
    };
  }

  getUIFunctions(): UIFunctions<HeaderNavProps> {
    return {
      onChange: (to: string) => {
        if (!to) return;

        if (
          to === '/dialer' &&
          // * that use to meet old and new version modules
          hasActiveCalls({
            callingSettings: this._callingSettings,
            webphone: this._webphone,
            callMonitor: this._callMonitor,
          } as any)
        ) {
          this._router.push('/calls');
        } else {
          this._router.push(to);
        }
      },
    };
  }

  component(props: Partial<HeaderNavProps>) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    const HeaderNavPanel = this._headerNavViewOptions?.component ?? HeaderNav;
    return <HeaderNavPanel {..._props} {...uiFunctions} />;
  }
}

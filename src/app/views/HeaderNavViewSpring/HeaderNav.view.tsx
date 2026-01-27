import type { AppFeatures } from '@ringcentral-integration/micro-auth/src/app/services';
import type {
  MessageStore,
  MessageThread,
} from '@ringcentral-integration/micro-message/src/app/services';
import type { CallHistory } from '@ringcentral-integration/micro-phone/src/app/services';
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
import React, { useRef } from 'react';

import { Locale } from '../../services';

import { HeaderNav } from './HeaderNav';
import type {
  HeaderNavPanelProps,
  HeaderNavViewSpringOptions,
  NavButtonProps,
} from './HeaderNav.view.interface';
import { t } from './i18n';
import { defaultTabMap } from './utils/tabs';

@injectable({
  name: 'HeaderNavViewSpring',
})
export class HeaderNavViewSpring extends RcViewModule {
  @dynamic('CallHistory')
  protected readonly _callHistory?: CallHistory;
  @dynamic('MessageStore')
  protected readonly _messageStore?: MessageStore;
  @dynamic('MessageThread')
  protected readonly _messageThread?: MessageThread;
  @dynamic('AppFeatures')
  protected readonly _appFeatures?: AppFeatures;

  constructor(
    protected _locale: Locale,
    protected _router: RouterPlugin,
    @optional('HeaderNavViewOptions')
    protected _headerNavViewOptions?: HeaderNavViewSpringOptions,
  ) {
    super();
  }

  get textUnReadCounts() {
    return (
      (this._messageStore?.textUnreadCounts ?? 0) +
      (this._messageThread?.threadUnreadCount ?? 0)
    );
  }

  get voicemailUnReadCounts() {
    return this._messageStore?.voiceUnreadCounts ?? 0;
  }

  get missedCallsUnreadCounts() {
    return this._callHistory?.missedCallsUnreadCounts ?? 0;
  }

  get faxUnReadCounts() {
    return this._messageStore?.faxUnreadCounts ?? 0;
  }

  get currentLocale() {
    return this._locale.currentLocale;
  }

  private get _dialerActive() {
    return this._router.currentPath?.includes('/dialer');
  }

  private get _videoActive() {
    return this._router.currentPath?.includes('/meeting');
  }

  @computed
  private get _textActive() {
    const { currentPath } = this._router;
    return (
      currentPath === '/messages' ||
      // * here is new logic difference with the old one
      currentPath === '/composeText' ||
      currentPath.indexOf('/conversations/') !== -1
    );
  }

  @computed
  private get _settingsActive() {
    const { currentPath } = this._router;
    return currentPath.substring(0, 9) === '/settings';
  }

  @computed
  get dialTab(): NavButtonProps {
    return {
      ...defaultTabMap.dialer,
      title: t('phone'),
      tooltip: (
        <div>
          <div>{t('keypad')}</div>
          <div>{t('calls')}</div>
          <div>{t('voicemails')}</div>
        </div>
      ),
      to: '/dialer',
      active: this._dialerActive,
      dataSign: 'dialerTab',
      BadgeProps: {
        max: 99,
        count: this.voicemailUnReadCounts + this.missedCallsUnreadCounts,
      },
    };
  }

  @computed
  get textTab(): NavButtonProps {
    return {
      ...defaultTabMap.text,
      title: t('text'),
      // TODO: change to /text in the future
      to: '/messages',
      dataSign: 'textTab',
      active: this._textActive,
      BadgeProps: {
        max: 99,
        count: this.textUnReadCounts,
      },
    };
  }

  @computed
  get videoTab(): NavButtonProps {
    return {
      ...defaultTabMap.video,
      title: t('video'),
      active: this._videoActive,
      to: '/meeting',
      dataSign: 'videoTab',
    };
  }

  @computed
  get faxTab(): NavButtonProps {
    return {
      ...defaultTabMap.fax,
      title: t('fax'),
      to: '/fax',
      dataSign: 'faxTab',
      BadgeProps: {
        max: 99,
        count: this.faxUnReadCounts,
      },
    };
  }

  @computed
  get settingsTab(): NavButtonProps {
    return {
      ...defaultTabMap.settings,
      title: t('settings'),
      to: '/settings',
      active: this._settingsActive,
      dataSign: 'settingsTab',
    };
  }

  @computed
  get tabs() {
    const appFeatures = this._appFeatures;
    const showDialPad =
      appFeatures &&
      (appFeatures.isCallingEnabled || appFeatures.hasReadExtensionCallLog);
    const showText = this._appFeatures?.hasReadTextPermission;
    const showFax = this._appFeatures?.hasReadFaxPermission;
    const showVideo = this._appFeatures?.hasMeetingsPermission;

    const tabs: NavButtonProps[] = [];

    showDialPad && tabs.push(this.dialTab);
    showText && tabs.push(this.textTab);
    showFax && tabs.push(this.faxTab);
    if (this._headerNavViewOptions?.enableVideoTab) {
      showVideo && tabs.push(this.videoTab);
    }
    tabs.push(this.settingsTab);

    return tabs;
  }

  getUIProps(): UIProps<HeaderNavPanelProps> {
    return {
      tabs: this.tabs,
      currentPath: this._router.currentPath,
    };
  }

  getUIFunctions(): UIFunctions<HeaderNavPanelProps> {
    return {
      onChange: (to: string) => {
        if (
          !to ||
          // when route be same also not push again
          this._router.currentPath === to
        ) {
          return;
        }

        this._router.push(to);
      },
    };
  }

  component(props: Partial<HeaderNavPanelProps>) {
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

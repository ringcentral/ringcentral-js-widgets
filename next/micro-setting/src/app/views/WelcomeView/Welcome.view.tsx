import {
  AppFeatures,
  Auth,
  ExtensionInfo,
  ExtensionPhoneNumber,
  NumberFormatter,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { GenericMeeting } from '@ringcentral-integration/micro-meeting/src/app/services';
import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  StoragePlugin,
  UIFunctions,
  useConnector,
  userStorage,
} from '@ringcentral-integration/next-core';
import { CallMd, CompanyMd, VideoMd } from '@ringcentral/spring-icon';
import writeText from 'copy-to-clipboard';
import React, { useLayoutEffect } from 'react';

import type {
  WelcomePanelInfo,
  WelcomePanelProp,
  WelcomeViewOptions,
} from './Welcome.view.interface';
import { WelcomePanel } from './WelcomePanel';
import { t } from './i18n';

@injectable({
  name: 'WelcomeView',
})
export class WelcomeView extends RcViewModule {
  @dynamic('GenericMeeting')
  private _genericMeeting?: GenericMeeting;

  private backToRoute?: string;
  /**
   * use index for that may have multiple welcome pages in the future
   */
  @userStorage
  @state
  index = 0;

  @action
  _setIndex(idx: number) {
    this.index = idx;
  }

  @delegate('server')
  async setIndex(idx: number) {
    this._setIndex(idx);
  }

  constructor(
    protected storage: StoragePlugin,
    protected _appFeatures: AppFeatures,
    protected _brand: Brand,
    protected _auth: Auth,
    protected _router: RouterPlugin,
    protected _toast: Toast,
    protected _numberFormatter: NumberFormatter,
    protected _extensionInfo: ExtensionInfo,
    protected _extensionPhoneNumber: ExtensionPhoneNumber,
    protected _portManager: PortManager,
    @optional('WelcomeViewOptions')
    protected _welcomeViewOptions?: WelcomeViewOptions,
  ) {
    super();
    this.storage.enable(this);

    // currently we clear user index when user logout, if we only want show once, remove this line
    this._auth.addBeforeLogoutHandler(() => {
      this.setIndex(0);
    });
  }

  @computed
  private get mainCompanyInfo(): WelcomePanelInfo | null {
    const mainCompanyNumber = this._extensionPhoneNumber.mainCompanyNumber;
    const { extensionNumber } = this._extensionInfo;

    if (!mainCompanyNumber) {
      return null;
    }

    const mainText = this._numberFormatter.formatNumber(
      mainCompanyNumber?.phoneNumber ?? '',
    );
    const subText = extensionNumber
      ? `(${t('extensionShort')} ${extensionNumber})`
      : '';

    const title = t('companyNumberTitle');
    return {
      icon: CompanyMd,
      iconColor: 'text-extra-lime',
      bgColor: 'bg-extra-lime/10',
      title,
      mainText,
      subText,
      copyText: `${title}: ${mainText}
${t('extensionTitle')}: ${extensionNumber}`,
    };
  }

  @computed
  private get directInfo(): WelcomePanelInfo | null {
    const directNumber = this._extensionPhoneNumber.directNumbers[0];

    if (!directNumber) {
      return null;
    }

    const title = t('directLineTitle');
    const mainText = this._numberFormatter.formatNumber(
      directNumber?.phoneNumber ?? '',
    );
    return {
      icon: CallMd,
      iconColor: 'text-extra-tangerine',
      bgColor: 'bg-extra-tangerine/10',
      title,
      mainText,
      copyText: `${title}: ${mainText}`,
    };
  }

  @computed
  private get meetingInfo(): WelcomePanelInfo | null {
    if (!this._appFeatures.ready) {
      return {
        loading: true,
      };
    }

    if (!this._appFeatures.hasMeetingsPermission) {
      return null;
    }

    const title = t('meetingTitle');
    const _genericMeeting = this._genericMeeting!;
    const mainText = _genericMeeting.ready
      ? _genericMeeting.personalMeetingId
      : '';
    return {
      icon: VideoMd,
      iconColor: 'text-extra-amethyst',
      bgColor: 'bg-extra-amethyst/10',
      title,
      mainText,
      copyText: `${title}: ${mainText}`,
    };
  }

  @computed
  private get infos() {
    const data = [];

    if (this.mainCompanyInfo) {
      data.push(this.mainCompanyInfo);
    }

    if (this.directInfo) {
      data.push(this.directInfo);
    }

    if (this._genericMeeting) {
      const meetingInfo = this.meetingInfo;

      if (meetingInfo) {
        data.push(this.meetingInfo);
      }
    }

    return data;
  }

  getUIProps() {
    return {
      logoUrl: this._brand.assets?.['logo'] as string,
      loggedIn: this._auth.loggedIn,
      show: this._auth.loggedIn && this.index === 0,
      infos: this.infos,
      userName: this._extensionInfo.name || '',
    };
  }

  private readonly uiFunctions: UIFunctions<WelcomePanelProp> = {
    onGetStart: () => {
      this.setIndex(1);
    },
    onCopy: () => {
      const text = this.infos
        .filter((info) => 'copyText' in info)
        .map((info) => info.copyText)
        .join('\n')
        .trim();
      const result = writeText(text);
      if (!result) {
        // maybe should show error message when copy failed, maybe we can track this event first, if it happens a lot, we can show error message
        return;
      }

      this._toast.hint({ message: t('copied') });
    },
  };

  @delegate('server')
  private async intoApp() {
    if (this.backToRoute) {
      this._router.replace(this.backToRoute);
      return;
    }
    if (this._welcomeViewOptions?.routeAfterStart) {
      this._router.replace(this._welcomeViewOptions?.routeAfterStart!);
      return;
    }
    this.backToRoute = undefined;
    await this.intoAppByDefaultRouter();
  }

  @delegate('server')
  async intoAppByDefaultRouter() {
    const path = this._appFeatures.getAppDefaultRoutePath();

    await this._router.replace(path);
  }

  @delegate('server')
  async start(backToRoute?: string) {
    this.backToRoute = backToRoute;
    this.setIndex(0);
    this._router.replace('/welcome');
  }

  component() {
    const { show, loggedIn, ...rest } = useConnector(() => this.getUIProps());

    useLayoutEffect(() => {
      // when not logged in, do nothing
      if (!loggedIn) return;

      // when should not show welcome page, go to app directly
      if (!show) {
        // when be shared only exec in main tab
        if (this._portManager.shared) {
          if (this._portManager.isMainTab) {
            this.intoApp();
          }
        } else {
          this.intoApp();
        }
      }
    }, [loggedIn, show]);

    if (!show) return null;

    const Component = this._welcomeViewOptions?.component || WelcomePanel;

    return <Component {...rest} {...this.uiFunctions} />;
  }
}

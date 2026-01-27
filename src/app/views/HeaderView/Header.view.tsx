import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import type {
  Auth,
  ExtensionInfo,
  Presence,
  UserInfo,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type {
  CallMonitor,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type {
  QuickAccess,
  UserGuide,
} from '@ringcentral-integration/micro-setting/src/app/services';
import {
  computed,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import { HeaderView as JunoHeaderView } from '@ringcentral-integration/widgets/components/HeaderView';
import type { PropsWithChildren } from 'react';
import React, { useRef } from 'react';

import { Brand, Locale } from '../../services';

import type {
  HeaderContainerProps,
  HeaderViewOptions,
  HeaderViewProps,
} from './Header.view.interface';
import { HeaderPanel } from './HeaderPanel';

@injectable({
  name: 'HeaderView',
})
export class HeaderView extends RcViewModule {
  @dynamic('Auth')
  protected readonly _auth?: Auth;

  @dynamic('CallMonitor')
  protected readonly _callMonitor?: CallMonitor;

  @dynamic('Webphone')
  protected readonly _webphone?: Webphone;

  @dynamic('Presence')
  protected readonly _presence?: Presence;

  @dynamic('UserGuide')
  protected readonly _userGuide?: UserGuide;

  @dynamic('QuickAccess')
  protected readonly _quickAccess?: QuickAccess;

  @dynamic('ExtensionInfo')
  protected readonly _extensionInfo?: ExtensionInfo;

  @dynamic('UserInfo')
  protected readonly _userInfo?: UserInfo;

  constructor(
    protected _router: RouterPlugin,
    protected _locale: Locale,
    protected _brand: Brand,
    @optional('HeaderViewOptions')
    protected _headerViewOptions?: HeaderViewOptions,
  ) {
    super();
  }

  @computed
  get ringingCalls() {
    return this._callMonitor?.activeRingCalls ?? [];
  }

  @computed
  get onHoldCalls() {
    return this._callMonitor?.activeOnHoldCalls ?? [];
  }

  @computed
  get currentCalls() {
    return this._callMonitor?.activeCurrentCalls ?? [];
  }

  @computed
  get userContact(): IContact | undefined {
    const userInfo = this._extensionInfo?.info;

    const phoneNumber = userInfo?.contact?.businessPhone;

    return userInfo
      ? {
          ...userInfo,
          id: `${userInfo.id!}`,
          type: 'company',
          phoneNumber,
        }
      : undefined;
  }

  getUIProps({ standAlone }: HeaderContainerProps): UIProps<HeaderViewProps> {
    const logoUrl = this._brand.brandConfig.assets?.logo as string;

    return {
      standAlone,
      logoUrl,
      userStatus:
        (this._auth?.loggedIn &&
        // TODO: spring-ui use presenceStatus as the user status, because presenceStatus will group the user status and telephony status, that be real user status(in meeting also will be busy)
        process.env.THEME_SYSTEM === 'spring-ui'
          ? this._presence?.presenceStatus
          : this._presence?.userStatus) || undefined,
      dndStatus:
        (this._auth?.loggedIn && this._presence?.dndStatus) || undefined,
      ringingCalls: this.ringingCalls,
      onHoldCalls: this.onHoldCalls,
      currentCalls: this.currentCalls,
      currentPath: this._router.currentPath,
      currentLocale: this._locale.currentLocale,
      activeSessionId: this._webphone?.activeSessionId || '',
      incomingCallPageMinimized:
        !this._webphone?.ringSession || this._webphone.ringSession.minimized,
      presenceReady: this._presence?.ready,
      userContact: this.userContact,
      loginNumber: this._userInfo?.formattedLoginNumber,
    };
  }

  getUIFunctions(_: HeaderContainerProps): UIFunctions<HeaderViewProps> {
    return {
      onCurrentCallBtnClick: () => {
        if (this._router.currentPath !== '/calls/active') {
          this._router.push('/calls/active');
        }
        this.dismissUserGuideAndExitQuickAccess();
      },
      onViewCallBtnClick: () => {
        if (this._router.currentPath !== '/calls') {
          this._router.push('/calls');
        }

        this.dismissUserGuideAndExitQuickAccess();
      },
      // old UI
      setAvailable: () => this._presence?.setAvailable(),
      setBusy: () => this._presence?.setBusy(),
      setDoNotDisturb: () => this._presence?.setDoNotDisturb(),
      setInvisible: () => this._presence?.setInvisible(),
      // spring-ui only
      onActionClick: (action) => {
        switch (action) {
          case 'logout':
            this._auth?.logout({ reason: 'Manually sign out' });
            break;

          default:
            break;
        }
      },
      onPresenceChange: (status) => {
        switch (status) {
          case 'available':
            this._presence?.setAvailable();
            break;
          case 'busy':
            this._presence?.setBusy();
            break;
          case 'DND':
            this._presence?.setDoNotDisturb();
            break;
          case 'offline':
            this._presence?.setInvisible();
            break;
          default:
            break;
        }
      },
    };
  }

  private dismissUserGuideAndExitQuickAccess() {
    this._userGuide?.dismiss();
    this._quickAccess?.exit();

    const ringSession = this._webphone?.ringSession;
    if (ringSession && !ringSession.minimized) {
      this._webphone.toggleMinimized(ringSession.id);
    }
  }

  component(props: PropsWithChildren<Partial<HeaderViewProps>>) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const Component = this._headerViewOptions?.component || HeaderPanel;

      return <Component {..._props} {...uiFunctions} />;
    }

    const Component = this._headerViewOptions?.component || JunoHeaderView;

    return <Component {..._props} {...uiFunctions} />;
  }
}

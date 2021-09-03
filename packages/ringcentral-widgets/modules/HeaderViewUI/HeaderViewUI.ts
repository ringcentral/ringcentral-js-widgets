import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { Deps } from './HeaderViewUI.interface';
import { HeaderViewProps } from '../../containers/HeaderView/HeaderView.interface';

@Module({
  name: 'HeaderViewUI',
  deps: [
    'Auth',
    'CallMonitor',
    'RouterInteraction',
    'Locale',
    'Webphone',
    'Presence',
    'UserGuide',
    'QuickAccess',
  ],
})
export class HeaderViewUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  getUIProps(): UIProps<HeaderViewProps> {
    const {
      auth,
      callMonitor,
      routerInteraction,
      locale,
      webphone,
      presence,
    } = this._deps;

    return {
      userStatus: (auth.loggedIn && presence.userStatus) || undefined,
      dndStatus: (auth.loggedIn && presence.dndStatus) || undefined,
      ringingCalls: callMonitor.activeRingCalls || [],
      onHoldCalls: callMonitor.activeOnHoldCalls || [],
      currentCalls: callMonitor.activeCurrentCalls || [],
      currentPath: routerInteraction.currentPath,
      currentLocale: locale.currentLocale,
      activeSessionId: webphone.activeSessionId || '',
      incomingCallPageMinimized:
        !webphone.ringSession || webphone.ringSession.minimized,
      presenceReady: presence.ready,
    };
  }

  getUIFunctions(): UIFunctions<HeaderViewProps> {
    const {
      routerInteraction,
      userGuide,
      quickAccess,
      webphone,
      presence,
    } = this._deps;

    return {
      onCurrentCallBtnClick() {
        if (routerInteraction.currentPath !== '/calls/active') {
          routerInteraction.push('/calls/active');
        }
        if (userGuide) {
          userGuide.dismiss();
        }
        if (quickAccess) {
          quickAccess.exit();
        }
        // TODO: need to replace webphone with webphoneV2
        if (
          webphone &&
          webphone.ringSession &&
          !webphone.ringSession.minimized
        ) {
          webphone.toggleMinimized(webphone.ringSession.id);
        }
      },
      onViewCallBtnClick() {
        if (routerInteraction.currentPath !== '/calls') {
          routerInteraction.push('/calls');
        }
        if (userGuide) {
          userGuide.dismiss();
        }
        if (quickAccess) {
          quickAccess.exit();
        }
        if (
          webphone &&
          webphone.ringSession &&
          !webphone.ringSession.minimized
        ) {
          webphone.toggleMinimized(webphone.ringSession.id);
        }
      },
      setAvailable: () => presence && presence.setAvailable(),
      setBusy: () => presence && presence.setBusy(),
      setDoNotDisturb: () => presence && presence.setDoNotDisturb(),
      setInvisible: () => presence && presence.setInvisible(),
    };
  }
}

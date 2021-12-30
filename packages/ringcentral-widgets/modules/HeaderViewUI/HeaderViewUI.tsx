import React from 'react';

import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import {
  HeaderViewProps,
  HeaderContainerProps,
} from '../../containers/HeaderView';
import { Deps } from './HeaderViewUI.interface';

@Module({
  name: 'HeaderViewUI',
  deps: [
    'Auth',
    'CallMonitor',
    'RouterInteraction',
    'Locale',
    'Webphone',
    'Presence',
    { dep: 'UserGuide', optional: true },
    { dep: 'QuickAccess', optional: true },
    { dep: 'Brand', optional: true },
  ],
})
export class HeaderViewUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({ deps });
  }

  getUIProps({ standAlone }: HeaderContainerProps): UIProps<HeaderViewProps> {
    const { auth, callMonitor, routerInteraction, locale, webphone, presence } =
      this._deps;

    return {
      standAlone,
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

  getUIFunctions({ logo }: HeaderContainerProps): UIFunctions<HeaderViewProps> {
    const { routerInteraction, userGuide, quickAccess, webphone, presence } =
      this._deps;

    const logoUrl = this._deps.brand?.brandConfig.assets?.logo as string;

    return {
      logo: (logoUrl ? () => <img src={logoUrl} alt="" /> : undefined) || logo,
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

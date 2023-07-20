import React from 'react';

import { Module } from '@ringcentral-integration/commons/lib/di';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';

import type { HeaderViewProps } from '../../components/HeaderView';
import type { Deps } from './HeaderViewUI.interface';

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

  @computed((that: HeaderViewUI) => [that._deps.callMonitor.activeRingCalls])
  get ringingCalls() {
    return this._deps.callMonitor.activeRingCalls ?? [];
  }

  @computed((that: HeaderViewUI) => [that._deps.callMonitor.activeOnHoldCalls])
  get onHoldCalls() {
    return this._deps.callMonitor.activeOnHoldCalls ?? [];
  }

  @computed((that: HeaderViewUI) => [that._deps.callMonitor.activeCurrentCalls])
  get currentCalls() {
    return this._deps.callMonitor.activeCurrentCalls ?? [];
  }

  getUIProps({
    standAlone,
  }: Partial<HeaderViewProps>): UIProps<HeaderViewProps> {
    const logoUrl = this._deps.brand?.brandConfig.assets?.logo as string;
    return {
      standAlone,
      logoUrl,
      userStatus:
        (this._deps.auth.loggedIn && this._deps.presence.userStatus) ||
        undefined,
      dndStatus:
        (this._deps.auth.loggedIn && this._deps.presence.dndStatus) ||
        undefined,
      ringingCalls: this.ringingCalls,
      onHoldCalls: this.onHoldCalls,
      currentCalls: this.currentCalls,
      currentPath: this._deps.routerInteraction.currentPath,
      currentLocale: this._deps.locale.currentLocale,
      activeSessionId: this._deps.webphone.activeSessionId || '',
      incomingCallPageMinimized:
        !this._deps.webphone.ringSession ||
        this._deps.webphone.ringSession.minimized,
      presenceReady: this._deps.presence.ready,
    };
  }

  getUIFunctions({
    logo,
  }: Partial<HeaderViewProps>): UIFunctions<HeaderViewProps> {
    return {
      logo,
      onCurrentCallBtnClick: () => {
        if (this._deps.routerInteraction.currentPath !== '/calls/active') {
          this._deps.routerInteraction.push('/calls/active');
        }
        if (this._deps.userGuide) {
          this._deps.userGuide.dismiss();
        }
        if (this._deps.quickAccess) {
          this._deps.quickAccess.exit();
        }
        // TODO: need to replace webphone with Webphone
        if (
          this._deps.webphone &&
          this._deps.webphone.ringSession &&
          !this._deps.webphone.ringSession.minimized
        ) {
          this._deps.webphone.toggleMinimized(
            this._deps.webphone.ringSession.id,
          );
        }
      },
      onViewCallBtnClick: () => {
        if (this._deps.routerInteraction.currentPath !== '/calls') {
          this._deps.routerInteraction.push('/calls');
        }
        if (this._deps.userGuide) {
          this._deps.userGuide.dismiss();
        }
        if (this._deps.quickAccess) {
          this._deps.quickAccess.exit();
        }
        if (
          this._deps.webphone &&
          this._deps.webphone.ringSession &&
          !this._deps.webphone.ringSession.minimized
        ) {
          this._deps.webphone.toggleMinimized(
            this._deps.webphone.ringSession.id,
          );
        }
      },
      setAvailable: () =>
        this._deps.presence && this._deps.presence.setAvailable(),
      setBusy: () => this._deps.presence && this._deps.presence.setBusy(),
      setDoNotDisturb: () =>
        this._deps.presence && this._deps.presence.setDoNotDisturb(),
      setInvisible: () =>
        this._deps.presence && this._deps.presence.setInvisible(),
    };
  }
}

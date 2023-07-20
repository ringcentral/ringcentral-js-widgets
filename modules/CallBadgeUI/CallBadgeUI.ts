import { Module } from '@ringcentral-integration/commons/lib/di';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2, computed } from '@ringcentral-integration/core';

import type {
  CallBadgeContainerProps,
  CallBadgePanelProps,
  Deps,
} from './CallBadgeUI.interface';

@Module({
  name: 'CallBadgeUI',
  deps: ['Locale', 'Webphone', { dep: 'CallBadgeUIOptions', optional: true }],
})
class CallBadgeUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  @computed((that: CallBadgeUI) => [
    that._deps.webphone.activeSession,
    that._deps.webphone.ringSession,
  ])
  get currentSession() {
    return (
      this._deps.webphone.activeSession || this._deps.webphone.ringSession || {}
    );
  }

  getUIProps({
    hidden,
    defaultOffsetX = 0,
    defaultOffsetY = 0,
  }: CallBadgeContainerProps): UIProps<CallBadgePanelProps> {
    return {
      hidden,
      defaultOffsetX,
      defaultOffsetY,
      session: this.currentSession,
      currentLocale: this._deps.locale.currentLocale,
    };
  }

  getUIFunctions({
    goToCallCtrl,
  }: CallBadgeContainerProps): UIFunctions<CallBadgePanelProps> {
    return {
      goToCallCtrl,
      toggleMinimized: (id) => this._deps.webphone.toggleMinimized(id),
    };
  }
}

export { CallBadgeUI };

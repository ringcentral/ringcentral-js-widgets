import { Module } from '@ringcentral-integration/commons/lib/di';
import { computed, RcModuleV2 } from '@ringcentral-integration/core';

import type { Deps, Settings } from './EvSettings.interface';

@Module({
  name: 'EvSettings',
  deps: [
    'EvClient',
    'EvAuth',
    'EvAgentSession',
    'Storage',
    'Presence',
    { dep: 'EvSettingsOptions', optional: true },
  ],
})
class EvSettings extends RcModuleV2<Deps> implements Settings {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvSettings',
    });
  }

  get loginType() {
    return this._deps.evAgentSession.loginType;
  }

  get isOffhook() {
    return this._deps.presence.isOffhook;
  }

  get isOffhooking() {
    return this._deps.presence.isOffhooking;
  }

  get isManualOffhook() {
    return this._deps.presence.isManualOffhook;
  }

  @computed((that: EvSettings) => [that.isOffhooking, that.isOffhook])
  get offhookState() {
    if (this.isOffhooking) {
      return this.isOffhook ? 'disconnecting' : 'connecting';
    }

    return this.isOffhook ? 'connected' : 'disconnected';
  }

  override onInitOnce() {
    this._deps.evAgentSession.onTriggerConfig(async () => {
      this._deps.presence.setOffhookTerm();
    });
  }

  offHook() {
    this._deps.presence.setOffhooking(true);
    if (this.isOffhook) {
      this._deps.presence.setIsManualOffhook(false);
      this._deps.evClient.offhookTerm();
    } else {
      this._deps.presence.setIsManualOffhook(true);
      this._deps.evClient.offhookInit();
    }
  }
}

export { EvSettings };

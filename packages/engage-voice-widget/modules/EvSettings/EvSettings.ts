import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { Deps, Settings } from './EvSettings.interface';

@Module({
  name: 'EvSettings',
  deps: [
    'EvClient',
    'EvAuth',
    'EvAgentSession',
    'Beforeunload',
    'Storage',
    { dep: 'EvSettingsOptions', optional: true },
  ],
})
class EvSettings extends RcModuleV2<Deps> implements Settings {
  private _beforeunloadHandler = () =>
    this._deps.evAgentSession.shouldBlockBrowser;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvSettings',
    });
  }

  @storage
  @state
  isOffhook = false;

  @storage
  @state
  isManualOffhook = false;

  @storage
  @state
  isOffhooking = false;

  get loginType() {
    return this._deps.evAgentSession.loginType;
  }

  @computed((that: EvSettings) => [that.isOffhooking, that.isOffhook])
  get offhookState() {
    if (this.isOffhooking) {
      return this.isOffhook ? 'disconnecting' : 'connecting';
    }

    return this.isOffhook ? 'connected' : 'disconnected';
  }

  @action
  setIsManualOffhook(isManualOffhook: boolean) {
    this.isManualOffhook = isManualOffhook;
  }

  @action
  setOffhook(status: boolean) {
    this.isOffhook = status;
    this._checkBeforeunload();
  }

  @action
  setOffhooking(offhooking: boolean) {
    this.isOffhooking = offhooking;
  }

  @action
  setOffhookInit() {
    this.isOffhooking = false;
    this.isOffhook = true;
    this._checkBeforeunload();
  }

  @action
  setOffhookTerm() {
    this.isOffhooking = false;
    this.isOffhook = false;
    this.isManualOffhook = false;
    this._checkBeforeunload();
  }

  onInit() {
    if (
      this._deps.evAuth.isFreshLogin ||
      !this._deps.evAgentSession.isConfigTab
    ) {
      this.setOffhookTerm();
    }
  }

  offHook() {
    this.setOffhooking(true);
    if (this.isOffhook) {
      this.setIsManualOffhook(false);
      this._deps.evClient.offhookTerm();
    } else {
      this.setIsManualOffhook(true);
      this._deps.evClient.offhookInit();
    }
  }

  private _checkBeforeunload() {
    if (this.isOffhook) {
      this._deps.beforeunload.add(this._beforeunloadHandler);
    } else {
      this._deps.beforeunload.remove(this._beforeunloadHandler);
    }
  }
}

export { EvSettings };

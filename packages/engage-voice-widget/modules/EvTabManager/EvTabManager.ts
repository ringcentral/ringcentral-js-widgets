import { Module } from '@ringcentral-integration/commons/lib/di';
import { TabManager } from '@ringcentral-integration/commons/modules/TabManager';
import { action, globalStorage, state } from '@ringcentral-integration/core';
import { EventEmitter } from 'events';

import { tabManagerEvents } from '../../enums';

@Module({
  name: 'TabManager',
  deps: ['GlobalStorage'],
})
class EvTabManager extends TabManager {
  private _eventEmitter = new EventEmitter();

  @globalStorage
  @state
  mainTabId: string = null;

  setMainTabId(id: string) {
    this.setMainTabIdInThisTab(id);
    // could not use Storage module because of DI circular dependency
    this._sendTabManager(tabManagerEvents.SET_MIAN_TAB_ID, id);
  }

  @action
  setMainTabIdInThisTab(id: string) {
    this.mainTabId = id;
  }

  private _sendTabManager(event: string, value?: any) {
    this.send(event, value);
  }

  emitSetMainTabComplete() {
    console.log('_emitSetMainTabComplete~');
    this._eventEmitter.emit(tabManagerEvents.SET_MAIN_TAB_COMPLETE);
  }

  onSetMainTabComplete(callback: () => void) {
    this._eventEmitter.on(tabManagerEvents.SET_MAIN_TAB_COMPLETE, callback);
  }

  async checkIsMainTabAlive() {
    return (
      !this.enable ||
      (this.mainTabId &&
        // check if tab exist by finding in storaged tabs
        this.checkTabAliveById(this.mainTabId))
    );
  }

  get firstTabIdExcludeMainTab() {
    return (
      this.tabbie.actualTabIds.find((tab) => tab !== this.mainTabId) || null
    );
  }

  get isMainTab() {
    return !this.enable || this.mainTabId === this.id;
  }

  get prefix() {
    return this.tabbie.prefix;
  }
}

export { EvTabManager };

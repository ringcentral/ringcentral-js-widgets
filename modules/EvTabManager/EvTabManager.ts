import { action, state, globalStorage } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import { TabManager } from 'ringcentral-integration/modules/TabManagerV2';
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
    super.send(event, value);
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
      !super.enable ||
      (this.mainTabId &&
        // check if tab exist by finding in storaged tabs
        super.checkTabAliveById(this.mainTabId))
    );
  }

  get firstTabIdExcludeMainTab() {
    return (
      this.tabbie.actualTabIds.find((tab) => tab !== this.mainTabId) || null
    );
  }

  get isMainTab() {
    return !super.enable || this.mainTabId === super.id;
  }

  get prefix() {
    return this.tabbie.prefix;
  }
}

export { EvTabManager };

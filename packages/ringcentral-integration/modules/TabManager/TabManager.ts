import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import { Tabbie } from '../../lib/Tabbie';
import actionTypes from './actionTypes';
import getTabManagerReducer from './getTabManagerReducer';

interface TabManagerEvent {
  name: string;
  args: any[];
}

/**
 * @class
 * @description To handle data between different tabs
 */
@Module()
export default class TabManager extends RcModule<
  Record<string, any>,
  typeof actionTypes
> {
  _tabbie: Tabbie;

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get active() {
    return this.state.active;
  }

  get id() {
    return this._tabbie.id;
  }

  get hasMultipleTabs() {
    return this._tabbie.hasMultipleTabs;
  }

  get event(): TabManagerEvent {
    return this.state.event;
  }

  get tabs() {
    return this._tabbie.tabs;
  }

  get isFirstTab() {
    return this._tabbie.isFirstTab;
  }

  constructor({ ...options }) {
    super({
      ...options,
      actionTypes,
    });
    this._tabbie = new Tabbie({
      prefix: this.prefix,
    });
    this._reducer = getTabManagerReducer(this.actionTypes);
  }

  async initialize() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
      active: await this._tabbie.checkIsMain(),
    });

    if (this._tabbie.enabled) {
      this._tabbie.on('mainTabIdChanged', async (mainTabId) => {
        this.store.dispatch({
          type: this.actionTypes.mainTabIdChanged,
          mainTabId,
          active: await this._tabbie.checkIsMain(),
        });
      });

      this._tabbie.on('event', (event, ...args) => {
        this.store.dispatch({
          type: this.actionTypes.event,
          event,
          args,
        });
      });
    }
  }

  send(event: string, ...args: any[]) {
    this._tabbie.send(event, ...args);
  }

  async checkIsMain() {
    return this._tabbie.checkIsMain();
  }

  /**
   * check tab alive state by tabId
   * @param id tabId you want to check
   */
  checkTabAliveById(id: string) {
    return this._tabbie.checkTabAliveById(id);
  }
}

import {
  action,
  identifierKey,
  RcModuleV2,
  spawnReducersKey,
  spawnStorageReducersKey,
  state,
  usmAction,
} from '@ringcentral-integration/core';
import { combineReducers } from 'redux';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { Tabbie } from '../../lib/Tabbie';
import { Deps, TabEvent } from './TabManager.interface';

@Module({
  name: 'TabManager',
  deps: [{ dep: 'TabManagerOptions', optional: true }, 'Prefix'],
})
export class TabManager extends RcModuleV2<Deps> {
  public tabbie: Tabbie;
  constructor(deps: Deps) {
    super({
      deps,
      enableGlobalCache: deps.tabManagerOptions?.enableCache ?? false,
    });
    this.tabbie = new Tabbie({
      prefix: this._deps.prefix,
    });
  }

  @state
  id: string = null;

  @action
  protected _setId(id: string) {
    this.id = id;
  }

  /**
   * Default to true. If tabbie cannot be enabled due to env, the runtime
   * should assume active.
   */
  @state
  active = true;

  @action
  protected _setActive(active: boolean) {
    this.active = active;
  }

  @state
  event: TabEvent = null;

  @action
  protected _setEvent(event: string, args: any[]) {
    this.event = {
      name: event,
      args,
    };
  }

  _eventReducer = (state: TabEvent = null, action: any) => {
    if (action._usm === usmAction) {
      const { event } = this._getStateV2(action._state, this[identifierKey]);
      if (
        event &&
        // It needs to match the exact modification event about `@action _setEvent()` in this module for Redux state.
        // And it is a one-time state in Redux store.
        action.method === '_setEvent' &&
        action.type === this[identifierKey]
      )
        return event;
    }
    return null;
  };

  get reducer() {
    if (this._reducers)
      return combineReducers({
        ...this._reducers,
        event: this._eventReducer,
      });
    this[spawnStorageReducersKey]();
    this[spawnReducersKey]();
    return combineReducers({
      ...this._reducers,
      event: this._eventReducer,
    });
  }

  async onInitOnce() {
    this._setId(this.tabbie.id);
    if (this.tabbie.enabled) {
      this._setActive(await this.tabbie.checkIsMain());
      this.tabbie.on(this.tabbie.events.mainTabIdChanged, async () => {
        this._setActive(await this.tabbie.checkIsMain());
      });
      this.tabbie.on(
        this.tabbie.events.event,
        (event: string, ...args: any[]) => {
          this._setEvent(event, args);
        },
      );
    }
  }

  @proxify
  async send(event: string, ...args: any[]) {
    this.tabbie.send(event, ...args);
  }

  @proxify
  async checkIsMain() {
    return this.tabbie.checkIsMain();
  }

  @proxify
  async checkTabAliveById(id: string) {
    return this.tabbie.checkTabAliveById(id);
  }

  get hasMultipleTabs() {
    return this.tabbie?.hasMultipleTabs ?? false;
  }

  get tabs() {
    return this.tabbie?.tabs ?? [];
  }

  get isFirstTab() {
    return this.tabbie?.isFirstTab ?? true;
  }

  get enable() {
    return this.tabbie?.enabled;
  }
}

// For backward compatibility
export default TabManager;

import { action, RcModuleV2, state } from '@ringcentral-integration/core';
import { AnyAction } from 'redux';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import { Tabbie } from '../../lib/Tabbie';
import { Deps, TabEvent } from './TabManager.interface';

@Module({
  name: 'TabManager',
  deps: ['Brand', { dep: 'TabManagerOptions', optional: true }],
})
export class TabManager extends RcModuleV2<Deps> {
  public tabbie: Tabbie;
  constructor(deps: Deps) {
    super({
      deps,
      enableGlobalCache: deps.tabManagerOptions?.enableCache ?? false,
    });
    this.tabbie = new Tabbie({
      prefix: this._deps.brand.prefix,
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

  public getReducers(actionTypes: Record<string, string>) {
    return {
      ...super.getReducers(actionTypes),
      event: (state: TabEvent = null, action: AnyAction) => {
        if (
          actionTypes.event &&
          action.type.indexOf(actionTypes.event) > -1 &&
          action.states
        ) {
          return action.states.event;
        }
        return null;
      },
    };
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

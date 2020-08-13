import { action, RcModuleV2, state } from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { Tabbie } from '../../lib/Tabbie';
import { Deps, TabEvent } from './TabManager.interface';

@Module({
  name: 'TabManager',
  deps: ['Brand', { dep: 'TabManagerOptions', optional: true }],
})
export class TabManager extends RcModuleV2<Deps> {
  protected _tabbie: Tabbie = null;
  constructor(deps: Deps) {
    super({
      deps,
    });
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

  async onInit() {
    this._tabbie = new Tabbie({
      prefix: this._deps.brand.prefix,
    });
    if (this._tabbie.enabled) {
      this._setActive(await this._tabbie.checkIsMain());
      this._tabbie.on(this._tabbie.events.mainTabIdChanged, async () => {
        this._setActive(await this._tabbie.checkIsMain());
      });
      this._tabbie.on(
        this._tabbie.events.event,
        (event: string, ...args: any[]) => {
          this._setEvent(event, args);
        },
      );
    }
  }

  send(event: string, ...args: any[]) {
    this._tabbie.send(event, ...args);
  }

  async checkIsMain() {
    return this._tabbie.checkIsMain();
  }

  checkTabAliveById(id: string) {
    return this._tabbie.checkTabAliveById(id);
  }

  get id() {
    return this._tabbie.id;
  }

  get hasMultipleTabs() {
    return this._tabbie.hasMultipleTabs;
  }

  get tabs() {
    return this._tabbie.tabs;
  }

  get isFirstTab() {
    return this._tabbie.isFirstTab;
  }
}

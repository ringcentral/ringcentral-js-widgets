import {
  action,
  RcModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import type { Deps } from './QuickAccess.interface';

@Module({
  name: 'QuickAccess',
  deps: ['Auth', 'Webphone', { dep: 'QuickAccessOptions', optional: true }],
})
export class QuickAccess extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @state
  entered = false;

  override onInitOnce() {
    // When there is an incoming call,
    // the page should be dismissed
    watch(
      this,
      () => this._deps.webphone.ringSession,
      (ringSession) => {
        if (ringSession && this._deps.webphone.ready && !this.entered) {
          this.exit();
        }
      },
    );
  }

  override _shouldInit() {
    return this._deps.auth.ready && this.pending;
  }

  override _shouldReset() {
    return !this._deps.auth.ready && this.ready;
  }

  @action
  updatePageStatus({ entered = this.entered }: { entered?: boolean } = {}) {
    this.entered = entered;
  }

  @proxify
  async enter() {
    this.updatePageStatus({
      entered: true,
    });
  }

  @proxify
  async exit() {
    this.updatePageStatus({
      entered: false,
    });
  }
}

import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import type { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  action,
  delegate,
  dynamic,
  injectable,
  optional,
  RcModule,
  state,
  watch,
} from '@ringcentral-integration/next-core';

import type { QuickAccessOptions } from './QuickAccess.interface';

@injectable({
  name: 'QuickAccess',
})
export class QuickAccess extends RcModule {
  constructor(
    protected _auth: Auth,
    @optional('QuickAccessOptions')
    protected _quickAccessOptions?: QuickAccessOptions,
  ) {
    super();
  }

  @dynamic('Webphone')
  protected readonly _webphone?: Webphone;

  @state
  entered = false;

  override onInitOnce() {
    // When there is an incoming call,
    // the page should be dismissed
    watch(
      this,
      () => this._webphone?.ringSession,
      (ringSession) => {
        if (ringSession && this._webphone?.ready && !this.entered) {
          this.exit();
        }
      },
    );
  }

  override _shouldInit() {
    return this._auth.ready && this.pending;
  }

  override _shouldReset() {
    return !this._auth.ready && this.ready;
  }

  @action
  updatePageStatus({ entered = this.entered }: { entered?: boolean } = {}) {
    this.entered = entered;
  }

  @delegate('server')
  async enter() {
    this.updatePageStatus({
      entered: true,
    });
  }

  @delegate('server')
  async exit() {
    this.updatePageStatus({
      entered: false,
    });
  }
}

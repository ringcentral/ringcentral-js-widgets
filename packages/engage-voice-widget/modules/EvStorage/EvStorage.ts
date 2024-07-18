import { Module } from '@ringcentral-integration/commons/lib/di';
import { loginStatus } from '@ringcentral-integration/commons/modules/Auth';
import { Storage } from '@ringcentral-integration/commons/modules/Storage';

import { loginStatus as evLoginStatus } from '../../enums/loginStatus';

import type { Deps } from './EvStorage.interface';

@Module({
  name: 'Storage',
  deps: [
    'Auth',
    'EvAuth',
    { dep: 'TabManager', optional: true },
    { dep: 'StorageOptions', optional: true },
  ],
})
export class EvStorage extends Storage<Deps> {
  constructor(deps: Deps) {
    super(deps);
    this._disableInactiveTabsWrite =
      this._deps.storageOptions?.disableInactiveTabsWrite ?? true;
  }

  override _shouldInit() {
    return (
      this._deps.auth.loginStatus === loginStatus.loggedIn &&
      (!this._deps.tabManager || this._deps.tabManager.ready) &&
      this._deps.evAuth.loginStatus === evLoginStatus.LOGIN_SUCCESS &&
      this.pending
    );
  }

  override _shouldReset() {
    return (
      super._shouldReset() ||
      (this.ready && this._deps.evAuth.loginStatus === evLoginStatus.NOT_AUTH)
    );
  }

  get storageKey() {
    const { agentId } = this._deps.evAuth;
    return `${this.prefix ? `${this.prefix}-` : ''}storage-${
      this._deps.auth.ownerId
    }${agentId ? `-${agentId}` : ''}`;
  }
}

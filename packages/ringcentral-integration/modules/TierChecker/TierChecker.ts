import { RcModuleV2, watch } from '@ringcentral-integration/core';

import { permissionsMessages } from '../../enums/permissionsMessages';
import { Module } from '../../lib/di';
import { loginStatus } from '../Auth';

import type { Deps } from './TierChecker.interface';

@Module({
  name: 'TierChecker',
  deps: [
    'Auth',
    'Alert',
    'ExtensionFeatures',
    { dep: 'TierCheckerOptions', optional: true },
  ],
})
export class TierChecker extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  get crmFeature() {
    return this._deps.tierCheckerOptions?.crmFeature ?? 'SalesForce';
  }

  get isCRMEnabled() {
    return !!this._deps.extensionFeatures.features?.[this.crmFeature]
      ?.available;
  }

  get enforceCRMFeature() {
    return this._deps.tierCheckerOptions?.enforceCRMFeature ?? true;
  }

  override onInitOnce() {
    watch(
      this,
      () => [
        this.ready,
        this._deps.auth.loginStatus === loginStatus.loggedIn,
        this.enforceCRMFeature,
        this.isCRMEnabled,
      ],
      async ([ready, loggedIn, enforceCRMFeature, isCRMEnabled]) => {
        if (ready && loggedIn && enforceCRMFeature && !isCRMEnabled) {
          await this._deps.auth.logout();
          this._deps.alert.danger({
            message: permissionsMessages.invalidTier,
            ttl: 0,
          });
        }
      },
      {
        multiple: true,
      },
    );
  }
}

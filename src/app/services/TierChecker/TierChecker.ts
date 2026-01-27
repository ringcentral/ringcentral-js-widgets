import {
  Brand,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  inject,
  injectable,
  RcModule,
  watch,
} from '@ringcentral-integration/next-core';

import { Auth, loginStatus } from '../Auth';
import { ExtensionFeatures } from '../ExtensionFeatures';

import type { TierCheckerOptions } from './TierChecker.interface';
import { t } from './i18n';

@injectable({
  name: 'TierChecker',
})
export class TierChecker extends RcModule {
  constructor(
    protected _auth: Auth,
    protected _toast: Toast,
    protected _extensionFeatures: ExtensionFeatures,
    protected _brand: Brand,
    @inject('TierCheckerOptions')
    protected _tierCheckerOptions: TierCheckerOptions,
  ) {
    super();
  }

  get crmFeature() {
    return this._tierCheckerOptions.crmFeature;
  }

  get isCRMEnabled() {
    return !!this._extensionFeatures.features?.[this.crmFeature]?.available;
  }

  override onInitOnce() {
    watch(
      this,
      () =>
        [
          this.ready,
          this._auth.loginStatus === loginStatus.loggedIn,
          this.isCRMEnabled,
        ] as const,
      async ([ready, loggedIn, isCRMEnabled]) => {
        this.checkIsInvalidTier({
          ready,
          loggedIn,
          isCRMEnabled,
        });
      },
      {
        multiple: true,
      },
    );
  }

  private async checkIsInvalidTier({
    ready,
    loggedIn,
    isCRMEnabled,
  }: {
    ready: boolean;
    loggedIn: boolean;
    isCRMEnabled: boolean;
  }) {
    if (ready && loggedIn && !isCRMEnabled) {
      await this._auth.logout({ reason: 'Invalid tier' });
      this._toast.danger({
        message: t('invalidTier', {
          brand: this._brand.name,
          application: this._brand.appName as string,
        }),
        ttl: 0,
      });
    }
  }
}

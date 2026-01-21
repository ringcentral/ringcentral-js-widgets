import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Section } from '@ringcentral-integration/micro-setting/src/app/components/Section';
import {
  autobind,
  optional,
  injectable,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import React from 'react';

import type { AALOptions } from '../AutoCallLogICSettings.view.interface';
import { SettingsCard } from '../components/SettingsCard';
import i18n from '../i18n';

@injectable({
  name: 'RecordMatchingSettingsView',
})
export class RecordMatchingSettingsView extends RcViewModule {
  constructor(
    protected _router: RouterPlugin,
    @optional('AalOptions')
    protected _aalOptions?: AALOptions,
  ) {
    super();
  }

  @autobind
  protected MainContent() {
    const { t } = useLocale(i18n);
    const { multiMatchStrategy, logCallsUnknownNumber } = useConnector(() => {
      const configuration = this._aalOptions?.autoCallLoggingPreference;

      return {
        multiMatchStrategy: configuration?.logCallsMultipleMatches,
        logCallsUnknownNumber: configuration?.logCallsUnknownNumber,
      };
    });

    return null;
  }

  component() {
    const { t } = useLocale(i18n);

    const title = t('recordMatching');

    return (
      <>
        <AppHeaderNav override>
          <PageHeader
            onBackClick={() =>
              this._router.push('/settings/autoCallLogSettings')
            }
          >
            <span
              className="sui-text sui-text-root truncate"
              title={title}
              data-sign="record-matching-ic-settings-title"
            >
              {title}
            </span>
          </PageHeader>
        </AppHeaderNav>
        <div
          className="px-4 flex flex-col gap-6 mb-6"
          data-sign="record-matching-ic-settings"
        >
          <this.MainContent />
        </div>
        <AppFooterNav />
      </>
    );
  }
}

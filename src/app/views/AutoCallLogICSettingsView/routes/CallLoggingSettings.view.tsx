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
import { Divider } from '@ringcentral/spring-ui';
import React from 'react';

import type { AALOptions } from '../AutoCallLogICSettings.view.interface';
import { SettingsCard } from '../components/SettingsCard';
import i18n from '../i18n';

@injectable({
  name: 'CallLoggingSettingsView',
})
export class CallLoggingSettingsView extends RcViewModule {
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
    const { configuration } = useConnector(() => ({
      configuration: this._aalOptions?.autoCallLoggingPreference,
    }));

    return (
      <Section label={t('setWhichCallsToAutoLog')} info={t('callLoggingInfo')}>
        <div className="flex flex-col">

          <Divider className="mx-4" />
        </div>
      </Section>
    );
  }

  component() {
    const { t } = useLocale(i18n);

    const title = t('callLogging');

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
              data-sign="call-logging-ic-settings-title"
            >
              {title}
            </span>
          </PageHeader>
        </AppHeaderNav>
        <div className="h-full px-4" data-sign="call-logging-ic-settings">
          <this.MainContent />
        </div>
        <AppFooterNav />
      </>
    );
  }
}

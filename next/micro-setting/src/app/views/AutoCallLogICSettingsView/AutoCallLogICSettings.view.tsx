import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import {
  injectable,
  RcViewModule,
  RouterPlugin,
} from '@ringcentral-integration/next-core';
import {
  LinkLine,
  PageHeader,
} from '@ringcentral-integration/next-widgets/components';
import React from 'react';

import { Section } from '../../components/Section';

import i18n from './i18n';

@injectable({
  name: 'AutoCallLogICSettingsView',
})
export class AutoCallLogICSettingsView extends RcViewModule {
  constructor(private _router: RouterPlugin, private _theme: Theme) {
    super();
  }

  private uiFunctions = {
    openCallLoggingSettings: () =>
      this._router.push('/settings/autoCallLogSettings/callLogging'),
    openRecordMatchingSettings: () =>
      this._router.push('/settings/autoCallLogSettings/recordMatching'),
  };

  component() {
    const { t } = useLocale(i18n);
    const { openCallLoggingSettings, openRecordMatchingSettings } =
      this.uiFunctions;

    const title = t('autoLogCalls');

    return (
      <>
        <AppHeaderNav override>
          <PageHeader
            onBackClick={() =>
              slideOutViewTransition(
                () => this._router.push('/settings'),
                this._theme.reducedMotion,
              )
            }
          >
            <span
              className="sui-text sui-text-root truncate"
              title={title}
              data-sign="autoCallLogOptions-title"
            >
              {title}
            </span>
          </PageHeader>
        </AppHeaderNav>
        <div className="h-full px-4" data-sign="autoCallLogOptions">
          <Section label={t('autoLogCalls')}>
            <LinkLine onClick={openCallLoggingSettings} data-sign="callLogging">
              {t('callLogging')}
            </LinkLine>

            <LinkLine
              onClick={openRecordMatchingSettings}
              data-sign="recordMatching"
            >
              {t('recordMatching')}
            </LinkLine>
          </Section>
        </div>
        <AppFooterNav />
      </>
    );
  }
}

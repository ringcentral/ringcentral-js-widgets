import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Brand,
  type Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import { track } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  delegate,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import {
  PageHeader as OldPageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '@ringcentral-integration/next-widgets/deprecated/components/PageHeader';
import { ArrowRightUpMd } from '@ringcentral/spring-icon';
import { Button, Divider, Icon, Link, Text } from '@ringcentral/spring-ui';
import React from 'react';

import { trackEvents } from '../../../enums/trackEvents';
import { CPRClientView } from '../../views/CPRClientView';

import type {
  IssuesTrackingViewOptions,
  IssuesTrackingViewProps,
} from './IssuesTracking.view.interface';
import i18n from './i18n';

@injectable({
  name: 'IssuesTrackingView',
})
export class IssuesTrackingView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    private _router: RouterPlugin,
    private _brand: Brand,
    private _cPRClientView: CPRClientView,
    @optional('IssuesTrackingViewOptions')
    private _issuesTrackingViewOptions?: IssuesTrackingViewOptions,
  ) {
    super();
  }

  @delegate('server')
  private async goBack(route = '/settings') {
    await this._router.push(route);
  }

  @track(trackEvents.supportCaseCreated)
  private openSupportCase(supportLink: string) {
    window.open(supportLink, '_blank');
  }

  component({ backRoute }: Partial<IssuesTrackingViewProps>) {
    const { eulaLink, privacyNotice, supportLink, brandName } = useConnector(
      () => ({
        eulaLink: this._brand.brandConfig.eulaLink as string,
        privacyNotice: this._brand.brandConfig.privacyNotice as string,
        supportLink: this._brand.brandConfig.supportLink as string,
        brandName: this._brand.brandConfig.name as string,
      }),
    );

    const { t } = useLocale(i18n);

    const showHeader = this._issuesTrackingViewOptions?.showHeader ?? true;

    return (
      <>
        {showHeader &&
          (process.env.THEME_SYSTEM === 'spring-ui' ? (
            <AppHeaderNav override>
              <PageHeader
                onBackClick={() =>
                  slideOutViewTransition(
                    () => this.goBack(backRoute),
                    this._theme?.reducedMotion,
                  )
                }
              >
                {t('header')}
              </PageHeader>
            </AppHeaderNav>
          ) : (
            <OldPageHeader>
              <PageHeaderBack onClick={() => this.goBack(backRoute)} />
              <PageHeaderTitle>{t('header')}</PageHeaderTitle>
              <PageHeaderRemain />
            </OldPageHeader>
          ))}
        <main className="flex flex-col gap-6 flex-auto overflow-y-auto overflow-x-hidden px-4 py-2">
          <div>
            <Text
              className="typography-subtitle font-bold mb-2 text-neutral-b0"
              component="p"
            >
              {t('step1Title')}
            </Text>
            <Text
              data-sign="step1Desc"
              className="typography-mainText mb-4 text-neutral-b2"
              component="p"
            >
              {t('step1Description')}
            </Text>
            <div>
              <Button
                className="typography-subtitle mt-4"
                fullWidth
                data-sign="createSupportTicketBtn"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Icon symbol={ArrowRightUpMd}></Icon>}
                onClick={() => this.openSupportCase(supportLink)}
              >
                {t('supportTicketBtn')}
              </Button>
            </div>
          </div>
          <Divider />
          <this._cPRClientView.component />
          <div>
            <Text
              data-sign="privacyNoticeDesc"
              className="text-xs text-neutral-b2"
              component="p"
            >
              {t('privacyNotice', { brandName })}
              <Link
                data-sign="privacyNoticeLink"
                href={eulaLink as string}
                target="_blank"
              >
                {t('privacyNoticeLink')}
              </Link>
              {t('and')}
              <Link
                data-sign="privacyNoticeEnd"
                href={privacyNotice as string}
                target="_blank"
              >
                {t('privacyNoticeEnd')}
              </Link>
            </Text>
          </div>
        </main>
        <AppFooterNav />
      </>
    );
  }
}

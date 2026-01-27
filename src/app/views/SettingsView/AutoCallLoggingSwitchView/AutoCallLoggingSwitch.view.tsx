import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { trackEvent } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideInViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import type { AALOptions } from '@ringcentral-integration/micro-setting/src/app/views';
import {
  computed,
  inject,
  injectable,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import React from 'react';

import { IntegrationConfig } from '../../../services';

import type { AutoCallLoggingSwitchViewProps } from './AutoCallLoggingSwitch.view.interface';
import { AutoCallLoggingSwitchLineItem } from './AutoCallLoggingSwitch/AutoCallLoggingSwitchLineItem';

export const getBrandedIntegrationConsoleEndpoint = (
  integrationConsoleEndpoint: string,
  brandConfig: BaseBrandConfig,
) => {
  if (brandConfig.code !== 'rc' && brandConfig.code !== 'att') {
    const url = new URL(integrationConsoleEndpoint);
    url.searchParams.set('brandId', brandConfig.id);
    const href = url.toString();
    // Remove the root trailing slash only when it sits right before the query string
    // e.g. https://example.com/?a=b -> https://example.com?a=b
    const normalized = href.replace('/?', '?');
    return normalized;
  }

  return integrationConsoleEndpoint;
};

@injectable({
  name: 'AutoCallLoggingSwitchView',
})
export class AutoCallLoggingSwitchView extends RcViewModule {
  constructor(
    private _brand: Brand,
    private _router: RouterPlugin,
    private _theme: Theme,
    @inject('AalOptions')
    private _aalOptions: AALOptions,
    private _integrationConfig: IntegrationConfig,
  ) {
    super();
  }

  private handleAutoCallLogSettingLinkClick() {
    const isAdmin = !!this._aalOptions.isAdmin;
    const remoteAutoLogEnabled = !!this._aalOptions.remoteAutoLog;

    const trackProps = {
      CRM: this._integrationConfig.name,
    };

    // when server side AAL is enabled, open the external link if the user is admin, otherwise go to the auto log settings page
    const openExternalLink = remoteAutoLogEnabled ? isAdmin : true;

    if (openExternalLink) {
      trackEvent<any>(trackEvents.clickOnIntegrationConsole, trackProps);

      const link =
        remoteAutoLogEnabled || isAdmin
          ? this.aalEndpointWithBrandId
          : this._aalOptions.endUserGuideLink;

      window.open(link, '_blank');
    } else {
      trackEvent<any>(trackEvents.clickOnTryEnhancedCallLogLink, trackProps);

      slideInViewTransition(
        () => this._router.push('/settings/autoCallLogSettings'),
        this._theme.reducedMotion,
      );
    }
  }

  @computed
  private get aalEndpointWithBrandId() {
    return getBrandedIntegrationConsoleEndpoint(
      this._aalOptions.endpoint,
      this._brand.brandConfig,
    );
  }

  getUIProps() {
    return {
      featureEnabled: this._aalOptions.featureEnabled,
      isAdmin: !!this._aalOptions.isAdmin,
      localAutoLog: !!this._aalOptions.localAutoLog,
      remoteAutoLog: !!this._aalOptions.remoteAutoLog,
      disableAutoLogControl: !!this._aalOptions.disableAutoLogControl,
    };
  }

  component(props: AutoCallLoggingSwitchViewProps) {
    const _props = useConnector(() => ({
      ...this.getUIProps(),
      ...props,
    }));

    return (
      <AutoCallLoggingSwitchLineItem
        {..._props}
        onChange={this._aalOptions.onLocalAutoLogChange}
        onAutoCallLogSettingLinkClick={() =>
          this.handleAutoCallLogSettingLinkClick()
        }
      />
    );
  }
}

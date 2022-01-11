import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import { AlertRenderer } from '../../components/AlertRenderer';
import {
  NotificationMessage,
  NotificationPanelProps,
} from '../../components/NotificationPanel/NotificationPanel.interface';
import { NotificationContainerProps } from '../../containers/NotificationContainer/NotificationContainer.interface';
import { Deps } from './AlertUI.interface';

@Module({
  name: 'AlertUI',
  deps: [
    'Brand',
    'Alert',
    'Locale',
    'RouterInteraction',
    {
      dep: 'RateLimiter',
      optional: true,
    },
    {
      dep: 'Softphone',
      optional: true,
    },
    {
      dep: 'CallLogSection',
      optional: true,
    },
  ],
})
export class AlertUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  getUIProps({
    className,
    classes,
    size,
    messageAlign,
    fullWidth,
  }: NotificationContainerProps): UIProps<NotificationPanelProps> {
    return {
      className,
      classes,
      size,
      messageAlign,
      fullWidth,
      currentLocale: this._deps.locale.currentLocale,
      messages: this._deps.alert.messages as NotificationMessage[],
      brand: this._deps.brand.name,
    };
  }

  getUIFunctions({
    getAdditionalRenderer,
    regionSettingsUrl,
    callingSettingsUrl,
  }: NotificationContainerProps): UIFunctions<NotificationPanelProps> {
    return {
      getRenderer: (message: NotificationMessage) => {
        if (getAdditionalRenderer) {
          const renderer = getAdditionalRenderer()(message);
          if (renderer) {
            return renderer;
          }
        }
        const {
          alert,
          brand,
          softphone,
          rateLimiter,
          routerInteraction,
          callLogSection,
        } = this._deps;
        // TODO: It would be better to refactor alertUI like modalUI.registerRenderer.
        return AlertRenderer({
          alert,
          brand,
          // support jupiterAppName with dynamicConfig, should remove this and use brandConfig
          // instead once dynamicConfig module is deprecated
          softphone,
          rateLimiter,
          routerInteraction,
          callLogSection,
          regionSettingsUrl,
          callingSettingsUrl,
        })(message);
      },
      dismiss: (id: string) => this._deps.alert.dismiss(id),
    };
  }
}

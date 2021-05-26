import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
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
      brand: this._deps.brand.fullName,
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
        return AlertRenderer(
          this._deps.alert,
          this._deps.brand,
          this._deps.rateLimiter,
          this._deps.routerInteraction,
          regionSettingsUrl,
          callingSettingsUrl,
        )(message);
      },
      dismiss: (id: string) => this._deps.alert.dismiss(id),
    };
  }
}

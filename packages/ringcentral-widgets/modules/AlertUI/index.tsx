import React from 'react';
import { Module } from 'ringcentral-integration/lib/di';

import RcUIModule from '../../lib/RcUIModule';
import AuthAlert from '../../components/AuthAlert';
import CallAlert from '../../components/CallAlert';
import CallingSettingsAlert from '../../components/CallingSettingsAlert';
import ConferenceAlert from '../../components/ConferenceAlert';
import ConferenceCallAlert from '../../components/ConferenceCallAlert';
import ConnectivityAlert from '../../components/ConnectivityAlert';
import MeetingAlert from '../../components/MeetingAlert';
import MessageSenderAlert from '../../components/MessageSenderAlert';
import MessageStoreAlert from '../../components/MessageStoreAlert';
import RateExceededAlert from '../../components/RateExceededAlert';
import RegionSettingsAlert from '../../components/RegionSettingsAlert';
import RolesAndPermissionsAlert from '../../components/RolesAndPermissionsAlert';
import WebphoneAlert from '../../components/WebphoneAlert';
import AudioSettingsAlert from '../../components/AudioSettingsAlert';
import CallLogAlert from '../../components/CallLogAlert';
import CallControlAlert from '../../components/CallControlAlert';

@Module({
  name: 'AlertUI',
  deps: ['Brand', 'Alert', 'Locale', 'RouterInteraction', 'RateLimiter'],
})
export default class AlertUI extends RcUIModule {
  getUIProps({ phone: { locale, brand, alert } }) {
    return {
      currentLocale: locale.currentLocale,
      messages: alert.messages,
      brand: brand.fullName,
    };
  }

  getUIFunctions({
    phone: { alert, brand, routerInteraction, rateLimiter },
    regionSettingsUrl,
    callingSettingsUrl,
    getAdditionalRenderer,
  }) {
    const getRenderer = this.getDefaultRenderer(
      alert,
      brand,
      rateLimiter,
      routerInteraction,
      regionSettingsUrl,
      callingSettingsUrl,
    );
    const additionalRenderer = getAdditionalRenderer && getAdditionalRenderer();
    return {
      getRenderer: (message: any) => {
        if (additionalRenderer) {
          const renderer = additionalRenderer(message);
          if (renderer) return renderer;
        }
        return getRenderer(message);
      },
      dismiss: (id) => alert.dismiss(id),
    };
  }

  getDefaultRenderer(
    alert,
    brand,
    rateLimiter,
    routerInteraction,
    regionSettingsUrl,
    callingSettingsUrl,
  ) {
    const onRegionSettingsLinkClick = ({ alertId = 'default' } = {}) => {
      routerInteraction.push(regionSettingsUrl);
      if (alertId) {
        alert.dismiss(alertId);
      }
    };
    const onCallingSettingsLinkClick = () => {
      routerInteraction.push(callingSettingsUrl);
    };
    return (message) => {
      if (AuthAlert.handleMessage(message)) {
        return AuthAlert;
      }
      if (CallAlert.handleMessage(message)) {
        return (props) => (
          <CallAlert
            {...props}
            brand={brand}
            onAreaCodeLinkClick={onRegionSettingsLinkClick}
          />
        );
      }
      if (CallingSettingsAlert.handleMessage(message)) {
        return (props) => (
          <CallingSettingsAlert
            {...props}
            brand={brand.fullName}
            onCallingSettingsLinkClick={onCallingSettingsLinkClick}
          />
        );
      }

      if (RegionSettingsAlert.handleMessage(message)) {
        return (props) => (
          <RegionSettingsAlert
            {...props}
            onRegionSettingsLinkClick={onRegionSettingsLinkClick}
          />
        );
      }

      if (MessageSenderAlert.handleMessage(message)) {
        return (props) => (
          <MessageSenderAlert
            {...props}
            brand={brand.fullName}
            onAreaCodeLink={onRegionSettingsLinkClick}
          />
        );
      }

      if (MessageStoreAlert.handleMessage(message)) {
        return MessageStoreAlert;
      }

      if (RateExceededAlert.handleMessage(message)) {
        return (props) => (
          <RateExceededAlert
            {...props}
            timestamp={rateLimiter.timestamp}
            duration={rateLimiter._throttleDuration}
          />
        );
      }

      if (ConnectivityAlert.handleMessage(message)) {
        return ConnectivityAlert;
      }

      if (WebphoneAlert.handleMessage(message)) {
        return (props) => <WebphoneAlert {...props} brand={brand} />;
      }
      if (MeetingAlert.handleMessage(message)) {
        return (props) => (
          <MeetingAlert {...props} application={brand.appName} />
        );
      }
      if (RolesAndPermissionsAlert.handleMessage(message)) {
        return (props) => (
          <RolesAndPermissionsAlert
            {...props}
            brand={brand.fullName}
            application={brand.appName}
          />
        );
      }

      if (ConferenceAlert.handleMessage(message)) {
        return ConferenceAlert;
      }

      if (ConferenceCallAlert.handleMessage(message)) {
        return ConferenceCallAlert;
      }

      if (AudioSettingsAlert.handleMessage(message)) {
        return (props) => (
          <AudioSettingsAlert {...props} application={brand.appName} />
        );
      }

      if (CallLogAlert.handleMessage(message)) {
        return (props) => <CallLogAlert {...props} />;
      }
      if (CallControlAlert.handleMessage(message)) {
        return (props) => <CallControlAlert {...props} />;
      }

      return undefined;
    };
  }
}

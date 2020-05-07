import React from 'react';

import AudioSettingsAlert from './AudioSettingsAlert';
import AuthAlert from './AuthAlert';
import CallAlert from './CallAlert';
import CallControlAlert from './CallControlAlert';
import CallingSettingsAlert from './CallingSettingsAlert';
import CallLogAlert from './CallLogAlert';
import ConferenceAlert from './ConferenceAlert';
import ConferenceCallAlert from './ConferenceCallAlert';
import ConnectivityAlert from './ConnectivityAlert';
import MeetingAlert from './MeetingAlert';
import MessageSenderAlert from './MessageSenderAlert';
import MessageStoreAlert from './MessageStoreAlert';
import RateExceededAlert from './RateExceededAlert';
import RegionSettingsAlert from './RegionSettingsAlert';
import RolesAndPermissionsAlert from './RolesAndPermissionsAlert';
import WebphoneAlert from './WebphoneAlert';

export function AlertRenderer(
  alert,
  brand,
  rateLimiter,
  /** router interaction when need push `regionSettingsUrl` or `callingSettingsUrl` */
  routerInteraction,
  regionSettingsUrl = '/settings/region',
  callingSettingsUrl = '/settings/calling',
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
      return (props) => <MeetingAlert {...props} application={brand.appName} />;
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

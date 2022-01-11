import React from 'react';

import AudioSettingsAlert from './AudioSettingsAlert';
import AuthAlert from './AuthAlert';
import CallAlert from './CallAlert';
import CallControlAlert from './CallControlAlert';
import { CallingSettingsAlert } from './CallingSettingsAlert';
import CallLogAlert from './CallLogAlert';
import ConferenceAlert from './ConferenceAlert';
import ConferenceCallAlert from './ConferenceCallAlert';
import ConnectivityAlert from './ConnectivityAlert';
import MeetingAlert from './MeetingAlert';
import MessageSenderAlert from './MessageSenderAlert';
import MessageStoreAlert from './MessageStoreAlert';
import { PermissionsAlert } from './PermissionsAlert';
import RateExceededAlert from './RateExceededAlert';
import { RegionSettingsAlert } from './RegionSettingsAlert';
import WebphoneAlert from './WebphoneAlert';

export const AlertRenderer = ({
  alert,
  brand,
  rateLimiter,
  softphone,
  /** router interaction when need push `regionSettingsUrl` or `callingSettingsUrl` */
  routerInteraction,
  callLogSection,
  regionSettingsUrl = '/settings/region',
  callingSettingsUrl = '/settings/calling',
}) => {
  // TODO: refactor this like modalUI.registerRenderer.
  const onRegionSettingsLinkClick = ({ alertId = 'default' } = {}) => {
    routerInteraction.push(regionSettingsUrl);
    if (alertId) {
      alert.dismiss(alertId);
    }
    if (callLogSection) {
      callLogSection.closeLogSection();
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
          brandName={brand.name}
          softphoneAppName={brand.brandConfig.callWithSoftphone?.name}
          jupiterAppName={softphone?.jupiterAppName}
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
          brand={brand.name}
          onAreaCodeLink={onRegionSettingsLinkClick}
        />
      );
    }

    if (MessageStoreAlert.handleMessage(message)) {
      return MessageStoreAlert;
    }

    if (RateExceededAlert.handleMessage(message) && rateLimiter?.timestamp) {
      return (props) => (
        <RateExceededAlert
          {...props}
          timestamp={rateLimiter.timestamp}
          duration={rateLimiter.throttleDuration}
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
    if (PermissionsAlert.handleMessage(message)) {
      return (props) => (
        <PermissionsAlert
          {...props}
          brand={brand.name}
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
};

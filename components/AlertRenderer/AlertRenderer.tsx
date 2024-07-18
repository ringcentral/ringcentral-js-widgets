import React from 'react';

import AudioSettingsAlert from './AudioSettingsAlert';
import AuthAlert from './AuthAlert';
import { CallAlert } from './CallAlert';
import CallControlAlert from './CallControlAlert';
import CallLogAlert from './CallLogAlert';
import { CallingSettingsAlert } from './CallingSettingsAlert';
import ConferenceCallAlert from './ConferenceCallAlert';
import ConnectivityAlert from './ConnectivityAlert';
import IssueTrackingAlert from './IssueTrackingAlert';
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
}: any) => {
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
  return (message: any) => {
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (AuthAlert.handleMessage(message)) {
      return AuthAlert;
    }
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (CallAlert.handleMessage(message)) {
      return (props: any) => (
        <CallAlert
          {...props}
          brand={brand}
          onAreaCodeLinkClick={onRegionSettingsLinkClick}
        />
      );
    }
    if (CallingSettingsAlert.handleMessage(message)) {
      return (props: any) => (
        <CallingSettingsAlert
          {...props}
          brandName={brand.name}
          softphoneAppName={brand.brandConfig.callWithSoftphone?.name}
          jupiterAppName={softphone?.jupiterAppName}
          onCallingSettingsLinkClick={onCallingSettingsLinkClick}
        />
      );
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (RegionSettingsAlert.handleMessage(message)) {
      return (props: any) => (
        <RegionSettingsAlert
          {...props}
          onRegionSettingsLinkClick={onRegionSettingsLinkClick}
        />
      );
    }
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'F... Remove this comment to see the full error message
    if (IssueTrackingAlert.handleMessage(message)) {
      return (props: any) => (
        <IssueTrackingAlert {...props} brand={brand.name} />
      );
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'F... Remove this comment to see the full error message
    if (MessageSenderAlert.handleMessage(message)) {
      return (props: any) => (
        <MessageSenderAlert
          {...props}
          brand={brand.name}
          onAreaCodeLink={onRegionSettingsLinkClick}
        />
      );
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (MessageStoreAlert.handleMessage(message)) {
      return MessageStoreAlert;
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 't... Remove this comment to see the full error message
    if (RateExceededAlert.handleMessage(message) && rateLimiter?.timestamp) {
      return (props: any) => (
        <RateExceededAlert
          {...props}
          timestamp={rateLimiter.timestamp}
          duration={rateLimiter.throttleDuration}
        />
      );
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (ConnectivityAlert.handleMessage(message)) {
      return ConnectivityAlert;
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (WebphoneAlert.handleMessage(message)) {
      return (props: any) => <WebphoneAlert {...props} brand={brand} />;
    }
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (MeetingAlert.handleMessage(message)) {
      return (props: any) => (
        <MeetingAlert {...props} application={brand.appName} />
      );
    }
    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (PermissionsAlert.handleMessage(message)) {
      return (props: any) => (
        <PermissionsAlert
          {...props}
          brand={brand.name}
          application={brand.appName}
        />
      );
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (ConferenceCallAlert.handleMessage(message)) {
      return ConferenceCallAlert;
    }

    // @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
    if (AudioSettingsAlert.handleMessage(message)) {
      return (props: any) => (
        <AudioSettingsAlert {...props} application={brand.appName} />
      );
    }

    if (CallLogAlert.handleMessage(message)) {
      // @ts-expect-error TS(2786): 'CallLogAlert' cannot be used as a JSX component.
      return (props: any) => <CallLogAlert {...props} />;
    }
    if (CallControlAlert.handleMessage(message)) {
      // @ts-expect-error TS(2786): 'CallControlAlert' cannot be used as a JSX compone... Remove this comment to see the full error message
      return (props: any) => <CallControlAlert {...props} />;
    }

    return () => null;
  };
};

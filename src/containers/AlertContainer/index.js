import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from 'ringcentral-integration/modules/Alert';
import Locale from 'ringcentral-integration/modules/Locale';

import AnimationAlert from '../../components/AnimationAlert';

import AuthAlert from '../../components/AuthAlert';
import CallAlert from '../../components/CallAlert';
import CallingSettingsAlert from '../../components/CallingSettingsAlert';
import RegionSettingsAlert from '../../components/RegionSettingsAlert';
import MessageSenderAlert from '../../components/MessageSenderAlert';
import RateExceededAlert from '../../components/RateExceededAlert';
import ConnectivityAlert from '../../components/ConnectivityAlert';
import WebphoneAlert from '../../components/WebphoneAlert';
import MeetingAlert from '../../components/MeetingAlert';
import RolesAndPermissionsAlert from '../../components/RolesAndPermissionsAlert';
import withPhone from '../../lib/withPhone';


function mapToProps(_, {
  phone: {
    locale,
    alert,
  },
}) {
  return {
    currentLocale: locale.currentLocale,
    messages: alert.messages,
  };
}

function getDefaultRenderer({
  rateLimiter,
  brand,
  routerInteraction,
  regionSettingsUrl,
  callingSettingsUrl,
}) {
  const onRegionSettingsLinkClick = () => {
    routerInteraction.push(regionSettingsUrl);
  };
  const onCallingSettingsLinkClick = () => {
    routerInteraction.push(callingSettingsUrl);
  };
  return (message) => {
    if (AuthAlert.handleMessage(message)) {
      return AuthAlert;
    }
    if (CallAlert.handleMessage(message)) {
      return props => (
        <CallAlert
          {...props}
          brand={brand}
          onAreaCodeLinkClick={onRegionSettingsLinkClick}
        />
      );
    }
    if (CallingSettingsAlert.handleMessage(message)) {
      return props => (
        <CallingSettingsAlert
          {...props}
          brand={brand.fullName}
          onCallingSettingsLinkClick={onCallingSettingsLinkClick}
        />
      );
    }

    if (RegionSettingsAlert.handleMessage(message)) {
      return props => (
        <RegionSettingsAlert
          {...props}
          onRegionSettingsLinkClick={onRegionSettingsLinkClick}
        />
      );
    }

    if (MessageSenderAlert.handleMessage(message)) {
      return props => (
        <MessageSenderAlert
          {...props}
          onAreaCodeLink={onRegionSettingsLinkClick}
        />
      );
    }

    if (RateExceededAlert.handleMessage(message)) {
      return props => (
        <RateExceededAlert
          {...props}
          timestamp={rateLimiter.timestamp}
          duration={rateLimiter._throttleDuration} />
      );
    }

    if (ConnectivityAlert.handleMessage(message)) {
      return ConnectivityAlert;
    }

    if (WebphoneAlert.handleMessage(message)) {
      return WebphoneAlert;
    }
    if (MeetingAlert.handleMessage(message)) {
      return MeetingAlert;
    }
    if (RolesAndPermissionsAlert.handleMessage(message)) {
      return props => (
        <RolesAndPermissionsAlert
          {...props}
          brand={brand.fullName}
          application={brand.application} />
      );
    }

    return undefined;
  };
}

function mapToFunctions(_, {
  phone: {
    rateLimiter,
    brand,
    alert,
    routerInteraction,
  },
  regionSettingsUrl,
  callingSettingsUrl,
  getRenderer = getDefaultRenderer({
    rateLimiter,
    brand,
    routerInteraction,
    regionSettingsUrl,
    callingSettingsUrl,
  }),
}) {
  return {
    getRenderer,
    dismiss: (id) => {
      alert.dismiss(id);
    },
  };
}

const AlertContainer = withPhone(connect(
  mapToProps,
  mapToFunctions
)(AnimationAlert));

export default AlertContainer;

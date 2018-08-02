import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from 'ringcentral-integration/modules/Alert';
import Locale from 'ringcentral-integration/modules/Locale';

import AnimationAlert from '../../components/AnimationAlert';

import AuthAlert from '../../components/AuthAlert';
import CallAlert from '../../components/CallAlert';
import CallLogAlert from '../../components/CallLogAlert';
import CallingSettingsAlert from '../../components/CallingSettingsAlert';
import RegionSettingsAlert from '../../components/RegionSettingsAlert';
import MessageSenderAlert from '../../components/MessageSenderAlert';
import RateExceededAlert from '../../components/RateExceededAlert';
import ConnectivityAlert from '../../components/ConnectivityAlert';
import WebphoneAlert from '../../components/WebphoneAlert';
import MessageStoreAlert from '../../components/MessageStoreAlert';
import MeetingAlert from '../../components/MeetingAlert';
import AudioSettingsAlert from '../../components/AudioSettingsAlert';
import RolesAndPermissionsAlert from '../../components/RolesAndPermissionsAlert';
import withPhone from '../../lib/withPhone';
import ConferenceAlert from '../../components/ConferenceAlert/index';
import ConferenceCallAlert from '../../components/ConferenceCallAlert/index';
import AddCallAlert from '../../components/AddCallAlert/';


function mapToProps(_, {
  phone: {
    locale,
    alert,
    brand
  },
}) {
  return {
    currentLocale: locale.currentLocale,
    messages: alert.messages,
    brand: brand.fullName
  };
}

function getDefaultRenderer({
  rateLimiter,
  brand,
  alert,
  routerInteraction,
  regionSettingsUrl,
  callingSettingsUrl,
}) {
  const onRegionSettingsLinkClick = ({ alertId } = {}) => {
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
          brand={brand.fullName}
          onAreaCodeLink={onRegionSettingsLinkClick}
        />
      );
    }

    if (MessageStoreAlert.handleMessage(message)) {
      return MessageStoreAlert;
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
      return props => (
        <WebphoneAlert
          {...props}
          brand={brand}
        />
      );
    }
    if (MeetingAlert.handleMessage(message)) {
      return MeetingAlert;
    }
    if (RolesAndPermissionsAlert.handleMessage(message)) {
      return props => (
        <RolesAndPermissionsAlert
          {...props}
          brand={brand.fullName}
          application={brand.appName} />
      );
    }

    if (ConferenceAlert.handleMessage(message)) {
      return ConferenceAlert;
    }

    if (ConferenceCallAlert.handleMessage(message)) {
      return ConferenceCallAlert;
    }

    if (AudioSettingsAlert.handleMessage(message)) {
      return props => (
        <AudioSettingsAlert
          {...props}
          application={brand.appName}
        />
      );
    }

    if (CallLogAlert.handleMessage(message)) {
      return props => (
        <CallLogAlert
          {...props}
        />
      );
    }
    if (AddCallAlert.handleMessage(message)) {
      return props => (
        <AddCallAlert
          {...props}
        />
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
    alert,
    routerInteraction,
    regionSettingsUrl,
    callingSettingsUrl,
  }),
  getAdditionalRenderer,
}) {
  const additionalRenderer = getAdditionalRenderer && getAdditionalRenderer();
  return {
    getRenderer(message) {
      if (additionalRenderer) {
        const renderer = additionalRenderer(message);
        if (renderer) return renderer;
      }
      return getRenderer(message);
    },
    dismiss(id) {
      alert.dismiss(id);
    },
  };
}

const AlertContainer = withPhone(connect(
  mapToProps,
  mapToFunctions
)(AnimationAlert));

export default AlertContainer;

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
import RolesAndPermissionsAlert from '../../components/RolesAndPermissionsAlert';
import ContactsAlert from '../../components/ContactsAlert';


function mapToProps(_, {
  locale,
  alert,
}) {
  return {
    currentLocale: locale.currentLocale,
    messages: alert.messages,
  };
}

function getDefaultRenderer({
  rateLimiter,
  brand,
  router,
  regionSettingsUrl,
  callingSettingsUrl,
}) {
  const onRegionSettingsLinkClick = () => {
    router.push(regionSettingsUrl);
  };
  const onCallingSettingsLinkClick = () => {
    router.push(callingSettingsUrl);
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
    if (RolesAndPermissionsAlert.handleMessage(message)) {
      return props => (
        <RolesAndPermissionsAlert
          {...props}
          brand={brand.fullName}
          application={brand.application} />
      );
    }

    if (ContactsAlert.handleMessage(message)) {
      return ContactsAlert;
    }

    return undefined;
  };
}

function mapToFunctions(_, {
  rateLimiter,
  brand,
  alert,
  router,
  regionSettingsUrl,
  callingSettingsUrl,
  getRenderer = getDefaultRenderer({
    rateLimiter,
    brand,
    router,
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

const AlertContainer = connect(
  mapToProps,
  mapToFunctions
)(AnimationAlert);

AlertContainer.propTypes = {
  alert: PropTypes.instanceOf(Alert).isRequired,
  getRenderer: PropTypes.func,
  locale: PropTypes.instanceOf(Locale).isRequired,
};
AlertContainer.defaultProps = {
  getRenderer: undefined,
};

export default AlertContainer;

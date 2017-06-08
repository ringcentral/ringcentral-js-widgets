import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Alert from 'ringcentral-integration/modules/Alert';
import Brand from 'ringcentral-integration/modules/Brand';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';

import AlertDisplay from '../../components/AlertDisplay';

import AuthAlert from '../../components/AuthAlert';
import CallAlert from '../../components/CallAlert';
import CallingSettingsAlert from '../../components/CallingSettingsAlert';
import RegionSettingsAlert from '../../components/RegionSettingsAlert';
import MessageSenderAlert from '../../components/MessageSenderAlert';
import RateExceededAlert from '../../components/RateExceededAlert';
import ConnectivityAlert from '../../components/ConnectivityAlert';
import WebphoneAlert from '../../components/WebphoneAlert';
import RolesAndPermissionsAlert from '../../components/RolesAndPermissionsAlert';


function mapToProps(_, {
  locale,
  alert,
}) {
  return {
    currentLocale: locale.currentLocale,
    messages: alert.messages,
  };
}

function mapToFunctions(_, {
  rateLimiter,
  brand,
  alert,
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
  return {
    getRenderer: (message) => {
      if (AuthAlert.handleMessage(message)) {
        return AuthAlert;
      }
      if (CallAlert.handleMessage(message)) {
        return props => (
          <CallAlert
            {...props}
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

      return undefined;
    },
    dismiss: (id) => {
      alert.dismiss(id);
    },
  };
}

const AlertContainer = connect(
  mapToProps,
  mapToFunctions
)(AlertDisplay);

AlertContainer.propTypes = {
  alert: PropTypes.instanceOf(Alert).isRequired,
  brand: PropTypes.instanceOf(Brand).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  rateLimiter: PropTypes.instanceOf(RateLimiter).isRequired,
};

export default AlertContainer;

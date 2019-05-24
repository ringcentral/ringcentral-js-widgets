import { contains } from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import errorMessages from 'ringcentral-integration/modules/AvailabilityMonitor/errorMessages';
import i18n from './i18n';

export default function AppInitialAlert(props) {
  const msg = i18n.getString(props.message.message, props.currentLocale);
  return (
    <span>{msg}</span>
  );
}

AppInitialAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

AppInitialAlert.handleMessage = ({ message }) => contains(message, [
  errorMessages.appInitialError,
  errorMessages.serviceLimited,
]);

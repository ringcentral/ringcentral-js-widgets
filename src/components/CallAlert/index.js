import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import callErrors from 'ringcentral-integration/modules/Call/callErrors';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function CallAlert({
  message: {
    message,
  },
  regionSettingsUrl,
  currentLocale,
}) {
  if (message === callErrors.noAreaCode) {
    const areaCode = i18n.getString('areaCode', currentLocale);
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ areaCodeLink: <Link to={regionSettingsUrl}>{areaCode}</Link> }} />
    );
  }
  return (
    <span>{i18n.getString(message, currentLocale)}</span>
  );
}

CallAlert.propTypes = {
  regionSettingsUrl: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
};

CallAlert.handleMessage = ({ message }) => (
  message === callErrors.noToNumber ||
  message === callErrors.noAreaCode ||
  message === callErrors.specialNumber ||
  message === callErrors.connectFailed ||
  message === callErrors.internalError ||
  message === callErrors.notAnExtension ||
  message === callErrors.networkError ||
  message === callErrors.noRingoutEnable
);

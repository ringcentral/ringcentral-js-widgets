import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function RegionSettingsAlert({
  message: {
    message
  },
  currentLocale,
  regionSettingsUrl,
}) {
  let msg;
  switch (message) {
    case regionSettingsMessages.dialingPlansChanged: {
      const regionSettings = i18n.getString('regionSettings', currentLocale);
      msg = (
        <FormattedMessage
          message={i18n.getString(message, currentLocale)}
          values={{ regionSettingsLink: <Link to={regionSettingsUrl}>{regionSettings}</Link> }} />
      );
    }
      break;
    default:
      msg = i18n.getString(message, currentLocale);
      break;
  }
  return (
    <div>
      {msg}
    </div>
  );
}
RegionSettingsAlert.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  regionSettingsUrl: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
};
RegionSettingsAlert.handleMessage = ({ message }) => (
  message === regionSettingsMessages.saveSuccess ||
  message === regionSettingsMessages.dialingPlansChanged ||
  message === regionSettingsMessages.areaCodeInvalid
);

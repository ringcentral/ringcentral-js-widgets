import React from 'react';
import PropTypes from 'prop-types';
import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function RegionSettingsAlert({
  message: {
    message
  },
  currentLocale,
  onRegionSettingsLinkClick,
}) {
  let msg;
  switch (message) {
    case regionSettingsMessages.dialingPlansChanged: {
      const regionSettings = i18n.getString('regionSettings', currentLocale);
      const regionSettingsLink = onRegionSettingsLinkClick ?
        (
          <a
            onClick={(e) => {
              e.preventDefault();
              onRegionSettingsLinkClick();
            }}>
            {regionSettings}
          </a>
        ) :
        regionSettings;
      msg = (
        <FormattedMessage
          message={i18n.getString(message, currentLocale)}
          values={{ regionSettingsLink }} />
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
  currentLocale: PropTypes.string.isRequired,
  onRegionSettingsLinkClick: PropTypes.func,
};
RegionSettingsAlert.defaultProps = {
  onRegionSettingsLinkClick: undefined,
};
RegionSettingsAlert.handleMessage = ({ message }) => (
  message === regionSettingsMessages.saveSuccess ||
  message === regionSettingsMessages.dialingPlansChanged ||
  message === regionSettingsMessages.areaCodeInvalid
);

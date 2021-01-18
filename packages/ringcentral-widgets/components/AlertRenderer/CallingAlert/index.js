import React from 'react';
import PropTypes from 'prop-types';
import { permissionsMessages } from 'ringcentral-integration/modules/RolesAndPermissions/permissionsMessages';
import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';

export default function CallInfo({
  message: { message },
  currentLocale,
  brand,
}) {
  return (
    <FormattedMessage
      message={i18n.getString(message, currentLocale)}
      values={{ brand: brand.name }}
    />
  );
}
CallInfo.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  brand: PropTypes.object.isRequired,
  currentLocale: PropTypes.string.isRequired,
};
CallInfo.handleMessage = ({ message }) =>
  message === permissionsMessages.callingDisable;

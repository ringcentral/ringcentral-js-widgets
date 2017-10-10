import React from 'react';
import PropTypes from 'prop-types';
import ContactsMessages from 'ringcentral-integration/modules/Contacts/contactsMessages';
import i18n from './i18n';

export default function ContactsAlert({
  message: {
    message,
  },
  currentLocale,
}) {
  return (
    <div>
      {i18n.getString(message, currentLocale)}
    </div>
  );
}

ContactsAlert.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
};

ContactsAlert.handleMessage = ({ message }) => (
  message === ContactsMessages.inexistence
);

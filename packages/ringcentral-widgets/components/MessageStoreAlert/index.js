import React from 'react';
import PropTypes from 'prop-types';
import messageStoreErrors from 'ringcentral-integration/modules/MessageStore/errors';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function MessageStoreAlert(props) {
  const { message } = props.message;
  let view = (<span>{i18n.getString(message, props.currentLocale)}</span>);
  // Handle call record error
  if (message === messageStoreErrors.deleteFailed) {
    view = (
      <FormattedMessage
        message={i18n.getString(message, props.currentLocale)}
      />
    );
  }
  return view;
}

MessageStoreAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

MessageStoreAlert.handleMessage = ({ message }) => (
  (message === messageStoreErrors.deleteFailed)
);

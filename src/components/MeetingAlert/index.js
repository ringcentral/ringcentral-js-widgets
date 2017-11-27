import React from 'react';
import PropTypes from 'prop-types';
import meetingStatus from 'ringcentral-integration/modules/Meeting/meetingStatus';
import i18n from './i18n';

export default function MeetingAlert({ message, currentLocale }) {
  return (<span>{i18n.getString(message.message, currentLocale)}</span>);
}

MeetingAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

MeetingAlert.handleMessage = ({ message }) => (
  (message === meetingStatus.emptyTopic) ||
  (message === meetingStatus.noPassword) ||
  (message === meetingStatus.scheduledSuccess)
);

import React from 'react';
import PropTypes from 'prop-types';
import meetingStatus from '@ringcentral-integration/commons/modules/Meeting/meetingStatus';
import FormattedMessage from '../../FormattedMessage';

import i18n from './i18n';

export default function MeetingAlert({
  message: { message, payload },
  currentLocale,
  application,
}) {
  let msg;
  switch (message) {
    case meetingStatus.insufficientPermissions:
      msg = (
        <FormattedMessage
          message={i18n.getString(message, currentLocale)}
          values={{
            application,
            permissionName: payload.permissionName,
          }}
        />
      );
      break;
    default:
      msg = i18n.getString(message, currentLocale);
      break;
  }
  return <span data-sign="meeting-alert">{msg}</span>;
}

MeetingAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    payload: PropTypes.shape({
      permissionName: PropTypes.string,
    }),
  }).isRequired,
  application: PropTypes.string,
};

MeetingAlert.defaultProps = {
  application: undefined,
};

MeetingAlert.handleMessage = ({ message }) =>
  message === meetingStatus.emptyTopic ||
  message === meetingStatus.noPassword ||
  message === meetingStatus.insufficientPermissions ||
  message === meetingStatus.scheduledSuccess ||
  message === meetingStatus.updatedSuccess ||
  message === meetingStatus.meetingIsDeleted ||
  message === meetingStatus.internalError;

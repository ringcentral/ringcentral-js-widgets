import { meetingStatus } from '@ringcentral-integration/commons/modules/Meeting';
import React from 'react';

import FormattedMessage from '../../FormattedMessage';

import i18n from './i18n';

type MeetingAlertProps = {
  currentLocale: string;
  message: {
    message: string;
    payload?: {
      permissionName?: string;
    };
  };
  application?: string;
};
const MeetingAlert: React.FC<MeetingAlertProps> = ({
  message: { message, payload },
  currentLocale,
  application,
}) => {
  let msg;
  switch (message) {
    case meetingStatus.insufficientPermissions:
      msg = (
        <FormattedMessage
          message={i18n.getString(message, currentLocale)}
          values={{
            application,
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
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
};
MeetingAlert.defaultProps = {
  application: undefined,
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
MeetingAlert.handleMessage = ({ message }: any) =>
  message === meetingStatus.emptyTopic ||
  message === meetingStatus.noPassword ||
  message === meetingStatus.insufficientPermissions ||
  message === meetingStatus.scheduledSuccess ||
  message === meetingStatus.updatedSuccess ||
  message === meetingStatus.meetingIsDeleted ||
  message === meetingStatus.renderInviteError ||
  message === meetingStatus.internalError;
export default MeetingAlert;

import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
import PropTypes from 'prop-types';

import i18n from './i18n';

export default function CallLogAlert({
  message: { message },
  currentLocale,
}: any) {
  return i18n.getString(message, currentLocale);
}
CallLogAlert.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
};
CallLogAlert.handleMessage = ({ message }: any) =>
  message === callLogMessages.logCallLogFailed ||
  message === callLogMessages.fieldRequired ||
  message === callLogMessages.logFailed;

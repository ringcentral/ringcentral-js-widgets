import PropTypes from 'prop-types';
import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
import i18n from './i18n';

export default function CallLogAlert({ message: { message }, currentLocale }) {
  return i18n.getString(message, currentLocale);
}
CallLogAlert.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
};
CallLogAlert.handleMessage = ({ message }) =>
  message === callLogMessages.logCallLogFailed ||
  message === callLogMessages.fieldRequired ||
  message === callLogMessages.logFailed;

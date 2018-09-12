/**
 * @file call control alert
 * it be used in <SimpleActiveCallCtrlPage>
 */

import PropTypes from 'prop-types';
import i18n from './i18n';

export default function CallControlAlert({
  message: {
    message
  },
  currentLocale
}) {
  return (i18n.getString(message, currentLocale));
}

CallControlAlert.handleMessage = ({ message }) => (
  message === 'muteFail' ||
  message === 'holdFail'
);

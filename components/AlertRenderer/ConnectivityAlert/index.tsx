import React from 'react';

import { connectivityTypes } from '../../../modules/ConnectivityManager';
import i18n from './i18n';

type ConnectivityAlertProps = {
  message: {
    message: string;
  };
  currentLocale: string;
};
const ConnectivityAlert: React.SFC<ConnectivityAlertProps> = ({
  message: { message },
  currentLocale,
}) => {
  return <div>{i18n.getString(message, currentLocale)}</div>;
};
ConnectivityAlert.handleMessage = ({ message }) =>
  message === connectivityTypes.networkLoss ||
  message === connectivityTypes.offline ||
  message === connectivityTypes.serverUnavailable ||
  message === connectivityTypes.voipOnly ||
  message === connectivityTypes.survival ||
  message === connectivityTypes.webphoneUnavailable;
export default ConnectivityAlert;

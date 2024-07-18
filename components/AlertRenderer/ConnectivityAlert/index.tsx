import React from 'react';

import { connectivityTypes } from '../../../modules/ConnectivityManager';

import i18n from './i18n';

type ConnectivityAlertProps = {
  message: {
    message: string;
  };
  currentLocale: string;
};
const ConnectivityAlert: React.FC<ConnectivityAlertProps> = ({
  message: { message },
  currentLocale,
}) => {
  return <div>{i18n.getString(message, currentLocale)}</div>;
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
ConnectivityAlert.handleMessage = ({ message }: any) =>
  message === connectivityTypes.networkLoss ||
  message === connectivityTypes.offline ||
  message === connectivityTypes.serverUnavailable ||
  message === connectivityTypes.voipOnly ||
  message === connectivityTypes.survival ||
  message === connectivityTypes.webphoneUnavailable;
export default ConnectivityAlert;

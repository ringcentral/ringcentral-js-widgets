import React from 'react';

import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';

import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';

type CallInfoProps = {
  message: {
    message: string;
  };
  brand: object;
  currentLocale: string;
};
const CallInfo: React.SFC<CallInfoProps> = ({
  message: { message },
  currentLocale,
  brand,
}) => {
  return (
    <FormattedMessage
      message={i18n.getString(message, currentLocale)}
      values={{ brand: brand.name }}
    />
  );
};
CallInfo.handleMessage = ({ message }) =>
  message === permissionsMessages.callingDisable;
export default CallInfo;

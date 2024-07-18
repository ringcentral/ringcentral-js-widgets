import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
import React from 'react';

import FormattedMessage from '../../FormattedMessage';

import i18n from './i18n';

type CallInfoProps = {
  message: {
    message: string;
  };
  brand: object;
  currentLocale: string;
};
const CallInfo: React.FC<CallInfoProps> = ({
  message: { message },
  currentLocale,
  brand,
}) => {
  return (
    <FormattedMessage
      message={i18n.getString(message, currentLocale)}
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'object'.
      values={{ brand: brand.name }}
    />
  );
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
CallInfo.handleMessage = ({ message }: any) =>
  message === permissionsMessages.callingDisable;
export default CallInfo;

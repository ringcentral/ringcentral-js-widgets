import { issueTrackingMessages } from '@ringcentral-integration/commons/enums/issueTrackingMessages';
import React from 'react';

import FormattedMessage from '../../FormattedMessage';

import i18n from './i18n';

type IssueTrackingProps = {
  message: {
    message: string;
  };
  brand: object;
  currentLocale: string;
};
const IssueTracking: React.FC<IssueTrackingProps> = ({
  message: { message },
  currentLocale,
  brand,
}) => {
  return (
    <FormattedMessage
      message={i18n.getString(message as any, currentLocale)}
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'object'.
      values={{ brand: brand.name }}
    />
  );
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
IssueTracking.handleMessage = ({ message }: any) =>
  message === issueTrackingMessages.downloadFail ||
  message === issueTrackingMessages.downloadSuccess;
export default IssueTracking;

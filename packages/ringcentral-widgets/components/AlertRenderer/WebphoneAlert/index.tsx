import React from 'react';

import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';

import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';

const webphoneMessageList = [
  webphoneErrors.connectFailed,
  webphoneErrors.toVoiceMailError,
  webphoneErrors.connected,
  webphoneErrors.muteError,
  webphoneErrors.holdError,
  webphoneErrors.flipError,
  webphoneErrors.recordError,
  webphoneErrors.pauseRecordError,
  webphoneErrors.recordDisabled,
  webphoneErrors.transferError,
  webphoneErrors.noOutboundCallWithoutDL,
  webphoneErrors.checkDLError,
  webphoneErrors.browserNotSupported,
  webphoneErrors.sipProvisionError,
  webphoneErrors.webphoneCountOverLimit,
  webphoneErrors.webphoneForbidden,
  webphoneErrors.requestTimeout,
  webphoneErrors.serverTimeout,
  webphoneErrors.internalServerError,
  webphoneErrors.unknownError,
  webphoneErrors.provisionUpdate,
  webphoneErrors.serverConnecting,
  webphoneMessages.parked,
];
type WebphoneAlertProps = {
  currentLocale: string;
  brand: object;
  message: {
    message: string;
  };
};
const WebphoneAlert: React.SFC<WebphoneAlertProps> = (props) => {
  const { message } = props.message;
  let view = <span>{i18n.getString(message, props.currentLocale)}</span>;
  // Handle call record error
  if (message === webphoneErrors.recordError) {
    const { payload: { errorCode } = {} } = props.message;
    view = (
      <FormattedMessage
        message={i18n.getString(message, props.currentLocale)}
        values={{ errorCode }}
      />
    );
  } else if (
    message === webphoneErrors.sipProvisionError ||
    message === webphoneErrors.webphoneForbidden ||
    message === webphoneErrors.requestTimeout ||
    message === webphoneErrors.serverTimeout ||
    message === webphoneErrors.internalServerError ||
    message === webphoneErrors.unknownError
  ) {
    const { payload: { statusCode, isConnecting = false } = {} } =
      props.message;
    // sipProvisionError does not have statusCode
    if (statusCode && isConnecting) {
      view = (
        <FormattedMessage
          message={i18n.getString(
            'registeringWithStatusCode',
            props.currentLocale,
          )}
          values={{ errorCode: statusCode, brandName: props.brand.name }}
        />
      );
    } else if (statusCode) {
      view = (
        <FormattedMessage
          message={i18n.getString('failWithStatusCode', props.currentLocale)}
          values={{ errorCode: statusCode, brandName: props.brand.name }}
        />
      );
    } else if (isConnecting) {
      view = (
        <FormattedMessage
          message={i18n.getString(
            'registeringWithoutStatusCode',
            props.currentLocale,
          )}
          values={{ brandName: props.brand.name }}
        />
      );
    } else {
      view = (
        <FormattedMessage
          message={i18n.getString('failWithoutStatusCode', props.currentLocale)}
          values={{ brandName: props.brand.name }}
        />
      );
    }
  } else if (message === webphoneErrors.checkDLError) {
    view = (
      <FormattedMessage
        message={i18n.getString(message, props.currentLocale)}
        values={{ brandName: props.brand.name }}
      />
    );
  } else if (message === webphoneMessages.parked) {
    const { payload: { parkedNumber } = {} } = props.message;
    view = (
      <FormattedMessage
        message={i18n.getString(message, props.currentLocale)}
        values={{ parkedNumber }}
      />
    );
  }
  return view;
};
WebphoneAlert.handleMessage = ({ message }) =>
  webphoneMessageList.filter((err) => err === message).length > 0;
export default WebphoneAlert;

import type { AlertItem } from '@ringcentral-integration/commons/modules/Alert';
import { callingSettingsMessages } from '@ringcentral-integration/commons/modules/CallingSettings';
import React from 'react';

import FormattedMessage from '../../FormattedMessage';
import type { HandleMessage } from '../HandleMessage.interface';

import i18n from './i18n';

export interface CallingSettingsAlertProps {
  message: AlertItem;
  currentLocale: string;
  brandName: string;
  jupiterAppName: string;
  softphoneAppName: string;
  onCallingSettingsLinkClick: () => void;
}

export const CallingSettingsAlert: React.FC<CallingSettingsAlertProps> &
  HandleMessage = ({
  message: { message },
  currentLocale,
  brandName,
  jupiterAppName,
  softphoneAppName,
  onCallingSettingsLinkClick,
}) => {
  switch (message) {
    case callingSettingsMessages.saveSuccess:
    case callingSettingsMessages.saveSuccessWithSoftphone:
    case callingSettingsMessages.webphonePermissionRemoved:
    case callingSettingsMessages.emergencyCallingNotAvailable:
    case callingSettingsMessages.disableEmergencyInJapan:
    case callingSettingsMessages.saveSuccessWithJupiter: {
      let appName = brandName;
      if (message === callingSettingsMessages.saveSuccessWithJupiter) {
        appName = jupiterAppName;
      } else if (message === callingSettingsMessages.saveSuccessWithSoftphone) {
        appName = softphoneAppName;
      }
      return (
        <FormattedMessage
          message={i18n.getString(message)}
          values={{ brand: appName }}
        />
      );
    }
    case callingSettingsMessages.permissionChanged:
    case callingSettingsMessages.phoneNumberChanged: {
      const link = onCallingSettingsLinkClick ? (
        <a
          onClick={(e) => {
            e.preventDefault();
            onCallingSettingsLinkClick();
          }}
        >
          {i18n.getString('link', currentLocale)}
        </a>
      ) : (
        i18n.getString('link', currentLocale)
      );
      return (
        <FormattedMessage
          message={i18n.getString(message, currentLocale)}
          values={{ link }}
        />
      );
    }
    default:
      return null;
  }
};

CallingSettingsAlert.handleMessage = ({ message }) =>
  message === callingSettingsMessages.saveSuccess ||
  message === callingSettingsMessages.saveSuccessWithSoftphone ||
  message === callingSettingsMessages.permissionChanged ||
  message === callingSettingsMessages.webphonePermissionRemoved ||
  message === callingSettingsMessages.phoneNumberChanged ||
  message === callingSettingsMessages.emergencyCallingNotAvailable ||
  message === callingSettingsMessages.saveSuccessWithJupiter ||
  message === callingSettingsMessages.disableEmergencyInJapan;

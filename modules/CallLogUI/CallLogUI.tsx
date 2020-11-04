import { RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import { callingOptions } from 'ringcentral-integration/modules/CallingSettingsV2/callingOptions';
import React from 'react';
import {
  CallLogUIInterface,
  Deps,
  CallLogUIProps,
  CallLogUIFunctions,
} from './CallLogUI.interface';

import CallLogCallCtrlContainer from '../../containers/CallLogCallCtrlContainer';

@Module({
  name: 'CallLogUI',
  deps: [
    'Locale',
    'CallLogger',
    'RateLimiter',
    'RegionSettings',
    'DateTimeFormat',
    'CallLogSection',
    'RouterInteraction',
    'ActiveCallControl',
    'EnvironmentOptions',
    'RolesAndPermissions',
    'ConnectivityMonitor',
    'CallingSettings',
    'ForwardingNumber',
    { dep: 'CallLogUIOptions', optional: true },
  ],
})
class CallLogUI<T = {}>
  extends RcUIModuleV2<Deps & T>
  implements CallLogUIInterface {
  constructor({ deps = {}, ...options }: Deps & { deps: Record<string, any> }) {
    super({
      deps: {
        ...options,
        ...deps,
      },
    });
  }

  getUIProps(): CallLogUIProps {
    const {
      locale,
      callLogger,
      rateLimiter,
      regionSettings,
      dateTimeFormat,
      callLogSection,
      routerInteraction,
      activeCallControl,
      environmentOptions,
      rolesAndPermissions,
      connectivityMonitor,
      callingSettings,
      forwardingNumber,
    } = this._deps;
    const { currentNotificationIdentify, currentIdentify } = callLogSection;
    const isInTransferPage =
      routerInteraction.currentPath.match('^/transfer/') !== null;

    return {
      currentLocale: locale.currentLocale,
      header: true,
      showSpinner: !(
        locale.ready &&
        regionSettings.ready &&
        dateTimeFormat.ready &&
        (!rolesAndPermissions || rolesAndPermissions.ready) &&
        (!callLogger || callLogger.ready)
      ),
      isInTransferPage,
      disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
      currentIdentify,
      // notification props
      currentNotificationIdentify,
      currentSession: activeCallControl.getActiveSession(
        activeCallControl.sessionIdToTelephonySessionIdMapping[
          currentNotificationIdentify
        ],
      ),
      isWebRTC: callingSettings.callWith === callingOptions.browser,
      forwardingNumbers: forwardingNumber.forwardingNumbers,
    };
  }

  getUIFunctions(): CallLogUIFunctions {
    const {
      regionSettings,
      callLogSection,
      locale,
      activeCallControl,
      routerInteraction,
    } = this._deps;
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: regionSettings.areaCode,
          countryCode: regionSettings.countryCode,
        }) || 'Unknown',
      goBack: () => callLogSection.closeLogSection(),
      renderCallLogCallControl: (
        currentTelephonySessionId,
        isWide,
        isCurrentDeviceCall,
      ) => (
        <CallLogCallCtrlContainer
          currentLocale={locale.currentLocale}
          telephonySessionId={currentTelephonySessionId}
          isCurrentDeviceCall={isCurrentDeviceCall}
          isWide={isWide}
        />
      ),
      // notification props
      onSaveNotification: () => callLogSection.saveAndHandleNotification(),
      onDiscardNotification: () =>
        callLogSection.discardAndHandleNotification(),
      onCloseNotification: () => callLogSection.closeLogNotification(),
      onExpandNotification: () => callLogSection.expandLogNotification(),
      onReject(sessionId) {
        const telephonySessionId =
          activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
        return activeCallControl.reject(telephonySessionId);
      },
      onHangup(sessionId) {
        const telephonySessionId =
          activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
        return activeCallControl.hangUp(telephonySessionId);
      },
      onIgnore: (telephonySessionId: string) => {
        callLogSection.closeLogNotification();
        activeCallControl.ignore?.(telephonySessionId);
      },
      onForward: (phoneNumber: string, telephonySessionId: string) => {
        if (phoneNumber === 'custom') {
          routerInteraction.push(`/forward/${telephonySessionId}`);
        } else {
          callLogSection.closeLogNotification();
          activeCallControl.forward?.(phoneNumber, telephonySessionId);
        }
      },
      endAndAnswer: (telephonySessionId: string) => {
        callLogSection.discardAndHandleNotification();
        activeCallControl.answerAndEnd?.(telephonySessionId);
      },
      holdAndAnswer: (telephonySessionId: string) => {
        callLogSection.discardAndHandleNotification();
        activeCallControl.answerAndHold?.(telephonySessionId);
      },
      toVoicemail: (telephonySessionId: string) => {
        callLogSection.closeLogNotification();
        activeCallControl.reject(telephonySessionId);
      },
      answer: (telephonySessionId: string) => {
        callLogSection.discardAndHandleNotification();
        activeCallControl.answer?.(telephonySessionId);
      },
    };
  }
}

export { CallLogUI };

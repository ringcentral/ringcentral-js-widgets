import { RcModuleOptions, RcUIModuleV2 } from '@ringcentral-integration/core';
import React from 'react';
import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettingsV2/callingOptions';
import { CallLogCallCtrlContainer } from '../../containers/CallLogCallCtrlContainer';
import {
  CallLogUIFunctions,
  CallLogUIInterface,
  CallLogUIProps,
  Deps,
} from './CallLogUI.interface';
import i18n from './i18n';

const CallLogCallControlRenderer = (
  currentLocale: string,
  telephonySessionId: string,
  isWide: boolean,
  isCurrentDeviceCall: boolean,
) => (
  <CallLogCallCtrlContainer
    currentLocale={currentLocale}
    telephonySessionId={telephonySessionId}
    isCurrentDeviceCall={isCurrentDeviceCall}
    isWide={isWide}
  />
);

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
    'AppFeatures',
    'ConnectivityMonitor',
    'CallingSettings',
    'ForwardingNumber',
    { dep: 'CallLogUIOptions', optional: true },
  ],
})
export abstract class CallLogUIBase<T extends Deps = Deps>
  extends RcUIModuleV2<Deps & T>
  implements CallLogUIInterface {
  constructor({ deps, ...options }: RcModuleOptions<Deps & T>) {
    super({
      deps,
      ...options,
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
      appFeatures,
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
        appFeatures.ready &&
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
      activeSession: activeCallControl.activeSession,
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
        }) || i18n.getString('unknown', locale.currentLocale),
      goBack: () => {
        callLogSection.closeLogSection();
        callLogSection.closeLogNotification();
      },
      renderCallLogCallControl: (
        telephonySessionId,
        isWide,
        isCurrentDeviceCall,
      ) =>
        CallLogCallControlRenderer(
          locale.currentLocale,
          telephonySessionId,
          isWide,
          isCurrentDeviceCall,
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
        activeCallControl.ignore?.(telephonySessionId);
        callLogSection.closeLogNotification();
      },
      onForward: (phoneNumber: string, telephonySessionId: string) => {
        if (phoneNumber === 'custom') {
          routerInteraction.push(`/forward/${telephonySessionId}`);
        } else {
          activeCallControl.forward?.(phoneNumber, telephonySessionId);
          callLogSection.closeLogNotification();
        }
      },
      endAndAnswer: (telephonySessionId: string) => {
        activeCallControl.answerAndEnd?.(telephonySessionId);
        callLogSection.discardAndHandleNotification();
      },
      holdAndAnswer: (telephonySessionId: string) => {
        activeCallControl.answerAndHold?.(telephonySessionId);
        callLogSection.discardAndHandleNotification();
      },
      toVoicemail: (telephonySessionId: string) => {
        activeCallControl.reject(telephonySessionId);
        callLogSection.closeLogNotification();
      },
      answer: (telephonySessionId: string) => {
        activeCallControl.answer?.(telephonySessionId);
        callLogSection.discardAndHandleNotification();
      },
      clickForwardTrack: () => activeCallControl.clickForwardTrack?.(),
    };
  }
}

@Module()
export class CallLogUI extends CallLogUIBase {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }
}

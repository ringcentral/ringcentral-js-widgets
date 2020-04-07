/**
 * Call log enhancement
 */
import React from 'react';
import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import CallLogPanel, { CallLogPanelProps } from '../../components/CallLogPanel';
import withPhone from '../../lib/withPhone';
import CallLogCallCtrlContainer from '../CallLogCallCtrlContainer';

function mapToProps(
  _,
  {
    phone: {
      callLogger,
      locale,
      regionSettings,
      rolesAndPermissions,
      dateTimeFormat,
      callLogSection,
      routerInteraction,
      activeCallControl,
      connectivityMonitor,
      rateLimiter,
      environmentOptions,
    },
  },
): Partial<CallLogPanelProps> {
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
    isWide:
      environmentOptions &&
      environmentOptions.app &&
      environmentOptions.app.isLightning,
    currentIdentify,
    // notification props
    currentNotificationIdentify,
    currentSession: activeCallControl.getActiveSession(
      activeCallControl.sessionIdToTelephonySessionIdMapping[
        currentNotificationIdentify
      ],
    ),
  };
}

function mapToFunctions(_, { phone }) {
  const { regionSettings, callLogSection, locale, activeCallControl } = phone;
  return {
    formatPhone: (phoneNumber: string) =>
      formatNumber({
        phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
      }) || 'Unknown',
    goBack: () => callLogSection.closeLogSection(),
    renderCallLogCallControl: (status, currentTelephonySessionId, isWide) => (
      <CallLogCallCtrlContainer
        currentLocale={locale.currentLocale}
        telephonySessionId={currentTelephonySessionId}
        isWide={isWide}
      />
    ),
    // notification props
    onSaveNotification: () => callLogSection.saveAndHandleNotification(),
    onDiscardNotification: () => callLogSection.discardAndHandleNotification(),
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
  };
}
const CallLogPage = withPhone(
  connect(mapToProps, mapToFunctions)(CallLogPanel),
);
export { mapToProps, mapToFunctions, CallLogPanel, CallLogPage as default };

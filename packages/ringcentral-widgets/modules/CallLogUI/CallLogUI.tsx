import React from 'react';

import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
import {
  RcModuleOptions,
  RcUIModuleV2,
  track,
} from '@ringcentral-integration/core';
import { isOnHold } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';

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
  enableReply: boolean,
  isCurrentDeviceCall: boolean,
  warmTransferActiveTelephonySessionId: string,
) => (
  <CallLogCallCtrlContainer
    currentLocale={currentLocale}
    telephonySessionId={telephonySessionId}
    isCurrentDeviceCall={isCurrentDeviceCall}
    warmTransferActiveTelephonySessionId={warmTransferActiveTelephonySessionId}
    isWide={isWide}
    enableReply={enableReply}
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
    'AccountInfo',
    { dep: 'CallLogUIOptions', optional: true },
  ],
})
export abstract class CallLogUIBase<T extends Deps = Deps>
  extends RcUIModuleV2<T>
  implements CallLogUIInterface
{
  constructor({ deps, ...options }: RcModuleOptions<T>) {
    super({
      deps,
      ...options,
    });
  }

  getUIProps(): CallLogUIProps {
    const {
      currentNotificationIdentify,
      currentIdentify,
      warmTransferActiveTelephonySessionId,
    } = this._deps.callLogSection;
    const isInTransferPage =
      this._deps.routerInteraction.currentPath.match('^/transfer/') !== null;

    return {
      currentLocale: this._deps.locale.currentLocale,
      header: true,
      showSpinner: !(
        this._deps.locale.ready &&
        this._deps.regionSettings.ready &&
        this._deps.dateTimeFormat.ready &&
        this._deps.appFeatures.ready &&
        (!this._deps.callLogger || this._deps.callLogger.ready)
      ),
      isInTransferPage,
      disableLinks:
        !this._deps.connectivityMonitor.connectivity ||
        this._deps.rateLimiter.throttling,
      currentIdentify,
      // notification props
      currentNotificationIdentify,
      // @ts-expect-error TS(2322): Type 'Partial<ActiveSession> | null' is not assign... Remove this comment to see the full error message
      currentSession: this._deps.activeCallControl.getActiveSession(
        this._deps.activeCallControl.sessionIdToTelephonySessionIdMapping[
          currentNotificationIdentify
        ],
      ),
      // @ts-expect-error TS(2322): Type 'Partial<ActiveSession> | null' is not assign... Remove this comment to see the full error message
      activeSession: this._deps.activeCallControl.activeSession,
      isWebRTC: this._deps.callingSettings.callWith === callingOptions.browser,
      forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
      warmTransferActiveTelephonySessionId,
    };
  }

  getUIFunctions(): CallLogUIFunctions {
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        }) || i18n.getString('unknown', this._deps.locale.currentLocale),
      goBack: () => {
        this._deps.callLogSection.closeLogSection();
        this._deps.callLogSection.closeLogNotification();
      },
      renderCallLogCallControl: (
        telephonySessionId,
        isWide,
        enableReply,
        isCurrentDeviceCall,
        warmTransferActiveTelephonySessionId,
      ) =>
        CallLogCallControlRenderer(
          this._deps.locale.currentLocale,
          telephonySessionId,
          isWide,
          enableReply,
          isCurrentDeviceCall,
          warmTransferActiveTelephonySessionId,
        ),
      // notification props
      onSaveNotification: () =>
        this._deps.callLogSection.saveAndHandleNotification(),
      onDiscardNotification: () =>
        this._deps.callLogSection.discardAndHandleNotification(),
      onCloseNotification: () =>
        this._deps.callLogSection.closeLogNotification(),
      onExpandNotification: () =>
        this._deps.callLogSection.expandLogNotification(),
      onSwitchWarmTransferSession: () => {
        const {
          currentCall,
          currentWarmTransferCall,
          warmTransferActiveTelephonySessionId,
        } = this._deps.callLogSection;
        if (!currentCall || !currentWarmTransferCall) return;

        const isTransferCallActive =
          currentWarmTransferCall?.telephonySessionId ===
          warmTransferActiveTelephonySessionId;
        const activeCall = isTransferCallActive
          ? currentWarmTransferCall
          : currentCall;
        const subCall = isTransferCallActive
          ? currentCall
          : currentWarmTransferCall;

        const isActiveCallOnHold = isOnHold(activeCall);

        if (isActiveCallOnHold) {
          this._deps.callLogSection.setWarmTransferCallActiveId(
            subCall.telephonySessionId,
          );
        } else {
          return this._deps.activeCallControl.unhold(
            // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
            subCall.telephonySessionId,
          );
        }
      },
      onReject: (sessionId) => {
        const telephonySessionId =
          this._deps.activeCallControl.sessionIdToTelephonySessionIdMapping[
            sessionId
          ];
        return this._deps.activeCallControl.reject(telephonySessionId);
      },
      onHangup: (sessionId) => {
        const telephonySessionId =
          this._deps.activeCallControl.sessionIdToTelephonySessionIdMapping[
            sessionId
          ];
        return this._deps.activeCallControl.hangUp(telephonySessionId);
      },
      onIgnore: (telephonySessionId) => {
        this._deps.activeCallControl.ignore?.(telephonySessionId);
        this._deps.callLogSection.closeLogNotification();
      },
      onForward: (phoneNumber, telephonySessionId) => {
        if (phoneNumber === 'custom') {
          this._deps.routerInteraction.push(`/forward/${telephonySessionId}`);
        } else {
          this._deps.activeCallControl.forward?.(
            phoneNumber,
            telephonySessionId,
          );
          this._deps.callLogSection.closeLogNotification();
        }
      },
      reply: (telephonySessionId) => {
        this._deps.routerInteraction.push(
          `/replyWithMessage/${telephonySessionId}/active`,
        );
        this.replyWithMessageEntranceTrack();
      },
      endAndAnswer: (telephonySessionId) => {
        this._deps.activeCallControl.answerAndEnd?.(telephonySessionId);
        this._deps.callLogSection.discardAndHandleNotification();
      },
      holdAndAnswer: (telephonySessionId) => {
        this._deps.activeCallControl.answerAndHold?.(telephonySessionId);
        this._deps.callLogSection.discardAndHandleNotification();
      },
      toVoicemail: (telephonySessionId) => {
        this._deps.activeCallControl.reject(telephonySessionId);
        this._deps.callLogSection.closeLogNotification();
      },
      answer: (telephonySessionId) => {
        this._deps.activeCallControl.answer?.(telephonySessionId);
        this._deps.callLogSection.discardAndHandleNotification();
      },
      clickForwardTrack: () =>
        this._deps.activeCallControl.clickForwardTrack?.(),
      openEntityDetailLinkTrack: (path) =>
        this._deps.activeCallControl.openEntityDetailLinkTrack?.(path),
    };
  }

  @track(() => [
    trackEvents.clickReplyWithMessage,
    { entry: 'Inbound call notification page' },
  ])
  replyWithMessageEntranceTrack() {}
}

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
@Module()
export class CallLogUI extends CallLogUIBase {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }
}

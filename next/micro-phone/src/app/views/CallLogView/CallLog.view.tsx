import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { isOnHold } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
  ConnectivityMonitor,
  RateLimiter,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  DateTimeFormat,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import CallLogPanel from '@ringcentral-integration/widgets/components/CallLogPanel';
import React, { useRef } from 'react';

import {
  ActiveCallControl,
  callingOptions,
  CallingSettings,
  CallLogger,
  CallMonitor,
  ForwardingNumber,
} from '../../services';
import { CallLogCallCtrlView } from '../CallLogCallCtrlView';
import { CallLogSection } from '../CallLogSection';

import type {
  CallLogViewOptions,
  CallLogViewPanelProps,
  CallLogViewProps,
} from './CallLog.view.interface';
import { t } from './i18n';

@injectable({
  name: 'CallLogView',
})
export class CallLogView extends RcViewModule {
  constructor(
    protected _locale: Locale,
    protected _callLogger: CallLogger,
    protected _rateLimiter: RateLimiter,
    protected _regionSettings: RegionSettings,
    protected _dateTimeFormat: DateTimeFormat,
    protected _callLogSection: CallLogSection,
    protected _router: RouterPlugin,
    protected _activeCallControl: ActiveCallControl,
    protected _appFeatures: AppFeatures,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _callingSettings: CallingSettings,
    protected _forwardingNumber: ForwardingNumber,
    protected _callMonitor: CallMonitor,
    protected _accountInfo: AccountInfo,
    @optional('CallLogViewOptions')
    protected _callLogViewOptions?: CallLogViewOptions,
    @optional() protected _callLogCallCtrlView?: CallLogCallCtrlView,
  ) {
    super();
  }

  @track(trackEvents.transferSwitchOnholdCall)
  trackSwitchWarmTransferSession() {
    //
  }

  getUIProps(props: CallLogViewProps): UIProps<CallLogViewPanelProps> {
    const {
      currentNotificationIdentify,
      currentIdentify,
      warmTransferActiveTelephonySessionId,
    } = this._callLogSection;
    const isInTransferPage = this._router.currentPath.match(
      '^/transfer/|/addCall',
    );
    return {
      currentLocale: this._locale.currentLocale,
      header: true,
      showSpinner: !(
        this._locale.ready &&
        this._regionSettings.ready &&
        this._dateTimeFormat.ready &&
        this._appFeatures.ready &&
        (!this._callLogger || this._callLogger.ready)
      ),
      isInTransferPage,
      disableLinks:
        !this._connectivityMonitor.connectivity || this._rateLimiter.restricted,
      currentIdentify: currentIdentify!,
      // notification props
      currentNotificationIdentify: currentNotificationIdentify!,
      currentSession: this._activeCallControl.getActiveSession(
        this._activeCallControl.sessionIdToTelephonySessionIdMapping[
          currentNotificationIdentify!
        ],
      )!,
      activeSession: this._callMonitor.currDeviceHasActiveCalls,
      isWebRTC: this._callingSettings.callWith === callingOptions.browser,
      forwardingNumbers: this._forwardingNumber.forwardingNumbers,
      warmTransferActiveTelephonySessionId,
    };
  }

  getUIFunctions(props: CallLogViewProps): UIFunctions<CallLogViewPanelProps> {
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        }) || t('unknown'),
      goBack: () => {
        this._callLogSection.closeLogSection();
        this._callLogSection.closeLogNotification();
        // trigger rerender log icon after edit log and back to call history
        this._router.replace(this._router.currentPath);
      },
      renderCallLogCallControl: (
        telephonySessionId,
        isWide,
        enableReply,
        isCurrentDeviceCall,
        warmTransferActiveTelephonySessionId,
      ) =>
        this._callLogCallCtrlView ? (
          <this._callLogCallCtrlView.component
            currentLocale={this._locale.currentLocale}
            telephonySessionId={telephonySessionId}
            isCurrentDeviceCall={isCurrentDeviceCall}
            warmTransferActiveTelephonySessionId={
              warmTransferActiveTelephonySessionId
            }
            isWide={isWide}
            enableReply={enableReply}
          />
        ) : (
          <></>
        ),
      // notification props
      onSaveNotification: () =>
        this._callLogSection.saveAndHandleNotification(),
      onDiscardNotification: () =>
        this._callLogSection.discardAndHandleNotification(),
      onCloseNotification: () => this._callLogSection.closeLogNotification(),
      onExpandNotification: () => this._callLogSection.expandLogNotification(),
      onSwitchWarmTransferSession: () => {
        this.trackSwitchWarmTransferSession();

        const {
          currentCall,
          currentWarmTransferCall,
          warmTransferActiveTelephonySessionId,
        } = this._callLogSection;
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
          this._callLogSection.setWarmTransferCallActiveId(
            subCall.telephonySessionId,
          );
          return;
        }

        return this._activeCallControl.unhold(subCall.telephonySessionId!);
      },
      onReject: (sessionId) => {
        const telephonySessionId =
          this._activeCallControl.sessionIdToTelephonySessionIdMapping[
            sessionId
          ];
        return this._activeCallControl.reject(telephonySessionId);
      },
      onHangup: (sessionId) => {
        const telephonySessionId =
          this._activeCallControl.sessionIdToTelephonySessionIdMapping[
            sessionId
          ];
        return this._activeCallControl.hangUp(telephonySessionId);
      },
      onIgnore: (telephonySessionId) => {
        this._activeCallControl.ignore?.(telephonySessionId);
        this._callLogSection.closeLogNotification();
      },
      onForward: (phoneNumber, telephonySessionId) => {
        if (phoneNumber === 'custom') {
          this._router.push(`/forward/${telephonySessionId}`);
        } else {
          this._activeCallControl.forward?.(phoneNumber, telephonySessionId);
          this._callLogSection.closeLogNotification();
        }
      },
      reply: (telephonySessionId) => {
        this._router.push(`/replyWithMessage/${telephonySessionId}/active`);
      },
      endAndAnswer: (telephonySessionId) => {
        this._activeCallControl.answerAndEnd?.(telephonySessionId);
        this._callLogSection.discardAndHandleNotification();
      },
      holdAndAnswer: (telephonySessionId) => {
        this._activeCallControl.answerAndHold?.(telephonySessionId);
        this._callLogSection.discardAndHandleNotification();
      },
      toVoicemail: (telephonySessionId) => {
        this._activeCallControl.reject(telephonySessionId);
        this._callLogSection.closeLogNotification();
      },
      answer: (telephonySessionId) => {
        this._activeCallControl.answer?.(telephonySessionId);
        this._callLogSection.discardAndHandleNotification();
      },
      onRemoveParticipant: (telephonySessionId: string, partyId: string) =>
        this._activeCallControl.removeConferenceParticipant?.(
          telephonySessionId,
          partyId,
        ),
      clickForwardTrack: () => this._activeCallControl.clickForwardTrack?.(),
      clickParticipantsIconTrack: () => this.clickParticipantsIconTrack(),
      clickRemoveParticipantTrack: () => this.clickRemoveParticipantTrack(),
      openEntityDetailLinkTrack: (path) =>
        this._activeCallControl.openEntityDetailLinkTrack?.(path),
    };
  }

  @track(trackEvents.clickParticipantsIcon)
  clickParticipantsIconTrack() {
    //
  }

  @track(trackEvents.clickRemoveParticipant)
  clickRemoveParticipantTrack() {
    //
  }

  component(props: CallLogViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component = this._callLogViewOptions?.component || CallLogPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}

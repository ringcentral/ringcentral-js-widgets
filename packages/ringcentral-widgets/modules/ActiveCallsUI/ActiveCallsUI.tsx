import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { isRingingInboundCall } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { ActiveSession } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import { isHolding } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { SwitchCallActiveCallParams } from '@ringcentral-integration/commons/modules/Webphone';
import { isOnHold } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { RcUIModuleV2 } from '@ringcentral-integration/core';
import React from 'react';

import { ModalContent } from '../../components/ActiveCallItemV2';

import type {
  ActiveCallsContainerProps,
  ActiveCallsPanelProps,
  Deps,
} from './ActiveCallsUI.interface';

const ModalContentRendererID = 'ActiveCallsUI.ModalContentRenderer';
@Module({
  name: 'ActiveCallsUI',
  deps: [
    'Brand',
    'Locale',
    'CallMonitor',
    'RateLimiter',
    'ContactSearch',
    'RegionSettings',
    'ContactMatcher',
    'CallingSettings',
    'RouterInteraction',
    'AppFeatures',
    'ConnectivityMonitor',
    'AccountInfo',
    'ExtensionInfo',
    { dep: 'ModalUI', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'CallLogger', optional: true },
    { dep: 'ComposeText', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    { dep: 'ActiveCallControl', optional: true },
  ],
})
export class ActiveCallsUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({
      deps,
    });
    this._deps.modalUI?.registerRenderer(
      ModalContentRendererID,
      ({ currentLocale, contactName }) => (
        <ModalContent currentLocale={currentLocale} contactName={contactName} />
      ),
    );
  }

  getUIProps({
    showContactDisplayPlaceholder = false,
    showRingoutCallControl = false,
    showSwitchCall = false,
    showTransferCall = true,
    showHoldOnOtherDevice = false,
    useV2,
    showMergeCall,
    useCallControl,
  }: ActiveCallsContainerProps): UIProps<ActiveCallsPanelProps> {
    const isWebRTC =
      this._deps.callingSettings.callingMode === callingModes.webphone;
    const controlBusy = this._deps.activeCallControl?.busy || false;
    return {
      currentLocale: this._deps.locale.currentLocale,
      activeRingCalls: this._deps.callMonitor.activeRingCalls,
      activeOnHoldCalls: this._deps.callMonitor.activeOnHoldCalls,
      activeCurrentCalls: this._deps.callMonitor.activeCurrentCalls,
      otherDeviceCalls: this._deps.callMonitor.otherDeviceCalls,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
      showSpinner: !!this._deps.conferenceCall?.isMerging,
      brand: this._deps.brand.name,
      showContactDisplayPlaceholder,
      showRingoutCallControl,
      showTransferCall,
      showHoldOnOtherDevice,
      showSwitchCall: !!(
        showSwitchCall &&
        isWebRTC &&
        this._deps.webphone?.connected
      ),
      autoLog: !!this._deps.callLogger?.autoLog,
      isWebRTC,
      conferenceCallParties: this._deps.conferenceCall
        ? this._deps.conferenceCall.partyProfiles
        : null,
      useV2,
      showMergeCall,
      disableLinks:
        !this._deps.connectivityMonitor.connectivity ||
        this._deps.rateLimiter.throttling ||
        controlBusy,
      useCallControl,
      isWide: this.isWide,
      allCalls: this._deps.callMonitor.calls,
    };
  }

  private _defaultOnViewContact: ActiveCallsContainerProps['onViewContact'] = (
    options,
  ) => {
    const { id, type } = options.contact;

    this._deps.contactDetailsUI?.showContactDetails({
      type,
      id,
      direct: true,
    });
  };

  getUIFunctions({
    composeTextRoute = '/composeText',
    callCtrlRoute = '/calls/active',
    onCreateContact,
    onLogCall,
    isLoggedContact,
    onCallsEmpty,
    onViewContact = this._defaultOnViewContact,
    showViewContact = true,
    getAvatarUrl,
    useV2,
    useCallControl,
  }: ActiveCallsContainerProps): UIFunctions<ActiveCallsPanelProps> {
    // Toggle to control if use new call control API, should using the ActiveCallControl module same time,
    // when you set this toggle to true (https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession)
    const useActiveCallControl = !!(
      useCallControl && this._deps.activeCallControl
    );
    return {
      modalConfirm: (props) =>
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        this._deps.modalUI?.confirm({
          ...props,
          content: ModalContentRendererID,
        }),
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      modalClose: (id) => this._deps.modalUI?.close(id),
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
          siteCode: this._deps.extensionInfo.site?.code,
          isMultipleSiteEnabled: this._deps.extensionInfo.isMultipleSiteEnabled,
        }),
      onMergeCall: undefined,
      webphoneAnswer: async (
        sessionId,
        telephonySessionId,
        isHoldAndAnswer = false,
      ) => {
        if (useActiveCallControl) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          isHoldAndAnswer && this._deps.activeCallControl.answerAndHold
            ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.activeCallControl.answerAndHold(telephonySessionId)
            : // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.activeCallControl.answer(telephonySessionId);
        } else {
          if (!this._deps.webphone) {
            return;
          }

          const session = this._deps.webphone.sessions.find(
            (session) => session.id === sessionId,
          );
          if (
            this._deps.conferenceCall &&
            session &&
            session.direction === callDirections.inbound
          ) {
            this._deps.conferenceCall.closeMergingPair();
          }

          this._deps.webphone.answer(sessionId);
        }
      },
      // @ts-expect-error TS(2322): Type '(sessionId: string, telephonySessionId: stri... Remove this comment to see the full error message
      webphoneToVoicemail: (sessionId, telephonySessionId) => {
        if (useActiveCallControl) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          return this._deps.activeCallControl.reject(telephonySessionId);
        }
        return this._deps.webphone?.toVoiceMail(sessionId);
      },
      // @ts-expect-error TS(2322): Type 'Promise<void> | undefined' is not assignable... Remove this comment to see the full error message
      webphoneReject: (sessionId) => this._deps.webphone?.reject(sessionId),
      webphoneHangup: (sessionId, telephonySessionId) => {
        // user action track
        this._deps.callMonitor.allCallsClickHangupTrack();
        if (useActiveCallControl) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          return this._deps.activeCallControl.hangUp(telephonySessionId);
        }
        return this._deps.webphone?.hangup(sessionId);
      },
      webphoneResume: async (sessionId, telephonySessionId) => {
        if (useActiveCallControl) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          return this._deps.activeCallControl.unhold(telephonySessionId);
        }
        if (!this._deps.webphone) {
          return;
        }
        await this._deps.webphone.resume(sessionId);
        if (
          this._deps.routerInteraction.currentPath !== callCtrlRoute &&
          !useV2
        ) {
          this._deps.routerInteraction.push(callCtrlRoute);
        }
      },
      webphoneHold: (sessionId, telephonySessionId) => {
        // user action track
        this._deps.callMonitor.allCallsClickHoldTrack();
        if (useActiveCallControl) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          return this._deps.activeCallControl.hold(telephonySessionId);
        }
        return this._deps.webphone?.hold(sessionId);
      },
      // @ts-expect-error TS(2322): Type '(activeCall: SwitchCallActiveCallParams | Ac... Remove this comment to see the full error message
      webphoneSwitchCall: async (activeCall) => {
        if (useActiveCallControl) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          return this._deps.activeCallControl.switch(
            (activeCall as ActiveSession).telephonySessionId,
          );
        }
        if (!this._deps.webphone) {
          return;
        }
        const session = await this._deps.webphone.switchCall(
          activeCall as SwitchCallActiveCallParams,
          this._deps.regionSettings.homeCountryId,
        );
        return session;
      },
      webphoneIgnore: (telephonySessionId) =>
        this._deps.activeCallControl?.ignore(telephonySessionId),
      ringoutHangup: async (...args) => {
        // user action track
        this._deps.callMonitor.allCallsClickHangupTrack();
        return this._deps.activeCallControl?.hangUp(...args);
      },
      ringoutTransfer: (sessionId) => {
        this._deps.routerInteraction.push(`/transfer/${sessionId}/active`);
      },
      ringoutReject: async (sessionId) => {
        // user action track
        this._deps.callMonitor.allCallsClickRejectTrack();
        return this._deps.activeCallControl?.reject(sessionId);
      },
      onViewContact: (options) => {
        if (!showViewContact) return;

        onViewContact(options);
      },
      onClickToSms: this._deps.composeText
        ? async (contact, isDummyContact = false) => {
            if (this._deps.routerInteraction) {
              this._deps.routerInteraction.push(composeTextRoute);
            }
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            this._deps.composeText.clean();
            const { name } = contact as {
              name: string;
            };
            if (name && contact.phoneNumber && isDummyContact) {
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.composeText.updateTypingToNumber(name);
              this._deps.contactSearch.search({ searchString: name });
            } else {
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.composeText.addToRecipients(contact);
            }
          }
        : undefined,
      // @ts-expect-error TS(2322): Type '(({ phoneNumber, name, entityType }: OnCreat... Remove this comment to see the full error message
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }) => {
            const hasMatchNumber =
              await this._deps.contactMatcher.hasMatchNumber({
                phoneNumber,
                ignoreCache: true,
              });
            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await this._deps.contactMatcher.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      isLoggedContact,

      onLogCall:
        onLogCall ||
        (this._deps.callLogger &&
          (async ({ call, contact, redirect = true }) => {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            await this._deps.callLogger.logCall({
              call,
              contact,
              redirect,
            });
          })),
      onCallsEmpty:
        onCallsEmpty ||
        (() => {
          const isWebRTC =
            this._deps.callingSettings.callingMode === callingModes.webphone;

          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          if (isWebRTC && !this._deps.webphone.sessions.length) {
            this._deps.routerInteraction.push('/dialer');
          }
        }),
      isSessionAConferenceCall: (sessionId) =>
        !!this._deps.conferenceCall?.isConferenceSession(sessionId),
      onCallItemClick: (call) => {
        if (!call.webphoneSession) {
          // For ringout call
          if (isRingingInboundCall(call)) {
            return;
          }

          const { telephonySessionId } = call;
          // to track the call item be clicked.
          this._deps.callMonitor.callItemClickTrack();
          this._deps.routerInteraction.push(
            `/simplifycallctrl/${telephonySessionId}`,
          );
        } else {
          // For webphone call
          // show the ring call modal when click a ringing call.
          if (isRingingInboundCall(call)) {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            this._deps.webphone.toggleMinimized(call.webphoneSession.id);
            return;
          }
          if (call.webphoneSession && call.webphoneSession.id) {
            // to track the call item be clicked.
            this._deps.callMonitor.callItemClickTrack();
            this._deps.routerInteraction.push(
              `${callCtrlRoute}/${call.webphoneSession.id}`,
            );
          }
        }
      },
      getAvatarUrl,
      updateSessionMatchedContact: (sessionId, contact) =>
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.webphone.updateSessionMatchedContact(sessionId, contact),
      // function to check if a call is on hold status
      isOnHold: (webphoneSession) => {
        if (useActiveCallControl) {
          const call =
            this._deps.callMonitor.calls.find(
              (call) => call.webphoneSession === webphoneSession,
            ) || {};
          // @ts-expect-error TS(2339): Property 'telephonySession' does not exist on type... Remove this comment to see the full error message
          const { telephonySession } = call;
          return isHolding(telephonySession);
        }
        return isOnHold(webphoneSession);
      },
      clickSwitchTrack: () => {
        this._deps.activeCallControl?.clickSwitchTrack?.();
      },
    };
  }

  get isWide() {
    return true;
  }
}

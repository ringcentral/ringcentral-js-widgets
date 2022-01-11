import React from 'react';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { isRingingInboundCall } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import { ActiveSession } from '@ringcentral-integration/commons/modules/ActiveCallControlV2';
import { isHolding } from '@ringcentral-integration/commons/modules/ActiveCallControlV2/helpers';
import callingModes from '@ringcentral-integration/commons/modules/CallingSettings/callingModes';
import { isOnHold } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import { SwitchCallActiveCallParams } from '@ringcentral-integration/commons/modules/WebphoneV2';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import { ModalContent } from '../../components/ActiveCallItemV2';
import {
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
    { dep: 'ModalUI', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'CallLogger', optional: true },
    { dep: 'ComposeText', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    { dep: 'ActiveCallControl', optional: true },
  ],
})
export class ActiveCallsUI<T = {}> extends RcUIModuleV2<Deps & T> {
  constructor(deps: Deps & T) {
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
      showSwitchCall:
        showSwitchCall && isWebRTC && this._deps.webphone?.connected,
      autoLog: !!this._deps.callLogger?.autoLog,
      isWebRTC,
      conferenceCallParties: this._deps.conferenceCall
        ? this._deps.conferenceCall.partyProfiles
        : null,
      useV2,
      disableLinks:
        !this._deps.connectivityMonitor.connectivity ||
        this._deps.rateLimiter.throttling ||
        controlBusy,
      useCallControl,
      isWide: this.isWide,
    };
  }

  getUIFunctions({
    composeTextRoute = '/composeText',
    callCtrlRoute = '/calls/active',
    onCreateContact,
    onLogCall,
    isLoggedContact,
    onCallsEmpty,
    onViewContact,
    showViewContact = true,
    getAvatarUrl,
    useV2,
    useCallControl,
  }: ActiveCallsContainerProps): UIFunctions<ActiveCallsPanelProps> {
    // Toggle to control if use new call control API, should using the ActiveCallControlV2 module same time,
    // when you set this toggle to true (https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession)
    const useActiveCallControl = !!(
      useCallControl && this._deps.activeCallControl
    );
    return {
      modalConfirm: (props) =>
        this._deps.modalUI?.confirm({
          ...props,
          content: ModalContentRendererID,
        }),
      modalClose: (id) => this._deps.modalUI?.close(id),
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
        }),
      webphoneAnswer: async (
        sessionId,
        telephonySessionId,
        isHoldAndAnswer = false,
      ) => {
        if (useActiveCallControl) {
          isHoldAndAnswer && this._deps.activeCallControl.answerAndHold
            ? this._deps.activeCallControl.answerAndHold(telephonySessionId)
            : this._deps.activeCallControl.answer(telephonySessionId);
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
      webphoneToVoicemail: (sessionId, telephonySessionId) => {
        if (useActiveCallControl) {
          return this._deps.activeCallControl.reject(telephonySessionId);
        }
        return this._deps.webphone?.toVoiceMail(sessionId);
      },
      webphoneReject: (sessionId) => this._deps.webphone?.reject(sessionId),
      webphoneHangup: (sessionId, telephonySessionId) => {
        // user action track
        this._deps.callMonitor.allCallsClickHangupTrack();
        if (useActiveCallControl) {
          return this._deps.activeCallControl.hangUp(telephonySessionId);
        }
        return this._deps.webphone?.hangup(sessionId);
      },
      webphoneResume: async (sessionId, telephonySessionId) => {
        if (useActiveCallControl) {
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
          return this._deps.activeCallControl.hold(telephonySessionId);
        }
        return this._deps.webphone?.hold(sessionId);
      },
      webphoneSwitchCall: async (activeCall) => {
        if (useActiveCallControl) {
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
      onViewContact: showViewContact
        ? onViewContact ||
          (({ contact }) => {
            const { id, type } = contact;
            this._deps.contactDetailsUI?.showContactDetails({
              type,
              id,
              direct: true,
            });
          })
        : null,
      onClickToSms: this._deps.composeText
        ? async (contact, isDummyContact = false) => {
            if (this._deps.routerInteraction) {
              this._deps.routerInteraction.push(composeTextRoute);
            }
            this._deps.composeText.clean();
            const { name } = contact as {
              name: string;
            };
            if (name && contact.phoneNumber && isDummyContact) {
              this._deps.composeText.updateTypingToNumber(name);
              this._deps.contactSearch.search({ searchString: name });
            } else {
              this._deps.composeText.addToRecipients(contact);
            }
          }
        : undefined,
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
        this._deps.webphone.updateSessionMatchedContact(sessionId, contact),
      // function to check if a call is on hold status
      isOnHold: (webphoneSession) => {
        if (useActiveCallControl) {
          const call =
            this._deps.callMonitor.calls.find(
              (call) => call.webphoneSession === webphoneSession,
            ) || {};
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

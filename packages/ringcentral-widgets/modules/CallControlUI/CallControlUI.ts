import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { getWebphoneSessionDisplayName } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettings';
import type {
  ConferenceCall,
  LastCallInfo,
} from '@ringcentral-integration/commons/modules/ConferenceCall';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import { sessionStatus } from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import { RcUIModuleV2, computed } from '@ringcentral-integration/core';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { filter, find, values } from 'ramda';

import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { checkShouldHidePhoneNumber } from '../../lib/checkShouldHidePhoneNumber';

import type {
  CallControlComponentProps,
  Deps,
} from './CallControlUI.interface';
import { getLastCallInfoFromWebphoneSession } from './CallControlUI.interface';

@Module({
  name: 'CallControlUI',
  deps: [
    'Webphone',
    'Locale',
    'ContactMatcher',
    'RegionSettings',
    'Brand',
    'ContactSearch',
    'CallingSettings',
    'ConnectivityManager',
    'ForwardingNumber',
    'CallMonitor',
    'ExtensionInfo',
    'AppFeatures',
    'AccountInfo',
    { dep: 'ConferenceCall', optional: true },
    { dep: 'RouterInteraction', optional: true },
  ],
})
export class CallControlUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({
      deps,
    });
  }

  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
  currentSessionId: string = null;

  @computed((that: CallControlUI) => [
    that.currentSessionId,
    that._deps.webphone.sessions,
    that._deps.webphone.activeSession,
  ])
  get currentSession() {
    return (
      (this.currentSessionId
        ? find(
            (session) => session.id === this.currentSessionId,
            this._deps.webphone.sessions,
          )
        : this._deps.webphone.activeSession) || ({} as NormalizedSession)
    );
  }

  @computed((that: CallControlUI) => [
    that._deps.contactMatcher?.dataMapping,
    that.currentSession.from,
  ])
  get fromMatches() {
    return (
      this._deps.contactMatcher?.dataMapping?.[this.currentSession.from] ?? []
    );
  }

  @computed((that: CallControlUI) => [
    that._deps.contactMatcher?.dataMapping,
    that.currentSession.to,
  ])
  get toMatches() {
    return (
      this._deps.contactMatcher?.dataMapping?.[this.currentSession.to] ?? []
    );
  }

  get callerIdName() {
    return getWebphoneSessionDisplayName(this.currentSession as any);
  }

  getUIProps({
    params,
    showCallQueueName = false,
    showCallerIdName = false,
    showPark = false,
    children,
  }: CallControlComponentProps) {
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    this.currentSessionId = params?.sessionId;
    const nameMatches =
      this.currentSession.direction === callDirections.outbound
        ? this.toMatches
        : this.fromMatches;

    const isWebRTC =
      this._deps.callingSettings.callingMode === callingModes.webphone;
    const isInboundCall =
      this.currentSession.direction === callDirections.inbound;

    let lastCallInfo = this._deps.conferenceCall?.lastCallInfo;

    const conferenceCallEquipped =
      this._deps.conferenceCall?.hasPermission ?? false;
    const conferenceData = conferenceCallEquipped
      ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        values(this._deps.conferenceCall.conferences)[0]
      : undefined;
    const isOnConference = conferenceCallEquipped
      ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.conferenceCall.isConferenceSession(this.currentSession.id)
      : false;
    const isMerging =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      conferenceCallEquipped && this._deps.conferenceCall.isMerging;
    const conferenceCallId =
      conferenceData && isWebRTC ? conferenceData.conference.id : null;
    const isConferenceCallOverload =
      conferenceData && isWebRTC
        ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          this._deps.conferenceCall.isOverload(conferenceCallId)
        : false;

    const hasConferenceCall = !!conferenceData;
    const conferenceCallParties = conferenceCallEquipped
      ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.conferenceCall.partyProfiles
      : undefined;

    // TODO: investigate whether this can simply use isMerging
    const fromSessionId = conferenceCallEquipped
      ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.conferenceCall.mergingPair?.fromSessionId
      : undefined;
    const hideChildren =
      conferenceCallEquipped &&
      !isInboundCall &&
      fromSessionId &&
      fromSessionId !== this.currentSession.id &&
      lastCallInfo &&
      lastCallInfo.status !== sessionStatus.finished;

    if (this.currentSession.warmTransferSessionId) {
      const warmTransferSession = this._deps.webphone.sessions.find(
        (session) => session.id === this.currentSession.warmTransferSessionId,
      );
      lastCallInfo = getLastCallInfoFromWebphoneSession(
        warmTransferSession!,
        this._deps.contactMatcher.dataMapping,
      );
    }

    const disableLinks = !!(
      this._deps.connectivityManager.isOfflineMode ||
      this._deps.connectivityManager.isVoipOnlyMode
    );

    let phoneNumber =
      this.currentSession.direction === callDirections.outbound
        ? this.currentSession.to
        : this.currentSession.from;

    if (
      this._deps.appFeatures.isCDCEnabled &&
      checkShouldHidePhoneNumber(phoneNumber, nameMatches)
    ) {
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      phoneNumber = null;
    }

    return {
      brand: this._deps.brand.name,
      nameMatches,
      phoneNumber,
      currentLocale: this._deps.locale.currentLocale,
      session: this.currentSession,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      showBackButton: true, // callMonitor.calls.length > 0,
      searchContactList: this._deps.contactSearch.sortedResult,
      showSpinner: isMerging,
      conferenceCallEquipped,
      hasConferenceCall,
      conferenceCallParties,
      conferenceCallId,
      lastCallInfo,
      showCallerIdName,
      callerIdName: showCallerIdName ? this.callerIdName : undefined,
      // TODO: investigate whether it's better to just
      // use isMerging and let the component decide whether to display children
      children: hideChildren ? null : children,
      isOnConference,
      isWebRTC,
      disableLinks,
      isConferenceCallOverload,
      disableFlip: this._deps.forwardingNumber.flipNumbers.length === 0,
      showCallQueueName,
      showPark,
      controlBusy: this.currentSession.callStatus === sessionStatus.setup,
    };
  }

  getInitialLayout = ({
    conferenceCallEquipped,
    isOnConference,
    lastCallInfo,
    session,
  }: {
    conferenceCallEquipped: boolean;
    isOnConference: boolean;
    lastCallInfo?: LastCallInfo;
    session?: NormalizedSession;
  }) => {
    let layout = callCtrlLayouts.normalCtrl;
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (session.warmTransferSessionId) {
      return callCtrlLayouts.completeTransferCtrl;
    }
    if (!conferenceCallEquipped) {
      return layout;
    }

    if (isOnConference) {
      return callCtrlLayouts.conferenceCtrl;
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const isInboundCall = session.direction === callDirections.inbound;

    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const { fromSessionId } = this._deps.conferenceCall.mergingPair;
    const fromSession = find(
      (x: any) => x.id === fromSessionId,
      this._deps.webphone.sessions,
    );

    const activeSessionId =
      this._deps.webphone &&
      this._deps.webphone.activeSession &&
      this._deps.webphone.activeSession.id;

    if (
      !isOnConference &&
      !isInboundCall &&
      fromSession &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      fromSessionId !== session.id &&
      lastCallInfo &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (session.callStatus !== sessionStatus.onHold ||
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        (session.callStatus === sessionStatus.onHold &&
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          session.id === activeSessionId))
    ) {
      // enter merge ctrl page.
      layout = callCtrlLayouts.mergeCtrl;
    }

    return layout;
  };

  getUIFunctions({
    getAvatarUrl,
    onBackButtonClick,
    phoneTypeRenderer,
    phoneSourceNameRenderer,
  }: CallControlComponentProps) {
    return {
      getInitialLayout: this.getInitialLayout,
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          siteCode: this._deps.extensionInfo?.site?.code ?? '',
          isMultipleSiteEnabled: this._deps.extensionInfo.isMultipleSiteEnabled,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
          isEDPEnabled: this._deps.appFeatures.isEDPEnabled,
        }),
      onHangup: (
        sessionId: string,
        layout: ObjectMapValue<typeof callCtrlLayouts>,
      ) => {
        this._deps.webphone.hangup(sessionId);
        if (layout && layout === callCtrlLayouts.mergeCtrl) {
          this._deps.callMonitor.mergeControlClickHangupTrack();
        }
      },
      onMute: (sessionId: string) => this._deps.webphone.mute(sessionId),
      onUnmute: (sessionId: string) => this._deps.webphone.unmute(sessionId),
      onHold: (sessionId: string) => this._deps.webphone.hold(sessionId),
      onUnhold: (sessionId: string) => {
        this._deps.webphone.unhold(sessionId);
      },
      onRecord: (sessionId: string) =>
        this._deps.webphone.startRecord(sessionId),
      onStopRecord: (sessionId: string) =>
        this._deps.webphone.stopRecord(sessionId),
      sendDTMF: (...args: Parameters<Webphone['sendDTMF']>) =>
        this._deps.webphone.sendDTMF(...args),
      updateSessionMatchedContact: (
        ...args: Parameters<Webphone['updateSessionMatchedContact']>
      ) => this._deps.webphone.updateSessionMatchedContact(...args),
      getAvatarUrl,
      onBackButtonClick,
      onFlip: (sessionId: string) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.routerInteraction.push(`/flip/${sessionId}`);
      },
      onTransfer: (sessionId: string) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.routerInteraction.push(`/transfer/${sessionId}/webphone`);
      },
      onCompleteTransfer: (sessionId: string) => {
        this._deps.webphone.completeWarmTransfer(sessionId);
      },
      onPark: (sessionId: string) => this._deps.webphone.park(sessionId),
      searchContact: (searchString: string) =>
        this._deps.contactSearch.debouncedSearch({ searchString }),
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      onAdd: (sessionId: string) => {
        // track user click add on call control
        this._deps.callMonitor.callControlClickAddTrack();
        const session = find(
          (x: any) => x.id === sessionId,
          this._deps.webphone.sessions,
        );
        if (
          !session ||
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          !this._deps.conferenceCall.validateCallRecording(session)
        ) {
          return;
        }
        let fromNumber = this._deps.callingSettings.fromNumber;
        if (session.direction === callDirections.outbound) {
          fromNumber = session.fromNumber; // keep the same fromNumber
        }
        const otherCalls = filter(
          (call: any) =>
            call.webphoneSession && call.webphoneSession.id !== session.id,
          this._deps.callMonitor.allCalls,
        );
        if (otherCalls.length) {
          // goto 'calls on hold' page
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          this._deps.routerInteraction.push(
            `/conferenceCall/callsOnhold/${fromNumber}/${session.id}`,
          );
        } else {
          if (this._deps.conferenceCall) {
            this._deps.conferenceCall.setMergeParty({
              fromSessionId: sessionId,
            });
          }
          // goto dialer directly
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          this._deps.routerInteraction.push(
            `/conferenceCall/dialer/${fromNumber}/${sessionId}`,
          );
        }
      },
      onBeforeMerge: (sessionId: string) => {
        const session = find(
          (x: any) => x.id === sessionId,
          this._deps.webphone.sessions,
        );
        if (
          !session ||
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          !this._deps.conferenceCall.validateCallRecording(session)
        ) {
          return false;
        }
        if (this._deps.conferenceCall) {
          const conferenceData = Object.values(
            this._deps.conferenceCall.conferences,
          )[0];
          if (conferenceData) {
            const conferenceSession = find(
              (x: any) => x.id === conferenceData.sessionId,
              this._deps.webphone.sessions,
            );
            if (
              conferenceSession &&
              !this._deps.conferenceCall.validateCallRecording(
                conferenceSession,
              )
            ) {
              return false;
            }
          }
        }
        return true;
      },
      onMerge: async (sessionId: string) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        const sessions = await this._deps.conferenceCall.parseMergingSessions({
          sessionId,
        });
        if (sessions) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          await this._deps.conferenceCall.mergeSessions(sessions);
        }
      },

      gotoParticipantsCtrl: () => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this._deps.routerInteraction.push('/conferenceCall/participants');
        // track user click participant area on call control
        this._deps.callMonitor.callControlClickParticipantAreaTrack();
      },
      loadConference: (conferenceId: string) => {
        if (this._deps.conferenceCall) {
          this._deps.conferenceCall.loadConference(conferenceId);
        }
      },
      closeMergingPair: () => {
        return (
          this._deps.conferenceCall &&
          this._deps.conferenceCall.closeMergingPair()
        );
      },
      setMergeParty: (...args: Parameters<ConferenceCall['setMergeParty']>) => {
        return (
          this._deps.conferenceCall &&
          this._deps.conferenceCall.setMergeParty(...args)
        );
      },
      // user action track functions
      afterHideMergeConfirm: () =>
        this._deps.callMonitor.confirmMergeClickCloseTrack(),
      afterConfirmMerge: () =>
        this._deps.callMonitor.confirmMergeClickMergeTrack(),
      afterOnMerge: () => this._deps.callMonitor.callControlClickMergeTrack(),
    };
  }
}

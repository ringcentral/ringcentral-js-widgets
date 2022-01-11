import { filter, find, values } from 'ramda';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import callingModes from '@ringcentral-integration/commons/modules/CallingSettings/callingModes';
import {
  ConferenceCall,
  LastCallInfo,
} from '@ringcentral-integration/commons/modules/ConferenceCallV2';
import { sessionStatus } from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';
import { RcUIModuleV2 } from '@ringcentral-integration/core';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { checkShouldHidePhoneNumber } from '../../lib/checkShouldHidePhoneNumber';
import {
  CallControlComponentProps,
  Deps,
  getLastCallInfoFromWebphoneSession,
} from './CallControlUI.interface';

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
    { dep: 'ConferenceCall', optional: true },
    { dep: 'RouterInteraction', optional: true },
  ],
})
export class CallControlUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps({
    params,
    showCallQueueName = false,
    showPark = false,
    children,
  }: CallControlComponentProps) {
    const {
      brand,
      callingSettings,
      conferenceCall,
      connectivityManager,
      contactMatcher,
      contactSearch,
      forwardingNumber,
      regionSettings,
      locale,
      webphone,
    } = this._deps;

    const sessionId = params?.sessionId;

    const currentSession =
      (sessionId
        ? find((session) => session.id === sessionId, webphone.sessions)
        : webphone.activeSession) || ({} as NormalizedSession);
    const contactMapping = contactMatcher?.dataMapping;
    const fromMatches = contactMapping?.[currentSession.from] ?? [];
    const toMatches = contactMapping?.[currentSession.to] ?? [];
    const nameMatches =
      currentSession.direction === callDirections.outbound
        ? toMatches
        : fromMatches;

    const isWebRTC = callingSettings.callingMode === callingModes.webphone;
    const isInboundCall = currentSession.direction === callDirections.inbound;

    let lastCallInfo = conferenceCall?.lastCallInfo;

    const conferenceCallEquipped = conferenceCall?.hasPermission ?? false;
    const conferenceData = conferenceCallEquipped
      ? values(conferenceCall.conferences)[0]
      : undefined;
    const isOnConference = conferenceCallEquipped
      ? conferenceCall.isConferenceSession(currentSession.id)
      : false;
    const isMerging = conferenceCallEquipped && conferenceCall.isMerging;
    const conferenceCallId =
      conferenceData && isWebRTC ? conferenceData.conference.id : null;
    const isConferenceCallOverload =
      conferenceData && isWebRTC
        ? conferenceCall.isOverload(conferenceCallId)
        : false;

    const hasConferenceCall = !!conferenceData;
    const conferenceCallParties = conferenceCallEquipped
      ? conferenceCall.partyProfiles
      : undefined;

    // TODO: investigate whether this can simply use isMerging
    const fromSessionId = conferenceCallEquipped
      ? conferenceCall.mergingPair?.fromSessionId
      : undefined;
    const hideChildren =
      conferenceCallEquipped &&
      !isInboundCall &&
      fromSessionId &&
      fromSessionId !== currentSession.id;
    lastCallInfo && lastCallInfo.status !== sessionStatus.finished;

    if (currentSession.warmTransferSessionId) {
      const warmTransferSession = webphone.sessions.find(
        (session) => session.id === currentSession.warmTransferSessionId,
      );
      lastCallInfo = getLastCallInfoFromWebphoneSession(warmTransferSession);
    }

    const disableLinks = !!(
      connectivityManager.isOfflineMode || connectivityManager.isVoipOnlyMode
    );

    let phoneNumber =
      currentSession.direction === callDirections.outbound
        ? currentSession.to
        : currentSession.from;

    if (
      this._deps.appFeatures.isCDCEnabled &&
      checkShouldHidePhoneNumber(phoneNumber, nameMatches)
    ) {
      phoneNumber = null;
    }

    return {
      brand: brand.name,
      nameMatches,
      phoneNumber,
      currentLocale: locale.currentLocale,
      session: currentSession,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      showBackButton: true, // callMonitor.calls.length > 0,
      searchContactList: contactSearch.sortedResult,
      showSpinner: isMerging,
      conferenceCallEquipped,
      hasConferenceCall,
      conferenceCallParties,
      conferenceCallId,
      lastCallInfo,
      // TODO: investigate whether it's better to just
      // use isMerging and let the component decide whether to display children
      children: hideChildren ? null : children,
      isOnConference,
      isWebRTC,
      disableLinks,
      isConferenceCallOverload,
      disableFlip: forwardingNumber.flipNumbers.length === 0,
      showCallQueueName,
      showPark,
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
    const { conferenceCall, webphone } = this._deps;
    let layout = callCtrlLayouts.normalCtrl;
    if (session.warmTransferSessionId) {
      return callCtrlLayouts.completeTransferCtrl;
    }
    if (!conferenceCallEquipped) {
      return layout;
    }

    if (isOnConference) {
      return callCtrlLayouts.conferenceCtrl;
    }
    const isInboundCall = session.direction === callDirections.inbound;

    const { fromSessionId } = conferenceCall.mergingPair;
    const fromSession = find(
      (x: any) => x.id === fromSessionId,
      webphone.sessions,
    );

    const activeSessionId =
      webphone && webphone.activeSession && webphone.activeSession.id;

    if (
      !isOnConference &&
      !isInboundCall &&
      fromSession &&
      fromSessionId !== session.id &&
      lastCallInfo &&
      (session.callStatus !== sessionStatus.onHold ||
        (session.callStatus === sessionStatus.onHold &&
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
    const {
      conferenceCall,
      webphone,
      regionSettings,
      extensionInfo,
      callingSettings,
      callMonitor,
      routerInteraction,
      contactSearch,
    } = this._deps;
    return {
      getInitialLayout: this.getInitialLayout,
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: regionSettings.areaCode,
          countryCode: regionSettings.countryCode,
          siteCode: extensionInfo?.site?.code ?? '',
          isMultipleSiteEnabled: extensionInfo.isMultipleSiteEnabled,
        }),
      onHangup: (
        sessionId: string,
        layout: ObjectMapValue<typeof callCtrlLayouts>,
      ) => {
        webphone.hangup(sessionId);
        if (layout && layout === callCtrlLayouts.mergeCtrl) {
          callMonitor.mergeControlClickHangupTrack();
        }
      },
      onMute: (sessionId: string) => webphone.mute(sessionId),
      onUnmute: (sessionId: string) => webphone.unmute(sessionId),
      onHold: (sessionId: string) => webphone.hold(sessionId),
      onUnhold: (sessionId: string) => {
        webphone.unhold(sessionId);
      },
      onRecord: (sessionId: string) => webphone.startRecord(sessionId),
      onStopRecord: (sessionId: string) => webphone.stopRecord(sessionId),
      sendDTMF: (...args: Parameters<Webphone['sendDTMF']>) =>
        webphone.sendDTMF(...args),
      updateSessionMatchedContact: (
        ...args: Parameters<Webphone['updateSessionMatchedContact']>
      ) => webphone.updateSessionMatchedContact(...args),
      getAvatarUrl,
      onBackButtonClick,
      onFlip: (sessionId: string) => {
        routerInteraction.push(`/flip/${sessionId}`);
      },
      onTransfer: (sessionId: string) => {
        routerInteraction.push(`/transfer/${sessionId}/webphone`);
      },
      onCompleteTransfer: (sessionId: string) => {
        webphone.completeWarmTransfer(sessionId);
      },
      onPark: (sessionId: string) => webphone.park(sessionId),
      searchContact: (searchString: string) =>
        contactSearch.debouncedSearch({ searchString }),
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      onAdd: (sessionId: string) => {
        // track user click add on call control
        callMonitor.callControlClickAddTrack();
        const session = find((x: any) => x.id === sessionId, webphone.sessions);
        if (!session || !conferenceCall.validateCallRecording(session)) {
          return;
        }
        let fromNumber = callingSettings.fromNumber;
        if (session.direction === callDirections.outbound) {
          fromNumber = session.fromNumber; // keep the same fromNumber
        }
        const otherCalls = filter(
          (call: any) =>
            call.webphoneSession && call.webphoneSession.id !== session.id,
          callMonitor.allCalls,
        );
        if (otherCalls.length) {
          // goto 'calls on hold' page
          routerInteraction.push(
            `/conferenceCall/callsOnhold/${fromNumber}/${session.id}`,
          );
        } else {
          if (conferenceCall) {
            conferenceCall.setMergeParty({ fromSessionId: sessionId });
          }
          // goto dialer directly
          routerInteraction.push(
            `/conferenceCall/dialer/${fromNumber}/${sessionId}`,
          );
        }
      },
      onBeforeMerge: (sessionId: string) => {
        const session = find((x: any) => x.id === sessionId, webphone.sessions);
        if (!session || !conferenceCall.validateCallRecording(session)) {
          return false;
        }
        if (conferenceCall) {
          const conferenceData = Object.values(conferenceCall.conferences)[0];
          if (conferenceData) {
            const conferenceSession = find(
              (x: any) => x.id === conferenceData.sessionId,
              webphone.sessions,
            );
            if (
              conferenceSession &&
              !conferenceCall.validateCallRecording(conferenceSession)
            ) {
              return false;
            }
          }
        }
        return true;
      },
      onMerge: async (sessionId: string) => {
        const sessions = await conferenceCall.parseMergingSessions({
          sessionId,
        });
        if (sessions) {
          await conferenceCall.mergeSessions(sessions);
        }
      },

      gotoParticipantsCtrl: () => {
        routerInteraction.push('/conferenceCall/participants');
        // track user click participant area on call control
        callMonitor.callControlClickParticipantAreaTrack();
      },
      loadConference: (conferenceId: string) => {
        if (conferenceCall) {
          conferenceCall.loadConference(conferenceId);
        }
      },
      closeMergingPair: () => {
        return conferenceCall && conferenceCall.closeMergingPair();
      },
      setMergeParty: (...args: Parameters<ConferenceCall['setMergeParty']>) => {
        return conferenceCall && conferenceCall.setMergeParty(...args);
      },
      // user action track functions
      afterHideMergeConfirm: () => callMonitor.confirmMergeClickCloseTrack(),
      afterConfirmMerge: () => callMonitor.confirmMergeClickMergeTrack(),
      afterOnMerge: () => callMonitor.callControlClickMergeTrack(),
    };
  }
}

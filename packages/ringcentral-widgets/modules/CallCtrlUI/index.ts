import { find, filter } from 'ramda';
import { Module } from 'ringcentral-integration/lib/di';
import callDirections from 'ringcentral-integration/enums/callDirections';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'CallCtrlUI',
  deps: [
    'Webphone',
    'Locale',
    'ContactMatcher',
    'RegionSettings',
    'Brand',
    'ContactSearch',
    'ConferenceCall',
    'CallingSettings',
    'RolesAndPermissions',
    'ConnectivityManager',
    'ForwardingNumber',
    'CallMonitor',
    { dep: 'RouterInteraction', optional: true },
  ],
})
export default class CallCtrlUI extends RcUIModule {
  constructor({
    webphone,
    locale,
    contactMatcher,
    regionSettings,
    brand,
    contactSearch,
    conferenceCall,
    callingSettings,
    rolesAndPermissions,
    connectivityManager,
    forwardingNumber,
    callMonitor,
    routerInteraction,
    ...options
  }) {
    super({ ...options });
    this._webphone = webphone;
    this._locale = locale;
    this._contactMatcher = contactMatcher;
    this._regionSettings = regionSettings;
    this._brand = brand;
    this._contactSearch = contactSearch;
    this._conferenceCall = conferenceCall;
    this._callingSettings = callingSettings;
    this._rolesAndPermissions = rolesAndPermissions;
    this._connectivityManager = connectivityManager;
    this._forwardingNumber = forwardingNumber;
    this._callMonitor = callMonitor;
    this._routerInteraction = routerInteraction;
  }

  getUIProps({ params, children }) {
    const sessionId = params && params.sessionId;
    let currentSession;

    if (sessionId) {
      currentSession =
        this._webphone.sessions.find((session) => session.id === sessionId) ||
        {};
    } else {
      currentSession = this._webphone.activeSession || {};
    }

    const contactMapping =
      this._contactMatcher && this._contactMatcher.dataMapping;
    const fromMatches =
      (contactMapping && contactMapping[currentSession.from]) || [];
    const toMatches =
      (contactMapping && contactMapping[currentSession.to]) || [];
    const nameMatches =
      currentSession.direction === callDirections.outbound
        ? toMatches
        : fromMatches;

    const isWebRTC =
      this._callingSettings.callingMode === callingModes.webphone;
    const isInboundCall = currentSession.direction === callDirections.inbound;

    let isOnConference = false;
    let hasConferenceCall = false;
    let isMerging = false;
    let conferenceCallParties;
    let conferenceCallId = null;
    const lastCallInfo =
      this._conferenceCall && this._conferenceCall.lastCallInfo;
    let isConferenceCallOverload = false;
    const conferenceCallEquipped = !!(
      this._conferenceCall &&
      this._rolesAndPermissions.hasConferenceCallPermission
    );
    if (conferenceCallEquipped) {
      isOnConference = this._conferenceCall.isConferenceSession(
        currentSession.id,
      );
      const conferenceData = Object.values(this._conferenceCall.conferences)[0];

      isMerging = this._conferenceCall.isMerging;

      if (conferenceData && isWebRTC) {
        conferenceCallId = conferenceData.conference.id;
        isConferenceCallOverload = this._conferenceCall.isOverload(
          conferenceCallId,
        );
      }

      hasConferenceCall = !!conferenceData;
      conferenceCallParties = this._conferenceCall.partyProfiles;

      const { fromSessionId } = this._conferenceCall.mergingPair;
      if (
        !isInboundCall &&
        (fromSessionId &&
          fromSessionId !== currentSession.id &&
          lastCallInfo &&
          lastCallInfo.status &&
          lastCallInfo.status !== sessionStatus.finished)
      ) {
        // for mergeCtrl page, we don't show any children (container) component.
        children = null;
      }
    }

    const disableLinks = !!(
      this._connectivityManager.isOfflineMode ||
      this._connectivityManager.isVoipOnlyMode
    );

    return {
      brand: this._brand.fullName,
      nameMatches,
      currentLocale: this._locale.currentLocale,
      session: currentSession,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      showBackButton: true, // callMonitor.calls.length > 0,
      searchContactList: this._contactSearch.sortedResult,
      showSpinner: isMerging,
      conferenceCallEquipped,
      hasConferenceCall,
      conferenceCallParties,
      conferenceCallId,
      lastCallInfo,
      children,
      isOnConference,
      isWebRTC,
      disableLinks,
      isConferenceCallOverload,
      disableFlip: this._forwardingNumber.flipNumbers.length === 0,
    };
  }

  getUIFunctions({
    getAvatarUrl,
    onBackButtonClick,
    phoneTypeRenderer,
    phoneSourceNameRenderer,
  }) {
    return {
      getInitialLayout: ({
        conferenceCallEquipped,
        isOnConference,
        lastCallInfo,
        session,
      }) => {
        let layout = callCtrlLayouts.normalCtrl;

        if (!conferenceCallEquipped) {
          return layout;
        }

        if (isOnConference) {
          return callCtrlLayouts.conferenceCtrl;
        }
        const isInboundCall = session.direction === callDirections.inbound;

        const { fromSessionId } = this._conferenceCall.mergingPair;
        const fromSession = find(
          (x: any) => x.id === fromSessionId,
          this._webphone.sessions,
        );

        const activeSessionId =
          this._webphone &&
          this._webphone.activeSession &&
          this._webphone.activeSession.id;

        if (
          !isOnConference &&
          !isInboundCall &&
          (fromSession && fromSessionId !== session.id && lastCallInfo) &&
          (session.callStatus !== sessionStatus.onHold ||
            (session.callStatus === sessionStatus.onHold &&
              session.id === activeSessionId))
        ) {
          // enter merge ctrl page.
          layout = callCtrlLayouts.mergeCtrl;
        }

        return layout;
      },
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
        }),
      onHangup: (sessionId, layout) => {
        this._webphone.hangup(sessionId);
        if (layout && layout === callCtrlLayouts.mergeCtrl) {
          this._callMonitor.mergeControlClickHangupTrack();
        }
      },
      onMute: (sessionId) => this._webphone.mute(sessionId),
      onUnmute: (sessionId) => this._webphone.unmute(sessionId),
      onHold: (sessionId) => this._webphone.hold(sessionId),
      onUnhold: (sessionId) => {
        this._webphone.unhold(sessionId);
      },
      onRecord: (sessionId) => this._webphone.startRecord(sessionId),
      onStopRecord: (sessionId) => this._webphone.stopRecord(sessionId),
      sendDTMF: (value, sessionId) => this._webphone.sendDTMF(value, sessionId),
      updateSessionMatchedContact: (sessionId, contact) =>
        this._webphone.updateSessionMatchedContact(sessionId, contact),
      getAvatarUrl,
      onBackButtonClick,
      onFlip: (sessionId) => {
        this._routerInteraction.push(`/flip/${sessionId}`);
      },
      onTransfer: (sessionId) => {
        this._routerInteraction.push(`/transfer/${sessionId}/webphone`);
      },
      onPark: (sessionId) => this._webphone.park(sessionId),
      searchContact: (searchString) =>
        this._contactSearch.debouncedSearch({ searchString }),
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      onAdd: (sessionId) => {
        // track user click add on call control
        this._callMonitor.callControlClickAddTrack();
        const session = find(
          (x: any) => x.id === sessionId,
          this._webphone.sessions,
        );
        if (!session || !this._conferenceCall.validateCallRecording(session)) {
          return;
        }
        let fromNumber = this._callingSettings.fromNumber;
        if (session.direction === callDirections.outbound) {
          fromNumber = session.fromNumber; // keep the same fromNumber
        }
        const otherCalls = filter(
          (call: any) =>
            call.webphoneSession && call.webphoneSession.id !== session.id,
          this._callMonitor.allCalls,
        );
        if (otherCalls.length) {
          // goto 'calls on hold' page
          this._routerInteraction.push(
            `/conferenceCall/callsOnhold/${fromNumber}/${session.id}`,
          );
        } else {
          if (this._conferenceCall) {
            this._conferenceCall.setMergeParty({ fromSessionId: sessionId });
          }
          // goto dialer directly
          this._routerInteraction.push(
            `/conferenceCall/dialer/${fromNumber}/${sessionId}`,
          );
        }
      },
      onBeforeMerge: (sessionId) => {
        const session = find(
          (x: any) => x.id === sessionId,
          this._webphone.sessions,
        );
        if (!session || !this._conferenceCall.validateCallRecording(session)) {
          return false;
        }
        if (this._conferenceCall) {
          const conferenceData = Object.values(
            this._conferenceCall.conferences,
          )[0];
          if (conferenceData) {
            const conferenceSession = find(
              (x: any) => x.id === conferenceData.sessionId,
              this._webphone.sessions,
            );
            if (
              conferenceSession &&
              !this._conferenceCall.validateCallRecording(conferenceSession)
            ) {
              return false;
            }
          }
        }
        return true;
      },
      onMerge: async (sessionId) => {
        const sessions = await this._conferenceCall.parseMergingSessions({
          sessionId,
        });
        if (sessions) {
          await this._conferenceCall.mergeSessions(sessions);
        }
      },

      gotoParticipantsCtrl: () => {
        this._routerInteraction.push('/conferenceCall/participants');
        // track user click participant area on call control
        this._callMonitor.callControlClickParticipantAreaTrack();
      },
      loadConference: (confId) => {
        if (this._conferenceCall) {
          this._conferenceCall.loadConference(confId);
        }
      },
      closeMergingPair: () => {
        return this._conferenceCall && this._conferenceCall.closeMergingPair();
      },
      setMergeParty: (...args) => {
        return (
          this._conferenceCall && this._conferenceCall.setMergeParty(...args)
        );
      },
      // user action track functions
      afterHideMergeConfirm: () =>
        this._callMonitor.confirmMergeClickCloseTrack(),
      afterConfirmMerge: () => this._callMonitor.confirmMergeClickMergeTrack(),
      afterOnMerge: () => this._callMonitor.callControlClickMergeTrack(),
    };
  }
}

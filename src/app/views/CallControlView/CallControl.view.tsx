import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  AccountInfo,
  AppFeatures,
  ConnectivityManager,
  ExtensionInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ContactMatcher,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
  useParams,
} from '@ringcentral-integration/next-core';
import { CallCtrlContainer as CallControlPanel } from '@ringcentral-integration/widgets/components/CallCtrlContainer';
import { callCtrlLayouts } from '@ringcentral-integration/widgets/enums/callCtrlLayouts';
import { checkShouldHidePhoneNumber } from '@ringcentral-integration/widgets/lib/checkShouldHidePhoneNumber';
import { filter, find, values } from 'ramda';
import React, { useRef } from 'react';

import {
  AudioSettings,
  callingModes,
  CallingSettings,
  CallMonitor,
  type ConferencesState,
  ForwardingNumber,
  type LastCallInfo,
  sessionStatus,
  Webphone,
} from '../../services';

import type {
  CallControlComponentProps,
  CallControlViewOptions,
  CallControlViewProps,
} from './CallControl.view.interface';

interface IParams {
  sessionId?: string;
}

export function getLastCallInfoFromWebphoneSession(
  webphoneSession: NormalizedSession,
) {
  const sessionNumber =
    webphoneSession.direction === callDirections.outbound
      ? webphoneSession.to
      : webphoneSession.from;
  const sessionStatus = webphoneSession.callStatus;
  const matchedContact = webphoneSession.contactMatch;
  const calleeType = matchedContact
    ? calleeTypes.contacts
    : calleeTypes.unknown;
  return {
    calleeType,
    avatarUrl: matchedContact && matchedContact.profileImageUrl,
    name: matchedContact && matchedContact.name,
    status: sessionStatus,
    phoneNumber: sessionNumber,
  };
}

@injectable({
  name: 'CallControlView',
})
export class CallControlView extends RcViewModule {
  private params: IParams = {};

  constructor(
    protected _webphone: Webphone,
    protected _locale: Locale,
    protected _contactMatcher: ContactMatcher,
    protected _regionSettings: RegionSettings,
    protected _brand: Brand,
    protected _contactSearch: ContactSearch,
    protected _callingSettings: CallingSettings,
    protected _connectivityManager: ConnectivityManager,
    protected _forwardingNumber: ForwardingNumber,
    protected _callMonitor: CallMonitor,
    protected _extensionInfo: ExtensionInfo,
    protected _appFeatures: AppFeatures,
    protected _accountInfo: AccountInfo,
    @optional() protected _audioSettings?: AudioSettings,
    // TODO: why any?
    @optional() protected _router?: RouterPlugin,
    @optional('CallControlViewOptions')
    protected _callControlViewOptions?: CallControlViewOptions,
  ) {
    super();
  }

  currentSessionId: string | null = null;

  @computed((that: CallControlView) => [
    that.currentSessionId,
    that._webphone.sessions,
    that._webphone.activeSession,
  ])
  get currentSession() {
    return (
      (this.currentSessionId
        ? find(
            (session) => session.id === this.currentSessionId,
            this._webphone.sessions,
          )
        : this._webphone.activeSession) || ({} as NormalizedSession)
    );
  }

  @computed((that: CallControlView) => [
    that._contactMatcher?.dataMapping,
    that.currentSession.from,
  ])
  get fromMatches() {
    return this._contactMatcher?.dataMapping?.[this.currentSession.from] ?? [];
  }

  @computed((that: CallControlView) => [
    that._contactMatcher?.dataMapping,
    that.currentSession.to,
  ])
  get toMatches() {
    return this._contactMatcher?.dataMapping?.[this.currentSession.to] ?? [];
  }

  getUIProps({
    showCallQueueName = false,
    showPark = false,
    children,
  }: CallControlComponentProps) {
    this.currentSessionId = this.params?.sessionId || null;
    const nameMatches =
      this.currentSession.direction === callDirections.outbound
        ? this.toMatches
        : this.fromMatches;

    const isWebRTC =
      this._callingSettings.callingMode === callingModes.webphone;
    const isInboundCall =
      this.currentSession.direction === callDirections.inbound;

    const conferenceData = undefined;
    const isOnConference = false;
    const isMerging = false;
    const conferenceCallId = null;
    const isConferenceCallOverload = false;

    const conferenceCallParties = undefined;

    // TODO: investigate whether this can simply use isMerging
    const fromSessionId = undefined;
    const hideChildren = false;
    let lastCallInfo: any;
    if (this.currentSession.warmTransferSessionId) {
      const warmTransferSession = this._webphone.sessions.find(
        (session) => session.id === this.currentSession.warmTransferSessionId,
      );
      lastCallInfo = getLastCallInfoFromWebphoneSession(warmTransferSession!);
    }

    const disableLinks = !!(
      this._connectivityManager.isOfflineMode ||
      this._connectivityManager.isVoipOnlyMode
    );

    let phoneNumber: string | null =
      this.currentSession.direction === callDirections.outbound
        ? this.currentSession.to
        : this.currentSession.from;

    if (
      this._appFeatures.isCDCEnabled &&
      checkShouldHidePhoneNumber(phoneNumber, nameMatches)
    ) {
      phoneNumber = null;
    }

    return {
      brand: this._brand.name,
      callVolume: this._audioSettings?.callVolume ?? 1,
      nameMatches,
      phoneNumber,
      currentLocale: this._locale.currentLocale,
      session: this.currentSession,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      showBackButton: true, // callMonitor.allCalls.length > 0,
      searchContactList: this._contactSearch.sortedResult,
      showSpinner: isMerging,
      conferenceCallEquipped: false,
      hasConferenceCall: false,
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
      disableFlip: this._forwardingNumber.flipNumbers.length === 0,
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
    if (session?.warmTransferSessionId) {
      return callCtrlLayouts.completeTransferCtrl;
    }
    if (!conferenceCallEquipped) {
      return layout;
    }

    if (isOnConference) {
      return callCtrlLayouts.conferenceCtrl;
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
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          siteCode: this._extensionInfo?.site?.code ?? '',
          isMultipleSiteEnabled: this._extensionInfo.isMultipleSiteEnabled,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
          isEDPEnabled: this._appFeatures.isEDPEnabled,
        }),
      onHangup: (
        sessionId: string,
        layout: ObjectMapValue<typeof callCtrlLayouts>,
      ) => {
        this._webphone.hangup(sessionId);
        if (layout && layout === callCtrlLayouts.mergeCtrl) {
          this._callMonitor.mergeControlClickHangupTrack();
        }
      },
      onMute: (sessionId: string) => this._webphone.mute(sessionId),
      onUnmute: (sessionId: string) => this._webphone.unmute(sessionId),
      onHold: (sessionId: string) => this._webphone.hold(sessionId),
      onUnhold: (sessionId: string) => {
        this._webphone.unhold(sessionId);
      },
      onRecord: (sessionId: string) => this._webphone.startRecord(sessionId),
      onStopRecord: (sessionId: string) => this._webphone.stopRecord(sessionId),
      sendDTMF: (...args: Parameters<Webphone['sendDTMF']>) =>
        this._webphone.sendDTMF(...args),
      updateSessionMatchedContact: (
        ...args: Parameters<Webphone['updateSessionMatchedContact']>
      ) => this._webphone.updateSessionMatchedContact(...args),
      getAvatarUrl,
      onBackButtonClick,
      onFlip: (sessionId: string) => {
        this._router?.push(`/flip/${sessionId}`);
      },
      onTransfer: (sessionId: string) => {
        this._router?.push(`/transfer/${sessionId}/webphone`);
      },
      onCompleteTransfer: (sessionId: string) => {
        this._webphone.completeWarmTransfer(sessionId);
      },
      onPark: (sessionId: string) => this._webphone.park(sessionId),
      searchContact: (searchString: string) =>
        this._contactSearch.debouncedSearch({ searchString }),
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      onAdd: (sessionId: string) => {
        // track user click add on call control
        this._callMonitor.callControlClickAddTrack();
        const session = find(
          (x: any) => x.id === sessionId,
          this._webphone.sessions,
        );
        if (!session) {
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
          this._router?.push(
            `/conferenceCall/callsOnhold/${fromNumber}/${session.id}`,
          );
        } else {
          // goto dialer directly
          this._router?.push(
            `/conferenceCall/dialer/${fromNumber}/${sessionId}`,
          );
        }
      },
      onBeforeMerge: (sessionId: string) => {
        const session = find(
          (x: any) => x.id === sessionId,
          this._webphone.sessions,
        );
        if (!session) {
          return false;
        }
        return true;
      },
      onMerge: async (sessionId: string) => {},

      gotoParticipantsCtrl: () => {
        this._router?.push('/conferenceCall/participants');
        // track user click participant area on call control
        this._callMonitor.callControlClickParticipantAreaTrack();
      },
      loadConference: (conferenceId: string) => {},
      closeMergingPair: () => {},
      setMergeParty: (args: {
        fromSessionId?: string;
        toSessionId?: string;
      }) => {},
      // user action track functions
      afterHideMergeConfirm: () =>
        this._callMonitor.confirmMergeClickCloseTrack(),
      afterConfirmMerge: () => this._callMonitor.confirmMergeClickMergeTrack(),
      afterOnMerge: () => this._callMonitor.callControlClickMergeTrack(),
    };
  }

  component(props: Partial<CallControlViewProps>) {
    this.params = useParams<IParams>();
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component =
      this._callControlViewOptions?.component || CallControlPanel;

    return (
      // TODO: fix type
      // @ts-ignore
      <Component {..._props} {...uiFunctions} />
    );
  }
}

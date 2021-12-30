import formatMessage from 'format-message';
import Presence from 'ringcentral-client/build/paths/Presence';

import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { Module } from '@ringcentral-integration/commons/lib/di';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import { selector } from '@ringcentral-integration/commons/lib/selector';
import { ActiveCallControl } from '@ringcentral-integration/commons/modules/ActiveCallControlV2';
import callingModes from '@ringcentral-integration/commons/modules/CallingSettings/callingModes';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
import { GlobalStorage } from '@ringcentral-integration/commons/modules/GlobalStorageV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import dndStatus from '@ringcentral-integration/commons/modules/Presence/dndStatus';
import { QuickAccess } from '@ringcentral-integration/commons/modules/QuickAccessV2';
import { UserGuide } from '@ringcentral-integration/commons/modules/UserGuideV2';
import Webphone from '@ringcentral-integration/commons/modules/Webphone';
import presenceItemI18n from '@ringcentral-integration/widgets/lib/getPresenceStatusName/i18n';

import headerI18n from '../../components/CallMonitorBar/i18n';
import { CallLogSection } from '../../modules/CallLogSectionV2';
import { RouterInteraction } from '../../modules/RouterInteraction';
import AdapterModuleCoreBase from '../AdapterModuleCoreBase';
import { baseActionTypes } from '../AdapterModuleCoreBase/baseActionTypes';
import IframeMessageTransport from '../IframeMessageTransport';

const ALL_CALL_PATH = '/calls';
const ACTIVE_CALL_PATH = '/calls/active';

@Module({
  deps: [
    'CallingSettings',
    'GlobalStorage',
    'Locale',
    'Presence',
    'RouterInteraction',
    'Storage',
    'Webphone',
    'CallMonitor',
    { dep: 'ActiveCallControl', optional: true },
    { dep: 'UserGuide', optional: true },
    { dep: 'QuickAccess', optional: true },
    { dep: 'CallLogSection', optional: true },
  ],
})
export default class AdapterModuleCore extends AdapterModuleCoreBase {
  _callingSettings: CallingSettings;
  _callLogSection: CallLogSection;
  _activeCallControl: ActiveCallControl;
  _userGuide: UserGuide;
  _webphone: Webphone;
  _callMonitor: CallMonitor;
  _quickAccess: QuickAccess;
  private _showIncomingCallPage: any;
  onAllCallsPath: boolean;
  onCurrentCallPath: boolean;
  private _lastShowIncomingCallPage: any;
  private _showCallLogPage: boolean;
  private _lastShowCallLogPage: boolean;
  constructor({
    prefix,
    storageKey = 'adapterCore',
    actionTypes = baseActionTypes,
    callingSettings,
    globalStorage,
    locale,
    presence,
    routerInteraction,
    webphone,
    callMonitor,
    userGuide,
    quickAccess,
    messageTransport = new IframeMessageTransport({
      targetWindow: window.parent,
    }),
    activeCallControl,
    callLogSection,
    ...options
  }: {
    prefix?: string;
    storageKey?: string;
    actionTypes?: any;
    callingSettings?: CallingSettings;
    globalStorage?: GlobalStorage;
    locale?: Locale;
    presence?: Presence;
    routerInteraction?: RouterInteraction;
    webphone?: Webphone;
    callMonitor?: CallMonitor;
    userGuide?: UserGuide;
    quickAccess?: QuickAccess;
    messageTransport?: any;
    storage?: Storage;
    activeCallControl?: ActiveCallControl;
    callLogSection?: CallLogSection;
  }) {
    super({
      prefix,
      actionTypes,
      locale,
      messageTransport,
      presence,
      routerInteraction,
      globalStorage,
      storageKey,
      ...options,
    });

    this._callingSettings = callingSettings;
    this._webphone = webphone;
    this._callMonitor = callMonitor;
    this._userGuide = userGuide;
    this._quickAccess = quickAccess;
    this._activeCallControl = activeCallControl;
    this._callLogSection = callLogSection;
  }

  _pushOtherStateChanges() {
    this._pushRingState();
  }

  _pushRingState({ forcePush = false } = {}) {
    if (!this.ready) return;

    // TODO: we should refactor the entire sync logic to be more
    // declarative and straightforward
    if (forcePush) {
      this._postMessage({
        type: this._messageTypes.pushLocale,
        strings: this.localeStrings,
      });
    }
    if (!this._callingSettings) return;
    const { callingMode } = this._callingSettings;
    if (callingMode === callingModes.webphone) {
      // TODO: should change to use ActiveCallControl module when introduce ActiveCallControl module into other project
      if (this._activeCallControl) {
        this._pushActiveCallRingingState(forcePush);
      } else {
        this._pushWebphoneRingingState(forcePush);
      }
      this._pushCallStartTime(forcePush);
      this._pushIncomingCallPage(forcePush);
    } else {
      this._pushRingoutRingingState();
    }
  }

  _pushActiveCallRingingState(forcePush) {
    if (
      this._activeCallControl.ringSessions.length > 0 &&
      this._activeCallControl.ringSessionId &&
      (this._activeCallControl.ringSessionId !== this._ringSessionId ||
        forcePush)
    ) {
      this._ringSessionId = this._activeCallControl.ringSessionId;
      this._postMessage({
        type: this._messageTypes.pushRingState,
        ringing: true,
      });
    }
    // Check if ringing is over
    if (this._ringSessionId) {
      if (this._activeCallControl.ringSessions.length === 0) {
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: false,
        });
        this._ringSessionId = null;
      }
    } else {
      this._postMessage({
        type: this._messageTypes.pushRingState,
        ringing: false,
      });
    }
  }

  _pushWebphoneRingingState(forcePush) {
    const webphone = this._webphone;
    if (!webphone) {
      throw new Error(
        'webphone is a required dependency for monitoring WebRTC call',
      );
    }
    if (
      webphone.ringSession &&
      (webphone.ringSessionId !== this._ringSessionId || forcePush)
    ) {
      this._ringSessionId = webphone.ringSessionId;
      this._postMessage({
        type: this._messageTypes.pushRingState,
        ringing: true,
      });
    }
    // Check if ringing is over
    if (this._ringSessionId) {
      const ringingSessions = webphone.sessions.filter(
        (session) =>
          session.callStatus === 'webphone-session-connecting' &&
          session.direction === 'Inbound',
      );
      if (ringingSessions.length === 0) {
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: false,
        });
        this._ringSessionId = null;
      }
    } else {
      this._postMessage({
        type: this._messageTypes.pushRingState,
        ringing: false,
      });
    }
  }

  _pushRingoutRingingState() {
    const status = this._presence.telephonyStatus;
    if (this._presence.telephonyStatus !== this._telephonyStatus) {
      this._postMessage({
        type: this._messageTypes.pushRingState,
        ringing: status === 'Ringing',
      });
      this._telephonyStatus = status;
    }
  }

  _pushIncomingCallPage(forcePush: boolean) {
    this._showIncomingCallPage = !!(
      this._webphone &&
      this._webphone.ringSession &&
      !this._webphone.ringSession.minimized
    );
    this._showCallLogPage = !!this._callLogSection?.show;
    if (
      forcePush ||
      this._lastPath !== this._router.currentPath ||
      this._lastShowIncomingCallPage !== this._showIncomingCallPage ||
      this._lastShowCallLogPage !== this._showCallLogPage
    ) {
      this._lastPath = this._router.currentPath;
      this._lastShowIncomingCallPage = this._showIncomingCallPage;
      this._lastShowCallLogPage = this._showCallLogPage;
      const onCurrentCallPath = this._callLogSection
        ? this._callLogSection.show &&
          this._callLogSection.currentIdentify ===
            this._activeCallControl.activeSession?.sessionId
        : (this._router.currentPath === ACTIVE_CALL_PATH ||
            this._router.currentPath ===
              `${ACTIVE_CALL_PATH}/${this._webphone.activeSessionId}`) &&
          !this._showIncomingCallPage;
      if (
        forcePush ||
        this.onCurrentCallPath !== onCurrentCallPath ||
        this._lastShowIncomingCallPage !== this._showIncomingCallPage ||
        this._lastShowCallLogPage !== this._showCallLogPage
      ) {
        this.onCurrentCallPath = onCurrentCallPath;
        this._lastShowIncomingCallPage = this._showIncomingCallPage;
        this._lastShowCallLogPage = this._showCallLogPage;
        this._postMessage({
          type: this._messageTypes.pushOnCurrentCallPath,
          onCurrentCallPath,
        });
      }
      const onAllCallsPath =
        this._router.currentPath === ALL_CALL_PATH &&
        (this._callLogSection
          ? !this._callLogSection.show
          : !this._showIncomingCallPage);
      if (forcePush || this.onAllCallsPath !== onAllCallsPath) {
        this.onAllCallsPath = onAllCallsPath;
        this._postMessage({
          type: this._messageTypes.pushOnAllCallsPath,
          onAllCallsPath,
        });
      }
    }
  }

  _pushCallStartTime(forcePush: boolean) {
    const ringingCallsLength = this._callMonitor.activeRingCalls.length;
    const onHoldCallsLength = this._callMonitor.activeOnHoldCalls.length;
    const otherDeviceCallsLength = this._callMonitor.otherDeviceCalls.length;
    const currentStartTime =
      (this._callMonitor.activeCurrentCalls &&
        this._callMonitor.activeCurrentCalls.length > 0 &&
        this._callMonitor.activeCurrentCalls[0].startTime) ||
      0;
    if (
      forcePush ||
      this._lastRingCallsLength !== ringingCallsLength ||
      this._lastOnHoldCallsLength !== onHoldCallsLength ||
      this._lastCurrentStartTime !== currentStartTime ||
      this._otherDeviceCallsLength !== otherDeviceCallsLength
    ) {
      this._lastRingCallsLength = ringingCallsLength;
      this._lastOnHoldCallsLength = onHoldCallsLength;
      this._lastCurrentStartTime = currentStartTime;
      this._otherDeviceCallsLength = otherDeviceCallsLength;
      this._postMessage({
        type: this._messageTypes.pushCalls,
        ringingCallsLength,
        onHoldCallsLength,
        otherDeviceCallsLength,
        currentStartTime,
      });
      this._postMessage({
        type: this._messageTypes.pushLocale,
        strings: this.localeStrings,
      });
    }
  }

  @selector
  localeStrings = [
    () => this._locale.ready,
    () => this._locale.currentLocale,
    () => this._callMonitor.activeRingCalls.length,
    () => this._callMonitor.activeOnHoldCalls.length,
    () => this._callMonitor.otherDeviceCalls.length,
    (
      localeReady,
      currentLocale,
      ringingCallsLength,
      onHoldCallsLength,
      otherDeviceCallsLength,
    ) => {
      const ringCallsInfo =
        ringingCallsLength === 1
          ? formatMessage(headerI18n.getString('incomingCall', currentLocale), {
              numberOf: ringingCallsLength,
            })
          : formatMessage(
              headerI18n.getString('incomingCalls', currentLocale),
              { numberOf: ringingCallsLength },
            );
      const onHoldCallsInfo =
        onHoldCallsLength === 1
          ? formatMessage(headerI18n.getString('callOnHold', currentLocale), {
              numberOf: onHoldCallsLength,
            })
          : formatMessage(headerI18n.getString('callsOnHold', currentLocale), {
              numberOf: onHoldCallsLength,
            });
      const otherDeviceCallsInfo =
        otherDeviceCallsLength === 1
          ? formatMessage(
              headerI18n.getString('otherDeviceCall', currentLocale),
              {
                numberOf: otherDeviceCallsLength,
              },
            )
          : formatMessage(
              headerI18n.getString('otherDeviceCalls', currentLocale),
              {
                numberOf: otherDeviceCallsLength,
              },
            );
      const availableBtn = presenceItemI18n.getString(
        presenceStatus.available,
        currentLocale,
      );
      const busyBtn = presenceItemI18n.getString(
        presenceStatus.busy,
        currentLocale,
      );
      const offlineBtn = presenceItemI18n.getString(
        presenceStatus.offline,
        currentLocale,
      );
      const doNotAcceptAnyCallsBtn = presenceItemI18n.getString(
        dndStatus.doNotAcceptAnyCalls,
        currentLocale,
      );
      return {
        currentCallBtn: headerI18n.getString('currentCall', currentLocale),
        viewCallsBtn: headerI18n.getString('viewCalls', currentLocale),
        ringCallsInfo,
        onHoldCallsInfo,
        otherDeviceCallsInfo,
        availableBtn,
        busyBtn,
        offlineBtn,
        doNotAcceptAnyCallsBtn,
      };
    },
  ];

  @proxify
  async _onNavigateToCurrentCall() {
    const currentSession = this._webphone.activeSession;
    if (currentSession) {
      const currentCallPath = `${ACTIVE_CALL_PATH}/${currentSession.id}`;
      this._router.push(currentCallPath);
    }
    if (this._userGuide && this._userGuide.started) {
      this._userGuide.dismiss();
    }
    if (this._quickAccess && this._quickAccess.entered) {
      this._quickAccess.exit();
    }
    if (
      this._callLogSection &&
      this._activeCallControl?.activeSession?.sessionId
    ) {
      this._callLogSection.showLogSection(
        this._activeCallControl.activeSession.sessionId,
      );
    } else if (
      this._webphone &&
      this._webphone.ringSession &&
      !this._webphone.ringSession.minimized
    ) {
      this._webphone.toggleMinimized(this._webphone.ringSession.id);
    }
  }

  @proxify
  async _onNavigateToViewCalls() {
    this._router.push(ALL_CALL_PATH);
    if (this._userGuide && this._userGuide.started) {
      this._userGuide.dismiss();
    }
    if (this._quickAccess && this._quickAccess.entered) {
      this._quickAccess.exit();
    }
    if (
      this._webphone &&
      this._webphone.ringSession &&
      !this._webphone.ringSession.minimized
    ) {
      this._webphone.toggleMinimized(this._webphone.ringSession.id);
    }
    this._callLogSection?.closeLogSection();
  }
}

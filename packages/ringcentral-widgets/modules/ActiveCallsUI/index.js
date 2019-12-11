import { Module } from 'ringcentral-integration/lib/di';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callDirections from 'ringcentral-integration/enums/callDirections';
import { isRingingInboundCall } from 'ringcentral-integration/lib/callLogHelpers';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'ActiveCallsUI',
  deps: [
    'Brand',
    { dep: 'CallLogger', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    'CallMonitor',
    'Locale',
    'RegionSettings',
    'RolesAndPermissions',
    { dep: 'ConferenceCall', optional: true },
    'CallingSettings',
    'ConnectivityMonitor',
    'RateLimiter',
    { dep: 'ActiveCallControl', optional: true },
    { dep: 'Webphone', optional: true },
    'RouterInteraction',
    { dep: 'ComposeText', optional: true },
    'ContactSearch',
    'ContactMatcher',
  ],
})
export default class ActiveCallsUI extends RcUIModule {
  constructor({
    brand,
    callLogger,
    callMonitor,
    locale,
    regionSettings,
    rolesAndPermissions,
    conferenceCall,
    callingSettings,
    connectivityMonitor,
    rateLimiter,
    activeCallControl,
    webphone,
    routerInteraction,
    composeText,
    contactSearch,
    contactMatcher,
    contactDetailsUI,
    ...options
  }) {
    super({
      ...options,
    });
    this._brand = brand;
    this._callLogger = callLogger;
    this._callMonitor = callMonitor;
    this._locale = locale;
    this._regionSettings = regionSettings;
    this._rolesAndPermissions = rolesAndPermissions;
    this._conferenceCall = conferenceCall;
    this._callingSettings = callingSettings;
    this._connectivityMonitor = connectivityMonitor;
    this._rateLimiter = rateLimiter;
    this._activeCallControl = activeCallControl;
    this._webphone = webphone;
    this._routerInteraction = routerInteraction;
    this._composeText = composeText;
    this._contactSearch = contactSearch;
    this._contactMatcher = contactMatcher;
    this._contactDetailsUI = contactDetailsUI;
  }

  getUIProps({
    showContactDisplayPlaceholder = false,
    showRingoutCallControl = false,
    showSwitchCall = false,
    useV2,
  }) {
    const isWebRTC =
      this._callingSettings.callingMode === callingModes.webphone;
    const controlBusy =
      (this._activeCallControl && this._activeCallControl.busy) || false;

    return {
      currentLocale: this._locale.currentLocale,
      activeRingCalls: this._callMonitor.activeRingCalls,
      activeOnHoldCalls: this._callMonitor.activeOnHoldCalls,
      activeCurrentCalls: this._callMonitor.activeCurrentCalls,
      otherDeviceCalls: this._callMonitor.otherDeviceCalls,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      outboundSmsPermission: !!(
        this._rolesAndPermissions.permissions &&
        this._rolesAndPermissions.permissions.OutboundSMS
      ),
      internalSmsPermission: !!(
        this._rolesAndPermissions.permissions &&
        this._rolesAndPermissions.permissions.InternalSMS
      ),
      showSpinner: !!(this._conferenceCall && this._conferenceCall.isMerging),
      brand: this._brand.fullName,
      showContactDisplayPlaceholder,
      showRingoutCallControl,
      showSwitchCall:
        showSwitchCall &&
        isWebRTC &&
        this._webphone &&
        this._webphone.connected,
      autoLog: !!(this._callLogger && this._callLogger.autoLog),
      isWebRTC,
      conferenceCallParties: this._conferenceCall
        ? this._conferenceCall.partyProfiles
        : null,
      useV2,
      disableLinks:
        !this._connectivityMonitor.connectivity ||
        this._rateLimiter.throttling ||
        controlBusy,
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
  }) {
    return {
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
        }),
      webphoneAnswer: async (sessionId) => {
        if (!this._webphone) {
          return;
        }

        const session = this._webphone.sessions.find(
          (session) => session.id === sessionId,
        );
        if (
          this._conferenceCall &&
          session &&
          session.direction === callDirections.inbound
        ) {
          this._conferenceCall.closeMergingPair();
        }

        this._webphone.answer(sessionId);
      },
      webphoneToVoicemail: async (...args) =>
        this._webphone && this._webphone.toVoiceMail(...args),
      webphoneReject: async (...args) =>
        this._webphone && this._webphone.reject(...args),
      webphoneHangup: async (...args) => {
        // user action track
        this._callMonitor.allCallsClickHangupTrack();
        return this._webphone && this._webphone.hangup(...args);
      },
      webphoneResume: async (...args) => {
        if (!this._webphone) {
          return;
        }
        await this._webphone.resume(...args);
        if (this._routerInteraction.currentPath !== callCtrlRoute && !useV2) {
          this._routerInteraction.push(callCtrlRoute);
        }
      },
      webphoneHold: async (...args) => {
        // user action track
        this._callMonitor.allCallsClickHoldTrack();
        return this._webphone && this._webphone.hold(...args);
      },
      webphoneSwitchCall: async (activeCall) => {
        if (!this._webphone) {
          return;
        }
        const session = await this._webphone.switchCall(
          activeCall,
          this._regionSettings.homeCountryId,
        );
        return session;
      },
      ringoutHangup: async (...args) => {
        // user action track
        this._callMonitor.allCallsClickHangupTrack();
        return (
          this._activeCallControl && this._activeCallControl.hangUp(...args)
        );
      },
      ringoutTransfer: async (sessionId) => {
        this._routerInteraction.push(`/transfer/${sessionId}/active`);
      },
      ringoutReject: async (sessionId) => {
        // user action track
        this._callMonitor.allCallsClickRejectTrack();
        return (
          this._activeCallControl && this._activeCallControl.reject(sessionId)
        );
      },
      onViewContact: showViewContact
        ? onViewContact ||
          (({ contact }) => {
            const { id, type } = contact;
            if (this._contactDetailsUI) {
              this._contactDetailsUI.showContactDetails({
                type,
                id,
                direct: true,
              });
            }
          })
        : null,
      onClickToSms: this._composeText
        ? async (contact, isDummyContact = false) => {
            if (this._routerInteraction) {
              this._routerInteraction.push(composeTextRoute);
            }
            this._composeText.clean();
            if (contact.name && contact.phoneNumber && isDummyContact) {
              this._composeText.updateTypingToNumber(contact.name);
              this._contactSearch.search({ searchString: contact.name });
            } else {
              this._composeText.addToRecipients(contact);
            }
          }
        : undefined,
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }) => {
            const hasMatchNumber = await this._contactMatcher.hasMatchNumber({
              phoneNumber,
              ignoreCache: true,
            });
            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await this._contactMatcher.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      isLoggedContact,
      onLogCall:
        onLogCall ||
        (this._callLogger &&
          (async ({ call, contact, redirect = true }) => {
            await this._callLogger.logCall({
              call,
              contact,
              redirect,
            });
          })),
      onCallsEmpty:
        onCallsEmpty ||
        (() => {
          const isWebRTC =
            this._callingSettings.callingMode === callingModes.webphone;

          if (isWebRTC && !this._webphone.sessions.length) {
            this._routerInteraction.push('/dialer');
          }
        }),
      isSessionAConferenceCall: (sessionId) =>
        !!(
          this._conferenceCall &&
          this._conferenceCall.isConferenceSession(sessionId)
        ),
      onCallItemClick: (call) => {
        if (!call.webphoneSession) {
          // For ringout call
          if (isRingingInboundCall(call)) {
            return;
          }

          const { telephonySessionId } = call;
          // to track the call item be clicked.
          this._callMonitor.callItemClickTrack();
          this._routerInteraction.push(
            `/simplifycallctrl/${telephonySessionId}`,
          );
        } else {
          // For webphone call
          // show the ring call modal when click a ringing call.
          if (isRingingInboundCall(call)) {
            this._webphone.toggleMinimized(call.webphoneSession.id);
            return;
          }
          if (call.webphoneSession && call.webphoneSession.id) {
            // to track the call item be clicked.
            this._callMonitor.callItemClickTrack();
            this._routerInteraction.push(
              `${callCtrlRoute}/${call.webphoneSession.id}`,
            );
          }
        }
      },
      getAvatarUrl,
      updateSessionMatchedContact: (sessionId, contact) =>
        this._webphone.updateSessionMatchedContact(sessionId, contact),
    };
  }
}

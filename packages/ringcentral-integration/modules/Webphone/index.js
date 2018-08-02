import RingCentralWebphone from 'ringcentral-web-phone';
import incomingAudio from 'ringcentral-web-phone/audio/incoming.ogg';
import outgoingAudio from 'ringcentral-web-phone/audio/outgoing.ogg';

import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import sleep from '../../lib/sleep';
import moduleStatuses from '../../enums/moduleStatuses';
import connectionStatus from './connectionStatus';

import sessionStatus from './sessionStatus';
import recordStatus from './recordStatus';
import actionTypes from './actionTypes';
import callDirections from '../../enums/callDirections';
import webphoneErrors from './webphoneErrors';
import callErrors from '../Call/callErrors';
import ensureExist from '../../lib/ensureExist';
import proxify from '../../lib/proxy/proxify';
import {
  isBrowserSupport,
  normalizeSession,
  isRing,
  isOnHold,
  isRecording,
  isConferenceSession,
  sortByCreationTimeDesc,
  extractHeadersData,
} from './webphoneHelper';
import getWebphoneReducer from './getWebphoneReducer';

const FIRST_THREE_RETRIES_DELAY = 10 * 1000;
const FOURTH_RETRIES_DELAY = 30 * 1000;
const FIFTH_RETRIES_DELAY = 60 * 1000;
const MAX_RETRIES_DELAY = 2 * 60 * 1000;

/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */
@Module({
  deps: [
    'Auth',
    'Alert',
    'Client',
    { dep: 'ContactMatcher', optional: true },
    'NumberValidate',
    'RolesAndPermissions',
    'AudioSettings',
    { dep: 'TabManager', optional: true },
    { dep: 'WebphoneOptions', optional: true }
  ]
})
export default class Webphone extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.appKey - app key
   * @param {String} params.appName - app name
   * @param {String} params.appVersion - app version
   * @param {Number} params.webphoneLogLevel - log Level
   * @param {Alert} params.alert - alert module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Storage} params.storage - storage module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance, optional
   * @param {Function} params.onCallEnd - callback on a call end
   * @param {Function} params.onCallRing - callback on a call ring
   * @param {Function} params.onCallStart - callback on a call start
   */
  constructor({
    appKey,
    appName,
    appVersion,
    alert,
    auth,
    client,
    rolesAndPermissions,
    webphoneLogLevel = 3,
    contactMatcher,
    numberValidate,
    audioSettings,
    tabManager,
    onCallEnd,
    onCallRing,
    onCallStart,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._appKey = appKey;
    this._appName = appName;
    this._appVersion = appVersion;
    this._alert = alert;
    this._webphoneLogLevel = webphoneLogLevel;
    this._auth = this::ensureExist(auth, 'auth');
    this._client = this::ensureExist(client, 'client');
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._numberValidate = this::ensureExist(numberValidate, 'numberValidate');
    this._audioSettings = this::ensureExist(audioSettings, 'audioSettings');
    this._contactMatcher = contactMatcher;
    this._tabManager = tabManager;

    this._onCallEndFunctions = [];
    if (typeof onCallEnd === 'function') {
      this._onCallEndFunctions.push(onCallEnd);
    }
    this._onCallRingFunctions = [];
    if (typeof onCallRing === 'function') {
      this._onCallRingFunctions.push(onCallRing);
    }
    this._onCallStartFunctions = [];
    if (typeof onCallStart === 'function') {
      this._onCallStartFunctions.push(onCallStart);
    }

    this._webphone = null;
    this._remoteVideo = null;
    this._localVideo = null;
    this._sessions = new Map();
    this._reducer = getWebphoneReducer(this.actionTypes);

    this.addSelector('sessionPhoneNumbers',
      () => this.sessions,
      (sessions) => {
        const outputs = [];
        sessions.forEach((session) => {
          outputs.push(session.to);
          outputs.push(session.from);
        });
        return outputs;
      }
    );

    this.addSelector('ringSession',
      () => this.ringSessionId,
      () => this.sessions,
      (ringSessionId, sessions) => {
        if (!ringSessionId) {
          return null;
        }
        const ringSession = sessions.find(
          session => session.id === ringSessionId
        );
        return ringSession;
      }
    );

    this.addSelector('cachedSessions',
      () => this.sessions,
      sessions => sessions.filter(x => x.cached),
    );

    this.addSelector('activeSession',
      () => this.activeSessionId,
      () => this.sessions,
      () => this.cachedSessions,
      (activeSessionId, sessions, cachedSessions) => {
        if (!activeSessionId) {
          return null;
        }

        const realActiveSession = sessions.find(
          session => session.id === activeSessionId
        );

        // NOT in conference merging process
        if (!cachedSessions.length) {
          return realActiveSession;
        }

        // realActiveSession is a conference
        if (isConferenceSession(realActiveSession)) {
          return realActiveSession;
        }

        // realActiveSession is cached
        if (
          !realActiveSession ||
          (cachedSessions.find(cachedSession => cachedSession.id === realActiveSession.id))
        ) {
          return cachedSessions.sort(sortByCreationTimeDesc)[0];
        }

        // default rule
        return [...cachedSessions, realActiveSession].sort(sortByCreationTimeDesc)[0];
      }
    );

    this.addSelector('ringSessions',
      () => this.sessions,
      sessions => sessions.filter(session => isRing(session))
    );

    this.addSelector('onHoldSessions',
      () => this.sessions,
      sessions => sessions.filter(session => isOnHold(session))
    );

    if (this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: this._selectors.sessionPhoneNumbers,
        readyCheckFn: () => (
          this.ready
        ),
      });
    }

    this._isFirstRegister = true;
  }

  _prepareVideoElement() {
    this._remoteVideo = document.createElement('video');
    this._remoteVideo.setAttribute('hidden', 'hidden');
    this._localVideo = document.createElement('video');
    this._localVideo.setAttribute('hidden', 'hidden');
    this._localVideo.setAttribute('muted', 'muted');
    this._localVideo.muted = true;

    document.body.appendChild(this._remoteVideo);
    document.body.appendChild(this._localVideo);

    this._remoteVideo.volume = this._audioSettings.callVolume;
    if (this._audioSettings.supportDevices) {
      this._remoteVideo.setSinkId(this._audioSettings.outputDeviceId);
    }

    this.store.dispatch({
      type: this.actionTypes.videoElementPrepared,
    });
  }

  initialize() {
    if (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    ) {
      if (document.readyState === 'loading') {
        window.addEventListener('load', () => {
          this._prepareVideoElement();
        });
      } else {
        this._prepareVideoElement();
      }
      window.addEventListener('unload', () => {
        this._disconnect();
      });
    }
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
      this.disconnect();
    }
    if (
      this.ready &&
      (
        this._ringtoneVolume !== this._audioSettings.ringtoneVolume ||
        this._ringtoneMuted !== this._audioSettings.ringtoneMuted
      )
    ) {
      this._ringtoneVolume = this._audioSettings.ringtoneVolume;
      this._ringtoneMuted = this._audioSettings.ringtoneMuted;
      if (
        this._webphone &&
        this._webphone.userAgent
      ) {
        this._webphone.userAgent.audioHelper
          .setVolume(this._ringtoneMuted ? 0 : this._audioSettings.ringtoneVolume);
      }
    }
    if (
      this.ready &&
      this._callVolume !== this._audioSettings.callVolume
    ) {
      this._callVolume = this._audioSettings.callVolume;
      if (
        this._remoteVideo
      ) {
        this._remoteVideo.volume = this._audioSettings.callVolume;
      }
    }
    if (
      this.ready &&
      this._audioSettings.supportDevices &&
      this._outputDeviceId !== this._audioSettings.outputDeviceId
    ) {
      this._outputDeviceId = this._audioSettings.outputDeviceId;
      if (
        this._remoteVideo
      ) {
        this._remoteVideo.setSinkId(this._outputDeviceId);
      }
    }
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._rolesAndPermissions.ready &&
      this._numberValidate.ready &&
      this._audioSettings.ready &&
      (!this._tabManager || this._tabManager.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._auth.loggedIn ||
        !this._rolesAndPermissions.ready ||
        !this._numberValidate.ready ||
        (!!this._tabManager && !this._tabManager.ready) ||
        !this._audioSettings.ready
      ) &&
      this.ready
    );
  }

  @proxify
  async _sipProvision() {
    const response = await this._client.service.platform()
      .post('/client-info/sip-provision', {
        sipInfo: [{ transport: 'WSS' }]
      });
    return response.json();
  }

  async _fetchDL() {
    const response = await this._client.account().extension().device().list();
    const devices = response.records;
    let phoneLines = [];
    devices.forEach((device) => {
      if (!device.phoneLines || device.phoneLines.length === 0) {
        return;
      }
      phoneLines = phoneLines.concat(device.phoneLines);
    });
    return phoneLines;
  }

  _removeWebphone() {
    if (!this._webphone || !this._webphone.userAgent) {
      return;
    }
    this._webphone.userAgent.stop();
    this._webphone.userAgent.unregister();
    this._webphone.userAgent.removeAllListeners();
    this._webphone = null;
  }

  _createWebphone(provisionData) {
    this._removeWebphone();
    this._webphone = new RingCentralWebphone(provisionData, {
      appKey: this._appKey,
      appName: this._appName,
      appVersion: this._appVersion,
      uuid: this._auth.endpointId,
      logLevel: this._webphoneLogLevel, // error 0, warn 1, log: 2, debug: 3
      audioHelper: {
        enabled: true, // enables audio feedback when web phone is ringing or making a call
        incoming: incomingAudio, // path to audio file for incoming call
        outgoing: outgoingAudio, // path to aduotfile for outgoing call
      }
    });
    this._isFirstRegister = true;
    const onRegistered = () => {
      if (this._isFirstRegister) {
        this.store.dispatch({
          type: this.actionTypes.registered,
        });
        this._alert.info({
          message: webphoneErrors.connected,
        });
      }
      this._isFirstRegister = false;
    };
    const onUnregistered = () => {
      this._isFirstRegister = true;
      this.store.dispatch({
        type: this.actionTypes.unregistered,
      });
    };
    const onRegistrationFailed = (response, cause) => {
      if (this.connectionStatus === connectionStatus.connectFailed) {
        return;
      }
      this._isFirstRegister = true;
      let errorCode;
      let needToReconnect = false;
      console.error(response);
      console.error('webphone register failed:', cause);
      // limit logic:
      /*
       * Specialties of this flow are next:
       *   6th WebRTC in another browser receives 6th ‘EndpointID’ and 1st ‘InstanceID’,
       *   which has been given previously to the 1st ‘EndpointID’.
       *   It successfully registers on WSX by moving 1st ‘EndpointID’ to a blacklist state.
       *   When 1st WebRTC client re-registers on expiration timeout,
       *   WSX defines that 1st ‘EndpointID’ is blacklisted and responds with ‘SIP/2.0 403 Forbidden,
       *   instance id is intercepted by another registration’ and remove it from black list.
       *   So if 1st WebRTC will send re-register again with the same ‘InstanceID’,
       *   it will be accepted and 6th ‘EndpointID’ will be blacklisted.
       *   (But the WebRTC client must logout on receiving SIP/2.0 403 Forbidden error and in case of login -
       *   provision again via Platform API and receive new InstanceID)
       */
      const statusCode = response ? response.status_code : null;
      switch (statusCode) {
        // Webphone account overlimit
        case 503:
        case 603: {
          errorCode = webphoneErrors.webphoneCountOverLimit;
          needToReconnect = true;
          break;
        }
        case 403: {
          errorCode = webphoneErrors.webphoneForbidden;
          needToReconnect = true;
          break;
        }
        // Request Timeout
        case 408: {
          errorCode = webphoneErrors.requestTimeout;
          needToReconnect = true;
          break;
        }
        // Internal server error
        case 500: {
          errorCode = webphoneErrors.internalServerError;
          break;
        }
        // Timeout
        case 504: {
          errorCode = webphoneErrors.serverTimeout;
          needToReconnect = true;
          break;
        }
        default: {
          errorCode = webphoneErrors.unknownError;
          break;
        }
      }
      this._alert.danger({
        message: errorCode,
        allowDuplicates: false,
        payload: {
          statusCode
        }
      });
      this.store.dispatch({
        type: this.actionTypes.registrationFailed,
        errorCode,
        statusCode,
      });
      if (['Request Timeout', 'Connection Error'].indexOf(cause) !== -1) {
        needToReconnect = true;
      }
      if (needToReconnect) {
        this._removeWebphone();
        this._connect(needToReconnect);
      }
    };
    this._webphone.userAgent.audioHelper.setVolume(
      this._audioSettings.ringtoneMuted ? 0 : this._audioSettings.ringtoneVolume
    );
    this._webphone.userAgent.on('registered', onRegistered);
    this._webphone.userAgent.on('unregistered', onUnregistered);
    this._webphone.userAgent.on('registrationFailed', onRegistrationFailed);
    this._webphone.userAgent.on('invite', (session) => {
      console.log('UA invite');
      extractHeadersData(session, session.request.headers);
      this._onInvite(session);
    });
  }

  @proxify
  async _connect(reconnect = false) {
    try {
      if (reconnect) {
        await this._retrySleep();
      }

      if (!this._auth.loggedIn) {
        return;
      }

      // do not connect if it is connecting
      if (this.connectionStatus === connectionStatus.connecting) {
        return;
      }

      // when reconnect is break by disconnect
      if (reconnect && this.connectionStatus !== connectionStatus.connectFailed) {
        this.store.dispatch({
          type: this.actionTypes.resetRetryCounts,
        });
        return;
      }

      if (this._tabManager && !this._tabManager.active) {
        await sleep(FIRST_THREE_RETRIES_DELAY);
        await this._connect(reconnect);
        return;
      }

      this.store.dispatch({
        type: (
          reconnect ?
            this.actionTypes.reconnect : this.actionTypes.connect
        )
      });

      const sipProvision = await this._sipProvision();

      // do not continue if it is disconnecting
      if (this.disconnecting) {
        return;
      }
      this._createWebphone(sipProvision);
    } catch (error) {
      console.error(error);
      this._alert.danger({
        message: webphoneErrors.connectFailed,
        ttl: 0,
        allowDuplicates: false,
      });
      let needToReconnect = true;
      let errorCode;
      if (
        error && error.message &&
        (error.message.indexOf('Feature [WebPhone] is not available') > -1)
      ) {
        this._rolesAndPermissions.refreshServiceFeatures();
        needToReconnect = false;
        errorCode = webphoneErrors.notWebphonePermission;
      } else {
        errorCode = webphoneErrors.sipProvisionError;
      }
      this.store.dispatch({
        type: this.actionTypes.connectError,
        errorCode,
        error,
      });
      if (needToReconnect) {
        await this._connect(needToReconnect);
      }
    }
  }

  /**
   * connect a web phone.
   */
  @proxify
  async connect() {
    if (
      this._auth.loggedIn &&
      this.enabled &&
      (
        this.connectionStatus === connectionStatus.disconnected ||
        this.connectionStatus === connectionStatus.connectFailed
      )
    ) {
      if (!isBrowserSupport()) {
        this.store.dispatch({
          type: this.actionTypes.connectError,
          errorCode: webphoneErrors.browserNotSupported,
        });
        this._alert.warning({
          message: webphoneErrors.browserNotSupported,
          ttl: 0,
        });
        return;
      }
      try {
        const phoneLines = await this._fetchDL();
        if (phoneLines.length === 0) {
          this.store.dispatch({
            type: this.actionTypes.connectError,
            errorCode: webphoneErrors.notOutboundCallWithoutDL,
          });
          this._alert.warning({
            message: webphoneErrors.notOutboundCallWithoutDL,
          });
        }
      } catch (error) {
        console.log(error);
        this.store.dispatch({
          type: this.actionTypes.connectError,
          errorCode: webphoneErrors.checkDLError,
        });
        this._alert.warning({
          message: webphoneErrors.checkDLError,
        });
      }
      await this._connect();
    }
  }

  _disconnect() {
    if (
      this.connectionStatus === connectionStatus.connected ||
      this.connectionStatus === connectionStatus.connecting ||
      this.connectionStatus === connectionStatus.connectFailed
    ) {
      this.store.dispatch({
        type: this.actionTypes.disconnect,
      });
      if (this._webphone) {
        this._sessions.forEach((session) => {
          this.hangup(session);
        });
        this._removeWebphone();
        this._sessions = new Map();
        this._updateSessions();
      }
      this.store.dispatch({
        type: this.actionTypes.unregistered,
      });
    }
  }

  @proxify
  async disconnect() {
    this._disconnect();
  }

  _onAccepted(session) {
    session.on('accepted', (incomingResponse) => {
      if (session.callStatus === sessionStatus.finished) {
        return;
      }
      console.log('accepted');
      session.callStatus = sessionStatus.connected;
      extractHeadersData(session, incomingResponse.headers);
      this._onCallStart(session);
    });
    session.on('progress', () => {
      console.log('progress...');
      session.callStatus = sessionStatus.connecting;
      this._updateSessions();
    });
    session.on('rejected', () => {
      console.log('rejected');
      session.callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('failed', (response, cause) => {
      console.log('Event: Failed');
      console.log(cause);
      session.callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('terminated', () => {
      console.log('Event: Terminated');
      session.callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('cancel', () => {
      console.log('Event: Cancel');
      session.callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('refer', () => {
      console.log('Event: Refer');
    });
    session.on('replaced', (newSession) => {
      session.callStatus = sessionStatus.replaced;
      newSession.callStatus = sessionStatus.connected;
      newSession.direction = callDirections.inbound;
      this._addSession(newSession);
      this._onAccepted(newSession);
    });
    session.on('muted', () => {
      console.log('Event: Muted');
      session.isOnMute = true;
      session.callStatus = sessionStatus.onMute;
      this._updateSessions();
    });
    session.on('unmuted', () => {
      console.log('Event: Unmuted');
      session.isOnMute = false;
      session.callStatus = sessionStatus.connected;
      this._updateSessions();
    });
    session.on('hold', () => {
      console.log('Event: hold');
      session.callStatus = sessionStatus.onHold;
      this._updateSessions();
    });
    session.on('unhold', () => {
      console.log('Event: unhold');
      session.callStatus = sessionStatus.connected;
      session.lastActiveTime = +new Date();
      this._updateSessions();
    });
    session.mediaHandler.on('userMediaFailed', () => {
      this._audioSettings.onGetUserMediaError();
    });
  }

  _onInvite(session) {
    session.creationTime = Date.now();
    session.direction = callDirections.inbound;
    session.callStatus = sessionStatus.connecting;
    session.on('rejected', () => {
      console.log('Event: Rejected');
      this._onCallEnd(session);
    });
    session.on('terminated', () => {
      console.log('Event: Terminated');
      this._onCallEnd(session);
    });
    this._onCallRing(session);
  }

  @proxify
  async answer(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      this._holdOtherSession(session.id);
      this._onAccepted(session, 'inbound');
      this._beforeCallStart(session);
      await session.accept(this.acceptOptions);
      this._onCallStart(session);
      this.store.dispatch({ // for track
        type: this.actionTypes.callAnswer,
      });
    } catch (e) {
      console.log('Accept failed');
      console.error(e);
      this._onCallEnd(session);
    }
  }

  @proxify
  async reject(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      await session.reject();
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
    }
  }

  @proxify
  async resume(sessionId) {
    await this.unhold(sessionId);
  }

  @proxify
  async forward(sessionId, forwardNumber) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return false;
    }
    try {
      const validatedResult
        = await this._numberValidate.validateNumbers([forwardNumber]);
      if (!validatedResult.result) {
        validatedResult.errors.forEach((error) => {
          this._alert.warning({
            message: callErrors[error.type],
            payload: {
              phoneNumber: error.phoneNumber
            }
          });
        });
        return false;
      }
      const validPhoneNumber =
        validatedResult.numbers[0] && validatedResult.numbers[0].e164;
      session.isForwarded = true;
      await session.forward(validPhoneNumber, this.acceptOptions);
      console.log('Forwarded');
      this._onCallEnd(session);
      return true;
    } catch (e) {
      console.error(e);
      this._alert.warning({
        message: webphoneErrors.forwardError
      });
      return false;
    }
  }

  @proxify
  async mute(sessionId) {
    try {
      this._sessionHandleWithId(sessionId, (session) => {
        session.isOnMute = true;
        session.mute();
        this._updateSessions();
      });
      return true;
    } catch (e) {
      console.error(e);
      this._alert.warning({
        message: webphoneErrors.muteError
      });
      return false;
    }
  }

  @proxify
  async unmute(sessionId) {
    this._sessionHandleWithId(sessionId, (session) => {
      session.isOnMute = false;
      session.unmute();
      this._updateSessions();
    });
  }

  @proxify
  async hold(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return false;
    }
    if (session.isOnHold().local) {
      return true;
    }
    try {
      await session.hold();
      this._updateSessions();
      return true;
    } catch (e) {
      console.error('hold error:', e);
      this._alert.warning({
        message: webphoneErrors.holdError
      });
      return false;
    }
  }

  _holdOtherSession(currentSessionId) {
    this._sessions.forEach((session, sessionId) => {
      if (currentSessionId === sessionId) {
        return;
      }
      if (session.isOnHold().local) {
        return;
      }
      session.hold();
    });
    // update cached sessions
    this.store.dispatch({
      type: this.actionTypes.onholdCachedSession,
    });
  }

  @proxify
  async unhold(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      if (session.isOnHold().local) {
        this._holdOtherSession(session.id);
        await session.unhold();
        this._onCallStart(session);
      }
    } catch (e) {
      console.log(e);
    }
  }

  @proxify
  async startRecord(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    // If the status of current session is not connected,
    // the recording process can not be started.
    if (session.callStatus === sessionStatus.connecting) {
      return;
    }
    try {
      session.recordStatus = recordStatus.pending;
      this._updateSessions();
      await session.startRecord();
      session.recordStatus = recordStatus.recording;
      this._updateSessions();
    } catch (e) {
      console.error(e);
      session.recordStatus = recordStatus.idle;
      this._updateSessions();
      // Recording has been disabled
      if (e && e.code === -5) {
        this._alert.danger({
          message: webphoneErrors.recordDisabled
        });
        // Disabled phone recording
        session.recordStatus = recordStatus.pending;
        this._updateSessions();
        return;
      }
      this._alert.danger({
        message: webphoneErrors.recordError,
        payload: {
          errorCode: e.code
        }
      });
    }
  }

  @proxify
  async stopRecord(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.recordStatus = recordStatus.pending;
      this._updateSessions();
      await session.stopRecord();
      session.recordStatus = recordStatus.idle;
      this._updateSessions();
    } catch (e) {
      console.error(e);
      session.recordStatus = recordStatus.recording;
      this._updateSessions();
    }
  }

  @proxify
  async park(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      await session.park();
      console.log('Parked');
    } catch (e) {
      console.error(e);
    }
  }

  @proxify
  async transfer(transferNumber, sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.isOnTransfer = true;
      this._updateSessions();
      const validatedResult
        = await this._numberValidate.validateNumbers([transferNumber]);
      if (!validatedResult.result) {
        validatedResult.errors.forEach((error) => {
          this._alert.warning({
            message: callErrors[error.type],
            payload: {
              phoneNumber: error.phoneNumber
            }
          });
        });
        session.isOnTransfer = false;
        this._updateSessions();
        return;
      }
      const validPhoneNumber =
        validatedResult.numbers[0] && validatedResult.numbers[0].e164;
      await session.transfer(validPhoneNumber);
      session.isOnTransfer = false;
      this._updateSessions();
      this._onCallEnd(session);
    } catch (e) {
      console.error(e);
      session.isOnTransfer = false;
      this._updateSessions();
      this._alert.danger({
        message: webphoneErrors.transferError
      });
    }
  }

  @proxify
  async transferWarm(transferNumber, sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      await session.hold();
      const newSession = session.ua.invite(transferNumber, {
        media: this.acceptOptions.media
      });
      newSession.once('accepted', async () => {
        try {
          await session.warmTransfer(newSession);
          console.log('Transferred');
          this._onCallEnd(session);
        } catch (e) {
          console.error(e);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  @proxify
  async flip(flipValue, sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      await session.flip(flipValue);
      // this._onCallEnd(session);
      session.isOnFlip = true;
      console.log('Flipped');
    } catch (e) {
      session.isOnFlip = false;
      this._alert.warning({
        message: webphoneErrors.flipError
      });
      console.error(e);
    }
    this._updateSessions();
  }

  @proxify
  async sendDTMF(dtmfValue, sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      await session.dtmf(dtmfValue);
    } catch (e) {
      console.error(e);
    }
  }

  @proxify
  async hangup(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      await session.terminate();
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
    }
  }

  @proxify
  async toVoiceMail(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.isToVoicemail = true;
      await session.toVoicemail();
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
      this._alert.warning({
        message: webphoneErrors.toVoiceMailError
      });
    }
  }

  @proxify
  async replyWithMessage(sessionId, replyOptions) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return;
    }
    try {
      session.isReplied = true;
      await session.replyWithMessage(replyOptions);
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
    }
  }

  _sessionHandleWithId(sessionId, func) {
    const session = this._sessions.get(sessionId);
    if (!session) {
      return null;
    }
    return func(session);
  }

  /**
   * start a outbound call.
   * @param {toNumber} recipient number
   * @param {fromNumber} call Id
   * @param {homeCountryId} homeCountry Id
   */
  @proxify
  async makeCall({
    toNumber,
    fromNumber,
    homeCountryId,
  }) {
    if (!this._webphone) {
      this._alert.warning({
        message: this.errorCode,
      });
      return null;
    }
    const phoneLines = await this._fetchDL();
    if (phoneLines.length === 0) {
      this._alert.warning({
        message: webphoneErrors.notOutboundCallWithoutDL,
      });
      return null;
    }
    const session = this._webphone.userAgent.invite(toNumber, {
      media: this.acceptOptions.media,
      fromNumber,
      homeCountryId,
    });
    session.direction = callDirections.outbound;
    session.callStatus = sessionStatus.connecting;
    session.creationTime = Date.now();
    session.fromNumber = fromNumber;
    this._onAccepted(session);
    this._holdOtherSession(session.id);
    this._beforeCallStart(session);
    return session;
  }

  @proxify
  async updateSessionMatchedContact(sessionId, contact) {
    this._sessionHandleWithId(sessionId, (session) => {
      session.contactMatch = contact;
      this._updateSessions();
    });
  }

  setSessionCaching(sessionIds) {
    this.store.dispatch({
      type: this.actionTypes.setSessionCaching,
      cachingSessionIds: sessionIds,
    });
  }

  clearSessionCaching() {
    this.store.dispatch({
      type: this.actionTypes.clearSessionCaching,
      sessions: [...this._sessions.values()].map(normalizeSession),
    });
  }

  _updateSessions() {
    this.store.dispatch({
      type: this.actionTypes.updateSessions,
      sessions: [...this._sessions.values()].map(normalizeSession),
    });
  }

  _addSession(session) {
    this._sessions.set(session.id, session);
    this._updateSessions();
  }

  _removeSession(session) {
    this._sessions.delete(session.id);
    this._updateSessions();
  }

  @proxify
  async toggleMinimized(sessionId) {
    this._sessionHandleWithId(sessionId, (session) => {
      session.minimized = !session.minimized;
      this._updateSessions();
    });
  }

  // for outbound call
  _beforeCallStart(session) {
    this._addSession(session);
    const normalizedSession = normalizeSession(session);
    this.store.dispatch({
      type: this.actionTypes.beforeCallStart,
      session: normalizedSession,
      sessions: this.sessions,
    });
    if (
      this._contactMatcher &&
      (!this._tabManager || this._tabManager.active)
    ) {
      this._contactMatcher.triggerMatch();
    }
    if (typeof this._onCallStartFunc === 'function') {
      this._onCallStartFunc(normalizedSession, this.activeSession);
    }
    this._onCallStartFunctions.forEach(
      handler => handler(normalizedSession, this.activeSession)
    );
  }

  _onCallStart(session) {
    this._addSession(session);
    const normalizedSession = normalizeSession(session);
    this.store.dispatch({
      type: this.actionTypes.callStart,
      session: normalizedSession,
      sessions: this.sessions,
    });
    if (this._contactMatcher) {
      this._contactMatcher.triggerMatch();
    }
  }

  _onCallRing(session) {
    this._addSession(session);
    const normalizedSession = normalizeSession(session);
    this.store.dispatch({
      type: this.actionTypes.callRing,
      session: normalizedSession,
      sessions: this.sessions,
    });
    if (
      this._contactMatcher &&
      (!this._tabManager || this._tabManager.active)
    ) {
      this._contactMatcher.triggerMatch();
    }
    if (this.activeSession && !isOnHold(this.activeSession)) {
      this._webphone.userAgent.audioHelper.playIncoming(false);
    }
    if (typeof this._onCallRingFunc === 'function') {
      this._onCallRingFunc(normalizedSession, this.ringSession);
    }
    this._onCallRingFunctions.forEach(
      handler => handler(normalizedSession, this.ringSession)
    );
  }

  _onCallEnd(session) {
    this._removeSession(session);
    const normalizedSession = normalizeSession(session);
    this.store.dispatch({
      type: this.actionTypes.callEnd,
      session: normalizedSession,
      sessions: this.sessions,
    });
    if (typeof this._onCallEndFunc === 'function') {
      this._onCallEndFunc(normalizedSession, this.activeSession);
    }
    this._onCallEndFunctions.forEach(
      handler => handler(normalizedSession, this.activeSession)
    );
  }

  async _retrySleep() {
    if (this.connectRetryCounts < 3) {
      await sleep(FIRST_THREE_RETRIES_DELAY);
    }
    if (this.connectRetryCounts === 3) {
      await sleep(FOURTH_RETRIES_DELAY);
    }
    if (this.connectRetryCounts === 4) {
      await sleep(FIFTH_RETRIES_DELAY); // sleep 30 seconds
    }
    if (this.connectRetryCounts > 4) {
      await sleep(MAX_RETRIES_DELAY); // sleep 30 seconds
    }
  }

  /**
   * Inform user what is happening with webphone,
   * this will be invoked when webphone itself run into error situation
   */
  @proxify
  async showAlert() {
    if (!this.errorCode) return;
    this._alert.danger({
      message: this.errorCode,
      allowDuplicates: false,
      payload: {
        statusCode: this.statusCode
      },
    });
  }

  onCallStart(handler) {
    if (typeof handler === 'function') {
      this._onCallStartFunctions.push(handler);
    }
  }

  onCallRing(handler) {
    if (typeof handler === 'function') {
      this._onCallRingFunctions.push(handler);
    }
  }

  onCallEnd(handler) {
    if (typeof handler === 'function') {
      this._onCallEndFunctions.push(handler);
    }
  }

  isCallRecording(session) {
    if (isRecording(session)) {
      this._alert.warning({ message: recordStatus.recording });
      return true;
    }
    return false;
  }

  get status() {
    return this.state.status;
  }

  get originalSessions() {
    return this._sessions;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  get ringSessionId() {
    return this.state.ringSessionId;
  }

  get activeSessionId() {
    return this.state.activeSessionId;
  }

  /**
   * Current active session(Outbound and InBound that answered)
   */
  get activeSession() {
    return this._selectors.activeSession();
  }

  /**
   * Current ring session(inbound)
   */
  get ringSession() {
    return this._selectors.ringSession();
  }

  get sessions() {
    return this.state.sessions;
  }

  get ringSessions() {
    return this._selectors.ringSessions();
  }

  get onHoldSessions() {
    return this._selectors.onHoldSessions();
  }

  get lastEndedSessions() {
    return this.state.lastEndedSessions;
  }

  get cachedSessions() {
    return this._selectors.cachedSessions();
  }

  get videoElementPrepared() {
    return this.state.videoElementPrepared;
  }

  get enabled() {
    return this._rolesAndPermissions.webphoneEnabled;
  }

  get connectionStatus() {
    return this.state.connectionStatus;
  }

  get connectRetryCounts() {
    return this.state.connectRetryCounts;
  }

  get acceptOptions() {
    return {
      media: {
        audio: {
          deviceId: this._audioSettings.inputDeviceId,
        },
        video: false,
        render: {
          remote: this._remoteVideo,
          local: this._localVideo,
        }
      }
    };
  }

  get isOnTransfer() {
    return this.activeSession && this.activeSession.isOnTransfer;
  }

  get errorCode() {
    return this.state.errorCode;
  }

  get statusCode() {
    return this.state.statusCode;
  }

  get disconnecting() {
    return this.connectionStatus === connectionStatus.disconnecting;
  }

  get connecting() {
    return this.connectionStatus === connectionStatus.connecting;
  }

  get connected() {
    return this.connectionStatus === connectionStatus.connected;
  }

  get connectFailed() {
    return this.connectionStatus === connectionStatus.connectFailed;
  }
}

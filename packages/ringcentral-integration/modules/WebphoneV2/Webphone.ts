import { find, filter } from 'ramda';
import { state, action, computed } from '@ringcentral-integration/core';
import { ObjectMapKey } from '@ringcentral-integration/core/lib/ObjectMap';
import { InviteOptions } from 'ringcentral-web-phone/lib/userAgent';
import { Module } from '../../lib/di';
import sleep from '../../lib/sleep';

import { sessionStatus } from './sessionStatus';
import { recordStatus } from './recordStatus';
import callDirections from '../../enums/callDirections';
import { webphoneErrors } from './webphoneErrors';
import { webphoneMessages } from './webphoneMessages';
import { extendedControlStatus } from './extendedControlStatus';
import { EVENTS } from './events';
import { callErrors } from '../CallV2/callErrors';
import proxify from '../../lib/proxy/proxify';
import validateNumbers from '../../lib/validateNumbers';

import {
  Deps,
  WebphoneSession,
  NormalizedSession,
  SwitchCallActiveCallParams,
  SessionReplyOptions,
  CallStartHandler,
  CallEndHandler,
  CallResumeHandler,
  CallRingHandler,
  CallInitHandler,
  BeforeCallEndHandler,
  BeforeCallResumeHandler,
  CallHoldHandler,
} from './Webphone.interface';
import { WebphoneBase } from './WebphoneBase';

import {
  normalizeSession,
  isRing,
  isOnHold,
  extractHeadersData,
  sortByLastActiveTimeDesc,
} from './webphoneHelper';

export const INCOMING_CALL_INVALID_STATE_ERROR_CODE = 2;

/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */
@Module({
  name: 'Webphone',
  deps: [],
})
export class Webphone extends WebphoneBase {
  protected _activeWebphoneActiveCallKey: string;
  protected _permissionCheck: boolean;

  constructor(deps: Deps) {
    super(deps);

    this._activeWebphoneActiveCallKey = `${deps.prefix}-active-webphone-active-call-key`;
    this._permissionCheck = this._deps.webphoneOptions.permissionCheck ?? true;

    if (typeof deps.webphoneOptions.onCallEnd === 'function') {
      this._eventEmitter.on(EVENTS.callEnd, deps.webphoneOptions.onCallEnd);
    }
    if (typeof deps.webphoneOptions.onCallRing === 'function') {
      this._eventEmitter.on(EVENTS.callRing, deps.webphoneOptions.onCallRing);
    }
    if (typeof deps.webphoneOptions.onCallStart === 'function') {
      this._eventEmitter.on(EVENTS.callStart, deps.webphoneOptions.onCallStart);
    }
    if (typeof deps.webphoneOptions.onCallResume === 'function') {
      this._eventEmitter.on(
        EVENTS.callResume,
        deps.webphoneOptions.onCallResume,
      );
    }
    if (typeof deps.webphoneOptions.onCallHold === 'function') {
      this._eventEmitter.on(EVENTS.callHold, deps.webphoneOptions.onCallHold);
    }
    if (typeof deps.webphoneOptions.onCallInit === 'function') {
      this._eventEmitter.on(EVENTS.callInit, deps.webphoneOptions.onCallInit);
    }
    if (typeof deps.webphoneOptions.onBeforeCallResume === 'function') {
      this._eventEmitter.on(
        EVENTS.beforeCallResume,
        deps.webphoneOptions.onBeforeCallResume,
      );
    }
    if (typeof deps.webphoneOptions.onBeforeCallEnd === 'function') {
      this._eventEmitter.on(
        EVENTS.beforeCallEnd,
        deps.webphoneOptions.onBeforeCallEnd,
      );
    }

    this._reconnectAfterSessionEnd = null;
    this._disconnectInactiveAfterSessionEnd = false;

    if (this._deps.contactMatcher) {
      this._deps.contactMatcher.addQuerySource({
        getQueriesFn: () => this.sessionPhoneNumbers,
        readyCheckFn: () => this.ready,
      });
    }
  }

  @state
  activeSessionId?: string = null;

  @state
  ringSessionId?: string = null;

  @state
  lastEndedSessions: NormalizedSession[] = [];

  @state
  sessions: NormalizedSession[] = [];

  @action
  _updateSessionsState(sessions: NormalizedSession[]) {
    const cachedSessions = this.sessions.filter((x) => x.cached);
    cachedSessions.forEach((cachedSession) => {
      const session = sessions.find((x) => x.id === cachedSession.id);
      if (session) {
        session.cached = true;
      } else {
        cachedSession.removed = true;
        sessions.push(cachedSession);
      }
    });
    this.sessions = sessions.sort(sortByLastActiveTimeDesc);
  }

  @action
  _setActiveSessionId(sessionId: string) {
    this.activeSessionId = sessionId;
  }

  @action
  _setStateOnCallRing(session: NormalizedSession) {
    this.ringSessionId = session.id;
  }

  @action
  _setStateOnCallStart(session: NormalizedSession) {
    this.activeSessionId = session.id;
    if (this.ringSessionId === session.id) {
      const ringSessions = this.sessions.filter((x) => isRing(x));
      this.ringSessionId = (ringSessions[0] && ringSessions[0].id) || null;
    }
  }

  @action
  _setStateOnCallEnd(session: NormalizedSession) {
    if (this.activeSessionId === session.id) {
      const activeSessions = this.sessions.filter((x) => !isRing(x));
      activeSessions.sort(sortByLastActiveTimeDesc);
      this.activeSessionId =
        (activeSessions[0] && activeSessions[0].id) || null;
    }
    if (this.ringSessionId === session.id) {
      const ringSessions = this.sessions.filter((x) => isRing(x));
      this.ringSessionId = (ringSessions[0] && ringSessions[0].id) || null;
    }
    if (
      /**
       * don't add incoming call that isn't relied by current app
       *   to end sessions. this call can be answered by other apps
       */
      !session.startTime &&
      !session.isToVoicemail &&
      !session.isForwarded &&
      !session.isReplied
    ) {
      return;
    }
    const lastSessions = [session].concat(
      this.lastEndedSessions.filter((x) => x.id !== session.id),
    );
    this.lastEndedSessions = lastSessions.slice(0, 5);
  }

  @action
  _setSessionCaching(cachingSessionIds: string[]) {
    cachingSessionIds.forEach((sessionId) => {
      const session = this.sessions.find((x) => x.id === sessionId);
      if (session) {
        session.cached = true;
      }
    });
  }

  @action
  _clearSessionCaching(sessions: NormalizedSession[]) {
    let needUpdate = false;
    this.sessions.forEach((session) => {
      if (session.cached) {
        session.cached = false;
        needUpdate = true;
      }
    });
    if (needUpdate) {
      this.sessions = this.sessions.filter((x) => !x.removed);
    }
    const activeSessions = sessions.filter((x) => !x.cached && !isRing(x));
    activeSessions.sort(sortByLastActiveTimeDesc);
    this.activeSessionId = (activeSessions[0] && activeSessions[0].id) || null;
  }

  @action
  _onHoldCachedSession() {
    this.sessions.forEach((session) => {
      if (session.cached) {
        session.callStatus = sessionStatus.onHold;
        session.isOnHold = true;
      }
    });
  }

  _onStorageChangeEvent(e: StorageEvent) {
    super._onStorageChangeEvent(e);
    // unhold active calls in current tab
    if (e.key === this._activeWebphoneActiveCallKey) {
      this._holdOtherSession(e.newValue);
    }
  }

  _onAccepted(session: WebphoneSession) {
    session.on('accepted', (incomingResponse) => {
      if (session.__rc_callStatus === sessionStatus.finished) {
        return;
      }
      console.log('accepted');
      session.__rc_callStatus = sessionStatus.connected;
      extractHeadersData(session, incomingResponse.headers);
      this._onCallStart(session);
      if (
        session.__rc_extendedControls &&
        session.__rc_extendedControlStatus === extendedControlStatus.pending
      ) {
        this._playExtendedControls(session);
      }
    });
    session.on('progress', (incomingResponse) => {
      console.log('progress...');
      session.__rc_callStatus = sessionStatus.connecting;
      extractHeadersData(session, incomingResponse.headers);
      this._updateSessions();
    });
    session.on('rejected', () => {
      console.log('rejected');
      session.__rc_callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('failed', (response, cause) => {
      console.log('Event: Failed');
      console.log(cause);
      session.__rc_callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('terminated', () => {
      console.log('Event: Terminated');
      session.__rc_callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('cancel', () => {
      console.log('Event: Cancel');
      session.__rc_callStatus = sessionStatus.finished;
      this._onCallEnd(session);
    });
    session.on('replaced', (newSession: WebphoneSession) => {
      console.log('Event: replaced', newSession);
      session.__rc_callStatus = sessionStatus.replaced;
      newSession.__rc_callStatus = sessionStatus.connected;
      newSession.__rc_direction = callDirections.inbound;
      this._updateSessions();
      this._onAccepted(newSession);
    });
    session.on('muted', () => {
      console.log('Event: Muted');
      session.__rc_isOnMute = true;
      session.__rc_callStatus = sessionStatus.onMute;
      this._updateSessions();
    });
    session.on('unmuted', () => {
      console.log('Event: Unmuted');
      session.__rc_isOnMute = false;
      session.__rc_callStatus = sessionStatus.connected;
      this._updateSessions();
    });
    session.on('SessionDescriptionHandler-created', () => {
      session.sessionDescriptionHandler.on('userMediaFailed', () => {
        this._deps.audioSettings.onGetUserMediaError(null);
      });
    });
  }

  _onInvite(session: WebphoneSession) {
    super._onInvite(session);
    session.__rc_creationTime = Date.now();
    session.__rc_lastActiveTime = Date.now();
    session.__rc_direction = callDirections.inbound;
    session.__rc_callStatus = sessionStatus.connecting;
    extractHeadersData(session, session.request.headers);
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

  async _playExtendedControls(session: WebphoneSession) {
    session.__rc_extendedControlStatus = extendedControlStatus.playing;
    const controls = session.__rc_extendedControls.slice();
    for (let i = 0, len = controls.length; i < len; i += 1) {
      if (
        session.__rc_extendedControlStatus === extendedControlStatus.playing
      ) {
        if (controls[i] === ',') {
          await sleep(2000);
        } else {
          await this._sendDTMF(controls[i], session);
        }
      } else {
        return;
      }
    }
    session.__rc_extendedControlStatus = extendedControlStatus.stopped;
  }

  @proxify
  async answer(sessionId: string) {
    const sipSession = this.originalSessions[sessionId];
    const session = this.sessions.find((session) => session.id === sessionId);
    if (!session || !isRing(session)) {
      return;
    }
    try {
      await this._holdOtherSession(sessionId);
      this._onAccepted(sipSession);
      await sipSession.accept(this.acceptOptions);
      // TODO: track action
      // this.store.dispatch({
      //   // for track
      //   type: this.actionTypes.callAnswer,
      // });
    } catch (e) {
      console.log('Accept failed');
      console.error(e);
      if (e.code !== INCOMING_CALL_INVALID_STATE_ERROR_CODE) {
        // FIXME:
        // 2 means the call is answered
        this._onCallEnd(sipSession);
      }
    }
  }

  @proxify
  async reject(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session || session.__rc_callStatus === sessionStatus.finished) {
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
  async resume(sessionId: string) {
    await this.unhold(sessionId);
  }

  @proxify
  async forward(sessionId: string, forwardNumber: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return false;
    }
    try {
      let validatedResult;
      let validPhoneNumber;
      if (!this._permissionCheck) {
        validatedResult = validateNumbers(
          [forwardNumber],
          this._deps.regionSettings,
          this._deps.brand.id,
        );
        validPhoneNumber = validatedResult[0];
      } else {
        validatedResult = await this._deps.numberValidate.validateNumbers([
          forwardNumber,
        ]);
        if (!validatedResult.result) {
          validatedResult.errors.forEach((error) => {
            this._deps.alert.warning({
              message:
                callErrors[error.type as ObjectMapKey<typeof callErrors>],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          });
          return false;
        }
        validPhoneNumber =
          validatedResult.numbers[0] && validatedResult.numbers[0].e164;
      }
      session.__rc_isForwarded = true;
      await session.forward(validPhoneNumber, this.acceptOptions, {});
      console.log('Forwarded');
      this._onCallEnd(session);
      return true;
    } catch (e) {
      console.error(e);
      this._deps.alert.warning({
        message: webphoneErrors.forwardError,
      });
      return false;
    }
  }

  @proxify
  async mute(sessionId: string) {
    try {
      this._sessionHandleWithId(sessionId, (session: WebphoneSession) => {
        session.__rc_isOnMute = true;
        session.mute();
        this._updateSessions();
      });
      return true;
    } catch (e) {
      console.error(e);
      this._deps.alert.warning({
        message: webphoneErrors.muteError,
      });
      return false;
    }
  }

  @proxify
  async unmute(sessionId: string) {
    this._sessionHandleWithId(sessionId, (session: WebphoneSession) => {
      session.__rc_isOnMute = false;
      session.unmute();
      this._updateSessions();
    });
  }

  @proxify
  async hold(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return false;
    }
    if (session.localHold) {
      return true;
    }
    try {
      await session.hold();
      session.__rc_callStatus = sessionStatus.onHold;
      this._updateSessions();
      this._onCallHold(session);
      return true;
    } catch (e) {
      console.error('hold error:', e);
      this._deps.alert.warning({
        message: webphoneErrors.holdError,
      });
      return false;
    }
  }

  async _holdOtherSession(currentSessionId: string) {
    await Promise.all(
      Object.values(this.originalSessions).map(
        async (session: WebphoneSession) => {
          if (currentSessionId === session.id) {
            return;
          }
          if (session.localHold) {
            return;
          }
          if (session.__rc_callStatus === sessionStatus.connecting) {
            return;
          }
          try {
            await session.hold();
          } catch (e) {
            console.error('Hold call fail');
            throw e;
          }
          session.__rc_callStatus = sessionStatus.onHold;
          this._onCallHold(session);
        },
      ),
    );
    this._updateSessions();
    // update cached sessions
    this._onHoldCachedSession();
  }

  @proxify
  async unhold(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      if (session.localHold) {
        await this._holdOtherSession(session.id);
        this._onBeforeCallResume(session);
        await session.unhold();
        session.__rc_callStatus = sessionStatus.connected;
        this._updateSessions();
        this._onCallResume(session);
      }
    } catch (e) {
      console.log(e);
    }
  }

  @proxify
  async startRecord(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    // If the status of current session is not connected,
    // the recording process can not be started.
    if (session.__rc_callStatus === sessionStatus.connecting) {
      return;
    }
    try {
      session.__rc_recordStatus = recordStatus.pending;
      this._updateSessions();
      await session.startRecord();
      session.__rc_recordStatus = recordStatus.recording;
      this._updateSessions();
    } catch (e) {
      console.error(e);
      session.__rc_recordStatus = recordStatus.idle;
      this._updateSessions();
      // Recording has been disabled
      if (e && e.code === -5) {
        this._deps.alert.danger({
          message: webphoneErrors.recordDisabled,
        });
        // Disabled phone recording
        session.__rc_recordStatus = recordStatus.noAccess;
        this._updateSessions();
        return;
      }
      this._deps.alert.danger({
        message: webphoneErrors.recordError,
        payload: {
          errorCode: e.code,
        },
      });
    }
  }

  @proxify
  async stopRecord(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_recordStatus = recordStatus.pending;
      this._updateSessions();
      await session.stopRecord();
      session.__rc_recordStatus = recordStatus.idle;
      this._updateSessions();
    } catch (e) {
      console.error(e);
      session.__rc_recordStatus = recordStatus.recording;
      this._updateSessions();
    }
  }

  @proxify
  async park(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      const result = await session.park();
      console.log('Parked');
      if (result['park extension']) {
        this._deps.alert.success({
          message: webphoneMessages.parked,
          payload: {
            parkedNumber: `*${result['park extension']}`,
          },
          ttl: 0,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  @proxify
  async transfer(transferNumber: string, sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_isOnTransfer = true;
      this._updateSessions();
      let numberResult;
      let validPhoneNumber;
      if (!this._permissionCheck) {
        numberResult = validateNumbers(
          [transferNumber],
          this._deps.regionSettings,
          this._deps.brand.id,
        );
        validPhoneNumber = numberResult && numberResult[0];
      } else {
        numberResult = await this._deps.numberValidate.validateNumbers([
          transferNumber,
        ]);
        if (!numberResult.result) {
          numberResult.errors.forEach((error) => {
            this._deps.alert.warning({
              message:
                callErrors[error.type as ObjectMapKey<typeof callErrors>],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          });
          session.__rc_isOnTransfer = false;
          this._updateSessions();
          return;
        }
        validPhoneNumber =
          numberResult.numbers[0] && numberResult.numbers[0].e164;
      }
      await session.transfer(validPhoneNumber);
      session.__rc_isOnTransfer = false;
      this._updateSessions();
      this._onCallEnd(session);
    } catch (e) {
      console.error(e);
      session.__rc_isOnTransfer = false;
      this._updateSessions();
      this._deps.alert.danger({
        message: webphoneErrors.transferError,
      });
    }
  }

  @proxify
  async transferWarm(transferNumber: string, sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      await session.hold();
      const newSession = session.ua.invite(transferNumber, {
        sessionDescriptionHandlerOptions: this.acceptOptions
          .sessionDescriptionHandlerOptions,
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
  async flip(flipValue: string, sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      await session.flip(flipValue);
      // this._onCallEnd(session);
      session.__rc_isOnFlip = true;
      console.log('Flipped');
    } catch (e) {
      session.__rc_isOnFlip = false;
      this._deps.alert.warning({
        message: webphoneErrors.flipError,
      });
      console.error(e);
    }
    this._updateSessions();
  }

  @proxify
  async _sendDTMF(dtmfValue: string, session: WebphoneSession) {
    try {
      await session.dtmf(dtmfValue, 100);
    } catch (e) {
      console.error(e);
    }
  }

  @proxify
  async sendDTMF(dtmfValue: string, sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (session) {
      await this._sendDTMF(dtmfValue, session);
    }
  }

  @proxify
  async hangup(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      this._onBeforeCallEnd(session);
      await session.terminate();
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
    }
  }

  @proxify
  async toVoiceMail(sessionId: string) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_isToVoicemail = true;
      await session.toVoicemail();
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
      this._deps.alert.warning({
        message: webphoneErrors.toVoiceMailError,
      });
    }
  }

  @proxify
  async replyWithMessage(sessionId: string, replyOptions: SessionReplyOptions) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return;
    }
    try {
      session.__rc_isReplied = true;
      await session.replyWithMessage(replyOptions);
    } catch (e) {
      console.error(e);
      this._onCallEnd(session);
    }
  }

  _sessionHandleWithId(
    sessionId: string,
    func: (session: WebphoneSession) => void,
  ) {
    const session = this.originalSessions[sessionId];
    if (!session) {
      return null;
    }
    return func(session);
  }

  async _invite(
    toNumber: string,
    {
      inviteOptions,
      extendedControls,
    }: {
      inviteOptions: InviteOptions;
      extendedControls?: string;
    },
  ) {
    if (!this._webphone) {
      this._deps.alert.warning({
        message: this.errorCode,
      });
      return null;
    }

    if (
      toNumber.length > 6 &&
      (!this._deps.availabilityMonitor ||
        !this._deps.availabilityMonitor.isVoIPOnlyMode)
    ) {
      const phoneLines = await this._fetchDL();
      if (phoneLines.length === 0) {
        this._deps.alert.warning({
          message: webphoneErrors.noOutboundCallWithoutDL,
        });
        return null;
      }
    }
    await this._holdOtherSession(null);
    const session = this._webphone.userAgent.invite(
      toNumber,
      inviteOptions,
    ) as WebphoneSession;
    session.__rc_direction = callDirections.outbound;
    session.__rc_callStatus = sessionStatus.connecting;
    session.__rc_creationTime = Date.now();
    session.__rc_lastActiveTime = Date.now();
    session.__rc_fromNumber = inviteOptions.fromNumber;
    session.__rc_extendedControls = extendedControls;
    session.__rc_extendedControlStatus = extendedControlStatus.pending;
    this._onAccepted(session);
    this._onCallInit(session);
    return session;
  }

  /**
   * start an outbound call.
   * @param {toNumber} recipient number
   * @param {fromNumber} call Id
   * @param {homeCountryId} homeCountry Id
   */
  @proxify
  async makeCall({
    toNumber,
    fromNumber,
    homeCountryId,
    extendedControls,
  }: {
    toNumber: string;
    fromNumber: string;
    homeCountryId: string;
    extendedControls: string;
  }) {
    const inviteOptions = {
      sessionDescriptionHandlerOptions: this.acceptOptions
        .sessionDescriptionHandlerOptions,
      fromNumber,
      homeCountryId,
    };
    const result = await this._invite(toNumber, {
      inviteOptions,
      extendedControls,
    });
    return result;
  }

  /**
   * switch a active call into web phone session.
   */
  @proxify
  async switchCall(
    { id, from, direction, to, sipData }: SwitchCallActiveCallParams,
    homeCountryId: string,
  ) {
    const extraHeaders = [];
    extraHeaders.push(
      `Replaces: ${id};to-tag=${sipData.fromTag};from-tag=${sipData.toTag}`,
    );
    extraHeaders.push('RC-call-type: replace');
    const toNumber =
      direction === callDirections.outbound ? to.phoneNumber : from.phoneNumber;
    const fromNumber =
      direction === callDirections.outbound ? from.phoneNumber : to.phoneNumber;
    const inviteOptions = {
      sessionDescriptionHandlerOptions: this.acceptOptions
        .sessionDescriptionHandlerOptions,
      fromNumber,
      homeCountryId,
      extraHeaders,
    };
    const session = await this._invite(toNumber, {
      inviteOptions,
    });
    return session;
  }

  @proxify
  async updateSessionMatchedContact(
    sessionId: string,
    contact: { id: string },
  ) {
    this._sessionHandleWithId(sessionId, (session) => {
      session.__rc_contactMatch = contact;
      this._updateSessions();
    });
  }

  @proxify
  setSessionCaching(sessionIds: string[]) {
    this._setSessionCaching(sessionIds);
  }

  @proxify
  clearSessionCaching() {
    this._clearSessionCaching(
      [...Object.values(this.originalSessions)].map(normalizeSession),
    );
  }

  _updateSessions() {
    this._updateSessionsState(
      [...Object.values(this.originalSessions)].map(normalizeSession),
    );
  }

  @proxify
  async toggleMinimized(sessionId: string) {
    this._sessionHandleWithId(sessionId, (session: WebphoneSession) => {
      session.__rc_minimized = !session.__rc_minimized;
      this._updateSessions();
    });
  }

  _setActiveWebphoneActiveCallId(session: WebphoneSession) {
    if (!this._disconnectOnInactive) {
      return;
    }
    const currentId = localStorage.getItem(this._activeWebphoneActiveCallKey);
    if (currentId !== session.id) {
      localStorage.setItem(this._activeWebphoneActiveCallKey, session.id);
    }
  }

  _onCallInit(session: WebphoneSession) {
    this._updateSessions();
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._setActiveSessionId(normalizedSession.id);
    if (
      this._deps.contactMatcher &&
      (!this._deps.tabManager || this._deps.tabManager.active)
    ) {
      this._deps.contactMatcher.triggerMatch();
    }
    this._eventEmitter.emit(
      EVENTS.callInit,
      normalizedSession,
      this.activeSession,
    );
    this._setActiveWebphoneActiveCallId(session);
  }

  _onCallStart(session: WebphoneSession) {
    this._updateSessions();
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._setStateOnCallStart(normalizedSession);
    this._eventEmitter.emit(
      EVENTS.callStart,
      normalizedSession,
      this.activeSession,
    );
    this._setActiveWebphoneActiveCallId(session);
  }

  _onCallRing(session: WebphoneSession) {
    this._updateSessions();
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._setStateOnCallRing(normalizedSession);
    if (
      this._deps.contactMatcher &&
      (!this._deps.tabManager || this._deps.tabManager.active)
    ) {
      this._deps.contactMatcher.triggerMatch();
    }
    if (this.activeSession && !isOnHold(this.activeSession)) {
      this._webphone.userAgent.audioHelper.playIncoming(false);
    }
    this._eventEmitter.emit(
      EVENTS.callRing,
      normalizedSession,
      this.ringSession,
    );
  }

  _onBeforeCallEnd(session: WebphoneSession) {
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._eventEmitter.emit(
      EVENTS.beforeCallEnd,
      normalizedSession,
      this.activeSession,
    );
  }

  _releaseVideoElementsOnSessionsEmpty() {
    if (this.videoElementPrepared && this.sessions.length === 0) {
      // Pause video elements to release system Video Wake Lock RCINT-15582
      if (!this._remoteVideo.paused) {
        this._remoteVideo.pause();
      }
      if (!this._localVideo.paused) {
        this._localVideo.pause();
      }
    }
  }

  _reconnectWebphoneIfNecessaryOnSessionsEmpty() {
    if (this._reconnectAfterSessionEnd && this.sessions.length === 0) {
      if (this._reconnectAfterSessionEnd.reason) {
        this._deps.alert.warning({
          message: this._reconnectAfterSessionEnd.reason,
          allowDuplicates: false,
        });
      }
      this._reconnectAfterSessionEnd = null;
      this.connect({ skipConnectDelay: true, force: true, skipDLCheck: true });
    }
  }

  _onCallEnd(session: WebphoneSession) {
    session.__rc_extendedControlStatus = extendedControlStatus.stopped;
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    if (!normalizedSession) {
      return;
    }
    this._updateSessions();
    this._setStateOnCallEnd(normalizedSession);
    this._eventEmitter.emit(
      EVENTS.callEnd,
      normalizedSession,
      this.activeSession,
      this.ringSession,
    );
    this._releaseVideoElementsOnSessionsEmpty();
    this._reconnectWebphoneIfNecessaryOnSessionsEmpty();
    this._makeWebphoneInactiveOnSessionsEmpty();
  }

  _onBeforeCallResume(session: WebphoneSession) {
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._eventEmitter.emit(
      EVENTS.beforeCallResume,
      normalizedSession,
      this.activeSession,
    );
  }

  _onCallResume(session: WebphoneSession) {
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._setActiveSessionId(normalizedSession.id);
    this._eventEmitter.emit(
      EVENTS.callResume,
      normalizedSession,
      this.activeSession,
    );
    this._setActiveWebphoneActiveCallId(session);
  }

  _onCallHold(session: WebphoneSession) {
    const normalizedSession = find((x) => x.id === session.id, this.sessions);
    this._eventEmitter.emit(
      EVENTS.callHold,
      normalizedSession,
      this.activeSession,
    );
  }

  onCallStart(handler: CallStartHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callStart, handler);
    }
  }

  onCallInit(handler: CallInitHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callInit, handler);
    }
  }

  onCallRing(handler: CallRingHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callRing, handler);
    }
  }

  onCallEnd(handler: CallEndHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callEnd, handler);
    }
  }

  onBeforeCallResume(handler: BeforeCallResumeHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.beforeCallResume, handler);
    }
  }

  onCallResume(handler: CallResumeHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callResume, handler);
    }
  }

  onCallHold(handler: CallHoldHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.callHold, handler);
    }
  }

  onBeforeCallEnd(handler: BeforeCallEndHandler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(EVENTS.beforeCallEnd, handler);
    }
  }

  async _disconnect() {
    await super._disconnect();
    this._updateSessions();
  }

  @computed<Webphone>(({ sessions }) => [sessions])
  get sessionPhoneNumbers(): string[] {
    const outputs: string[] = [];
    this.sessions.forEach((session) => {
      outputs.push(session.to);
      outputs.push(session.from);
    });
    return outputs;
  }

  /**
   * Current active session(Outbound and InBound that answered)
   */
  @computed<Webphone>(({ activeSessionId, sessions }) => [
    activeSessionId,
    sessions,
  ])
  get activeSession(): NormalizedSession {
    if (!this.activeSessionId) {
      return null;
    }
    const activeSession = find(
      (session) => session.id === this.activeSessionId,
      this.sessions,
    );
    return activeSession;
  }

  /**
   * Current ring session(inbound)
   */
  @computed<Webphone>(({ ringSessionId, sessions }) => [
    ringSessionId,
    sessions,
  ])
  get ringSession(): NormalizedSession {
    if (!this.ringSessionId) {
      return null;
    }
    const session = find(
      (session) => session.id === this.ringSessionId,
      this.sessions,
    );
    return session;
  }

  @computed<Webphone>(({ sessions }) => [sessions])
  get ringSessions(): NormalizedSession[] {
    return filter((session) => isRing(session), this.sessions);
  }

  @computed<Webphone>(({ sessions }) => [sessions])
  get onHoldSessions(): NormalizedSession[] {
    return filter((session) => isOnHold(session), this.sessions);
  }

  @computed<Webphone>(({ sessions }) => [sessions])
  get cachedSessions(): NormalizedSession[] {
    return filter((session) => session.cached, this.sessions);
  }

  get acceptOptions() {
    return {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: {
            deviceId: this._deps.audioSettings.inputDeviceId as string,
          },
          video: false,
        },
      },
    };
  }

  get isOnTransfer() {
    return this.activeSession && this.activeSession.isOnTransfer;
  }

  @computed<Webphone>(({ ringSessions }) => [ringSessions])
  get ringingCallOnView(): NormalizedSession {
    return find((session) => !session.minimized, this.ringSessions);
  }
}

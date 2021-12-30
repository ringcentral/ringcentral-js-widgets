import { contains } from 'ramda';
import {
  isConferenceSession,
  normalizeSession,
} from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import sessionStatus from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import recordStatus from '@ringcentral-integration/commons/modules/Webphone/recordStatus';

export const CONFERENCE_SESSION_ID =
  'Y3MxNzI2MjI1NTQzODI0MzUzM0AxMC43NC4yLjIxOA';

let partyId = 95;
class SessionDescriptionHandler {
  constructor() {
    this._events = {};
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  trigger(event, ...args) {
    this._events[event](...args);
  }
}

export const forwardFn = jest.fn();
export const replyFn = jest.fn();
export const toVoicemailFn = jest.fn();
export const holdFn = jest.fn();
export const unholdFn = jest.fn();
export const muteFn = jest.fn();
export const unmuteFn = jest.fn();
export const acceptFn = jest.fn();
export const terminateFn = jest.fn();
export const rejectFn = jest.fn();
export const transferFn = jest.fn();
export const flipFn = jest.fn();
export const startRecordFn = jest.fn();
export const stopRecordFn = jest.fn();

export default class Session {
  constructor(
    { id, direction, to, fromNumber, callId, telephonyStatus },
    userAgent,
  ) {
    partyId += 1;
    this._ua = userAgent;
    // native sip fields
    this.id = id;
    this.startTime = new Date();
    this.telephonyStatus = telephonyStatus || telephonyStatuses.onHold;
    this.sessionDescriptionHandler = new SessionDescriptionHandler();
    this.request = {
      to: {
        uri: {
          user: to,
        },
        displayName: to && contains('conf_', to) ? 'Conference' : null,
      },
      from: {
        uri: {},
      },
    };

    // customized fields
    this.__rc_callId = callId;
    this.__rc_direction = direction;
    this.__rc_callStatus = sessionStatus.connecting;
    this.__rc_creationTime = 1532076632960;
    this.__rc_isToVoicemail = true;
    this.__rc_fromNumber = fromNumber;
    this.__rc_isOnMute = undefined;
    this.__rc_isOnFlip = undefined;
    this.__rc_isOnTransfer = undefined;
    this.__rc_isForwarded = undefined;
    this.__rc_isReplied = undefined;
    this.__rc_recordStatus = recordStatus.idle;
    this.__rc_minimized = undefined;
    this.__rc_lastActiveTime = undefined;
    this.__rc_partyData = {
      partyId: `cs17262255528361442${partyId}-1`,
      sessionId: CONFERENCE_SESSION_ID,
    };

    // mock events
    this._events = {};
  }

  on(event, cb) {
    if (!this._events[event]) {
      this._events[event] = []
    }
    this._events[event].push(cb);
  }

  get localHold() {
    return this.__rc_callStatus === sessionStatus.onHold;
  }

  trigger(event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach((cb) => {
        cb(...args);
      });
    }
  }

  // Change Session Id
  accept(acceptOptions) {
    this.__rc_callStatus = sessionStatus.connected;
    this.trigger('accepted', acceptOptions);
    return acceptFn(this.id);
  }

  reject() {
    delete this._ua.sessions[this.id];
    this.trigger('rejected');
    this.__rc_callStatus = sessionStatus.finished;
    return rejectFn(this.id);
  }

  toVoicemail() {
    this.reject();
    this.__rc_callStatus = sessionStatus.finished;
    return toVoicemailFn(this.id);
  }

  terminate() {
    delete this._ua.sessions[this.id];
    this.trigger('terminated');
    this.__rc_callStatus = sessionStatus.finished;
    return terminateFn(this.id);
  }

  mute() {
    this.trigger('muted');
    this.__rc_callStatus = sessionStatus.onMute;
    this.__rc_isOnMute = true;
    return muteFn(this.id);
  }

  unmute() {
    this.trigger('unmuted');
    this.__rc_callStatus = sessionStatus.connected;
    this.__rc_isOnMute = false;
    return unmuteFn(this.id);
  }

  async hold() {
    await this.trigger('hold');
    this.__rc_callStatus = sessionStatus.onHold;
    return holdFn(this.id);
  }

  unhold() {
    this.__rc_callStatus = sessionStatus.connected;
    return unholdFn(this.id);
  }

  replyWithMessage(replyOptions) {
    this.reject();
    replyFn(replyOptions);
  }

  forward(validPhoneNumber, acceptOptions) {
    this.reject();
    forwardFn(validPhoneNumber, acceptOptions);
  }

  dtmf(value) {
    return value;
  }

  async blindTransfer(validPhoneNumber) {
    this.trigger('refer');
    transferFn(validPhoneNumber);
    return Promise.resolve(validPhoneNumber);
  }

  async transfer(validPhoneNumber) {
    delete this._ua.sessions[this.id];
    this.trigger('refer');
    transferFn(validPhoneNumber);
    return Promise.resolve(validPhoneNumber);
  }

  async flip(flipValue, sessionId) {
    flipFn(flipValue, sessionId);
    this.__rc_isOnFlip = true;
    return Promise.resolve({ flipValue, sessionId });
  }

  async startRecord() {
    startRecordFn(this.id);
    return Promise.resolve(this.id);
  }

  async stopRecord() {
    stopRecordFn(this.id);
    return Promise.resolve(this.id);
  }

  isConferenceSession() {
    return isConferenceSession(normalizeSession(this));
  }
}

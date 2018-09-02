import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatuses';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import recordStatus from 'ringcentral-integration/modules/Webphone/recordStatus';

let partyId = 95;
class MediaHandler {
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
  constructor({
    id, direction, to, fromNumber, _header_callId, telephonyStatus,
  }) {
    partyId += 1;
    const request = {
      to: {
        uri: {
          user: to && to.includes('conf_') ? to : null
        },
        displayName: to && to.includes('conf_') ? 'Conference' : null,
      },
      from: {
        uri: { }
      }
    };
    this.id = id;
    this._header_callId = _header_callId; // call id
    this.to = to;
    this.direction = direction;
    this.callStatus = sessionStatus.connecting;
    this.request = request;
    this.creationTime = 1532076632960;
    this.isToVoicemail = true;
    this.data = {};
    this.fromNumber = fromNumber;
    this.startTime = new Date();
    this.isOnMute = undefined;
    this.isOnFlip = undefined;
    this.isOnTransfer = undefined;
    this.isForwarded = undefined;
    this.isReplied = undefined;
    this.recordStatus = recordStatus.idle;
    this.minimized = undefined;
    this.lastHoldingTime = undefined;
    this.telephonyStatus = telephonyStatus || telephonyStatuses.onHold;
    this._events = {};
    this.mediaHandler = new MediaHandler();
    this.partyData = {
      partyId: `cs17262255528361442${partyId}-1`,
      sessionId: 'Y3MxNzI2MjI1NTQzODI0MzUzM0AxMC43NC4yLjIxOA',
    }
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  isOnHold() {
    return {
      local: this.callStatus === sessionStatus.onHold
    };
  }

  trigger(event, ...args) {
    this._events[event](...args);
  }

  // Change Session Id
  accept(acceptOptions) {
    this.callStatus = sessionStatus.connected;
    this.trigger('accepted', acceptOptions);
    return acceptFn(this.id);
  }

  reject() {
    this.trigger('rejected');
    this.callStatus = sessionStatus.finished;
    return rejectFn(this.id);
  }

  toVoicemail() {
    this.reject();
    this.callStatus = sessionStatus.finished;
    return toVoicemailFn(this.id);
  }

  terminate() {
    this.trigger('terminated');
    this.callStatus = sessionStatus.finished;
    return terminateFn(this.id);
  }

  mute() {
    this.trigger('muted');
    this.callStatus = sessionStatus.onMute;
    this.isOnMute = true;
    return muteFn(this.id);
  }

  unmute() {
    this.trigger('unmuted');
    this.callStatus = sessionStatus.connected;
    this.isOnMute = false;
    return unmuteFn(this.id);
  }

  hold() {
    this.trigger('hold');
    this.callStatus = sessionStatus.onHold;
    return holdFn(this.id);
  }

  unhold() {
    this.trigger('unhold');
    this.callStatus = sessionStatus.connected;
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

  async transfer(validPhoneNumber) {
    this.trigger('refer');
    transferFn(validPhoneNumber);
    return Promise.resolve(validPhoneNumber);
  }

  async flip(flipValue, sessionId) {
    flipFn(flipValue, sessionId);
    this.isOnFlip = true;
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
}

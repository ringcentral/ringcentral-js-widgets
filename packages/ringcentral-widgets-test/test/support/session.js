import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatuses';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';

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

export default class Session {
  constructor({
    id, direction, to, fromNumber, _header_callId, telephonyStatus
  }) {
    this.id = id;
    this._header_callId = _header_callId; // call id
    this.to = to;
    this.direction = direction;
    this.callStatus = sessionStatus.connecting;
    this.request = { to: { uri: { } }, from: { uri: { } } };
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
    this.recordStatus = undefined;
    this.minimized = undefined;
    this.lastHoldingTime = undefined;
    this.telephonyStatus = telephonyStatus || telephonyStatuses.onHold;
    this._events = {};
    this.mediaHandler = new MediaHandler();
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
    acceptFn.mockReturnValueOnce({
      sessionId: this.id
    });
    this.callStatus = sessionStatus.connected;
    this.trigger('accepted', acceptOptions);
    return acceptFn(this.id);
  }

  reject() {
    this.trigger('rejected');
    return rejectFn(this.id);
  }

  toVoicemail() {
    this.reject();
    this.callStatus = sessionStatus.finished;
    return toVoicemailFn(this.id);
  }

  terminate() {
    this.trigger('terminated');
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
}

export const inboundSession = new Session({
  id: '111',
  direction: 'Inbound'
});

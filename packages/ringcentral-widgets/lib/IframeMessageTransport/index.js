import MessageTransportCore from '../MessageTransportCore';

export default class IframeMessageTransport extends MessageTransportCore {
  constructor({
    targetIframe,
    targetWindow,
  }) {
    super();
    this._targetIframe = targetIframe;
    this._targetWindow = targetWindow;
    window.addEventListener('message', this._onMessage);
  }
  _onMessage = (msg) => {
    if (msg && msg.data) {
      this._distributeMessage(msg.data);
    }
  }

  dispose() {
    window.removeEventListener('message', this._onMessage);
  }
  postMessage(msg) {
    const target = this._targetWindow || this._targetIframe && this._targetIframe.contentWindow;
    if (target) {
      target.postMessage(msg, '*');
    }
  }
}

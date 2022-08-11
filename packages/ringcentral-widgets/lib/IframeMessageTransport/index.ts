import MessageTransportCore from '../MessageTransportCore';

export default class IframeMessageTransport extends MessageTransportCore {
  _targetIframe: any;
  _targetWindow: any;
  constructor({ targetIframe, targetWindow }: any) {
    super();
    this._targetIframe = targetIframe;
    this._targetWindow = targetWindow;
    window.addEventListener('message', this._onMessage);
  }
  _onMessage = (msg: any) => {
    if (msg && msg.data) {
      this._distributeMessage(msg.data);
    }
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  dispose() {
    window.removeEventListener('message', this._onMessage);
  }
  // @ts-expect-error TS(2416): Property 'postMessage' in type 'IframeMessageTrans... Remove this comment to see the full error message
  postMessage(msg: any) {
    const target =
      this._targetWindow ||
      (this._targetIframe && this._targetIframe.contentWindow);
    if (target) {
      target.postMessage(msg, '*');
    }
  }
}

import { proxyChrome } from '@ringcentral-integration/commons/lib/ObjectProxy';

type Handler = (message: any, sender: chrome.runtime.MessageSender) => void;

type Packet = {
  [s: string]: any;
};

export class Channel {
  _mux: Record<string, Handler> = {};
  _type: string;

  constructor(type: string) {
    this._type = type;
    this._make();
  }

  select(actionType: string, handler: Handler) {
    this._mux[actionType] = handler;
    return this;
  }

  async send(packet: Packet) {
    return await chrome.runtime.sendMessage({
      type: this._type,
      ...packet,
    });
  }

  async broadcast(packet: Packet) {
    const tabs = await proxyChrome.tabs.query({ discarded: false });
    // Keep behavior of ignoring exception
    await Promise.allSettled(
      tabs.map((tab) =>
        proxyChrome.tabs.sendMessage(tab.id!, {
          type: this._type,
          ...packet,
        }),
      ),
    );
  }

  _make() {
    chrome.runtime.onMessage.addListener(
      (
        message: any,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response?: any) => void,
      ) => {
        const { type, action } = message;
        if (type === this._type) {
          const handler = this._mux[action];
          if (typeof handler === 'function') {
            Promise.resolve(handler(message, sender))
              .then((value) => {
                sendResponse(value);
              })
              .catch((err) => {
                console.error(err);
                sendResponse();
              });
            // Async
            return true;
          }
        }
        return false;
      },
    );
  }
}

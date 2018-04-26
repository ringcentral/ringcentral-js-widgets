import TransportBase from '../TransportBase';

/* global chrome */

export default class ServerTransport extends TransportBase {
  constructor(options) {
    super({
      ...options,
      name: 'ChromeTransport',
    });
    this._ports = new Set();
    this._requests = new Map();

    // Keep active tabs up to date
    this._activeTabs = [];
    this._getActiveTabs();
    chrome.tabs.onActivated.addListener(() => {
      this._getActiveTabs();
    });
    chrome.runtime.onConnect.addListener((port) => {
      if (port.name === 'transport') {
        this._ports.add(port);
        port.onMessage.addListener(({ type, requestId, payload }) => {
          if (type === this._events.request && requestId && payload) {
            this._requests.set(requestId, port);
            this.emit(this._events.request, {
              requestId,
              payload,
            });
          }
        });
        port.onDisconnect.addListener(() => {
          this._ports.delete(port);
        });
      }
    });
  }
  response({ requestId, result, error }) {
    const port = this._requests.get(requestId);
    if (port) {
      this._requests.delete(requestId);
      if (error instanceof Error) {
        error = error.message;
      }
      port.postMessage({
        type: this._events.response,
        requestId,
        result,
        error,
      });
    }
  }
  push({ payload }) {
    const message = { type: this._events.push, payload };
    const isOnActiveTabs = (port) => {
      // Ensure tabs are still accessible (may be closed)
      // otherwise, give up pushing messages to that tab at this point
      if (port.sender && port.sender.tab) {
        return !!this._activeTabs.find(tab => tab && (tab.id === port.sender.tab.id));
      }
      return false;
    };
    // Since postMessage is really expensive,
    // we only send messages to those ports on active tabs.
    Array.from(this._ports)
      .filter(port => isOnActiveTabs(port))
      .forEach(port => port.postMessage(message));
  }

  _getActiveTabs() {
    try {
      chrome.tabs.query({ active: true }, (tabs) => {
        this._activeTabs = tabs;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

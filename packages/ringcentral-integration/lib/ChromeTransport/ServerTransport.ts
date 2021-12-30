import { forEach, reduce } from 'ramda';

import TransportBase from '../TransportBase';

/* global chrome */

export class ServerTransport extends TransportBase {
  constructor(options) {
    super({
      ...options,
      name: 'ChromeTransport',
    });
    this._ports = new Set();
    this._requests = new Map();

    // Keep active tabs up to date
    this._activeTabIds = null;
    this._getActiveTabIds();
    chrome.tabs.onActivated.addListener(() => this._getActiveTabIds());
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
    // Since postMessage is really expensive,
    // we only send messages to those ports on active tabs.
    forEach((port) => {
      if (
        port.sender &&
        port.sender.tab &&
        // send to all instances if app failed to query active tabs
        (!this._activeTabIds || this._activeTabIds[port.sender.tab.id])
      ) {
        port.postMessage(message);
      }
    }, this._ports);
  }

  _getActiveTabIds() {
    return new Promise((resolve) => {
      try {
        chrome.tabs.query({ active: true }, (tabs) => {
          this._activeTabIds = Array.isArray(tabs)
            ? // convert tabs array into tabs id truth mapping
              reduce(
                (acc, tab) => {
                  if (tab.id) {
                    acc[tab.id] = true;
                  }
                  return acc;
                },
                {},
                tabs,
              )
            : null;
          resolve(!!this._activeTabIds);
        });
      } catch (error) {
        this._activeTabIds = null;
        console.log(error);
        resolve(false);
      }
    });
  }
}

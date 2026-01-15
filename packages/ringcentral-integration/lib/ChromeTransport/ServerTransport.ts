import { proxyChrome } from '../ObjectProxy';
import { TransportBase, type TransportBaseProps } from '../TransportBase';

import { CONNECT_PORT_NAME, TRANSPORT_NAME } from './constants';

/* global chrome */

export interface ServerTransportProps
  extends Omit<TransportBaseProps, 'name'> {}

export class ServerTransport extends TransportBase {
  _activeTabIds = new Set<number>();
  _ports = new Set<chrome.runtime.Port>();
  _requests = new Map<string, chrome.runtime.Port>();

  constructor(options: ServerTransportProps = {}) {
    super({
      ...options,
      name: TRANSPORT_NAME,
    });

    // Get current tabs
    this._getActiveTabIds();
    // Keep active tabs up to date
    proxyChrome.tabs.onActivated.addListener(() => this._getActiveTabIds());

    chrome.runtime.onConnect.addListener((port) => {
      if (port.name === CONNECT_PORT_NAME) {
        this._ports.add(port);
        port.onMessage.addListener(({ type, requestId, payload }) => {
          if (type === this._events.send) {
            this.emit(this._events.send, payload);
          }
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

  response({
    requestId,
    result,
    error,
  }: {
    requestId: string;
    result?: unknown;
    error?: Error | string;
  }) {
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

  push({ payload }: { payload: unknown }) {
    const message = { type: this._events.push, payload };
    // Since postMessage is really expensive,
    // we only send messages to those ports on active tabs.
    this._ports.forEach((port) => {
      if (
        port.sender?.tab?.id &&
        // send to all instances if app failed to query active tabs
        (!this._activeTabIds.size || this._activeTabIds.has(port.sender.tab.id))
      ) {
        port.postMessage(message);
      }
    });
  }

  _getActiveTabIds() {
    try {
      proxyChrome.tabs.query({ active: true }, (tabs) => {
        this._activeTabIds.clear();
        if (Array.isArray(tabs)) {
          tabs.forEach((tab) => {
            if (tab.id) {
              this._activeTabIds.add(tab.id);
            }
          });
        }
      });
    } catch (error) {
      console.log('[ServerTransport]', error);
    }
  }

  send({ payload }: { payload: unknown }) {
    const message = { type: this._events.send, payload };
    // Since postMessage is really expensive,
    // we only send messages to those ports on active tabs.
    this._ports.forEach((port) => {
      if (
        port.sender?.tab?.id
        // TODO: implement change active tab for syncing state
        // send to all instances if app failed to query active tabs
        // (!this._activeTabIds.size || this._activeTabIds.has(port.sender.tab.id))
      ) {
        port.postMessage(message);
      }
    });
  }
}

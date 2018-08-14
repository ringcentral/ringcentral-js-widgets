import uuid from 'uuid';
import RcModule from '../RcModule';
import getProxyClientReducer from './getProxyClientReducer';
import baseActionTypes from './baseActionTypes';
import ensureExist from '../ensureExist';


export default function getProxyClient(createTarget) {
  return class extends RcModule {
    constructor({ transport, ...options }) {
      super({
        ...options,
        actionTypes: baseActionTypes,
      });
      this._id = uuid.v4();
      this._target = createTarget({
        ...options,
      });
      this._target._getState = () => this.state.target;
      this._target._getProxyState = () => this.state.proxy;
      // this._target = new Target({
      //   ...options,
      //   getState: () => this.state.target,
      //   getProxyState: () => this.state.proxy,
      // });
      this._transport = this::ensureExist(transport, 'transport');
      this._setTransport(this._target);
      for (const subModule in this._target) {
        if (
          this._target::Object.prototype.hasOwnProperty(subModule) &&
            this._target[subModule] instanceof RcModule
        ) {
          Object.defineProperty(this, subModule, {
            configurable: false,
            enumerable: true,
            get() {
              return this._target[subModule];
            },
          });
        }
      }

      this._reducer = getProxyClientReducer({
        targetReducer: this._target.reducer,
        proxyReducer: this._target.proxyReducer,
        transport,
        types: this.actionTypes,
      });
    }

    _setTransport(target) {
      target._transport = this._transport;
      target._proxyActionTypes = this.actionTypes;
      target._suppressInit = true;
      for (const subModule in target) {
        if (
          target::Object.prototype.hasOwnProperty(subModule) &&
            target[subModule] instanceof RcModule
        ) {
          this._setTransport(target[subModule]);
        }
      }
    }


    async _sync() {
      try {
        const result = await this._transport.request({
          payload: {
            type: this.actionTypes.sync,
            actionNumber: this.state.actionNumber
          },
        });
        this.store.dispatch({
          ...result,
          type: this.actionTypes.sync,
        });
      } catch (_) { /* Ignore */ }
      this._syncPromise = null;
    }
    sync() {
      if (!this._syncPromise) {
        this._syncPromise = this._sync();
      }
      return this._syncPromise;
    }

    _initialize(target) {
      if (
        typeof target.initializeProxy === 'function' &&
        !target._proxyInitialized
      ) {
        target._proxyInitialized = true;
        target.initializeProxy();
      }
      for (const subModule in target) {
        if (
          target::Object.prototype.hasOwnProperty(subModule) &&
            target[subModule] instanceof RcModule
        ) {
          this._initialize(target[subModule]);
        }
      }
    }
    async initialize() {
      // initialize the instance before sync to avoid history object from
      // becoming out of sync
      this._initialize(this._target);
      this._transport.on(this._transport.events.push, async (payload) => {
        if (payload.type === this.actionTypes.action) {
          if (this._syncPromise) await this._syncPromise;
          if (payload.actionNumber === this.state.actionNumber + 1) {
            this.store.dispatch({
              ...payload,
              type: this.actionTypes.action,
            });
          } else {
            await this.sync();
          }
        }
      });
      await this.sync();
    }
  };
}

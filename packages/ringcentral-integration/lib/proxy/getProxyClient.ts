import * as uuid from 'uuid';

import ensureExist from '../ensureExist';
import RcModule from '../RcModule';
import baseActionTypes from './baseActionTypes';
import getProxyClientReducer from './getProxyClientReducer';
import { pushStates } from './handleProxyAction';

const defaultVerifyModuleFunc = (module) => module instanceof RcModule;

export default function getProxyClient(
  createTarget,
  verifyModuleFunc = defaultVerifyModuleFunc,
) {
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
      // Used by client to dispatch action.
      // this._target.__proxyAction__ = this.actionTypes.action;
      this._target._getState = () => this.state.target;
      this._target._getProxyState = () => this.state.proxy;
      // this._target = new Target({
      //   ...options,
      //   getState: () => this.state.target,
      //   getProxyState: () => this.state.proxy,
      // });
      this._transport = ensureExist.call(this, transport, 'transport');
      this._setTransport(this._target);
      for (const subModule in this._target) {
        if (
          Object.prototype.hasOwnProperty.call(this._target, subModule) &&
          verifyModuleFunc(this._target[subModule])
        ) {
          Object.defineProperty(this, subModule, {
            configurable: false,
            enumerable: true,
            get() {
              return this._target[subModule];
            },
          });
          this[subModule]._getStateV2 = (state, key) => state.target[key];
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
          Object.prototype.hasOwnProperty.call(target, subModule) &&
          verifyModuleFunc(target[subModule])
        ) {
          target[subModule]._transport = this._transport;
          target[subModule]._proxyActionTypes = this.actionTypes;
          target[subModule]._suppressInit = true;
        }
      }
    }

    async _sync() {
      try {
        const result = await this._transport.request({
          payload: {
            type: this.actionTypes.sync,
            actionNumber: this.state.actionNumber,
          },
        });
        this.store.dispatch({
          ...result,
          type: this.actionTypes.sync,
        });
      } catch (_) {
        /* Ignore */
      }
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
          Object.prototype.hasOwnProperty.call(target, subModule) &&
          verifyModuleFunc(target[subModule]) &&
          typeof target[subModule].initializeProxy === 'function' &&
          !target[subModule]._proxyInitialized
        ) {
          target[subModule]._proxyInitialized = true;
          target[subModule].initializeProxy();
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
            const action = pushStates(this._target, payload.action);
            this.store.dispatch({
              ...payload,
              action,
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

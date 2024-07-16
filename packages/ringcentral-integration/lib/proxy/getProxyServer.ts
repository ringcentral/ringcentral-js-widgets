import RcModule from '../RcModule';
import ensureExist from '../ensureExist';

import baseActionTypes from './baseActionTypes';
import getProxyServerReducer from './getProxyServerReducer';

const defaultVerifyModuleFunc = (module: any) => module instanceof RcModule;

// @ts-expect-error TS(4094): Property '_getState' of exported class expression ... Remove this comment to see the full error message
export default function getProxyServer(
  createTarget: any,
  verifyModuleFunc = defaultVerifyModuleFunc,
) {
  return class extends RcModule {
    _target: any;
    _transport: any;
    constructor({ transport, ...options }: any) {
      super({
        ...options,
        actionTypes: baseActionTypes,
      });
      this._target = createTarget({
        ...options,
      });
      this._target._getState = () => this.state.target;
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
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          this[subModule]._getStateV2 = (state: any, key: any) =>
            state.target[key];
        }
      }

      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      this._transport = ensureExist.call(this, transport, 'transport');
      this._reducer = getProxyServerReducer({
        moduleReducer: this._target.reducer,
        transport,
        prefix: this.prefix,
      });

      transport.on(
        transport.events.request,
        async ({
          requestId,
          payload: { type, functionPath, args, actionNumber },
        }: any) => {
          switch (type) {
            case this.actionTypes.execute:
              {
                const [...pathTokens] = functionPath.split('.').slice(1);
                const fnName = pathTokens.pop();
                let target = this._target;
                pathTokens.forEach((token: any) => {
                  target = target[token];
                });
                try {
                  const result = await target[fnName](...args);
                  transport.response({
                    requestId,
                    result,
                  });
                } catch (error: any /** TODO: confirm with instanceof */) {
                  transport.response({
                    requestId,
                    error,
                  });
                }
              }
              break;
            case this.actionTypes.sync: {
              if (actionNumber !== this.state.actionNumber) {
                transport.response({
                  requestId,
                  result: this.state,
                });
              } else {
                transport.response({
                  requestId,
                  error: new Error('State is already up to date.'),
                });
              }
              break;
            }
            default:
              transport.response({
                requestId,
                error: new Error(`Invalid request type '${type}'.`),
              });
              break;
          }
        },
      );
    }
  };
}

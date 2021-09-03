import RcModule from '../RcModule';
import baseActionTypes from './baseActionTypes';
import getProxyServerReducer from './getProxyServerReducer';
import ensureExist from '../ensureExist';

const defaultVerifyModuleFunc = (module) => module instanceof RcModule;

export default function getProxyServer(
  createTarget,
  verifyModuleFunc = defaultVerifyModuleFunc,
) {
  return class extends RcModule {
    constructor({ transport, ...options }) {
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
          this[subModule]._getStateV2 = (state, key) => state.target[key];
        }
      }

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
        }) => {
          switch (type) {
            case this.actionTypes.execute:
              {
                const [...pathTokens] = functionPath.split('.').slice(1);
                const fnName = pathTokens.pop();
                let target = this._target;
                pathTokens.forEach((token) => {
                  target = target[token];
                });
                try {
                  const result = await target[fnName](...args);
                  transport.response({
                    requestId,
                    result,
                  });
                } catch (error) {
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

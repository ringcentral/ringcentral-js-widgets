import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import { createStore } from 'redux';

import ConnectivityMonitor, {
  DEFAULT_TIME_TO_RETRY,
  DEFAULT_HEART_BEAT_INTERVAL,
} from './';
import connectivityMonitorMessages from './connectivityMonitorMessages';
import actionTypes from './actionTypes';
// import moduleStatuses from '../../enums/moduleStatuses';
import sleep from '../../lib/sleep';

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('ConnectivityMonitor', async () => {
  describe('constructor', () => {
    it('should throw if options.client is undefined', () => {
      expect(() => (
        new ConnectivityMonitor({
        })
      )).to.throw();
    });
    it('should use default timeToRetry', () => {
      const instance = new ConnectivityMonitor({
        client: {},
      });
      expect(instance._timeToRetry).to.equal(DEFAULT_TIME_TO_RETRY);
    });
    it('should allow options.timeToRetry to be set', () => {
      const timeToRetry = Math.floor(Math.random() * 1000);
      const instance = new ConnectivityMonitor({
        client: {},
        timeToRetry,
      });
      expect(instance._timeToRetry).to.equal(timeToRetry);
    });
    it('should use default heartBeatInterval', () => {
      const instance = new ConnectivityMonitor({
        client: {},
      });
      expect(instance._heartBeatInterval).to.equal(DEFAULT_HEART_BEAT_INTERVAL);
    });
    it('should allow options.heartBeatInterval to be set', () => {
      const heartBeatInterval = Math.floor(Math.random() * 1000);
      const instance = new ConnectivityMonitor({
        client: {},
        heartBeatInterval,
      });
      expect(instance._heartBeatInterval).to.equal(heartBeatInterval);
    });
  });
  describe('_shouldInit', () => {
    [true, false].forEach((pending) => {
      it(`should return ${pending} when environment module is not used
      and this.pending === ${pending}`,
        () => {
          const instance = new ConnectivityMonitor({
            client: {},
          });
          sinon.stub(instance, 'pending', {
            get() {
              return pending;
            },
          });
          expect(instance._shouldInit()).to.equal(pending);
        });
      [true, false].forEach((environmentReady) => {
        const result = pending && environmentReady;
        it(`should return ${result} when environment module is used,
        this.pending === ${pending},
        and this._environment.ready === ${environmentReady}`,
          () => {
            const instance = new ConnectivityMonitor({
              client: {},
              environment: {
                get ready() {
                  return environmentReady;
                },
              },
            });
            sinon.stub(instance, 'pending', {
              get() {
                return pending;
              },
            });
            expect(instance._shouldInit()).to.equal(result);
          });
      });
    });
  });
  describe('_shouldRebindHandlers', () => {
    [true, false].forEach((ready) => {
      it(`should return false when this.ready === ${ready}
      and environment module is not used`,
        () => {
          const instance = new ConnectivityMonitor({
            client: {},
          });
          sinon.stub(instance, 'ready', {
            get() {
              return ready;
            },
          });
          expect(instance._shouldRebindHandlers()).to.equal(false);
        });
      [true, false].forEach((environmentReady) => {
        [true, false].forEach((counterEqual) => {
          const changeCounter = Math.floor(Math.random() * 10);
          const lastEnvironmentCounter = counterEqual ?
            changeCounter :
            (changeCounter - 1);
          const result = ready && environmentReady && !counterEqual;
          it(`should return ${result} when this.ready === ${ready},
          environment module is used,
          this._environment.ready === ${environmentReady},
          and this._environment.changeCounter ${counterEqual ? '===' : '!=='}
          this._lastEnvironmentCounter`,
            () => {
              const instance = new ConnectivityMonitor({
                client: {},
                environment: {
                  get ready() {
                    return environmentReady;
                  },
                  get changeCounter() {
                    return changeCounter;
                  },
                },
              });
              sinon.stub(instance, 'ready', {
                get() {
                  return ready;
                },
              });
              instance._lastEnvironmentCounter = lastEnvironmentCounter;
              expect(instance._shouldRebindHandlers()).to.equal(result);
            });
        });
      });
    });
  });
  describe('_onStateChange', () => {
    it(`should run _bindHandlers and _retry when _shouldInit() === true,
    and dispatch initSuccess`,
      () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        instance._store = createStore(instance.reducer);
        sinon.spy(instance._store, 'dispatch');
        sinon.stub(instance, '_shouldInit').callsFake(() => true);
        sinon.stub(instance, '_bindHandlers');
        sinon.stub(instance, '_retry');
        instance._onStateChange();
        sinon.assert.calledOnce(instance._bindHandlers);
        sinon.assert.calledOnce(instance._retry);
        expect(instance._store.dispatch.args[0][0].type)
          .to.equal(actionTypes.initSuccess);
        expect(instance.ready).to.equal(true);
      });
    it('should not run _bindHandlers and _retry when _shouldInit() === false',
      () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        instance._store = createStore(instance.reducer);
        sinon.spy(instance._store, 'dispatch');
        sinon.stub(instance, '_shouldInit').callsFake(() => false);
        sinon.stub(instance, '_bindHandlers');
        sinon.stub(instance, '_retry');
        instance._onStateChange();
        sinon.assert.notCalled(instance._bindHandlers);
        sinon.assert.notCalled(instance._retry);
        sinon.assert.notCalled(instance._store.dispatch);
        expect(instance.ready).to.equal(false);
      });
    it('should run _bindHandlers when _shouldRebindHandlers() === true',
      () => {
        const changeCounter = Math.floor(Math.random() * 10);
        const lastEnvironmentCounter = changeCounter - 1;
        const instance = new ConnectivityMonitor({
          client: {},
          environment: {
            get changeCounter() {
              return changeCounter;
            },
          },
        });
        instance._lastEnvironmentCounter = lastEnvironmentCounter;
        sinon.stub(instance, '_shouldInit').callsFake(() => false);
        sinon.stub(instance, '_shouldRebindHandlers').callsFake(() => true);
        sinon.stub(instance, '_bindHandlers');
        instance._onStateChange();
        sinon.assert.calledOnce(instance._bindHandlers);
        expect(instance._lastEnvironmentCounter)
          .to.equal(instance._environment.changeCounter);
      });
    it('should not run _bindHandlers when _shouldRebindHandlers() === false',
      () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        sinon.stub(instance, '_shouldInit').callsFake(() => false);
        sinon.stub(instance, '_shouldRebindHandlers').callsFake(() => false);
        sinon.stub(instance, '_bindHandlers');
        instance._onStateChange();
        sinon.assert.notCalled(instance._bindHandlers);
      });
  });
  describe('_retry', async () => {
    it(`should set timeout to call _checkConnection after heartBeatInterval time
    when this.connectivity === true`,
      async () => {
        const instance = new ConnectivityMonitor({
          client: {},
          timeToRetry: 30,
          heartBeatInterval: 60,
        });
        sinon.stub(instance, '_checkConnection');
        sinon.stub(instance, 'connectivity', {
          get() {
            return true;
          }
        });
        instance._retry();
        await sleep(40);
        sinon.assert.notCalled(instance._checkConnection);
        await sleep(30);
        sinon.assert.calledOnce(instance._checkConnection);
      },
    );
    it(`should set timeout to call _checkConnection after timeToRetry time
    when this.connectivity === false`,
      async () => {
        const instance = new ConnectivityMonitor({
          client: {},
          timeToRetry: 30,
          heartBeatInterval: 60,
        });
        sinon.stub(instance, '_checkConnection');
        sinon.stub(instance, 'connectivity', {
          get() {
            return false;
          }
        });
        instance._retry();
        await sleep(40);
        sinon.assert.calledOnce(instance._checkConnection);
      },
    );
    it('should set timeout to call _checkConnection after t if t is defined',
      async () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        sinon.stub(instance, '_checkConnection');
        sinon.stub(instance, 'connectivity', {
          get() {
            return false;
          }
        });
        instance._retry(30);
        await sleep(40);
        sinon.assert.calledOnce(instance._checkConnection);
      },
    );
    it('should call _clearTimeout',
      async () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        sinon.stub(instance, '_checkConnection');
        sinon.stub(instance, '_clearTimeout');
        sinon.stub(instance, 'connectivity', {
          get() {
            return false;
          }
        });
        instance._retry(30);
        sinon.assert.calledOnce(instance._clearTimeout);
      },
    );
  });
  describe('_clearTimeout', () => {
    const _clearTimeout = clearTimeout;
    afterEach(() => {
      // eslint-disable-next-line
      clearTimeout = _clearTimeout;
    });
    it('should call clearTimeout if this._retryTimeoutId !== null', () => {
      // eslint-disable-next-line
      clearTimeout = sinon.stub();
      const instance = new ConnectivityMonitor({
        client: {},
      });
      instance._retryTimeoutId = 1;
      instance._clearTimeout();
      sinon.assert.calledOnce(clearTimeout);
      expect(instance._retryTimeoutId).to.be.null();
    });
    it('should not call clearTimeout if this._retryTimeoutId === null', () => {
      // eslint-disable-next-line
      clearTimeout = sinon.stub();
      const instance = new ConnectivityMonitor({
        client: {},
      });
      instance._retryTimeoutId = null;
      instance._clearTimeout();
      sinon.assert.notCalled(clearTimeout);
    });
  });
  describe('_beforeRequestHandler', () => {
    it('should call _clearTimeout', () => {
      const instance = new ConnectivityMonitor({
        client: {},
      });
      sinon.stub(instance, '_clearTimeout');
      instance._beforeRequestHandler();
      sinon.assert.calledOnce(instance._clearTimeout);
    });
  });
  describe('_requestSuccessHandler', () => {
    it('should call _retry when this.connectivity === true', () => {
      const instance = new ConnectivityMonitor({
        client: {},
      });
      sinon.stub(instance, '_retry');
      sinon.stub(instance, 'connectivity', {
        get() {
          return true;
        },
      });
      instance._requestSuccessHandler();
      sinon.assert.calledOnce(instance._retry);
    });
    it('should call _retry when this.connectivity === false', () => {
      const instance = new ConnectivityMonitor({
        client: {},
      });
      sinon.stub(instance, '_retry');
      instance._store = {
        dispatch: sinon.stub(),
      };
      sinon.stub(instance, 'connectivity', {
        get() {
          return false;
        },
      });
      instance._requestSuccessHandler();
      sinon.assert.calledOnce(instance._retry);
    });
    it('should dispatch connectSuccess if this.connectivity === false', () => {
      const instance = new ConnectivityMonitor({
        client: {},
      });
      sinon.stub(instance, '_retry');
      sinon.stub(instance, 'connectivity', {
        get() {
          return false;
        },
      });
      instance._store = {
        dispatch: sinon.stub(),
      };
      instance._alert = {
        messages: [{
          id: 'foo',
          message: 'rogue',
        }],
        dismiss: sinon.stub(),
      };
      sinon.spy(instance._store.dispatch);
      instance._requestSuccessHandler();
      sinon.assert.calledOnce(instance._store.dispatch);
      expect(instance._store.dispatch.args[0][0].type === actionTypes.connectSuccess);
    });
    it(`should try to dismiss disconnected messages if alert module is used
    and this.connectivity === false`,
      () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        sinon.stub(instance, '_retry');
        sinon.stub(instance, 'connectivity', {
          get() {
            return false;
          },
        });
        instance._store = {
          dispatch: sinon.stub(),
        };
        instance._alert = {
          messages: [{
            id: 'foo',
            message: 'rogue',
          }, {
            id: 'bar',
            message: connectivityMonitorMessages.disconnected,
          }],
          dismiss: sinon.stub(),
        };
        sinon.spy(instance._store.dispatch);
        instance._requestSuccessHandler();
        sinon.assert.calledOnce(instance._store.dispatch);
        sinon.assert.calledOnce(instance._alert.dismiss);
        expect(instance._alert.dismiss.args[0][0]).to.deep.equal(['bar']);
      },
    );
  });
  describe('_requestErrorHandler', () => {
    it(`should call _retry if error has no response object
    and this.conectvity === true`,
      () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        sinon.stub(instance, '_retry');
        sinon.stub(instance, 'connectivity', {
          get() {
            return true;
          },
        });
        instance._store = {
          dispatch: sinon.stub(),
        };
        sinon.stub(instance, 'showAlert');
        instance._requestErrorHandler(new Error());
        sinon.assert.calledOnce(instance._retry);
      },
    );
    it(`should call _retry if apiResponse is a fetch error
    and this.conectvity === false`,
      () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        sinon.stub(instance, '_retry');
        sinon.stub(instance, 'connectivity', {
          get() {
            return false;
          },
        });
        instance._store = {
          dispatch: sinon.stub(),
        };
        sinon.stub(instance, 'showAlert');
        instance._requestErrorHandler(new Error());
        sinon.assert.calledOnce(instance._retry);
      },
    );
    it(`should dispatch connectFail and call showAlert
    if apiResponse is a fetch error
    and this.conectvity === true`,
      () => {
        const instance = new ConnectivityMonitor({
          client: {},
        });
        sinon.stub(instance, '_retry');
        sinon.stub(instance, 'connectivity', {
          get() {
            return true;
          },
        });
        instance._store = {
          dispatch: sinon.stub(),
        };
        sinon.stub(instance, 'showAlert');
        instance._requestErrorHandler(new Error());
        sinon.assert.calledOnce(instance._store.dispatch);
        expect(instance._store.dispatch.args[0][0].type === actionTypes.connectFail);
        sinon.assert.calledOnce(instance.showAlert);
      },
    );
  });
});

import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import { createStore } from 'redux';

import AvailabilityMonitor, { STATUS_END_POINT } from './';
import { PRESENCE_REG_EXP } from './availabilityMonitorHelper';
import actionTypes from './actionTypes';
import getAvailabilityMonitorReducer from './availabilityMonitorReducer';

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('AvailabilityMonitor unit test', async () => {
  let availabilityMonitor;
  let store;
  beforeEach(() => {
    availabilityMonitor = sinon.createStubInstance(AvailabilityMonitor, {
      pending: {
        get() {
          return true;
        },
      },
    });
    store = createStore(getAvailabilityMonitorReducer(actionTypes));
    availabilityMonitor._store = store;
    availabilityMonitor._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldRebindHandlers',
      '_bindHandlers',
      '_beforeRequestHandler',
      '_requestErrorHandler',
      '_switchToLimitedMode',
      '_switchToVoIPOnlyMode',
      '_switchToNormalMode',
      '_healthCheck',
    ].forEach((key) => {
      if (!availabilityMonitor[key]) {
        console.error('==>before key ', key);
      } else {
        availabilityMonitor[key].restore();
      }
    });
  });

  describe('_shouldInit', () => {
    [true, false].forEach((pending) => {
      it(`should return ${pending} when environment module is not used
      and this.pending === ${pending}`, () => {
        sinon.stub(availabilityMonitor, 'pending').value(pending);
        expect(availabilityMonitor._shouldInit()).to.equal(pending);
      });
      [true, false].forEach((environmentReady) => {
        const result = pending && environmentReady;
        it(`should return ${result} when environment module is used,
        this.pending === ${pending},
        and this._environment.ready === ${environmentReady}`, () => {
          availabilityMonitor._environment = {
            get ready() {
              return environmentReady;
            },
          };
          sinon.stub(availabilityMonitor, 'pending').value(pending);
          expect(availabilityMonitor._shouldInit()).to.equal(result);
        });
      });
    });
  });

  describe('_shouldRebindHandlers', () => {
    [true, false].forEach((ready) => {
      it(`should return false when this.ready === ${ready}
      and environment module is not used`, () => {
        sinon.stub(availabilityMonitor, 'ready').value(ready);
        expect(availabilityMonitor._shouldRebindHandlers()).to.equal(false);
      });
      [true, false].forEach((environmentReady) => {
        [true, false].forEach((counterEqual) => {
          const changeCounter = Math.floor(Math.random() * 10);
          const lastEnvironmentCounter = counterEqual
            ? changeCounter
            : changeCounter - 1;
          const result = ready && environmentReady && !counterEqual;
          it(`should return ${result} when this.ready === ${ready},
          environment module is used,
          this._environment.ready === ${environmentReady},
          and this._environment.changeCounter ${counterEqual ? '===' : '!=='}
          this._lastEnvironmentCounter`, () => {
            availabilityMonitor._environment = {
              get ready() {
                return environmentReady;
              },
              get changeCounter() {
                return changeCounter;
              },
            };
            sinon.stub(availabilityMonitor, 'ready').value(ready);
            availabilityMonitor._lastEnvironmentCounter = lastEnvironmentCounter;
            expect(availabilityMonitor._shouldRebindHandlers()).to.equal(
              result,
            );
          });
        });
      });
    });
  });

  describe('_onStateChange', () => {
    beforeEach(() => {
      availabilityMonitor._environment = {
        get ready() {
          return true;
        },
        get changeCounter() {
          return 1;
        },
      };
    });
    it(`should run _bindHandlers when _shouldInit() === true,
    and dispatch initSuccess`, () => {
      sinon.spy(availabilityMonitor._store, 'dispatch');
      sinon.stub(availabilityMonitor, '_shouldInit').callsFake(() => true);
      sinon
        .stub(availabilityMonitor, '_shouldRebindHandlers')
        .callsFake(() => false);
      sinon.stub(availabilityMonitor, '_bindHandlers');
      availabilityMonitor._onStateChange();
      sinon.assert.calledOnce(availabilityMonitor._bindHandlers);
      expect(availabilityMonitor._store.dispatch.args[0][0].type).to.equal(
        actionTypes.init,
      );
      expect(availabilityMonitor._store.dispatch.args[1][0].type).to.equal(
        actionTypes.initSuccess,
      );
    });
    it('should not run _bindHandlers when __shouldRebindHandlers()() === false', () => {
      sinon.spy(availabilityMonitor._store, 'dispatch');
      sinon.stub(availabilityMonitor, '_shouldInit').callsFake(() => false);
      sinon
        .stub(availabilityMonitor, '_shouldRebindHandlers')
        .callsFake(() => false);
      sinon.stub(availabilityMonitor, '_bindHandlers');
      availabilityMonitor._onStateChange();
      sinon.assert.notCalled(availabilityMonitor._bindHandlers);
      sinon.assert.notCalled(availabilityMonitor._store.dispatch);
    });
    it('should run _bindHandlers when _shouldRebindHandlers() === true', () => {
      const changeCounter = Math.floor(Math.random() * 10);
      const lastEnvironmentCounter = changeCounter - 1;
      availabilityMonitor._lastEnvironmentCounter = lastEnvironmentCounter;
      sinon.stub(availabilityMonitor, '_shouldInit').callsFake(() => false);
      sinon
        .stub(availabilityMonitor, '_shouldRebindHandlers')
        .callsFake(() => true);
      sinon.stub(availabilityMonitor, '_bindHandlers');
      availabilityMonitor._onStateChange();
      sinon.assert.calledOnce(availabilityMonitor._bindHandlers);
      expect(availabilityMonitor._lastEnvironmentCounter).to.equal(
        availabilityMonitor._environment.changeCounter,
      );
    });
    it('should not run _bindHandlers when _shouldRebindHandlers() === false', () => {
      sinon.stub(availabilityMonitor, '_shouldInit').callsFake(() => false);
      sinon
        .stub(availabilityMonitor, '_shouldRebindHandlers')
        .callsFake(() => false);
      sinon.stub(availabilityMonitor, '_bindHandlers');
      availabilityMonitor._onStateChange();
      sinon.assert.notCalled(availabilityMonitor._bindHandlers);
    });
  });

  describe('_beforeRequestHandler', () => {
    beforeEach(() => {
      sinon.stub(availabilityMonitor, 'ready').callsFake(() => true);
    });
    it('should not run extractUrl when not in limited availability mode', () => {
      const extractUrl = sinon.spy();
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(false);
      availabilityMonitor._beforeRequestHandler();
      sinon.assert.notCalled(extractUrl);
    });
    it('should not run extractUrl when input params is undefined', () => {
      const extractUrl = sinon.spy();
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(true);

      availabilityMonitor._beforeRequestHandler();
      sinon.assert.notCalled(extractUrl);
    });
    it('should not run extractUrl when in params._request is undefined', () => {
      const extractUrl = sinon.spy();
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(true);
      availabilityMonitor._beforeRequestHandler({ _request: undefined });
      sinon.assert.notCalled(extractUrl);
    });
    it('should not run extractUrl when in params._request.url is undefined', () => {
      const extractUrl = sinon.spy();
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(true);
      availabilityMonitor._beforeRequestHandler({
        _request: { url: undefined },
      });
      sinon.assert.notCalled(extractUrl);
    });
    it('should not call extractUrl when in params._request.url is not string', () => {
      const extractUrl = sinon.spy();
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(true);

      availabilityMonitor._beforeRequestHandler({ _request: { url: 123 } });
      sinon.assert.notCalled(extractUrl);
    });
    it('should call extractUrl and not throw error when in params._request.url is status api', () => {
      const url = STATUS_END_POINT;
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(true);
      availabilityMonitor._beforeRequestHandler({ _request: { url } });
    });
    it('should not throw error warning when in params._request.url is ha enabled api', () => {
      const url = 'any request';
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(true);
      availabilityMonitor._beforeRequestHandler({ _request: { url } });
    });
    it('should not throw error warning when in params._request.url is neither status check api or ha enabled api', () => {
      const url = 'any request';
      const method = 'GET';
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(true);
      expect(() => {
        availabilityMonitor._beforeRequestHandler({
          _request: { url, method },
        });
      }).to.not.throw();
    });
  });

  describe('_requestErrorHandler', () => {
    beforeEach(() => {
      availabilityMonitor._environment = {
        get ready() {
          return true;
        },
        get changeCounter() {
          return 1;
        },
      };
      availabilityMonitor._enabled = true;
    });
    it('should not switch to limited availability mode when error is undefined', () => {
      sinon.stub(availabilityMonitor, '_switchToLimitedMode');
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(false);
      availabilityMonitor._requestErrorHandler();
      sinon.assert.notCalled(
        availabilityMonitor._switchToLimitedMode,
      );
    });
    it('should not switch to limited availability mode when error.apiResponse is undefined', () => {
      sinon.stub(availabilityMonitor, '_switchToLimitedMode');
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(false);
      availabilityMonitor._requestErrorHandler({ apiResponse: undefined });
      sinon.assert.notCalled(
        availabilityMonitor._switchToLimitedMode,
      );
    });
    it('should not switch to limited availability mode when error.apiResponse._response is undefined', () => {
      sinon.stub(availabilityMonitor, '_switchToLimitedMode');
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(false);
      availabilityMonitor._requestErrorHandler({
        apiResponse: { _response: undefined, _json: {} },
      });
      sinon.assert.notCalled(
        availabilityMonitor._switchToLimitedMode,
      );
    });
    it('should not switch to limited availability mode when error.apiResponse._json is undefined', () => {
      sinon.stub(availabilityMonitor, '_switchToLimitedMode');
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(false);
      availabilityMonitor._requestErrorHandler({
        apiResponse: { _response: {}, _json: undefined },
      });
      sinon.assert.notCalled(
        availabilityMonitor._switchToLimitedMode,
      );
    });
    it('should not switch to limited availability mode when status is not 503', () => {
      sinon.stub(availabilityMonitor, '_switchToLimitedMode');
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(false);
      availabilityMonitor._requestErrorHandler({
        apiResponse: {
          _json: {
            status: 500,
            errorCode: 'CMN-211',
          }
        },
      });
      sinon.assert.notCalled(
        availabilityMonitor._switchToLimitedMode,
      );
    });
    it('should not switch to limited availability mode when error code is not CMN-211', () => {
      sinon.stub(availabilityMonitor, '_switchToLimitedMode');
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(false);
      availabilityMonitor._requestErrorHandler({
        apiResponse: {
          _json: {
            status: 503,
            errorCode: 'CMN-210',
          }
        },
      });
      sinon.assert.notCalled(
        availabilityMonitor._switchToLimitedMode,
      );
    });
    it('should switch to limited availability mode when status is 503 and error code is CMN-211', () => {
      sinon.stub(availabilityMonitor, '_switchToLimitedMode');
      sinon.stub(availabilityMonitor, 'isLimitedAvailabilityMode').value(false);
      availabilityMonitor._requestErrorHandler({
        apiResponse: {
          _json: {
            errors: [{ errorCode: 'CMN-211', message: 'Service is overloaded...' }],
          },
          _response: {
            status: 503,
          }
        }
      });
      sinon.assert.calledOnce(
        availabilityMonitor._switchToLimitedMode,
      );
    });
  });
});

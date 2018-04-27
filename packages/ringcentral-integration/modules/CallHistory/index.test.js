import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import CallHistory from './index';
import getCallHistoryReducer from './getCallHistoryReducer';
import actionTypes from './actionTypes';

describe('CallHistory Unit Test', () => {
  let callHistory;
  let store;
  beforeEach(() => {
    callHistory = sinon.createStubInstance(CallHistory);
    store = createStore(getCallHistoryReducer(actionTypes));
    callHistory._store = store;
    callHistory._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      '_shouldTriggerContactMatch',
      '_shouldTriggerActivityMatch',
      '_getEndedCalls',
      '_shouldRemoveEndedCalls',
      '_processCallHistory',
      '_initModuleStatus',
      '_resetModuleStatus',
      '_addEndedCalls',
      '_removeEndedCalls',
    ].forEach((key) => {
      callHistory[key].restore();
    });
  });
  describe('_onStateChange', () => {
    it('_initModuleStatus should be called once when _shouldInit is true', () => {
      sinon.stub(callHistory, '_shouldInit').callsFake(() => true);
      sinon.stub(callHistory, '_shouldReset').callsFake(() => false);
      sinon.stub(callHistory, 'ready', { get: () => false });
      sinon.stub(callHistory, '_initModuleStatus');
      sinon.stub(callHistory, '_resetModuleStatus');
      sinon.stub(callHistory, '_processCallHistory');
      callHistory._onStateChange();
      sinon.assert.calledOnce(callHistory._initModuleStatus);
      sinon.assert.notCalled(callHistory._resetModuleStatus);
      sinon.assert.notCalled(callHistory._processCallHistory);
    });
    it('_resetModuleStatus should be called once when _shouldReset is true', () => {
      sinon.stub(callHistory, '_shouldInit').callsFake(() => false);
      sinon.stub(callHistory, '_shouldReset').callsFake(() => true);
      sinon.stub(callHistory, 'ready', { get: () => false });
      sinon.stub(callHistory, '_initModuleStatus');
      sinon.stub(callHistory, '_resetModuleStatus');
      sinon.stub(callHistory, '_processCallHistory');
      callHistory._onStateChange();
      sinon.assert.notCalled(callHistory._initModuleStatus);
      sinon.assert.calledOnce(callHistory._resetModuleStatus);
      sinon.assert.notCalled(callHistory._processCallHistory);
    });
    it('_processCallHistory should be called once when ready is true', () => {
      sinon.stub(callHistory, '_shouldInit').callsFake(() => false);
      sinon.stub(callHistory, '_shouldReset').callsFake(() => false);
      sinon.stub(callHistory, 'ready', { get: () => true });
      sinon.stub(callHistory, '_initModuleStatus');
      sinon.stub(callHistory, '_resetModuleStatus');
      sinon.stub(callHistory, '_processCallHistory');
      callHistory._onStateChange();
      sinon.assert.notCalled(callHistory._initModuleStatus);
      sinon.assert.notCalled(callHistory._resetModuleStatus);
      sinon.assert.calledOnce(callHistory._processCallHistory);
    });
    it('_initModuleStatus, _resetModuleStatus and _processCallHistory should Not be called', () => {
      sinon.stub(callHistory, '_shouldInit').callsFake(() => false);
      sinon.stub(callHistory, '_shouldReset').callsFake(() => false);
      sinon.stub(callHistory, 'ready', { get: () => false });
      sinon.stub(callHistory, '_initModuleStatus');
      sinon.stub(callHistory, '_resetModuleStatus');
      sinon.stub(callHistory, '_processCallHistory');
      callHistory._onStateChange();
      sinon.assert.notCalled(callHistory._initModuleStatus);
      sinon.assert.notCalled(callHistory._resetModuleStatus);
      sinon.assert.notCalled(callHistory._processCallHistory);
    });
  });
  describe('_shouldInit', () => {
    const options = [true, false];
    const optionsWithUndefined = [true, false, undefined];
    options.forEach((isModulePending) => {
      options.forEach((isCallLogReady) => {
        options.forEach((isAccountInfoReady) => {
          optionsWithUndefined.forEach((isCallMonitorReady) => {
            optionsWithUndefined.forEach((isContactMatcherReady) => {
              optionsWithUndefined.forEach((isActivityMatcherReady) => {
                const result = (
                  isModulePending &&
                  isCallLogReady &&
                  isAccountInfoReady &&
                  (isCallMonitorReady !== undefined ? isCallMonitorReady : true) &&
                  (isContactMatcherReady !== undefined ? isContactMatcherReady : true) &&
                  (isActivityMatcherReady !== undefined ? isActivityMatcherReady : true)
                );
                it(`should return ${result} when isModulePending === ${isModulePending}
                  isCallLogReady === ${isCallLogReady},
                  isAccountInfoReady === ${isAccountInfoReady},
                  isCallMonitorReady === ${isCallMonitorReady},
                  isContactMatcherReady === ${isContactMatcherReady},
                  isActivityMatcherReady === ${isActivityMatcherReady}
                  `, () => {
                  callHistory._callLog = {
                    ready: isCallLogReady
                  };
                  callHistory._accountInfo = {
                    ready: isAccountInfoReady
                  };
                  sinon.stub(callHistory, 'pending', {
                    get: () => isModulePending,
                  });
                  if (isCallMonitorReady !== undefined) {
                    callHistory._callMonitor = {
                      ready: isCallMonitorReady
                    };
                  }
                  if (isContactMatcherReady !== undefined) {
                    callHistory._contactMatcher = {
                      ready: isContactMatcherReady
                    };
                  }
                  if (isActivityMatcherReady !== undefined) {
                    callHistory._activityMatcher = {
                      ready: isActivityMatcherReady
                    };
                  }
                  expect(callHistory._shouldInit()).to.equals(result);
                });
              });
            });
          });
        });
      });
    });
  });
  describe('_shouldReset', () => {
    const options = [true, false];
    const optionsWithUndefined = [true, false, undefined];
    options.forEach((isModuleReady) => {
      options.forEach((isCallLogReady) => {
        options.forEach((isAccountInfoReady) => {
          optionsWithUndefined.forEach((isCallMonitorReady) => {
            optionsWithUndefined.forEach((isContactMatcherReady) => {
              optionsWithUndefined.forEach((isActivityMatcherReady) => {
                const result = (
                  (
                  !isCallLogReady ||
                  !isAccountInfoReady ||
                  (isCallMonitorReady === undefined ? undefined : !isCallMonitorReady) ||
                  (isContactMatcherReady === undefined ? undefined : !isContactMatcherReady) ||
                  (isActivityMatcherReady === undefined ? undefined : !isActivityMatcherReady)
                  ) && isModuleReady
                );
                it(`should return ${result} when isModuleReady === ${isModuleReady}
                  isCallLogReady === ${isCallLogReady},
                  isAccountInfoReady === ${isAccountInfoReady},
                  isCallMonitorReady === ${isCallMonitorReady},
                  isContactMatcherReady === ${isContactMatcherReady},
                  isActivityMatcherReady === ${isActivityMatcherReady}
                  `, () => {
                  callHistory._callLog = {
                    ready: isCallLogReady
                  };
                  callHistory._accountInfo = {
                    ready: isAccountInfoReady
                  };
                  sinon.stub(callHistory, 'ready', {
                    get: () => isModuleReady,
                  });
                  if (isCallMonitorReady !== undefined) {
                    callHistory._callMonitor = {
                      ready: isCallMonitorReady
                    };
                  }
                  if (isContactMatcherReady !== undefined) {
                    callHistory._contactMatcher = {
                      ready: isContactMatcherReady
                    };
                  }
                  if (isActivityMatcherReady !== undefined) {
                    callHistory._activityMatcher = {
                      ready: isActivityMatcherReady
                    };
                  }
                  expect(callHistory._shouldReset()).to.equals(result);
                });
              });
            });
          });
        });
      });
    });
  });
  describe('_shouldTriggerContactMatch', () => {
    it(`Should return true
      when _lastProcessedNumbers not equals to uniqueNumbers
      and contactMatcher is ready`, () => {
      callHistory._lastProcessedNumbers = 'foo';
      callHistory._contactMatcher = {
        ready: true
      };
      expect(callHistory._shouldTriggerContactMatch('bar')).to.equal(true);
    });
    it(`Should return false
      when _lastProcessedNumbers not equals to uniqueNumbers
      and contactMatcher is undefined`, () => {
      callHistory._lastProcessedNumbers = 'foo';
      callHistory._contactMatcher = undefined;
      expect(callHistory._shouldTriggerContactMatch('bar')).to.equal(false);
    });
    it(`Should return false
      when _lastProcessedNumbers not equals to uniqueNumbers
      and contactMatcher is ready`, () => {
      callHistory._lastProcessedNumbers = 'foo';
      callHistory._contactMatcher = {
        ready: false
      };
      expect(callHistory._shouldTriggerContactMatch('bar')).to.equal(false);
    });
    it(`Should return false
      when _lastProcessedNumbers equals to uniqueNumbers
      and contactMatcher is ready`, () => {
      callHistory._lastProcessedNumbers = 'foo';
      callHistory._contactMatcher = {
        ready: true
      };
      expect(callHistory._shouldTriggerContactMatch('foo')).to.equal(false);
    });
    it(`Should return false
      when _lastProcessedNumbers equals to uniqueNumbers
      and contactMatcher is undefined`, () => {
      callHistory._lastProcessedNumbers = 'foo';
      callHistory._contactMatcher = undefined;
      expect(callHistory._shouldTriggerContactMatch('foo')).to.equal(false);
    });
    it(`Should return false
      when _lastProcessedNumbers equals to uniqueNumbers
      and contactMatcher is ready`, () => {
      callHistory._lastProcessedNumbers = 'foo';
      callHistory._contactMatcher = {
        ready: false
      };
      expect(callHistory._shouldTriggerContactMatch('foo')).to.equal(false);
    });
  });
  describe('_shouldTriggerActivityMatch', () => {
    beforeEach(() => {
      callHistory._lastProcessedIds = 'foo';
    });
    it(`Should return true
      when _lastProcessedIds not equals to sessionIds
      and activityMatcher is ready`, () => {
      callHistory._activityMatcher = {
        ready: true
      };
      expect(callHistory._shouldTriggerActivityMatch('bar')).to.equal(true);
    });
    it(`Should return false
      when _lastProcessedIds not equals to sessionIds
      and activityMatcher is undefined`, () => {
      callHistory._activityMatcher = undefined;
      expect(callHistory._shouldTriggerActivityMatch('bar')).to.equal(false);
    });
    it(`Should return false
      when _lastProcessedIds not equals to sessionIds
      and activityMatcher is ready`, () => {
      callHistory._activityMatcher = {
        ready: false
      };
      expect(callHistory._shouldTriggerActivityMatch('bar')).to.equal(false);
    });
    it(`Should return false
      when _lastProcessedIds not equals to sessionIds
      and activityMatcher is ready`, () => {
      callHistory._activityMatcher = {
        ready: true
      };
      expect(callHistory._shouldTriggerActivityMatch('foo')).to.equal(false);
    });
    it(`Should return false
      when _lastProcessedIds not equals to sessionIds
      and activityMatcher is undefined`, () => {
      callHistory._activityMatcher = undefined;
      expect(callHistory._shouldTriggerActivityMatch('foo')).to.equal(false);
    });
    it(`Should return false
      when _lastProcessedIds not equals to sessionIds
      and activityMatcher is ready`, () => {
      callHistory._activityMatcher = {
        ready: false
      };
      expect(callHistory._shouldTriggerActivityMatch('foo')).to.equal(false);
    });
  });
  describe('_getEndedCalls', () => {
    let monitorCalls;
    beforeEach(() => {
      monitorCalls = {
        calls: [{
          sessionId: 'foo'
        }]
      };
    });
    it(`Should return endedCalls when _lastProcessedMonitorCalls is not equal to monitorCalls
        `, () => {
      callHistory._callMonitor = monitorCalls;
      callHistory._callLog = {
        calls: [],
      };
      callHistory._lastProcessedMonitorCalls = [{
        sessionId: 'bar'
      }, {
        sessionId: 'foo'
      }];
      expect(callHistory._getEndedCalls()).to.deep.equal([{ sessionId: 'bar' }]);
    });
    it('Should return [] when sessionId already exist', () => {
      callHistory._callMonitor = {
        calls: [{
          sessionId: 'bar'
        }, {
          sessionId: 'foo'
        }]
      };
      callHistory._callLog = {
        calls: [],
      };
      callHistory._lastProcessedMonitorCalls = [{
        sessionId: 'bar'
      }];
      expect(callHistory._getEndedCalls()).to.deep.equal([]);
    });
    it('Should return null when _lastProcessedMonitorCalls is equal to monitorCalls', () => {
      callHistory._callMonitor = monitorCalls;
      callHistory._callLog = {
        calls: [],
      };
      callHistory._lastProcessedMonitorCalls = monitorCalls.calls;
      expect(callHistory._getEndedCalls()).to.be.a('null');
    });
    it('Should return null when _callMonitor is undefined', () => {
      callHistory._callMonitor = undefined;
      callHistory._callLog = {
        calls: [],
      };
      callHistory._lastProcessedMonitorCalls = [{
        sessionId: 'foo'
      }];
      expect(callHistory._getEndedCalls()).to.be.a('null');
    });
  });
  describe('_shouldRemoveEndedCalls', () => {
    let currentCalls;
    beforeEach(() => {
      currentCalls = {
        calls: [{
          sessionId: 'foo'
        }]
      };
    });
    it(`Should return endedCalls which should be removed when _lastProcessedCalls is not equal to currentCalls
        `, () => {
      callHistory._callLog = currentCalls;
      callHistory._lastProcessedCalls = [{
        sessionId: 'bar'
      }, {
        sessionId: 'foo'
      }];
      const recentlyEndedCalls = currentCalls.calls;
      sinon.stub(callHistory, 'recentlyEndedCalls', { get: () => recentlyEndedCalls });

      expect(callHistory._shouldRemoveEndedCalls()).to.deep.equal([{ sessionId: 'foo' }]);
    });
    it('Should return [] when _lastProcessedCalls is not equal to currentCalls and sessionId is not existed', () => {
      callHistory._callLog = currentCalls;
      callHistory._lastProcessedCalls = [{
        sessionId: 'bar'
      }];
      const recentlyEndedCalls = [{
        sessionId: 'koo'
      }];
      sinon.stub(callHistory, 'recentlyEndedCalls', { get: () => recentlyEndedCalls });

      expect(callHistory._shouldRemoveEndedCalls()).to.deep.equal([]);
    });
    it('Should return null when _lastProcessedCalls is equal to currentCalls', () => {
      callHistory._callLog = currentCalls;
      callHistory._lastProcessedCalls = currentCalls.calls;
      const recentlyEndedCalls = [{
        sessionId: 'koo'
      }];
      sinon.stub(callHistory, 'recentlyEndedCalls', { get: () => recentlyEndedCalls });

      expect(callHistory._shouldRemoveEndedCalls()).to.be.a('null');
    });
  });
  describe('_processCallHistory', () => {
    beforeEach(() => {
      sinon.stub(callHistory, 'uniqueNumbers', { get: () => 'foo' });
      sinon.stub(callHistory, 'sessionIds', { get: () => 'foo' });
    });
    it('_contactMatcher.triggerMatch should be called once when _shouldTriggerContactMatch is true', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => true);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => null);

      callHistory._contactMatcher = {
        triggerMatch: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callHistory, '_contactMatcher');
      callHistory._processCallHistory();

      sinon.assert.calledOnce(callHistory._contactMatcher.triggerMatch);
    });
    it('_contactMatcher.triggerMatch should not be called when _shouldTriggerContactMatch is false', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => null);

      callHistory._contactMatcher = {
        triggerMatch: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callHistory, '_contactMatcher');
      callHistory._processCallHistory();

      sinon.assert.notCalled(callHistory._contactMatcher.triggerMatch);
    });
    it('_activityMatcher.triggerMatch should be called once when _shouldTriggerActivityMatch is true', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => true);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => null);

      callHistory._activityMatcher = {
        triggerMatch: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callHistory, '_activityMatcher');
      callHistory._processCallHistory();

      sinon.assert.calledOnce(callHistory._activityMatcher.triggerMatch);
    });
    it('_activityMatcher.triggerMatch should not be called when _shouldTriggerActivityMatch is false', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => null);

      callHistory._activityMatcher = {
        triggerMatch: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callHistory, '_activityMatcher');
      callHistory._processCallHistory();

      sinon.assert.notCalled(callHistory._activityMatcher.triggerMatch);
    });
    it('_addEndedCalls should be called when _getEndedCalls is return an array contains values', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => [{ sessionId: 'foo' }]);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_addEndedCalls');
      callHistory._processCallHistory();

      sinon.assert.calledOnce(callHistory._addEndedCalls);
    });
    it('_addEndedCalls should not be called when _getEndedCalls is return an empty array', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => []);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_addEndedCalls');
      callHistory._processCallHistory();

      sinon.assert.notCalled(callHistory._addEndedCalls);
    });
    it('_addEndedCalls should not be called when _getEndedCalls is return null', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_addEndedCalls');
      callHistory._processCallHistory();

      sinon.assert.notCalled(callHistory._addEndedCalls);
    });
    it('_removeEndedCalls should be called when _shouldRemoveEndedCalls is return an array contains values', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => [{ sessionId: 'foo' }]);
      sinon.stub(callHistory, '_removeEndedCalls');
      callHistory._processCallHistory();

      sinon.assert.calledOnce(callHistory._removeEndedCalls);
    });
    it('_removeEndedCalls should not be called when _shouldRemoveEndedCalls is return an empty array', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => []);
      sinon.stub(callHistory, '_removeEndedCalls');
      callHistory._processCallHistory();

      sinon.assert.notCalled(callHistory._removeEndedCalls);
    });
    it('_removeEndedCalls should not be called when _shouldRemoveEndedCalls is return null', () => {
      sinon.stub(callHistory, '_shouldTriggerContactMatch').callsFake(() => false);
      sinon.stub(callHistory, '_shouldTriggerActivityMatch').callsFake(() => false);
      sinon.stub(callHistory, '_getEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_shouldRemoveEndedCalls').callsFake(() => null);
      sinon.stub(callHistory, '_removeEndedCalls');
      callHistory._processCallHistory();

      sinon.assert.notCalled(callHistory._removeEndedCalls);
    });
  });
});


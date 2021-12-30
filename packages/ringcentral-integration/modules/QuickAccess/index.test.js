import { createStore } from 'redux';
import sinon from 'sinon';

import actionTypes from './actionTypes';
import getQuickAccessReducer from './getQuickAccessReducer';
import QuickAccess from './index';

describe('QuickAccess Unit Test', () => {
  let quickAccess;
  let store;
  beforeEach(() => {
    quickAccess = sinon.createStubInstance(QuickAccess);
    store = createStore(getQuickAccessReducer(actionTypes));
    quickAccess._store = store;
    quickAccess._prefixedActionTypes = actionTypes;
    ['_onStateChange', 'exit'].forEach((key) => {
      quickAccess[key].restore();
    });
  });
  describe('_onStateChange', () => {
    it('exit should be called once when this._webphone.ready && this._webphone.ringSession && this._webphone.ringSession !== this._lastRingSession', async () => {
      sinon.stub(quickAccess, 'exit');
      sinon.stub(quickAccess, 'status', {
        get: () => 'module-ready',
      });
      quickAccess._auth = {
        ready: true,
      };
      quickAccess._webphone = {
        ready: true,
        ringSession: {},
      };
      quickAccess._lastRingSession = null;
      await quickAccess._onStateChange();
      sinon.assert.calledOnce(quickAccess.exit);
    });
  });
});

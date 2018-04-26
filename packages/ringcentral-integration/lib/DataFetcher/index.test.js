import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import DataFetcher from './index';
import getDataFetcherReducer from './getDataFetcherReducer';
import actionTypes from './baseActionTypes';

describe('DataFetcher Unit Test', () => {
  let dataFetcher;
  let store;

  beforeEach(() => {
    dataFetcher = sinon.createStubInstance(DataFetcher);
    store = createStore(getDataFetcherReducer(actionTypes));
    dataFetcher._store = store;
    dataFetcher._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldFetch',
      '_isDataReady',
      '_shouldReset',
      '_shouldSubscribe',
      '_init',
      '_clearTimeout',
      '_processSubscription',
      'fetchData',
      '_fetchData',
      '_startPolling',
      '_retry',
    ].forEach((key) => {
      dataFetcher[key].restore();
    });
  });

  describe('_onStateChange', () => {
    it('_init should be called once when _shouldInit is true', () => {
      sinon.stub(dataFetcher, '_shouldInit').callsFake(() => true);
      sinon.stub(dataFetcher, '_shouldReset').callsFake(() => false);
      sinon.stub(dataFetcher, '_shouldSubscribe').callsFake(() => false);
      sinon.stub(dataFetcher, '_init');
      sinon.stub(dataFetcher, '_clearTimeout');
      sinon.stub(dataFetcher, '_processSubscription');
      dataFetcher._onStateChange();
      sinon.assert.calledOnce(dataFetcher._init);
      sinon.assert.notCalled(dataFetcher._clearTimeout);
      sinon.assert.notCalled(dataFetcher._processSubscription);
    });
    it('_clearTimeout should be called once when _shouldReset is true', () => {
      sinon.stub(dataFetcher, '_shouldInit').callsFake(() => false);
      sinon.stub(dataFetcher, '_shouldReset').callsFake(() => true);
      sinon.stub(dataFetcher, '_shouldSubscribe').callsFake(() => false);
      sinon.stub(dataFetcher, '_isDataReady').callsFake(() => false);
      sinon.stub(dataFetcher, '_init');
      sinon.stub(dataFetcher, '_clearTimeout');
      sinon.stub(dataFetcher, '_processSubscription');
      dataFetcher._onStateChange();
      sinon.assert.notCalled(dataFetcher._init);
      sinon.assert.calledOnce(dataFetcher._clearTimeout);
      sinon.assert.notCalled(dataFetcher._processSubscription);
    });
    it('_processSubscription should be called once when _shouldSubscribe is true', () => {
      sinon.stub(dataFetcher, '_shouldInit').callsFake(() => false);
      sinon.stub(dataFetcher, '_shouldReset').callsFake(() => false);
      sinon.stub(dataFetcher, '_shouldSubscribe').callsFake(() => true);
      sinon.stub(dataFetcher, '_isDataReady').callsFake(() => false);
      sinon.stub(dataFetcher, '_init');
      sinon.stub(dataFetcher, '_clearTimeout');
      sinon.stub(dataFetcher, '_processSubscription');
      dataFetcher._onStateChange();
      sinon.assert.notCalled(dataFetcher._init);
      sinon.assert.notCalled(dataFetcher._clearTimeout);
      sinon.assert.calledOnce(dataFetcher._processSubscription);
    });
    it('_init and _clearTimeout and _processSubscription should not be called', () => {
      sinon.stub(dataFetcher, '_shouldInit').callsFake(() => false);
      sinon.stub(dataFetcher, '_shouldReset').callsFake(() => false);
      sinon.stub(dataFetcher, '_shouldSubscribe').callsFake(() => false);
      sinon.stub(dataFetcher, '_init');
      sinon.stub(dataFetcher, '_clearTimeout');
      sinon.stub(dataFetcher, '_processSubscription');
      dataFetcher._onStateChange();
      sinon.assert.notCalled(dataFetcher._init);
      sinon.assert.notCalled(dataFetcher._clearTimeout);
      sinon.assert.notCalled(dataFetcher._processSubscription);
    });
  });

  describe('_init', async () => {
    it('fetchData should be called once', async () => {
      sinon.stub(dataFetcher, '_shouldFetch').callsFake(() => true);
      dataFetcher._polling = false;
      sinon.stub(dataFetcher, 'fetchData');
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      dataFetcher._subscriptionFilters = false;
      dataFetcher._subscription = {
        subscribe: sinon.stub().callsFake(() => {})
      };
      sinon.stub(dataFetcher, '_subscription');
      await dataFetcher._init();
      sinon.assert.calledOnce(dataFetcher.fetchData);
      sinon.assert.notCalled(dataFetcher._startPolling);
      sinon.assert.notCalled(dataFetcher._retry);
      sinon.assert.notCalled(dataFetcher._subscription.subscribe);
    });
    it('fetchData and _subscription.subscribe should be called once', async () => {
      sinon.stub(dataFetcher, '_shouldFetch').callsFake(() => true);
      dataFetcher._polling = false;
      sinon.stub(dataFetcher, 'fetchData');
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      dataFetcher._subscription = {
        subscribe: sinon.stub().callsFake(() => {})
      };
      dataFetcher._subscriptionFilters = true;
      sinon.stub(dataFetcher, '_subscription');
      await dataFetcher._init();
      sinon.assert.calledOnce(dataFetcher.fetchData);
      sinon.assert.notCalled(dataFetcher._startPolling);
      sinon.assert.notCalled(dataFetcher._retry);
      sinon.assert.calledOnce(dataFetcher._subscription.subscribe);
    });
    it('_startPolling should be called once', async () => {
      sinon.stub(dataFetcher, '_shouldFetch').callsFake(() => false);
      dataFetcher._polling = true;
      sinon.stub(dataFetcher, 'fetchData');
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      dataFetcher._subscription = {
        subscribe: sinon.stub().callsFake(() => {})
      };
      dataFetcher._subscriptionFilters = false;
      sinon.stub(dataFetcher, '_subscription');
      await dataFetcher._init();
      sinon.assert.notCalled(dataFetcher.fetchData);
      sinon.assert.calledOnce(dataFetcher._startPolling);
      sinon.assert.notCalled(dataFetcher._retry);
      sinon.assert.notCalled(dataFetcher._subscription.subscribe);
    });
    it('_startPolling and _subscription.subscribe should be called once', async () => {
      sinon.stub(dataFetcher, '_shouldFetch').callsFake(() => false);
      dataFetcher._polling = true;
      sinon.stub(dataFetcher, 'fetchData');
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      dataFetcher._subscription = {
        subscribe: sinon.stub().callsFake(() => {})
      };
      dataFetcher._subscriptionFilters = true;
      sinon.stub(dataFetcher, '_subscription');
      await dataFetcher._init();
      sinon.assert.notCalled(dataFetcher.fetchData);
      sinon.assert.calledOnce(dataFetcher._startPolling);
      sinon.assert.notCalled(dataFetcher._retry);
      sinon.assert.calledOnce(dataFetcher._subscription.subscribe);
    });
    it('_retry should be called once', async () => {
      sinon.stub(dataFetcher, '_shouldFetch').callsFake(() => false);
      dataFetcher._polling = false;
      sinon.stub(dataFetcher, 'fetchData');
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      dataFetcher._subscription = {
        subscribe: sinon.stub().callsFake(() => {})
      };
      dataFetcher._subscriptionFilters = false;
      sinon.stub(dataFetcher, '_subscription');
      await dataFetcher._init();
      sinon.assert.notCalled(dataFetcher.fetchData);
      sinon.assert.notCalled(dataFetcher._startPolling);
      sinon.assert.calledOnce(dataFetcher._retry);
      sinon.assert.notCalled(dataFetcher._subscription.subscribe);
    });
    it('_retry and _subscription.subscribe should be called once', async () => {
      sinon.stub(dataFetcher, '_shouldFetch').callsFake(() => false);
      dataFetcher._polling = false;
      sinon.stub(dataFetcher, 'fetchData');
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      dataFetcher._subscription = {
        subscribe: sinon.stub().callsFake(() => {})
      };
      dataFetcher._subscriptionFilters = true;
      sinon.stub(dataFetcher, '_subscription');
      await dataFetcher._init();
      sinon.assert.notCalled(dataFetcher.fetchData);
      sinon.assert.notCalled(dataFetcher._startPolling);
      sinon.assert.calledOnce(dataFetcher._retry);
      sinon.assert.calledOnce(dataFetcher._subscription.subscribe);
    });
  });
  describe('_fetchData', async () => {
    it(`_startPolling should be called once when
    _auth.ownerId is equal to ownerId and
    _polling is true`, async () => {
      dataFetcher._auth = {
        ownerId: '123'
      };
      dataFetcher._polling = true;
      dataFetcher._fetchFunction = async () => {};
      sinon.stub(dataFetcher, '_fetchFunction');
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      await dataFetcher._fetchData();
      sinon.assert.calledOnce(dataFetcher._startPolling);
      sinon.assert.notCalled(dataFetcher._retry);
    });
    it(`_startPolling should not be called when
    _auth.ownerId is equal to ownerId and
    _polling is false`, async () => {
      dataFetcher._auth = {
        ownerId: '123'
      };
      dataFetcher._polling = false;
      dataFetcher._fetchFunction = async () => {};
      sinon.stub(dataFetcher, '_fetchFunction');
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      await dataFetcher._fetchData();
      sinon.assert.notCalled(dataFetcher._startPolling);
      sinon.assert.notCalled(dataFetcher._retry);
    });
    it(`_startPolling should be called once when
    throws error and
    _auth.ownerId is equal to ownerId and
    _polling is false`, async () => {
      dataFetcher._auth = {
        ownerId: '123'
      };
      sinon.stub(dataFetcher, '_fetchFunction').throws(new Error('error'));
      dataFetcher._polling = true;
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      try {
        await dataFetcher._fetchData();
      } catch (error) {
        sinon.assert.calledOnce(dataFetcher._startPolling);
        sinon.assert.notCalled(dataFetcher._retry);
      }
    });
    it(`_retry should be called once when
    throws error and
    _auth.ownerId is equal to ownerId and
    _polling is false`, async () => {
      dataFetcher._auth = {
        ownerId: '123'
      };
      sinon.stub(dataFetcher, '_fetchFunction').throws(new Error('error'));
      dataFetcher._polling = false;
      sinon.stub(dataFetcher, '_startPolling');
      sinon.stub(dataFetcher, '_retry');
      try {
        await dataFetcher._fetchData();
      } catch (error) {
        sinon.assert.notCalled(dataFetcher._startPolling);
        sinon.assert.calledOnce(dataFetcher._retry);
      }
    });
  });
  describe('fetchData', async () => {
    it('_fetchData should be called once', async () => {
      dataFetcher._promise = null;
      sinon.stub(dataFetcher, '_fetchData').callsFake(() => 'foo');
      const result = await dataFetcher.fetchData();
      expect(result).to.equal('foo');
      sinon.assert.calledOnce(dataFetcher._fetchData);
    });
    it('_fetchData should not be called', async () => {
      dataFetcher._promise = 'bar';
      dataFetcher._fetchData = () => {};
      sinon.stub(dataFetcher, '_fetchData');
      const result = await dataFetcher.fetchData();
      expect(result).to.equal('bar');
      sinon.assert.notCalled(dataFetcher._fetchData);
    });
  });
});


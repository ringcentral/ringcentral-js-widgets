import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import RecentCalls from './index';
import getRecentCallsReducer from './getRecentCallsReducer';
import actionTypes from './actionTypes';

describe('RecentCalls Unit Test', () => {
  let recentCalls;
  let store;

  beforeEach(() => {
    store = createStore(getRecentCallsReducer(actionTypes));
    recentCalls = new RecentCalls({
      client: {},
      callHistory: {
        ready: true
      }
    });
    recentCalls._store = store;
  });

  describe('constructor', () => {
    it('should throw if options.client is undefined', () => {
      expect(() => {
        recentCalls = new RecentCalls({
          callHistory: {}
        });
      }).to.throw();
    });
    it('should throw if options.callHistory is undefined', () => {
      expect(() => {
        recentCalls = new RecentCalls({
          client: {}
        });
      }).to.throw();
    });
  });

  describe('_onStateChange', () => {
    it('should be able to init module', () => {
      recentCalls = new RecentCalls({
        client: {},
        callHistory: {
          ready: true
        }
      });
      recentCalls._store = store;
      const spy = sinon.spy(store, 'dispatch');
      sinon.stub(recentCalls, 'pending', {
        get() { return true; }
      });
      recentCalls._onStateChange();
      expect(spy.calledWith({ type: actionTypes.initSuccess }));
    });

    it('should not be able to init module if module is not pending', () => {
      recentCalls = new RecentCalls({
        client: {},
        callHistory: {
          ready: true
        }
      });
      recentCalls._store = store;
      const spy = sinon.spy(store, 'dispatch');
      sinon.stub(recentCalls, 'pending', {
        get() { return false; }
      });
      recentCalls._onStateChange();
      expect(spy.notCalled).to.equal(true);
    });

    it('should be able to reset module if CallHistory is reset', () => {
      recentCalls = new RecentCalls({
        client: {},
        callHistory: {
          ready: false
        }
      });
      recentCalls._store = store;
      const spy = sinon.spy(store, 'dispatch');
      sinon.stub(recentCalls, 'ready', {
        get() { return true; }
      });
      recentCalls._onStateChange();
      expect(spy.calledWith({ type: actionTypes.resetSuccess }));
    });

    it('should not be able to reset module if module is not ready', () => {
      recentCalls = new RecentCalls({
        client: {},
        callHistory: {
          ready: false
        }
      });
      recentCalls._store = store;
      const spy = sinon.stub(store, 'dispatch');
      sinon.stub(recentCalls, 'ready', {
        get() { return false; }
      });
      recentCalls._onStateChange();
      expect(spy.notCalled).to.equal(true);
    });
  });

  describe('_getRecentCalls', () => {
    it('should not fetch from server if local recent calls is enough', async () => {
      sinon.spy(recentCalls, '_fetchRemoteRecentCalls');
      sinon.stub(recentCalls, '_getLocalRecentCalls').callsFake(() => [1, 2, 3, 4, 5]);
      await recentCalls._getRecentCalls({});
      expect(recentCalls._fetchRemoteRecentCalls.called).to.not.equal(true);
    });

    it('should fetch from server if local recent calls is not enough', async () => {
      sinon.stub(recentCalls, '_fetchRemoteRecentCalls').callsFake(() => []);
      sinon.stub(recentCalls, '_getLocalRecentCalls').returns([1, 2, 3]);
      await recentCalls._getRecentCalls({});
      expect(recentCalls._fetchRemoteRecentCalls.called).to.equal(true);
    });

    it('should always have 5 calls if there are more than 5', async () => {
      const fakeCalls = Array.from({ length: 6 }).map((_, i) => ({ id: i }));
      sinon.stub(recentCalls, '_getLocalRecentCalls').returns(fakeCalls);
      const calls = await recentCalls._getRecentCalls({});
      expect(calls).to.have.length(5);
    });

    it('should not contain duplicated calls', async () => {
      const fakeCalls = Array.from({ length: 6 }).fill({ id: 0 });
      sinon.stub(recentCalls, '_getLocalRecentCalls').returns(fakeCalls);
      const calls = await recentCalls._getRecentCalls({});
      expect(calls).to.have.length(1);
    });
  });

  describe('_getLocalRecentCalls', () => {
    it('should only get calls within certain days', async () => {
      sinon.stub(recentCalls, '_filterPhoneNumber').callsFake(() => () => true);
      const calls = [{
        startTime: new Date('2017-07-26T06:52:43.515Z').getTime(),
        to: {},
        from: {}
      }, {
        startTime: new Date('2017-01-26T06:52:43.515Z').getTime(),
        to: {},
        from: {}
      }];
      const contact = {
        phoneNumbers: [171]
      };
      const dateFrom = new Date('2017-02-26T06:52:43.515Z');
      const retval = await recentCalls._getLocalRecentCalls(
        contact,
        calls,
        dateFrom
      );
      expect(retval).to.have.length(1);
    });
  });

  describe('_filterPhoneNumber', () => {
    it('should find all matched phoneNumbers in to and from fields', () => {
      // eslint-disable-next-line
      const calls = [{ from: { phoneNumber: '+123' }, to: { phoneNumber: '+1' }}, { from: { phoneNumber: '+456' }, to: { phoneNumber: '+1' }}, { from: { phoneNumber: '+1' }, to: { phoneNumber: '+789' } }];
      const phoneNumbers = [
        { phoneNumber: '+123' },
        { phoneNumber: '+456' },
        { phoneNumber: '+789' },
        { phoneNumber: '171' }
      ];
      let func;
      const matches = [];
      for (const call of calls) {
        func = recentCalls._filterPhoneNumber(call);
        const m = phoneNumbers.find(func);
        if (m) matches.push(call);
      }
      expect(matches).to.deep.equal(calls);
    });

    it('should find all matched extensionNumber in to and from fields', () => {
      // eslint-disable-next-line
      const calls = [{ from: { extensionNumber: '+123' }, to: { phoneNumber: '+1' }}, { from: { extensionNumber: '+456' }, to: { phoneNumber: '+1' }}, { from: { phoneNumber: '+1' }, to: { extensionNumber: '+789' } }];
      const phoneNumbers = [
        { phoneNumber: '+123' },
        { phoneNumber: '+456' },
        { phoneNumber: '+789' },
        { phoneNumber: '171' }
      ];
      let func;
      const matches = [];
      for (const call of calls) {
        func = recentCalls._filterPhoneNumber(call);
        const m = phoneNumbers.find(func);
        if (m) matches.push(call);
      }
      expect(matches).to.deep.equal(calls);
    });

    it('should find all matched phoneNumber and extensionNumber in to and from fields', () => {
      // eslint-disable-next-line
      const calls = [{ from: { phoneNumber: '+123' }, to: { phoneNumber: '+1' }}, { from: { phoneNumber: '+456' }, to: { phoneNumber: '+1' }}, { from: { phoneNumber: '+1' }, to: { phoneNumber: '+789' } }];
      const phoneNumbers = [
        { phoneNumber: '+123' },
        { phoneNumber: '+456' },
        { phoneNumber: '+789' },
        { phoneNumber: '171' }
      ];
      let func;
      const matches = [];
      for (const call of calls) {
        func = recentCalls._filterPhoneNumber(call);
        const m = phoneNumbers.find(func);
        if (m) matches.push(call);
      }
      expect(matches).to.deep.equal(calls);
    });
  });

  describe('_fetchRemoteRecentCalls', () => {
    it('should send certain number of requests to server', async () => {
      sinon.stub(recentCalls, '_fetchCallLogList').callsFake(p => () => Promise.resolve(p));
      sinon.stub(recentCalls, '_flattenToRecords').callsFake(p => p);
      const contact = {
        phoneNumbers: [{
          phoneNumber: '123'
        }, {
          phoneNumber: '+456'
        }]
      };
      await recentCalls._fetchRemoteRecentCalls(contact, null, 5);
      expect(recentCalls._fetchCallLogList.callCount).to.equal(2);
    });

    it('should send correct parameters', async () => {
      sinon.stub(recentCalls, '_fetchCallLogList').callsFake(p => () => Promise.resolve(p));
      sinon.stub(recentCalls, '_flattenToRecords').callsFake(p => p);
      const contact = {
        phoneNumbers: [{
          phoneNumber: '+123'
        }, {
          phoneNumber: '456'
        }]
      };
      const expected = [{
        dateFrom: 'dateFrom',
        perPage: 5,
        type: 'Voice',
        phoneNumber: '123'
      },
      {
        dateFrom: 'dateFrom',
        perPage: 5,
        type: 'Voice',
        phoneNumber: '456'
      }];
      const calls = await recentCalls._fetchRemoteRecentCalls(contact, 'dateFrom', 5);
      expect(calls).to.deep.equal(expected);
    });

    it('should remove plus sign in phoneNumbers', async () => {
      sinon.stub(recentCalls, '_fetchCallLogList').callsFake(p => () => Promise.resolve(p));
      sinon.stub(recentCalls, '_flattenToRecords').callsFake(p => p);
      const contact = {
        phoneNumbers: [{
          phoneNumber: '+123'
        }, {
          phoneNumber: '+456'
        }]
      };
      const calls = await recentCalls._fetchRemoteRecentCalls(contact, 'dateFrom', 5);
      expect(calls[0].phoneNumber).to.equal('123');
      expect(calls[1].phoneNumber).to.equal('456');
    });
  });

  describe('utility functions', () => {
    it('_flattenToRecords', () => {
      const calls = [
        { records: { id: 1 } },
        { records: { id: 1 } },
        { records: { id: 1 } },
      ];
      const expected = [
        { id: 1 },
        { id: 1 },
        { id: 1 }
      ];
      const ret = recentCalls._flattenToRecords(calls);
      expect(ret).to.deep.equal(expected);
    });

    it('_dedup', () => {
      const calls = [
        { id: 1 },
        { id: 1 },
        { id: 3 },
      ];
      const ret = recentCalls._dedup(calls);
      expect(ret).to.deep.equal([
        { id: 1 },
        { id: 3 }
      ]);
    });
  });
});

import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import RecentMessages from './index';
import getRecentMessagesReducer from './getRecentMessagesReducer';
import actionTypes from './actionTypes';

describe('RecentMessages Unit Test', () => {
  let recentMessages;
  let store;

  beforeEach(() => {
    store = createStore(getRecentMessagesReducer(actionTypes));
    recentMessages = new RecentMessages({
      client: {},
      messageStore: {
        ready: true
      }
    });
    recentMessages._store = store;
  });

  describe('constructor', () => {
    it('should throw if options.client is undefined', () => {
      expect(() => {
        recentMessages = new RecentMessages({
          messageStore: {}
        });
      }).to.throw();
    });
    it('should throw if options.messageStore is undefined', () => {
      expect(() => {
        recentMessages = new RecentMessages({
          client: {}
        });
      }).to.throw();
    });
  });

  describe('_onStateChange', () => {
    it('should be able to init module', () => {
      recentMessages = new RecentMessages({
        client: {},
        messageStore: {
          ready: true
        }
      });
      recentMessages._store = store;
      const spy = sinon.stub(store, 'dispatch');
      sinon.stub(recentMessages, 'pending', {
        get() { return true; }
      });
      recentMessages._onStateChange();
      expect(spy.calledWith({ type: actionTypes.initSuccess }));
    });

    it('should not be able to init module if module is not pending', () => {
      recentMessages = new RecentMessages({
        client: {},
        messageStore: {
          ready: true
        }
      });
      recentMessages._store = store;
      const spy = sinon.spy(store, 'dispatch');
      sinon.stub(recentMessages, 'pending', {
        get() { return false; }
      });
      recentMessages._onStateChange();
      expect(spy.notCalled).to.equal(true);
    });

    it('should be able to reset if messageStore is reset', () => {
      recentMessages = new RecentMessages({
        client: {},
        messageStore: {
          ready: false
        }
      });
      recentMessages._store = store;
      const spy = sinon.spy(store, 'dispatch');
      sinon.stub(recentMessages, 'ready', {
        get() { return true; }
      });
      recentMessages._onStateChange();
      expect(spy.calledWith({ type: actionTypes.resetSuccess }));
    });

    it('should not be able to reset if module is not ready', () => {
      recentMessages = new RecentMessages({
        client: {},
        messageStore: {
          ready: false
        }
      });
      recentMessages._store = store;
      const spy = sinon.spy(store, 'dispatch');
      sinon.stub(recentMessages, 'pending', {
        get() { return false; }
      });
      sinon.stub(recentMessages, 'ready', {
        get() { return false; }
      });
      recentMessages._onStateChange();
      expect(spy.notCalled).to.equal(true);
    });

    it('should subscribe to MessageStore change', () => {
      sinon.spy(recentMessages, 'getMessages');
      sinon.stub(recentMessages, '_prevMessageStoreTimestamp').returns({
        get() {
          return 0;
        }
      });
      sinon.stub(recentMessages, 'ready', {
        get() { return true; }
      });
      recentMessages._onStateChange();
      expect(recentMessages.getMessages.called);
    });
  });

  describe('_getRecentMessages', () => {
    it('should not fetch from server if local recent messages is enough', async () => {
      sinon.spy(recentMessages, '_fetchRemoteRecentMessages');
      sinon.stub(recentMessages, '_getLocalRecentMessages').callsFake(() => [1, 2, 3, 4, 5]);
      await recentMessages._getRecentMessages({});
      expect(recentMessages._fetchRemoteRecentMessages.called).to.not.equal(true);
    });

    it('should fetch from server if local recent messages is not enough', async () => {
      sinon.stub(recentMessages, '_fetchRemoteRecentMessages').callsFake(() => []);
      sinon.stub(recentMessages, '_getLocalRecentMessages').returns([1, 2, 3]);
      await recentMessages._getRecentMessages({});
      expect(recentMessages._fetchRemoteRecentMessages.called).to.equal(true);
    });

    it('should always have 5 messages if there are more than 5', async () => {
      const fakeMessages = Array.from({ length: 6 }).map((_, i) => ({ id: i }));
      sinon.stub(recentMessages, '_getLocalRecentMessages').returns(fakeMessages);
      const messages = await recentMessages._getRecentMessages({});
      expect(messages).to.have.length(5);
    });

    it('should not contain duplicated messages', async () => {
      const fakeMessages = Array.from({ length: 6 }).fill({ id: 0 });
      sinon.stub(recentMessages, '_getLocalRecentMessages').returns(fakeMessages);
      const messages = await recentMessages._getRecentMessages({});
      expect(messages).to.have.length(1);
    });
  });

  describe('_getLocalRecentMessages', () => {
    it('should only get messages within certain days', async () => {
      sinon.stub(recentMessages, '_filterPhoneNumber').callsFake(() => () => true);
      const messages = [{
        creationTime: '2017-07-26T06:52:43.515Z'
      }, {
        creationTime: '2017-01-26T06:52:43.515Z'
      }];
      const contact = {
        phoneNumbers: ['171']
      };
      const dateFrom = new Date('2017-02-26T06:52:43.515Z');
      const retval = await recentMessages._getLocalRecentMessages(
        contact,
        messages,
        dateFrom,
        5
      );
      expect(retval).to.have.length(1);
    });

    it('should only get 5 messages even if there are more matches', async () => {
      sinon.stub(recentMessages, '_filterPhoneNumber').callsFake(() => () => true);
      let messages = [{
        creationTime: '2017-07-26T06:52:43.515Z'
      }, {
        creationTime: '2017-01-26T06:52:43.515Z'
      }];
      for (let i = 0; i < 6; i += 1) {
        messages = messages.concat(messages);
      }
      const contact = {
        phoneNumbers: ['171']
      };
      const dateFrom = new Date('2017-02-26T06:52:43.515Z');
      const retval = await recentMessages._getLocalRecentMessages(
        contact,
        messages,
        dateFrom,
        5
      );
      expect(retval).to.have.length(5);
    });
  });

  describe('_filterPhoneNumber', () => {
    it('should find all matched phoneNumbers in to and from fields', () => {
      // eslint-disable-next-line
      const messages = [{ from: { phoneNumber: '+123' }, to: []}, { from: { phoneNumber: '+456' }, to: []}, { from: {}, to: [{ phoneNumber: '+789' }] }];
      const phoneNumbers = [
        { phoneNumber: '+123' },
        { phoneNumber: '+456' },
        { phoneNumber: '+789' },
        { phoneNumber: '171' }
      ];
      let func;
      const matches = [];
      for (const message of messages) {
        func = recentMessages._filterPhoneNumber(message);
        const m = phoneNumbers.find(func);
        if (m) matches.push(message);
      }
      expect(matches).to.deep.equal(messages);
    });

    it('should find all matched extensionNumber in to and from fields', () => {
      // eslint-disable-next-line
      const messages = [{ from: { extensionNumber: '123' }, to: []}, { from: { extensionNumber: '456' }, to: []}, { from: {}, to: [{ extensionNumber: '789' }] }];
      const phoneNumbers = [
        { phoneNumber: '123' },
        { phoneNumber: '456' },
        { phoneNumber: '789' },
        { phoneNumber: '171' }
      ];
      let func;
      const matches = [];
      for (const message of messages) {
        func = recentMessages._filterPhoneNumber(message);
        const m = phoneNumbers.find(func);
        if (m) matches.push(message);
      }
      expect(matches).to.deep.equal(messages);
    });

    it('should find all matched phoneNumber and extensionNumber in to and from fields', () => {
      // eslint-disable-next-line
      const messages = [{ from: { extensionNumber: '123' }, to: []}, { from: { phoneNumber: '456' }, to: []}, { from: {}, to: [{ extensionNumber: '789' }] }];
      const phoneNumbers = [
        { phoneNumber: '123' },
        { phoneNumber: '456' },
        { phoneNumber: '789' },
        { phoneNumber: '171' }
      ];
      let func;
      const matches = [];
      for (const message of messages) {
        func = recentMessages._filterPhoneNumber(message);
        const m = phoneNumbers.find(func);
        if (m) matches.push(message);
      }
      expect(matches).to.deep.equal(messages);
    });
  });

  describe('_fetchRemoteRecentMessages', () => {
    it('should send certain number of requests to server', async () => {
      sinon.stub(recentMessages, '_fetchMessageList').callsFake(p => () => Promise.resolve(p));
      sinon.stub(recentMessages, '_flattenToMessageRecords').callsFake(p => p);
      sinon.stub(recentMessages, '_markAsRemoteMessage').callsFake(p => p);
      sinon.stub(recentMessages, '_sortMessages').callsFake(p => p);
      const contact = {
        phoneNumbers: [{
          phoneNumber: '123'
        }, {
          phoneNumber: '456'
        }]
      };
      await recentMessages._fetchRemoteRecentMessages(contact, null, null, 5);
      expect(recentMessages._fetchMessageList.callCount).to.equal(2);
    });

    it('should send correct parameters', async () => {
      sinon.stub(recentMessages, '_fetchMessageList').callsFake(p => () => Promise.resolve(p));
      sinon.stub(recentMessages, '_flattenToMessageRecords').callsFake(p => p);
      sinon.stub(recentMessages, '_markAsRemoteMessage').callsFake(p => p);
      sinon.stub(recentMessages, '_sortMessages').callsFake(p => p);
      const contact = {
        phoneNumbers: [{
          phoneNumber: '123'
        }, {
          phoneNumber: '456'
        }]
      };
      const expected = [{
        dateTo: 'dateTo',
        dateFrom: 'dateFrom',
        messageType: ['SMS', 'Text', 'Pager'],
        perPage: 5,
        phoneNumber: '123'
      }, {
        dateTo: 'dateTo',
        dateFrom: 'dateFrom',
        messageType: ['SMS', 'Text', 'Pager'],
        perPage: 5,
        phoneNumber: '456'
      }];
      const messages = await recentMessages._fetchRemoteRecentMessages(contact, 'dateFrom', 'dateTo', 5);
      expect(messages).to.deep.equal(expected);
    });
  });

  describe('utility functions', () => {
    it('_countUnreadMessages', () => {
      const messages = [
        { readStatus: 'Read' },
        { readStatus: 'UnRead' },
        { readStatus: 'Read' },
      ];
      const ret = recentMessages._countUnreadMessages(messages);
      expect(ret).to.equal(1);
    });

    it('_flattenToMessageRecords', () => {
      const messages = [
        { records: { readStatus: 'Read' } },
        { records: { readStatus: 'Read' } },
        { records: { readStatus: 'Read' } },
      ];
      const expected = [
        { readStatus: 'Read' },
        { readStatus: 'Read' },
        { readStatus: 'Read' },
      ];
      const ret = recentMessages._flattenToMessageRecords(messages);
      expect(ret).to.deep.equal(expected);
    });

    it('_sortMessages', () => {
      const messages = [
        { id: 1, creationTime: '2017-07-26T06:52:43.515Z' },
        { id: 2, creationTime: '2017-07-29T06:52:43.515Z' },
        { id: 3, creationTime: '2017-07-23T06:52:43.515Z' },
      ];
      const ret = recentMessages._sortMessages(messages);
      expect(ret[0].id).to.equal(2);
      expect(ret[1].id).to.equal(1);
      expect(ret[2].id).to.equal(3);
    });

    it('_markAsRemoteMessage', () => {
      const messages = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ];
      const ret = recentMessages._markAsRemoteMessage(messages);
      /* eslint-disable */
      expect(ret[0].fromRemote).to.be.true;
      expect(ret[1].fromRemote).to.be.true;
      expect(ret[2].fromRemote).to.be.true;
      /* eslint-enable */
    });

    it('_dedup', () => {
      const messages = [
        { id: 1 },
        { id: 1 },
        { id: 3 },
      ];
      const ret = recentMessages._dedup(messages);
      expect(ret).to.deep.equal([
        { id: 1 },
        { id: 3 }
      ]);
    });
  });
});

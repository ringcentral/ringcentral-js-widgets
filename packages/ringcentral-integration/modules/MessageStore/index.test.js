import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import MessageStore from './index';
import getMessageStoreReducer from './getMessageStoreReducer';
import actionTypes from './actionTypes';
import moduleStatuses from '../../enums/moduleStatuses';
import syncTypes from '../../enums/syncTypes';

describe('MessageStore Unit Test', () => {
  let messageStore;
  let store;

  beforeEach(() => {
    messageStore = sinon.createStubInstance(MessageStore);
    store = createStore(getMessageStoreReducer(actionTypes));
    messageStore._store = store;
    messageStore._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      '_shouleCleanCache',
      '_initMessageStore',
      '_subscriptionHandler',
      '_resetModuleStatus',
      '_cleanUpCache',
      'findConversationById',
      '_messageSyncApi',
      '_updateConversationFromSync',
      '_updateMessagesFromSync',
      '_sync',
      '_onSyncError',
      '_syncMessages',
      'syncConversation',
      '_updateMessageApi',
      '_batchUpdateMessagesApi',
      '_updateMessagesApi',
      'readMessages',
      'searchMessagesText',
      'updateConversationRecipientList',
      'pushMessage',
      'deleteMessage',
      '_deleteMessageApi',
    ].forEach((key) => {
      messageStore[key].restore();
    });
  });

  describe('_onStateChange', () => {
    it('_initMessageStore should be called once when _shouldInit is true', () => {
      sinon.stub(messageStore, '_shouldInit').callsFake(() => true);
      sinon.stub(messageStore, '_shouldReset').callsFake(() => false);
      sinon.stub(messageStore, '_shouleCleanCache').callsFake(() => false);
      sinon.stub(messageStore, 'ready', { get: () => false });
      sinon.stub(messageStore, '_initMessageStore');
      sinon.stub(messageStore, '_subscriptionHandler');
      sinon.stub(messageStore, '_resetModuleStatus');
      sinon.stub(messageStore, '_cleanUpCache');
      messageStore._onStateChange();
      sinon.assert.calledOnce(messageStore._initMessageStore);
      sinon.assert.notCalled(messageStore._resetModuleStatus);
      sinon.assert.notCalled(messageStore._subscriptionHandler);
      sinon.assert.notCalled(messageStore._cleanUpCache);
    });

    it('_cleanUpCache should be called once when _shouldInit and _shouleCleanCache is true', () => {
      sinon.stub(messageStore, '_shouldInit').callsFake(() => true);
      sinon.stub(messageStore, '_shouldReset').callsFake(() => false);
      sinon.stub(messageStore, '_shouleCleanCache').callsFake(() => true);
      sinon.stub(messageStore, 'ready', { get: () => false });
      sinon.stub(messageStore, '_initMessageStore');
      sinon.stub(messageStore, '_subscriptionHandler');
      sinon.stub(messageStore, '_resetModuleStatus');
      sinon.stub(messageStore, '_cleanUpCache');
      messageStore._onStateChange();
      sinon.assert.calledOnce(messageStore._initMessageStore);
      sinon.assert.calledOnce(messageStore._cleanUpCache);
      sinon.assert.notCalled(messageStore._resetModuleStatus);
      sinon.assert.notCalled(messageStore._subscriptionHandler);
    });

    it('_resetModuleStatus should be called once when _shouldReset is true', () => {
      sinon.stub(messageStore, '_shouldInit').callsFake(() => false);
      sinon.stub(messageStore, '_shouldReset').callsFake(() => true);
      sinon.stub(messageStore, '_shouleCleanCache').callsFake(() => false);
      sinon.stub(messageStore, 'ready', { get: () => false });
      sinon.stub(messageStore, '_initMessageStore');
      sinon.stub(messageStore, '_subscriptionHandler');
      sinon.stub(messageStore, '_resetModuleStatus');
      sinon.stub(messageStore, '_cleanUpCache');
      messageStore._onStateChange();
      sinon.assert.notCalled(messageStore._initMessageStore);
      sinon.assert.calledOnce(messageStore._resetModuleStatus);
      sinon.assert.notCalled(messageStore._subscriptionHandler);
      sinon.assert.notCalled(messageStore._cleanUpCache);
    });

    it('_subscriptionHandler should be called once when messageStore is ready', () => {
      sinon.stub(messageStore, '_shouldInit').callsFake(() => false);
      sinon.stub(messageStore, '_shouldReset').callsFake(() => false);
      sinon.stub(messageStore, '_shouleCleanCache').callsFake(() => false);
      sinon.stub(messageStore, 'ready', { get: () => true });
      sinon.stub(messageStore, '_initMessageStore');
      sinon.stub(messageStore, '_subscriptionHandler');
      sinon.stub(messageStore, '_resetModuleStatus');
      sinon.stub(messageStore, '_cleanUpCache');
      messageStore._lastSubscriptionMessage = null;
      messageStore._subscription = {
        message: '123',
      };
      messageStore._onStateChange();
      sinon.assert.notCalled(messageStore._initMessageStore);
      sinon.assert.notCalled(messageStore._resetModuleStatus);
      sinon.assert.notCalled(messageStore._cleanUpCache);
      sinon.assert.calledOnce(messageStore._subscriptionHandler);
    });
  });

  describe('_shouldInit', () => {
    describe('when messageStore is pending', () => {
      beforeEach(() => {
        messageStore._auth = {
          loggedIn: true
        };
        messageStore._rolesAndPermissions = {
          ready: true
        };
        sinon.stub(messageStore, 'pending', { get: () => true });
      });
      it('Should return true when _storage and _subscription is all ready', () => {
        messageStore._storage = {
          ready: true
        };
        messageStore._subscription = {
          ready: true
        };
        expect(messageStore._shouldInit()).to.equal(true);
      });

      it('Should return false when _storage and _subscription all not ready', () => {
        messageStore._storage = {
          ready: false
        };
        messageStore._subscription = {
          ready: false
        };
        expect(messageStore._shouldInit()).to.equal(false);
      });

      it('Should return false when _storage is not ready and _subscription ready', () => {
        messageStore._storage = {
          ready: false
        };
        messageStore._subscription = {
          ready: true
        };
        expect(messageStore._shouldInit()).to.equal(false);
      });

      it('Should return false when messageStore is pending and _subscription is not ready', () => {
        messageStore._storage = {
          ready: true
        };
        messageStore._subscription = {
          ready: false
        };
        expect(messageStore._shouldInit()).to.equal(false);
      });
    });

    describe('when messageStore is ready', () => {
      beforeEach(() => {
        messageStore._auth = {
          loggedIn: true
        };
        messageStore._rolesAndPermissions = {
          ready: true
        };
        sinon.stub(messageStore, 'pending', { get: () => false });
      });
      it('Should return false when _storage and _subscription all ready', () => {
        messageStore._storage = {
          ready: true
        };
        messageStore._subscription = {
          ready: true
        };
        expect(messageStore._shouldInit()).to.equal(false);
      });

      it('Should return false when _storage and _subscription all not ready', () => {
        messageStore._storage = {
          ready: false
        };
        messageStore._subscription = {
          ready: false
        };
        expect(messageStore._shouldInit()).to.equal(false);
      });

      it('Should return false when _storage is not ready and _subscription ready', () => {
        messageStore._storage = {
          ready: false
        };
        messageStore._subscription = {
          ready: true
        };
        expect(messageStore._shouldInit()).to.equal(false);
      });

      it('Should return false when messageStore is pending and _subscription is not ready', () => {
        messageStore._storage = {
          ready: true
        };
        messageStore._subscription = {
          ready: false
        };
        expect(messageStore._shouldInit()).to.equal(false);
      });
    });
  });

  describe('_shouldReset', () => {
    describe('when messageStore is ready', () => {
      beforeEach(() => {
        messageStore._auth = {
          loggedIn: true
        };
        messageStore._rolesAndPermissions = {
          ready: true
        };
        sinon.stub(messageStore, 'ready', { get: () => true });
      });
      it('should return true when _storage and _subscription is all not ready', () => {
        messageStore._storage = {
          ready: false
        };
        messageStore._subscription = {
          ready: false
        };
        expect(messageStore._shouldReset()).to.equal(true);
      });

      it('should return true when _storage is ready and _subscription is not ready', () => {
        messageStore._storage = {
          ready: true
        };
        messageStore._subscription = {
          ready: false
        };
        expect(messageStore._shouldReset()).to.equal(true);
      });

      it('should return true when _subscription is ready with _storage is not ready', () => {
        messageStore._storage = {
          ready: false
        };
        messageStore._subscription = {
          ready: true
        };
        expect(messageStore._shouldReset()).to.equal(true);
      });

      it('should return false when _subscription and _storage is all ready', () => {
        messageStore._storage = {
          ready: true
        };
        messageStore._subscription = {
          ready: true
        };
        expect(messageStore._shouldReset()).to.equal(false);
      });
    });

    describe('when messageStore is not ready', () => {
      beforeEach(() => {
        messageStore._auth = {
          loggedIn: true
        };
        messageStore._rolesAndPermissions = {
          ready: true
        };
        sinon.stub(messageStore, 'ready', { get: () => false });
      });

      it('should return false when _subscription and _storage is all not ready', () => {
        messageStore._storage = {
          ready: false
        };
        messageStore._subscription = {
          ready: false
        };
        expect(messageStore._shouldReset()).to.equal(false);
      });

      it('should return false when _subscription and _storage all ready', () => {
        messageStore._storage = {
          ready: true
        };
        messageStore._subscription = {
          ready: true
        };
        expect(messageStore._shouldReset()).to.equal(false);
      });

      it('should return false when _storage is not ready and _subscription ready', () => {
        messageStore._storage = {
          ready: false
        };
        messageStore._subscription = {
          ready: true
        };
        expect(messageStore._shouldReset()).to.equal(false);
      });

      it('should return false _subscription is not ready with _storage all ready', () => {
        messageStore._storage = {
          ready: true
        };
        messageStore._subscription = {
          ready: false
        };
        expect(messageStore._shouldReset()).to.equal(false);
      });
    });
  });

  describe('_shouleCleanCache', () => {
    it('should return true when auth is freshLogin and updatedTimestamp updated', () => {
      messageStore._auth = {
        isFreshLogin: true
      };
      sinon.stub(messageStore, 'updatedTimestamp', { get: () => Date.now() });
      messageStore._ttl = 30 * 60 * 1000;
      expect(messageStore._shouleCleanCache()).to.equal(true);
    });

    it('should return true when auth is freshLogin and updatedTimestamp is expired', () => {
      messageStore._auth = {
        isFreshLogin: true
      };
      sinon.stub(messageStore, 'updatedTimestamp', { get: () => 0 });
      messageStore._ttl = 30 * 60 * 1000;
      expect(messageStore._shouleCleanCache()).to.equal(true);
    });

    it('should return true when auth is not freshLogin and updatedTimestamp is expired', () => {
      messageStore._auth = {
        isFreshLogin: false
      };
      sinon.stub(messageStore, 'updatedTimestamp', { get: () => 0 });
      messageStore._ttl = 30 * 60 * 1000;
      expect(messageStore._shouleCleanCache()).to.equal(true);
    });

    it('should return false when auth is not freshLogin and updatedTimestamp is updated', () => {
      messageStore._auth = {
        isFreshLogin: false
      };
      sinon.stub(messageStore, 'updatedTimestamp', { get: () => Date.now() });
      messageStore._ttl = 30 * 60 * 1000;
      expect(messageStore._shouleCleanCache()).to.equal(false);
    });
  });

  describe('findConversationById', () => {
    it('should return conversation successfully when string id is exist', () => {
      sinon.stub(messageStore, 'conversationMap', {
        get: () => ({
          123456: { id: '123456' }
        }),
      });
      const result = messageStore.findConversationById('123456');
      expect(result).to.deep.equal({ id: '123456' });
    });
  });

  describe('_initMessageStore', () => {
    it('should call _syncMessages if storage is undefined', async () => {
      sinon.stub(messageStore, '_syncMessages');
      messageStore._subscription = {
        subscribe: () => null,
      };
      messageStore._rolesAndPermissions = {
        hasReadMessagesPermission: true,
      };
      await messageStore._initMessageStore();
      sinon.assert.calledOnce(messageStore._syncMessages);
    });

    it('should call _syncMessages if tabManager is undefined', async () => {
      messageStore._storage = {};
      sinon.stub(messageStore, '_syncMessages');
      messageStore._subscription = {
        subscribe: () => null,
      };
      messageStore._rolesAndPermissions = {
        hasReadMessagesPermission: true,
      };
      await messageStore._initMessageStore();
      sinon.assert.calledOnce(messageStore._syncMessages);
    });

    it('should not call _syncMessages if tabManager is not active', async () => {
      messageStore._storage = {};
      messageStore._tabManager = { active: false };
      sinon.stub(messageStore, '_syncMessages');
      messageStore._subscription = {
        subscribe: () => null,
      };
      messageStore._rolesAndPermissions = {
        hasReadMessagesPermission: true,
      };
      await messageStore._initMessageStore();
      sinon.assert.notCalled(messageStore._syncMessages);
    });

    it('should call _syncMessages if tabManager is active', async () => {
      messageStore._storage = {};
      messageStore._tabManager = { active: true };
      sinon.stub(messageStore, '_syncMessages');
      messageStore._subscription = {
        subscribe: () => null,
      };
      messageStore._rolesAndPermissions = {
        hasReadMessagesPermission: true
      };
      await messageStore._initMessageStore();
      sinon.assert.calledOnce(messageStore._syncMessages);
    });

    it('should not call _syncMessages if hasReadMessagesPermission is false', async () => {
      messageStore._storage = {};
      sinon.stub(messageStore, '_syncMessages');
      messageStore._subscription = {
        subscribe: () => null,
      };
      messageStore._rolesAndPermissions = {
        hasReadMessagesPermission: false,
      };
      await messageStore._initMessageStore();
      sinon.assert.notCalled(messageStore._syncMessages);
    });
  });

  describe('_subscriptionHandler', () => {
    it('should not call _syncMessages when subscription message is null', () => {
      messageStore._subscription = {
        message: null,
      };
      sinon.stub(messageStore, '_syncMessages');
      messageStore._lastSubscriptionMessage = null;
      messageStore._subscriptionHandler();
      sinon.assert.notCalled(messageStore._syncMessages);
    });

    it(`should not call _syncMessages
        when subscription message is same as _lastSubscriptionMessage`, () => {
        sinon.stub(messageStore, '_syncMessages');
        messageStore._subscription = {
          message: {
            event: '/restapi/v1.0/account/~/extension/~/message-store',
            body: {
              changes: []
            }
          },
        };
        messageStore._lastSubscriptionMessage = messageStore._subscription.message;
        messageStore._subscriptionHandler();
        sinon.assert.notCalled(messageStore._syncMessages);
      });

    it(`should call _syncMessages when subscription has message store event
        and _lastSubscriptionMessage is null`, () => {
        sinon.stub(messageStore, '_syncMessages');
        messageStore._subscription = {
          message: {
            event: '/restapi/v1.0/account/~/extension/~/message-store',
            body: {
              changes: []
            }
          },
        };
        messageStore._lastSubscriptionMessage = null;
        messageStore._subscriptionHandler();
        sinon.assert.calledOnce(messageStore._syncMessages);
        expect(messageStore._lastSubscriptionMessage).to.equal(messageStore._subscription.message);
      });

    it('should not call _syncMessages when subscription message is not message event', () => {
      sinon.stub(messageStore, '_syncMessages');
      messageStore._subscription = {
        message: {
          event: '/restapi/v1.0/account/~/presence',
          body: {
            changes: []
          }
        },
      };
      messageStore._lastSubscriptionMessage = null;
      messageStore._subscriptionHandler();
      sinon.assert.notCalled(messageStore._syncMessages);
    });

    it(`should not call _syncMessages
        when subscription message is message event but empty body`, () => {
        sinon.stub(messageStore, '_syncMessages');
        messageStore._subscription = {
          message: {
            event: '/restapi/v1.0/account/~/extension/~/message-store',
            body: null,
          },
        };
        messageStore._lastSubscriptionMessage = null;
        messageStore._subscriptionHandler();
        sinon.assert.notCalled(messageStore._syncMessages);
      });

    it(`should not call _syncMessages
        when subscription message is message store event but empty changes`, () => {
        sinon.stub(messageStore, '_syncMessages');
        messageStore._subscription = {
          message: {
            event: '/restapi/v1.0/account/~/extension/~/message-store',
            body: {
              changes: null,
            },
          },
        };
        messageStore._lastSubscriptionMessage = null;
        messageStore._subscriptionHandler();
        sinon.assert.notCalled(messageStore._syncMessages);
      });
  });

  describe('_updateMessagesFromSync', () => {
    it('should return call _saveConversationsAndMessages successfully', async () => {
      sinon.stub(messageStore, 'syncToken', {
        get: () => 'aabbccdd',
      });
      sinon.stub(messageStore, '_messageSyncApi').callsFake(
        () => ({
          records: [],
          syncInfo: { syncToken: 'abcd', syncTime: '2017-03-02T06:07:53.605Z' }
        })
      );
      await messageStore._updateMessagesFromSync('123456');
      sinon.assert.calledWith(messageStore._messageSyncApi, {
        syncToken: 'aabbccdd',
        syncType: syncTypes.iSync,
      });
    });
  });

  describe('_updateConversationFromSync', () => {
    it('should return call _messageSyncApi successfully', async () => {
      sinon.stub(messageStore, 'conversationMap', {
        get: () => ({
          123456: {
            id: '123456',
            syncToken: 'abcd',
          }
        }),
      });
      sinon.stub(messageStore, '_messageSyncApi').callsFake(
        () => ({
          records: [],
          syncInfo: { syncToken: 'abcd', syncTime: '2017-03-02T06:07:53.605Z' }
        })
      );
      await messageStore._updateConversationFromSync('123456');
      sinon.assert.calledWith(messageStore._messageSyncApi, {
        syncToken: 'abcd',
        syncType: syncTypes.iSync,
      });
    });
  });

  describe('_syncMessages', () => {
    it('should call _updateMessagesFromSync once', async () => {
      messageStore._promise = null;
      sinon.stub(messageStore, '_updateMessagesFromSync');
      await messageStore._syncMessages();
      sinon.assert.calledOnce(messageStore._updateMessagesFromSync);
      expect(messageStore._promise).to.equal(null);
    });
  });

  describe('syncConversation', () => {
    it('should call _updateConversationFromSync with id', async () => {
      messageStore._promise = null;
      sinon.stub(messageStore, '_updateConversationFromSync');
      await messageStore.syncConversation(123);
      sinon.assert.calledWith(messageStore._updateConversationFromSync, 123);
      expect(messageStore._promise).to.equal(null);
    });
  });

  describe('_sync', () => {
    it('should call syncFunction once when _promise is null', async () => {
      messageStore._promise = null;
      sinon.stub(messageStore, '_updateMessagesFromSync');
      await messageStore._sync(async () => {
        await messageStore._updateMessagesFromSync();
      });
      sinon.assert.calledOnce(messageStore._updateMessagesFromSync);
      expect(messageStore._promise).to.equal(null);
    });

    it('should not call syncFunction when _promise exist', async () => {
      messageStore._promise = () => null;
      sinon.stub(messageStore, '_updateMessagesFromSync');
      await messageStore._sync(async () => {
        await messageStore._updateMessagesFromSync();
      });
      sinon.assert.notCalled(messageStore._updateMessagesFromSync);
    });

    it('_promise should be null and call _onSyncError when throw error', async () => {
      messageStore._promise = null;
      sinon.stub(messageStore, '_updateMessagesFromSync').throws(new Error('error'));
      sinon.stub(messageStore, '_onSyncError');
      try {
        await messageStore._sync(async () => {
          await messageStore._updateMessagesFromSync();
        });
      } catch (e) {
        // on Error
      }
      sinon.assert.calledOnce(messageStore._onSyncError);
      expect(messageStore._promise).to.equal(null);
    });
  });

  describe('_updateMessagesApi', () => {
    it('should call _updateMessageApi and not call _batchUpdateMessagesApi when ids length is one', async () => {
      sinon.stub(messageStore, '_updateMessageApi');
      sinon.stub(messageStore, '_batchUpdateMessagesApi');
      await messageStore._updateMessagesApi(['11111'], 'Read');
      sinon.assert.calledOnce(messageStore._updateMessageApi);
      sinon.assert.notCalled(messageStore._batchUpdateMessagesApi);
    });

    it('should not call _updateMessageApi and call _batchUpdateMessagesApi when ids length is more one', async () => {
      sinon.stub(messageStore, '_updateMessageApi');
      sinon.stub(messageStore, '_batchUpdateMessagesApi').callsFake(
        () => [
          {
            response: () => ({ status: 200 }),
            json: () => ({ data: 'test1' }),
          }, {
            response: () => ({ status: 200 }),
            json: () => ({ data: 'test2' }),
          }
        ]
      );
      const result = await messageStore._updateMessagesApi(['11111', '222222'], 'Read');
      sinon.assert.calledOnce(messageStore._batchUpdateMessagesApi);
      sinon.assert.notCalled(messageStore._updateMessageApi);
      expect(result).to.deep.equal([{ data: 'test1' }, { data: 'test2' }]);
    });

    it('should not call _updateMessageApi and call _batchUpdateMessagesApi twice when length is more 20', async () => {
      const ids = Array(22);
      ids.fill('121212121');
      sinon.stub(messageStore, '_updateMessageApi');
      sinon.stub(messageStore, '_batchUpdateMessagesApi').callsFake(
        () => [
          {
            response: () => ({ status: 200 }),
            json: () => ({ data: 'test1' }),
          }, {
            response: () => ({ status: 200 }),
            json: () => ({ data: 'test2' }),
          }
        ]
      );
      await messageStore._updateMessagesApi(ids, 'Read');
      sinon.assert.callCount(messageStore._batchUpdateMessagesApi, 2);
      sinon.assert.notCalled(messageStore._updateMessageApi);
    });
  });

  describe('readMessages', () => {
    it('should call _updateMessagesApi once', async () => {
      sinon.stub(messageStore, 'conversationMap', {
        get: () => ({
          123456: {
            id: '123456',
            syncToken: 'abcd',
            unreadMessages: { 1234567: 1 }
          }
        }),
      });
      sinon.stub(messageStore, '_updateMessagesApi').callsFake(() => []);
      await messageStore.readMessages('123456');
      sinon.assert.calledWith(messageStore._updateMessagesApi, ['1234567'], 'Read');
    });

    it('should not call _updateMessagesApi if conversation has not unread messages', async () => {
      sinon.stub(messageStore, 'conversationMap', {
        get: () => ({
          123456: {
            id: '123456',
            syncToken: 'abcd',
            unreadMessages: {}
          }
        }),
      });
      sinon.stub(messageStore, '_updateMessagesApi').callsFake(() => []);
      await messageStore.readMessages('123456');
      sinon.assert.notCalled(messageStore._updateMessagesApi);
    });
  });

  describe('deleteMessage', () => {
    it('should call _deleteMessagesApi once', async () => {
      sinon.stub(messageStore, '_deleteMessageApi').callsFake(() => {});
      await messageStore.deleteMessage('123456');
      sinon.assert.calledWith(messageStore._deleteMessageApi, '123456');
    });
  });

  describe('searchMessagesText', () => {
    let messages;
    let message;
    beforeEach('prepare messages data', () => {
      message = {
        id: '1234567',
        conversation: {
          id: '1234567890'
        },
        type: 'SMS',
        subject: 'test',
        direction: 'Inbound',
        availability: 'Alive',
        readStatus: 'Unread',
        creationTime: '2017-02-03T09:53:49.000Z',
        to: [{
          phoneNumber: '+1234567890',
        }],
        from: { phoneNumber: '+1234567891' },
      };
      messages = [
        { ...message },
        { ...message, id: 1234, subject: 'aaaa' }
      ];
      sinon.stub(messageStore, 'messages', {
        get: () => messages,
      });
    });

    it('should return message when match suject on conversation messages', async () => {
      const result = messageStore.searchMessagesText('est');
      expect(result).to.deep.equal([{ ...message }]);
    });

    it('should return empty array when not match suject', async () => {
      const result = messageStore.searchMessagesText('aaaaa');
      expect(result).to.deep.equal([]);
    });

    it('should return null when message subject is undefined', async () => {
      messages[0].subject = undefined;
      const result = messageStore.searchMessagesText(message, 'est');
      expect(result).to.deep.equal([]);
    });
  });
});

// import { expect } from 'chai';
// import sinon from 'sinon';
// import { createStore } from 'redux';
// import Conversation from './index';
// import getConversationReducer from './getConversationReducer';
// import actionTypes from './actionTypes';

// describe('Conversation Unit Test', () => {
//   let conversation;
//   let store;

//   beforeEach(() => {
//     conversation = sinon.createStubInstance(Conversation);
//     store = createStore(getConversationReducer(actionTypes));
//     conversation._store = store;
//     conversation._prefixedActionTypes = actionTypes;
//     [
//       '_onStateChange',
//       '_shouldInit',
//       '_shouldReset',
//       '_shouldReloadConversation',
//       '_initModuleStatus',
//       '_resetModuleStatus',
//       'loadConversationById',
//       'unloadConversation',
//       'changeDefaultRecipient',
//       'changeMatchedNames',
//       '_updateConversationRecipients',
//       '_loadConversation',
//       '_updateRecipients',
//       '_getCurrentSenderNumber',
//       '_getRecipients',
//       '_getReplyOnMessageId',
//       '_getFromNumber',
//       '_getToNumbers',
//       'replyToReceivers',
//       '_onReplyError',
//     ].forEach((key) => {
//       conversation[key].restore();
//     });
//   });

//   describe('_onStateChange', () => {
//     it('_initModuleStatus should be called once when _shouldInit is true', () => {
//       sinon.stub(conversation, '_shouldInit').callsFake(() => true);
//       sinon.stub(conversation, '_shouldReset').callsFake(() => false);
//       sinon.stub(conversation, '_shouldReloadConversation').callsFake(() => false);
//       sinon.stub(conversation, '_initModuleStatus');
//       sinon.stub(conversation, '_resetModuleStatus');
//       sinon.stub(conversation, '_loadConversation');
//       conversation._onStateChange();
//       sinon.assert.calledOnce(conversation._initModuleStatus);
//       sinon.assert.notCalled(conversation._resetModuleStatus);
//       sinon.assert.notCalled(conversation._loadConversation);
//     });

//     it('_resetModuleStatus should be called once when _shouldReset is true', () => {
//       sinon.stub(conversation, '_shouldInit').callsFake(() => false);
//       sinon.stub(conversation, '_shouldReset').callsFake(() => true);
//       sinon.stub(conversation, '_shouldReloadConversation').callsFake(() => false);
//       sinon.stub(conversation, '_initModuleStatus');
//       sinon.stub(conversation, '_resetModuleStatus');
//       sinon.stub(conversation, '_loadConversation');
//       conversation._onStateChange();
//       sinon.assert.notCalled(conversation._initModuleStatus);
//       sinon.assert.calledOnce(conversation._resetModuleStatus);
//       sinon.assert.notCalled(conversation._loadConversation);
//     });

//     it('_loadConversation should be called once when _shouldReloadConversation is true', () => {
//       sinon.stub(conversation, '_shouldInit').callsFake(() => false);
//       sinon.stub(conversation, '_shouldReset').callsFake(() => false);
//       sinon.stub(conversation, '_shouldReloadConversation').callsFake(() => true);
//       sinon.stub(conversation, '_initModuleStatus');
//       sinon.stub(conversation, '_resetModuleStatus');
//       sinon.stub(conversation, '_loadConversation');
//       conversation._messageStore = {
//         readMessages: () => null,
//       };
//       sinon.stub(conversation, 'id', { get: () => '123' });
//       conversation._onStateChange();
//       sinon.assert.notCalled(conversation._initModuleStatus);
//       sinon.assert.notCalled(conversation._resetModuleStatus);
//       sinon.assert.calledOnce(conversation._loadConversation);
//     });
//   });

//   describe('_shouldInit', () => {
//     it('Should return true when conversation is not ready with _messageStore, _extensionInfo and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldInit()).to.equal(true);
//     });

//     it('Should return false when conversation and _messageSender is not ready with _messageStore and _extensionInfo all ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when conversation and _extensionInfo is not ready with _messageStore and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when conversation and _messageStore is not ready with _extensionInfo and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when conversation, _extensionInfo and _messageStore is not ready with _messageSender ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when conversation, _messageSender and _messageStore is not ready with _extensionInfo ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when conversation, _messageSender and _extensionInfo is not ready with _messageStore ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when conversation, _messageSender, _messageStore and _extensionInfo is all not ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when conversation is ready with _messageStore, _extensionInfo and _messageSender all not ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when _messageSender is not ready with conversation, _messageStore and _extensionInfo all ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when _extensionInfo is not ready with conversation, _messageStore and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when _messageStore is not ready with conversation, _extensionInfo and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when _extensionInfo and _messageStore is not ready with conversation and _messageSender ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when _messageSender and _messageStore is not ready with conversation and _extensionInfo ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when _messageSender and _extensionInfo is not ready with conversation and _messageStore ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldInit()).to.equal(false);
//     });

//     it('Should return false when conversation, _messageSender, _messageStore and _extensionInfo is ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldInit()).to.equal(false);
//     });
//   });

//   describe('_shouldReset', () => {
//     it('Should return false when conversation is not ready with _messageStore, _extensionInfo and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldReset()).to.equal(false);
//     });

//     it('Should return false when conversation and _messageSender is not ready with _messageStore and _extensionInfo all ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldReset()).to.equal(false);
//     });

//     it('Should return false when conversation and _extensionInfo is not ready with _messageStore and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldReset()).to.equal(false);
//     });

//     it('Should return false when conversation and _messageStore is not ready with _extensionInfo and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldReset()).to.equal(false);
//     });

//     it('Should return false when conversation, _extensionInfo and _messageStore is not ready with _messageSender ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldReset()).to.equal(false);
//     });

//     it('Should return false when conversation, _messageSender and _messageStore is not ready with _extensionInfo ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldReset()).to.equal(false);
//     });

//     it('Should return false when conversation, _messageSender and _extensionInfo is not ready with _messageStore ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldReset()).to.equal(false);
//     });

//     it('Should return false when conversation, _messageSender, _messageStore and _extensionInfo is all not ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       expect(conversation._shouldReset()).to.equal(false);
//     });

//     it('Should return true when conversation is ready with _messageStore, _extensionInfo and _messageSender all not ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldReset()).to.equal(true);
//     });

//     it('Should return true when _messageSender is not ready with conversation, _messageStore and _extensionInfo all ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldReset()).to.equal(true);
//     });

//     it('Should return true when _extensionInfo is not ready with conversation, _messageStore and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldReset()).to.equal(true);
//     });

//     it('Should return true when _messageStore is not ready with conversation, _extensionInfo and _messageSender all ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldReset()).to.equal(true);
//     });

//     it('Should return true when _extensionInfo and _messageStore is not ready with conversation and _messageSender ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldReset()).to.equal(true);
//     });

//     it('Should return true when _messageSender and _messageStore is not ready with conversation and _extensionInfo ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: false
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldReset()).to.equal(true);
//     });

//     it('Should return true when _messageSender and _extensionInfo is not ready with conversation and _messageStore ready', () => {
//       conversation._messageSender = {
//         ready: false
//       };
//       conversation._extensionInfo = {
//         ready: false
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldReset()).to.equal(true);
//     });

//     it('Should return false when conversation, _messageSender, _messageStore and _extensionInfo is ready', () => {
//       conversation._messageSender = {
//         ready: true
//       };
//       conversation._extensionInfo = {
//         ready: true
//       };
//       conversation._messageStore = {
//         ready: true
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       expect(conversation._shouldReset()).to.equal(false);
//     });
//   });

//   describe('_shouldReloadConversation', () => {
//     it('Should return true when conversation is ready and conversation is not null and messageStoreUpdatedAt not same as messageStore.conversationsTimestamp', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       sinon.stub(conversation, 'id', { get: () => '123' });
//       sinon.stub(conversation, 'messageStoreUpdatedAt', { get: () => null });
//       expect(conversation._shouldReloadConversation()).to.equal(true);
//     });

//     it('Should return false when conversation is ready and conversation is null and messageStoreUpdatedAt not same as messageStore.conversationsTimestamp', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       sinon.stub(conversation, 'id', { get: () => null });
//       sinon.stub(conversation, 'messageStoreUpdatedAt', { get: () => null });
//       expect(conversation._shouldReloadConversation()).to.equal(false);
//     });

//     it('Should return false when conversation is ready and conversation is null and messageStoreUpdatedAt same as messageStore.conversationsTimestamp', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       sinon.stub(conversation, 'id', { get: () => null });
//       sinon.stub(conversation, 'messageStoreUpdatedAt', { get: () => 12345678 });
//       expect(conversation._shouldReloadConversation()).to.equal(false);
//     });

//     it('Should return false when conversation is ready and conversation is not null and messageStoreUpdatedAt same as messageStore.conversationsTimestamp', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678
//       };
//       sinon.stub(conversation, 'ready', { get: () => true });
//       sinon.stub(conversation, 'id', { get: () => '123' });
//       sinon.stub(conversation, 'messageStoreUpdatedAt', { get: () => 12345678 });
//       expect(conversation._shouldReloadConversation()).to.equal(false);
//     });

//     it('Should return false when conversation is not ready and conversation is not null and messageStoreUpdatedAt not same as messageStore.conversationsTimestamp', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       sinon.stub(conversation, 'id', { get: () => '123' });
//       sinon.stub(conversation, 'messageStoreUpdatedAt', { get: () => null });
//       expect(conversation._shouldReloadConversation()).to.equal(false);
//     });

//     it('Should return false when conversation is not ready and conversation is null and messageStoreUpdatedAt not same as messageStore.conversationsTimestamp', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       sinon.stub(conversation, 'id', { get: () => null });
//       sinon.stub(conversation, 'messageStoreUpdatedAt', { get: () => null });
//       expect(conversation._shouldReloadConversation()).to.equal(false);
//     });

//     it('Should return false when conversation is not ready and conversation is null and messageStoreUpdatedAt same as messageStore.conversationsTimestamp', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       sinon.stub(conversation, 'id', { get: () => null });
//       sinon.stub(conversation, 'messageStoreUpdatedAt', { get: () => 12345678 });
//       expect(conversation._shouldReloadConversation()).to.equal(false);
//     });

//     it('Should return true when conversation is not ready and conversation is not null and messageStoreUpdatedAt same as messageStore.conversationsTimestamp', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678
//       };
//       sinon.stub(conversation, 'ready', { get: () => false });
//       sinon.stub(conversation, 'id', { get: () => '123' });
//       sinon.stub(conversation, 'messageStoreUpdatedAt', { get: () => 12345678 });
//       expect(conversation._shouldReloadConversation()).to.equal(false);
//     });
//   });

//   describe('loadConversationById', () => {
//     it('should call _loadConversation once and messageStore readMessages', () => {
//       conversation._messageStore = {
//         readMessages: () => null,
//       };
//       sinon.stub(conversation, '_loadConversation');
//       conversation.loadConversationById(1);
//       sinon.assert.calledOnce(conversation._loadConversation);
//     });
//   });

//   describe('changeDefaultRecipient', () => {
//     it(`should not call _updateConversationRecipients
//         if conversation recipients length is one`, () => {
//       sinon.stub(conversation, 'recipients', { get: () => ['123'] });
//       sinon.stub(conversation, '_updateConversationRecipients');
//       conversation.changeDefaultRecipient('123');
//       sinon.assert.notCalled(conversation._updateConversationRecipients);
//     });

//     it(`should not call _updateConversationRecipients
//         if phoneNumber is not included in recipients`, () => {
//       sinon.stub(conversation, 'recipients', {
//         get: () => [{ extensionNumber: '123' }, { extensionNumber: '321' }]
//       });
//       sinon.stub(conversation, '_updateConversationRecipients');
//       conversation.changeDefaultRecipient('111');
//       sinon.assert.notCalled(conversation._updateConversationRecipients);
//     });

//     it('should not call _updateConversationRecipients if conversation is null', () => {
//       sinon.stub(conversation, 'recipients', {
//         get: () => [{ extensionNumber: '123' }, { extensionNumber: '321' }]
//       });
//       sinon.stub(conversation, 'id', { get: () => null });
//       sinon.stub(conversation, '_updateConversationRecipients');
//       conversation.changeDefaultRecipient('321');
//       sinon.assert.notCalled(conversation._updateConversationRecipients);
//     });

//     it('should call _updateConversationRecipients', () => {
//       sinon.stub(conversation, 'recipients', {
//         get: () => [{ extensionNumber: '123' }, { extensionNumber: '321' }]
//       });
//       sinon.stub(conversation, 'id', { get: () => '123' });
//       sinon.stub(conversation, '_updateConversationRecipients');
//       conversation.changeDefaultRecipient('321');
//       sinon.assert.calledWith(
//         conversation._updateConversationRecipients,
//         [{ extensionNumber: '321' }, { extensionNumber: '123' }]
//       );
//     });
//   });

//   describe('changeMatchedNames', () => {
//     it(`should not call _updateConversationRecipients
//         if conversation recipients length is not one`, () => {
//       sinon.stub(conversation, 'recipients', { get: () => ['123', '111'] });
//       sinon.stub(conversation, '_updateConversationRecipients');
//       conversation.changeMatchedNames(['123']);
//       sinon.assert.notCalled(conversation._updateConversationRecipients);
//     });

//     it(`should not call _updateConversationRecipients
//         if matchedNames is null`, () => {
//       sinon.stub(conversation, 'recipients', { get: () => [{ phoneNumber: '1234' }] });
//       sinon.stub(conversation, '_updateConversationRecipients');
//       conversation.changeMatchedNames(null);
//       sinon.assert.notCalled(conversation._updateConversationRecipients);
//     });

//     it('should call _updateConversationRecipients', () => {
//       sinon.stub(conversation, 'recipients', { get: () => [{ phoneNumber: '1234' }] });
//       sinon.stub(conversation, '_updateConversationRecipients');
//       conversation.changeMatchedNames(['123']);
//       sinon.assert.calledOnce(conversation._updateConversationRecipients);
//     });
//   });

//   describe('_updateConversationRecipients', () => {
//     it('should not call _updateRecipients if conversation is null', () => {
//       sinon.stub(conversation, 'id', { get: () => null });
//       sinon.stub(conversation, '_updateRecipients');
//       conversation._updateConversationRecipients(['321']);
//       sinon.assert.notCalled(conversation._updateRecipients);
//     });

//     it('should not call _updateRecipients if conversation id is undefined', () => {
//       sinon.stub(conversation, 'id', { get: () => undefined });
//       sinon.stub(conversation, '_updateRecipients');
//       conversation._updateConversationRecipients(['321']);
//       sinon.assert.notCalled(conversation._updateRecipients);
//     });

//     it('should call _updateRecipients', () => {
//       conversation._messageStore = {
//         updateConversationRecipientList: () => null,
//       };
//       sinon.stub(conversation, 'id', { get: () => '123' });
//       sinon.stub(conversation, '_updateRecipients');
//       conversation._updateConversationRecipients(['321']);
//       sinon.assert.calledOnce(conversation._updateRecipients);
//     });
//   });

//   describe('_loadConversation', () => {
//     it('should call _getRecipients and _getCurrentSenderNumber', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678,
//         findConversationById: () => ({
//           id: '123456',
//           index: 0,
//         }),
//         messages: [{
//           id: 12345,
//         }],
//         allConversations: [{
//           id: 12345,
//         }],
//       };
//       sinon.stub(conversation, '_getCurrentSenderNumber').callsFake(() => ({}));
//       sinon.stub(conversation, '_getRecipients').callsFake(() => ['123']);
//       const conversationId = '123456';
//       conversation._loadConversation(conversationId);
//       sinon.assert.calledOnce(conversation._getCurrentSenderNumber);
//       sinon.assert.calledOnce(conversation._getRecipients);
//     });

//     it('should call _getCurrentSenderNumber and not call _getRecipients if conversation recipients exist', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678,
//         findConversationById: () => ({
//           id: '123456',
//           index: 0,
//         }),
//         messages: [{
//           id: 12345,
//         }],
//         allConversations: [{
//           id: 12345,
//           recipients: ['123'],
//         }],
//       };
//       sinon.stub(conversation, '_getCurrentSenderNumber').callsFake(() => ({}));
//       sinon.stub(conversation, '_getRecipients').callsFake(() => ['123']);
//       const conversationId = '123456';
//       conversation._loadConversation(conversationId);
//       sinon.assert.calledOnce(conversation._getCurrentSenderNumber);
//       sinon.assert.notCalled(conversation._getRecipients);
//     });

//     it('should not call _getCurrentSenderNumber if findConversationById return null', () => {
//       conversation._messageStore = {
//         updatedTimestamp: 12345678,
//         findConversationById: () => null,
//       };
//       sinon.stub(conversation, '_getCurrentSenderNumber').callsFake(() => ({}));
//       sinon.stub(conversation, '_getRecipients').callsFake(() => ['123']);
//       const conversationId = '123456';
//       conversation._loadConversation(conversationId);
//       sinon.assert.notCalled(conversation._getCurrentSenderNumber);
//       sinon.assert.notCalled(conversation._getRecipients);
//     });
//   });

//   describe('_getCurrentSenderNumber', () => {
//     it('should return null if lastMessage is null', () => {
//       const lastMessage = null;
//       const result = conversation._getCurrentSenderNumber(lastMessage);
//       expect(result).to.equal(null);
//     });

//     it('should return senderNumber successfully', () => {
//       const lastMessage = {
//         type: 'SMS',
//         direction: 'Inbound',
//         to: [{
//           phoneNumber: '+1234567890',
//         }],
//         from: { phoneNumber: '+1234567891' },
//       };
//       conversation._extensionInfo = {
//         extensionNumber: '1234',
//       };
//       const result = conversation._getCurrentSenderNumber(lastMessage);
//       expect(result).to.deep.equal({ phoneNumber: '+1234567890' });
//     });
//   });

//   describe('_getRecipients', () => {
//     it('should return empty array if lastMessage is null', () => {
//       const lastMessage = null;
//       const senderNumber = { phoneNumber: '+1234567890' };
//       const result = conversation._getRecipients(lastMessage, senderNumber);
//       expect(result).to.deep.equal([]);
//     });

//     it('should return empty array if senderNumber is null', () => {
//       const lastMessage = {
//         type: 'SMS',
//         direction: 'Inbound',
//         to: [{
//           phoneNumber: '+1234567890',
//         }],
//         from: { phoneNumber: '+1234567891' },
//       };
//       const senderNumber = null;
//       const result = conversation._getRecipients(lastMessage, senderNumber);
//       expect(result).to.deep.equal([]);
//     });

//     it('should return senderNumber successfully', () => {
//       const lastMessage = {
//         type: 'SMS',
//         direction: 'Inbound',
//         to: [{
//           phoneNumber: '+1234567890',
//         }],
//         from: { phoneNumber: '+1234567891' },
//       };
//       const senderNumber = { phoneNumber: '+1234567890' };
//       const result = conversation._getRecipients(lastMessage, senderNumber);
//       expect(result).to.deep.equal([{ phoneNumber: '+1234567891' }]);
//     });
//   });

//   describe('_getReplyOnMessageId', () => {
//     it('should get last message id successfully', () => {
//       sinon.stub(conversation, 'messages', {
//         get: () => [{
//           id: 12345678,
//           type: 'SMS',
//           direction: 'Inbound',
//           to: [{
//             phoneNumber: '+1234567890',
//           }],
//           from: { phoneNumber: '+1234567891' },
//         }]
//       });
//       const result = conversation._getReplyOnMessageId();
//       expect(result).to.equal(12345678);
//     });

//     it('should return null if messages length is 0', () => {
//       sinon.stub(conversation, 'messages', {
//         get: () => []
//       });
//       const result = conversation._getReplyOnMessageId();
//       expect(result).to.equal(null);
//     });

//     it('should return null if messages is null', () => {
//       sinon.stub(conversation, 'messages', {
//         get: () => null
//       });
//       const result = conversation._getReplyOnMessageId();
//       expect(result).to.equal(null);
//     });

//     it('should return null if laset message id is undefined', () => {
//       sinon.stub(conversation, 'messages', {
//         get: () => [{}]
//       });
//       const result = conversation._getReplyOnMessageId();
//       expect(result).to.equal(null);
//     });
//   });

//   describe('_getFromNumber', () => {
//     it('should return null if senderNumber is null', () => {
//       sinon.stub(conversation, 'senderNumber', {
//         get: () => null
//       });
//       const result = conversation._getFromNumber();
//       expect(result).to.equal(null);
//     });

//     it('should return fromNumber if senderNumber extensionNumber exist', () => {
//       sinon.stub(conversation, 'senderNumber', {
//         get: () => ({ extensionNumber: '1234' })
//       });
//       const result = conversation._getFromNumber();
//       expect(result).to.equal('1234');
//     });

//     it('should return fromNumber if senderNumber phoneNumber exist', () => {
//       sinon.stub(conversation, 'senderNumber', {
//         get: () => ({ phoneNumber: '+1234567890' })
//       });
//       const result = conversation._getFromNumber();
//       expect(result).to.equal('+1234567890');
//     });
//   });

//   describe('_getToNumbers', () => {
//     it('should return empty array if recipients is empty', () => {
//       sinon.stub(conversation, 'recipients', {
//         get: () => []
//       });
//       const result = conversation._getToNumbers();
//       expect(result).to.deep.equal([]);
//     });

//     it('should return toNumbers if recipient extensionNumber exist', () => {
//       sinon.stub(conversation, 'recipients', {
//         get: () => [{ extensionNumber: '1234' }]
//       });
//       const result = conversation._getToNumbers();
//       expect(result).to.deep.equal(['1234']);
//     });

//     it('should return toNumbers if recipient phoneNumber exist', () => {
//       sinon.stub(conversation, 'recipients', {
//         get: () => [{ phoneNumber: '+1234567890' }]
//       });
//       const result = conversation._getToNumbers();
//       expect(result).to.deep.equal(['+1234567890']);
//     });
//   });

//   describe('replyToReceivers', () => {
//     it('should return response successfully and not call _onReplyError', async () => {
//       conversation._messageSender = {
//         send: () => ([{ id: '1234567890', conversation: { id: '1234' } }]),
//       };
//       conversation._messageStore = {
//         pushMessage: () => null,
//       };
//       sinon.stub(conversation, '_getFromNumber');
//       sinon.stub(conversation, '_getToNumbers');
//       sinon.stub(conversation, '_getReplyOnMessageId');
//       sinon.stub(conversation, '_onReplyError');
//       const result = await conversation.replyToReceivers('text');
//       expect(result).to.deep.equal({ id: '1234567890', conversation: { id: '1234' } });
//       sinon.assert.notCalled(conversation._onReplyError);
//     });

//     it('should return null when response is null and call _onReplyError', async () => {
//       conversation._messageSender = {
//         send: () => null,
//       };
//       conversation._messageStore = {
//         pushMessage: () => null,
//       };
//       sinon.stub(conversation, '_getFromNumber');
//       sinon.stub(conversation, '_getToNumbers');
//       sinon.stub(conversation, '_getReplyOnMessageId');
//       sinon.stub(conversation, '_onReplyError');
//       const result = await conversation.replyToReceivers('text');
//       expect(result).to.equal(null);
//       sinon.assert.calledOnce(conversation._onReplyError);
//     });

//     it('should call _onReplyError when response is error', async () => {
//       conversation._messageSender = {
//         send: () => { throw new Error('error'); },
//       };
//       conversation._messageStore = {
//         pushMessage: () => null,
//       };
//       sinon.stub(conversation, '_getFromNumber');
//       sinon.stub(conversation, '_getToNumbers');
//       sinon.stub(conversation, '_getReplyOnMessageId');
//       sinon.stub(conversation, '_onReplyError');
//       try {
//         await conversation.replyToReceivers('text');
//       } catch (error) {}
//       sinon.assert.calledOnce(conversation._onReplyError);
//     });
//   });
// });

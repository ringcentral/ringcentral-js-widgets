import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import Messages from './index';
import getMessagesReducer from './getMessagesReducer';
import actionTypes from './actionTypes';

// TODO this test needs to be updated

describe('Messages Unit Test', () => {
  let messages;
  let store;

  beforeEach(() => {
    messages = sinon.createStubInstance(Messages);
    store = createStore(getMessagesReducer(actionTypes));
    messages._store = store;
    messages._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_init',
      '_shouldReset',
      '_reset',
      'loadNextPageMessages',
      'updateSearchInput',
    ].forEach((key) => {
      messages[key].restore();
    });
  });

  describe('_onStateChange', () => {
    it('_init should be called once when _shouldInit is true', () => {
      sinon.stub(messages, '_shouldInit').callsFake(() => true);
      sinon.stub(messages, '_shouldReset').callsFake(() => false);
      sinon.stub(messages, '_init');
      sinon.stub(messages, '_reset');
      messages._onStateChange();
      sinon.assert.calledOnce(messages._init);
      sinon.assert.notCalled(messages._reset);
    });

    it('_reset should be called once when _shouldReset is true', () => {
      sinon.stub(messages, '_shouldInit').callsFake(() => false);
      sinon.stub(messages, '_shouldReset').callsFake(() => true);
      sinon.stub(messages, '_init');
      sinon.stub(messages, '_reset');
      messages._onStateChange();
      sinon.assert.notCalled(messages._init);
      sinon.assert.calledOnce(messages._reset);
    });
  });

  function runBooleanTest(fn, variables = 1, args = []) {
    [true, false].forEach((value) => {
      if (variables <= 1) {
        fn(...[...args, value]);
      } else {
        runBooleanTest(fn, variables - 1, [...args, value]);
      }
    });
  }
  describe('_shouldInit', () => {
    runBooleanTest(
      (
        authLoggedIn,
        messageStoreReady,
        extensionInfoReady,
        hasContactMatcher,
        contactMatcherReady,
        hasConversationLogger,
        conversationLoggerReady,
        rolesAndPermissionsReady,
        pending,
      ) => {
        const result = !!(
          authLoggedIn &&
          messageStoreReady &&
          extensionInfoReady &&
          (!hasContactMatcher || contactMatcherReady) &&
          (!hasConversationLogger || conversationLoggerReady) &&
          rolesAndPermissionsReady &&
          pending
        );
        it(
          `should return ${result} when:
          auth.loggedIn is ${authLoggedIn} and
          messageStore.ready is ${messageStoreReady} and
          extensionInfo.ready is ${extensionInfoReady} and
          rolesAndPermissions.ready is ${rolesAndPermissionsReady} and
          contactMatcher is ${hasContactMatcher ? '' : ' not '} used and
          ${
          hasContactMatcher ?
            `contactMatcher.ready is ${contactMatcherReady} and\n          ` :
            ''
          }conversationLogger is ${hasConversationLogger ? '' : ' not '} used and
          ${
          hasConversationLogger ?
            `conversationLogger.ready is ${conversationLoggerReady} and\n          ` :
            ''
          }messages.pending is ${pending}
          `,
          () => {
            messages._messageStore = {
              ready: messageStoreReady,
            };
            messages._extensionInfo = {
              ready: extensionInfoReady,
            };
            messages._auth = {
              loggedIn: authLoggedIn,
            };
            messages._rolesAndPermissions = {
              ready: rolesAndPermissionsReady,
            };
            if (hasContactMatcher) {
              messages._contactMatcher = {
                ready: contactMatcherReady,
              };
            }
            if (hasConversationLogger) {
              messages._conversationLogger = {
                ready: conversationLoggerReady,
              };
            }
            sinon.stub(messages, 'pending', { get: () => pending });
            expect(messages._shouldInit()).to.equal(result);
          },
        );
      },
      7,
    );
  });

  describe('_shouldReset', () => {
    runBooleanTest(
      (
        authLoggedIn,
        messageStoreReady,
        extensionInfoReady,
        hasContactMatcher,
        contactMatcherReady,
        hasConversationLogger,
        conversationLoggerReady,
        rolesAndPermissionsReady,
        ready,
      ) => {
        const result = !!(
          (
            !authLoggedIn ||
            !messageStoreReady ||
            !extensionInfoReady ||
            !rolesAndPermissionsReady ||
            (hasContactMatcher && !contactMatcherReady) ||
            (hasConversationLogger && !conversationLoggerReady)
          ) &&
          ready
        );
        it(
          `should return ${result} when:
          auth.loggedIn is ${authLoggedIn} and
          messageStore.ready is ${messageStoreReady} and
          extensionInfo.ready is ${extensionInfoReady} and
          rolesAndPermissions.ready is ${rolesAndPermissionsReady} and
          contactMatcher is ${hasContactMatcher ? '' : ' not '} used and
          ${
          hasContactMatcher ?
            `contactMatcher.ready is ${contactMatcherReady} and\n          ` :
            ''
          }conversationLogger is ${hasConversationLogger ? '' : ' not '} used and
          ${
          hasConversationLogger ?
            `conversationLogger.ready is ${conversationLoggerReady} and\n          ` :
            ''
          }messages.pending is ${ready}
          `,
          () => {
            messages._messageStore = {
              ready: messageStoreReady,
            };
            messages._extensionInfo = {
              ready: extensionInfoReady,
            };
            messages._auth = {
              loggedIn: authLoggedIn,
            };
            messages._rolesAndPermissions = {
              ready: rolesAndPermissionsReady,
            };
            if (hasContactMatcher) {
              messages._contactMatcher = {
                ready: contactMatcherReady,
              };
            }
            if (hasConversationLogger) {
              messages._conversationLogger = {
                ready: conversationLoggerReady,
              };
            }
            sinon.stub(messages, 'ready', { get: () => ready });
            expect(messages._shouldReset()).to.equal(result);
          },
        );
      },
      7,
    );
  });

  describe('_init', () => {
    it('should call _updateMessages and update state', () => {
      messages._contactMatcher = {
        triggerMatch: sinon.stub(),
      };
      messages._init();
      sinon.assert.calledOnce(messages._contactMatcher.triggerMatch);
    });
  });

  //   describe('loadNextPageMessages', () => {
  //     it('should not change currentPage when _getCurrnetPageMessages return empty array', () => {
  //       messages._messageStore = {
  //         updatedTimestamp: 1486954544923,
  //       };
  //       sinon.stub(messages, 'currentPage', { get: () => 1 });
  //       sinon.stub(messages, '_getCurrnetPageMessages').callsFake(() => []);
  //       messages.loadNextPageMessages();
  //       expect(store.getState().currentPage).to.equal(1);
  //     });

  //     it('should add currentPage when _getCurrnetPageMessages return array with number', () => {
  //       messages._messageStore = {
  //         updatedTimestamp: 1486954544923,
  //       };
  //       sinon.stub(messages, 'currentPage', { get: () => 1 });
  //       sinon.stub(messages, '_getCurrnetPageMessages').callsFake(() => [1]);
  //       messages.loadNextPageMessages();
  //       expect(store.getState().currentPage).to.equal(2);
  //     });
  //   });
});

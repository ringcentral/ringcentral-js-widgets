import { expect } from 'chai';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import getReducer, {
  getSearchInputReducer,
  getTypeFilterReducer,
  getOldConversationsReducer,
  getFetchConversationsStatusReducer,
  getCurrentPageReducer,
  getCurrentConversationIdReducer,
  getOldMessagesReducer,
  getFetchMessagesStatusReducer,
  getMessageTextsReducer,
  getConversationStatusReducer,
} from './getReducer';

import actionTypes from './actionTypes';
import status from './status';
import messageTypes from '../../enums/messageTypes';

describe('Conversations :: getSearchInputReducer', () => {
  it('getSearchInputReducer should be a function', () => {
    expect(getSearchInputReducer).to.be.a('function');
  });
  it('getSearchInputReducer should return a reducer', () => {
    expect(getSearchInputReducer()).to.be.a('function');
  });
  describe('searchInputReducer', () => {
    const reducer = getSearchInputReducer(actionTypes);
    it('should have initial state of empty string', () => {
      expect(reducer(undefined, {})).to.equal('');
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return new input on updateSearchInput', () => {
      expect(reducer('foo', {
        type: actionTypes.updateSearchInput,
        input: 'ddd'
      })).to.equal('ddd');
    });
    it('should return empty string on resetSuccess', () => {
      expect(reducer('foo', {
        type: actionTypes.resetSuccess,
      })).to.equal('');
    });
  });
});

describe('Conversations :: getTypeFilterReducer', () => {
  it('getTypeFilterReducer should be a function', () => {
    expect(getTypeFilterReducer).to.be.a('function');
  });
  it('getTypeFilterReducer should return a reducer', () => {
    expect(getTypeFilterReducer()).to.be.a('function');
  });
  describe('typeFilterReducer', () => {
    const reducer = getTypeFilterReducer(actionTypes);
    it('should have initial state of all', () => {
      expect(reducer(undefined, {})).to.equal(messageTypes.all);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return new input on updateSearchInput', () => {
      expect(reducer('foo', {
        type: actionTypes.updateTypeFilter,
        typeFilter: 'ddd'
      })).to.equal('ddd');
    });
    it('should return all on resetSuccess', () => {
      expect(reducer('foo', {
        type: actionTypes.resetSuccess,
      })).to.equal(messageTypes.all);
    });
  });
});

describe('Conversations :: getOldConversationsReducer', () => {
  it('getOldConversationsReducer should be a function', () => {
    expect(getOldConversationsReducer).to.be.a('function');
  });
  it('getOldConversationsReducer should return a reducer', () => {
    expect(getOldConversationsReducer()).to.be.a('function');
  });
  describe('oldConversationsReducer', () => {
    const reducer = getOldConversationsReducer(actionTypes);
    const record = JSON.parse(`{
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/208594004/extension/208594004/message-store/5475922005",
      "id": 5475922005,
      "to": [
        {
          "extensionNumber": "101",
          "name": "Something1 New1"
        }
      ],
      "from": {
        "extensionNumber": "101",
        "name": "Something1 New1"
      },
      "type": "Pager",
      "creationTime": "2017-06-01T02:24:02.000Z",
      "readStatus": "Unread",
      "priority": "Normal",
      "attachments": [
        {
          "id": 5475922005,
          "uri": "https://platform.ringcentral.com/restapi/v1.0/account/208594004/extension/208594004/message-store/5475922005/content/5475922005",
          "type": "Text",
          "contentType": "text/plain"
        }
      ],
      "direction": "Inbound",
      "availability": "Alive",
      "subject": "test 2",
      "messageStatus": "Sent",
      "conversationId": 6015823250778200202,
      "conversation": {
        "id": "6015823250778200202",
        "uri": "https://platform.ringcentral.com/restapi/v1.0/conversation/6015823250778200202"
      },
      "lastModifiedTime": "2017-06-01T02:24:08.238Z",
      "pgToDepartment": false
    }`);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return new array with new record on fetchOldConverstaionsSuccess', () => {
      expect(reducer([{}], {
        type: actionTypes.fetchOldConverstaionsSuccess,
        records: [record]
      }).length).to.equal(2);
    });
    it('should delete conversation on deleteConversation', () => {
      expect(reducer([{ conversationId: '666' }], {
        type: actionTypes.deleteConversation,
        conversationId: '666'
      }).length).to.equal(0);
    });
    it('should return [] on resetSuccess and initSuccess', () => {
      [
        actionTypes.cleanOldConversatioans,
        actionTypes.resetSuccess,
        actionTypes.updateTypeFilter,
        actionTypes.updateTypeFilter
      ].forEach((type) => {
        expect(reducer([{}], {
          type,
        })).to.deep.equal([]);
      });
    });
  });
});

describe('Conversations :: getFetchConversationsStatusReducer', () => {
  it('getFetchConversationsStatusReducer should be a function', () => {
    expect(getFetchConversationsStatusReducer).to.be.a('function');
  });
  it('getFetchConversationsStatusReducer should return a reducer', () => {
    expect(getFetchConversationsStatusReducer()).to.be.a('function');
  });
  describe('fetchConversationsStatusReducer', () => {
    const reducer = getFetchConversationsStatusReducer(actionTypes);
    it('should have initial state of idle', () => {
      expect(reducer(undefined, {})).to.equal(status.idle);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return fetching on fetchOldConverstaions', () => {
      expect(reducer('foo', {
        type: actionTypes.fetchOldConverstaions,
      })).to.equal(status.fetching);
    });
    it('should return idle on resetSuccess', () => {
      [
        actionTypes.fetchOldConverstaionsSuccess,
        actionTypes.fetchOldConverstaionsError,
        actionTypes.resetSuccess,
        actionTypes.updateTypeFilter,
        actionTypes.initSuccess,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(status.idle);
      });
    });
  });
});

describe('Conversations :: getCurrentPageReducer', () => {
  it('getCurrentPageReducer should be a function', () => {
    expect(getCurrentPageReducer).to.be.a('function');
  });
  it('getCurrentPageReducer should return a reducer', () => {
    expect(getCurrentPageReducer()).to.be.a('function');
  });
  describe('currentPageReducer', () => {
    const reducer = getCurrentPageReducer(actionTypes);
    it('should have initial state of 1', () => {
      expect(reducer(undefined, {})).to.equal(1);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should increase page on increaseCurrentPage or fetchOldConverstaionsSuccess', () => {
      [
        actionTypes.increaseCurrentPage,
        actionTypes.fetchOldConverstaionsSuccess,
      ].forEach((type) => {
        expect(reducer(2, {
          type,
        })).to.equal(3);
      });
    });
    it('should return idle on resetSuccess', () => {
      [
        actionTypes.updateTypeFilter,
        actionTypes.initSuccess,
        actionTypes.resetSuccess,
        actionTypes.resetCurrentPage,
      ].forEach((type) => {
        expect(reducer(5, {
          type,
        })).to.equal(1);
      });
    });
  });
});

describe('Conversations :: getCurrentConversationIdReducer', () => {
  it('getCurrentConversationIdReducer should be a function', () => {
    expect(getCurrentConversationIdReducer).to.be.a('function');
  });
  it('getCurrentConversationIdReducer should return a reducer', () => {
    expect(getCurrentConversationIdReducer()).to.be.a('function');
  });
  describe('currentConversationIdReducer', () => {
    const reducer = getCurrentConversationIdReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return new conversationId on updateCurrentConversationId', () => {
      expect(reducer('foo', {
        type: actionTypes.updateCurrentConversationId,
        conversationId: 'ddd'
      })).to.equal('ddd');
    });
    it('should return null on resetSuccess and initSuccess', () => {
      [
        actionTypes.initSuccess,
        actionTypes.resetSuccess,
      ].forEach((type) => {
        expect(reducer('123', {
          type,
        })).to.deep.equal(null);
      });
    });
  });
});

describe('Conversations :: getOldMessagesReducer', () => {
  it('getOldMessagesReducer should be a function', () => {
    expect(getOldMessagesReducer).to.be.a('function');
  });
  it('getOldMessagesReducer should return a reducer', () => {
    expect(getOldMessagesReducer()).to.be.a('function');
  });
  describe('oldMessagesReducer', () => {
    const reducer = getOldMessagesReducer(actionTypes);
    const record = JSON.parse(`{
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/208594004/extension/208594004/message-store/5475922005",
      "id": 5475922005,
      "to": [
        {
          "extensionNumber": "101",
          "name": "Something1 New1"
        }
      ],
      "from": {
        "extensionNumber": "101",
        "name": "Something1 New1"
      },
      "type": "Pager",
      "creationTime": "2017-06-01T02:24:02.000Z",
      "readStatus": "Unread",
      "priority": "Normal",
      "attachments": [
        {
          "id": 5475922005,
          "uri": "https://platform.ringcentral.com/restapi/v1.0/account/208594004/extension/208594004/message-store/5475922005/content/5475922005",
          "type": "Text",
          "contentType": "text/plain"
        }
      ],
      "direction": "Inbound",
      "availability": "Alive",
      "subject": "test 2",
      "messageStatus": "Sent",
      "conversationId": 6015823250778200202,
      "conversation": {
        "id": "6015823250778200202",
        "uri": "https://platform.ringcentral.com/restapi/v1.0/conversation/6015823250778200202"
      },
      "lastModifiedTime": "2017-06-01T02:24:08.238Z",
      "pgToDepartment": false
    }`);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return new array with new record on fetchOldMessagesSuccess', () => {
      expect(reducer([{}], {
        type: actionTypes.fetchOldMessagesSuccess,
        records: [record]
      }).length).to.equal(2);
    });
    it('should return [] on resetSuccess and initSuccess', () => {
      [
        actionTypes.updateCurrentConversationId,
        actionTypes.resetSuccess,
        actionTypes.initSuccess
      ].forEach((type) => {
        expect(reducer([{}], {
          type,
        })).to.deep.equal([]);
      });
    });
  });
});

describe('Conversations :: getFetchMessagesStatusReducer', () => {
  it('getFetchMessagesStatusReducer should be a function', () => {
    expect(getFetchMessagesStatusReducer).to.be.a('function');
  });
  it('getFetchMessagesStatusReducer should return a reducer', () => {
    expect(getFetchMessagesStatusReducer()).to.be.a('function');
  });
  describe('fetchMessagesStatusReducer', () => {
    const reducer = getFetchMessagesStatusReducer(actionTypes);
    it('should have initial state of idle', () => {
      expect(reducer(undefined, {})).to.equal(status.idle);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return fetching on fetchOldMessages', () => {
      expect(reducer('foo', {
        type: actionTypes.fetchOldMessages,
      })).to.equal(status.fetching);
    });
    it('should return idle on resetSuccess', () => {
      [
        actionTypes.fetchOldMessagesSuccess,
        actionTypes.fetchOldMessagesError,
        actionTypes.updateCurrentConversationId,
        actionTypes.resetSuccess,
        actionTypes.initSuccess,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(status.idle);
      });
    });
  });
});

describe('CompostText :: getMessageTextsReducer', () => {
  it('getMessageTextsReducer should be a function', () => {
    expect(getMessageTextsReducer).to.be.a('function');
  });
  it('getMessageTextsReducer should return a reducer', () => {
    expect(getMessageTextsReducer()).to.be.a('function');
  });
  describe('messageTextsReducer', () => {
    const reducer = getMessageTextsReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {}).length).to.equal(0);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = [{ id: 1, text: '' }];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should updates the messages array on updateMessageText', () => {
      expect(reducer([{ conversationId: 1, text: '' }], {
        type: actionTypes.updateMessageText,
        text: '12345678',
        conversationId: 2
      })).to.deep.equal([
        { conversationId: 2, text: '12345678' },
        { conversationId: 1, text: '' }
      ]);
    });
    it('should return blank string on removeMessageText', () => {
      expect(reducer([{ conversationId: 1, text: '' }], {
        type: actionTypes.removeMessageText,
        conversationId: 1
      })).to.deep.equal([]);
    });
  });
});

describe('Conversations :: getConversationStatusReducer', () => {
  it('getConversationStatusReducer should be a function', () => {
    expect(getConversationStatusReducer).to.be.a('function');
  });
  it('getConversationStatusReducer should return a reducer', () => {
    expect(getConversationStatusReducer()).to.be.a('function');
  });
  describe('conversationStatusReducer', () => {
    const reducer = getConversationStatusReducer(actionTypes);
    it('should have initial state of idle', () => {
      expect(reducer(undefined, {})).to.equal(status.idle);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return fetching on reply', () => {
      expect(reducer('foo', {
        type: actionTypes.reply,
      })).to.equal(status.pushing);
    });
    it('should return idle on resetSuccess and replyError', () => {
      [
        actionTypes.replySuccess,
        actionTypes.replyError,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(status.idle);
      });
    });
  });
});

describe('getReducer', () => {
  it('should be a function', () => {
    expect(getReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getReducer(actionTypes)).to.be.a('function');
  });
  describe('reducer', () => {
    const reducer = getReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const searchInputReducer = getSearchInputReducer(actionTypes);
    const typeFilterReducer = getTypeFilterReducer(actionTypes);
    const oldConversationsReducer = getOldConversationsReducer(actionTypes);
    const currentPageReducer = getCurrentPageReducer(actionTypes);
    const fetchConversationsStatusReducer = getFetchConversationsStatusReducer(actionTypes);
    const currentConversationIdReducer = getCurrentConversationIdReducer(actionTypes);
    const oldMessagesReducer = getOldMessagesReducer(actionTypes);
    const fetchMessagesStatusReducer = getFetchMessagesStatusReducer(actionTypes);
    const messageTextsReducer = getMessageTextsReducer(actionTypes);
    const conversationStatusReducer = getConversationStatusReducer(actionTypes);

    it('should return the combined initialState', () => {
      expect(reducer(undefined, {})).to.deep.equal({
        status: statusReducer(undefined, {}),
        searchInput: searchInputReducer(undefined, {}),
        typeFilter: typeFilterReducer(undefined, {}),
        oldConversations: oldConversationsReducer(undefined, {}),
        currentPage: currentPageReducer(undefined, {}),
        fetchConversationsStatus: fetchConversationsStatusReducer(undefined, {}),
        currentConversationId: currentConversationIdReducer(undefined, {}),
        oldMessages: oldMessagesReducer(undefined, {}),
        fetchMessagesStatus: fetchMessagesStatusReducer(undefined, {}),
        messageTexts: messageTextsReducer(undefined, {}),
        conversationStatus: conversationStatusReducer(undefined, {}),
      });
    });
  });
});

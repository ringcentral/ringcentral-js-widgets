import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import status from './status';

export function getGlipPostsStatusReducer(types) {
  return (state = status.idle, { type }) => {
    switch (type) {
      case types.fetch:
        return status.fetching;
      case types.fetchError:
      case types.fetchSuccess:
        return status.idle;
      default:
        return state;
    }
  };
}

export function getGlipPostsCreateStatusReducer(types) {
  return (state = status.idle, { type }) => {
    switch (type) {
      case types.create:
        return status.creating;
      case types.createError:
      case types.createSuccess:
        return status.idle;
      default:
        return state;
    }
  };
}

export function getGlipPostsStoreReducer(types) {
  return (state = {}, {
    type, groupId, records, record, oldRecordId, isSendByMe, lastPageToken
  }) => {
    let newState;
    let newPosts;
    let oldPostIndex;
    switch (type) {
      case types.fetchSuccess:
        newState = {
          ...state,
        };
        if (!lastPageToken) {
          newState[groupId] = records;
        } else {
          const preRecords = newState[groupId];
          newState[groupId] = [].concat(preRecords).concat(records);
        }
        return newState;
      case types.create:
      case types.createSuccess:
      case types.createError:
        newState = {
          ...state,
        };
        newPosts = (newState[groupId] && [...newState[groupId]]) || [];
        if (oldRecordId) {
          oldPostIndex = newPosts.findIndex(p => p.id === oldRecordId);
        }
        if (oldPostIndex > -1) {
          newPosts.splice(oldPostIndex, 1, record);
          newState[groupId] = newPosts;
        } else if (isSendByMe) {
          oldPostIndex = newPosts.findIndex(p =>
            p.creatorId === record.creatorId &&
            p.text === record.text &&
            p.sendStatus === status.creating
          );
          if (oldPostIndex === -1) {
            newState[groupId] = [record].concat(newPosts.filter(p => p.id !== record.id));
          }
        } else {
          newState[groupId] = [record].concat(newPosts.filter(p => p.id !== record.id));
        }
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export function getGlipPostsInputsReducer(types) {
  return (state = {}, { type, groupId, textValue }) => {
    let newState;
    switch (type) {
      case types.updatePostInput:
        newState = {
          ...state,
        };
        newState[groupId] = {
          text: textValue,
        };
        return newState;
      default:
        return state;
    }
  };
}

export function getGlipPostsReadTimeReducer(types) {
  return (state = {}, { type, groupId, time = Date.now() }) => {
    let newState;
    switch (type) {
      case types.updateReadTime:
        newState = {
          ...state,
        };
        newState[groupId] = time;
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export function getGlipPostsPageInfoReducer(types) {
  return (state = {}, { type, groupId, navigation }) => {
    let newState;
    switch (type) {
      case types.fetchSuccess:
        newState = {
          ...state,
        };
        newState[groupId] = navigation;
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export function getGlipPostsFetchTimeReducer(types) {
  return (state = {}, { type, groupId }) => {
    let newState;
    switch (type) {
      case types.fetchSuccess:
        newState = {
          ...state,
        };
        newState[groupId] = Date.now();
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export default function getGlipPostsReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    fetchStatus: getGlipPostsStatusReducer(types),
    glipPostsStore: getGlipPostsStoreReducer(types),
    createStatus: getGlipPostsCreateStatusReducer(types),
    postInputs: getGlipPostsInputsReducer(types),
    pageInfos: getGlipPostsPageInfoReducer(types),
    fetchTimes: getGlipPostsFetchTimeReducer(types),
  });
}

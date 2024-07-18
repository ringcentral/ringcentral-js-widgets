import { combineReducers } from 'redux';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import status from './status';

export function getGlipPostsStatusReducer(types: any) {
  return (state = status.idle, { type }: any) => {
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

export function getGlipPostsCreateStatusReducer(types: any) {
  return (state = status.idle, { type }: any) => {
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

export function getGlipPostsStoreReducer(types: any) {
  return (
    state = {},
    {
      type,
      groupId,
      records,
      record,
      oldRecordId,
      isSendByMe,
      lastPageToken,
    }: any,
  ) => {
    let newState;
    let newPosts;
    let oldPostIndex;
    switch (type) {
      case types.fetchSuccess:
        newState = {
          ...state,
        };
        if (!lastPageToken) {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          newState[groupId] = records;
        } else {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const preRecords = newState[groupId];
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          newState[groupId] = [].concat(preRecords).concat(records);
        }
        return newState;
      case types.create:
      case types.createSuccess:
      case types.createError:
        newState = {
          ...state,
        };
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        newPosts = (newState[groupId] && [...newState[groupId]]) || [];
        if (oldRecordId) {
          oldPostIndex = newPosts.findIndex((p: any) => p.id === oldRecordId);
        } else {
          oldPostIndex = newPosts.findIndex((p: any) => p.id === record.id);
        }
        if (oldPostIndex > -1) {
          newPosts.splice(oldPostIndex, 1, record);
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          newState[groupId] = newPosts;
        } else if (isSendByMe) {
          oldPostIndex = newPosts.findIndex(
            (p: any) =>
              p.creatorId === record.creatorId &&
              p.text === record.text &&
              p.sendStatus === status.creating,
          );
          if (oldPostIndex === -1) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            newState[groupId] = [record].concat(
              newPosts.filter((p: any) => p.id !== record.id),
            );
          }
        } else {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          newState[groupId] = [record].concat(
            newPosts.filter((p: any) => p.id !== record.id),
          );
        }
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export function getGlipPostsInputsReducer(types: any) {
  return (state = {}, { type, groupId, textValue, mentions }: any) => {
    let newState;
    switch (type) {
      case types.updatePostInput:
        newState = {
          ...state,
        };
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        newState[groupId] = {
          text: textValue,
          mentions,
        };
        return newState;
      default:
        return state;
    }
  };
}

export function getGlipPostsReadTimeReducer(types: any) {
  return (state = {}, { type, groupId, time = Date.now() }: any) => {
    let newState;
    switch (type) {
      case types.updateReadTime:
        newState = {
          ...state,
        };
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        newState[groupId] = time;
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export function getGlipPostsPageInfoReducer(types: any) {
  return (state = {}, { type, groupId, navigation }: any) => {
    let newState;
    switch (type) {
      case types.fetchSuccess:
        newState = {
          ...state,
        };
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        newState[groupId] = navigation;
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export function getGlipPostsFetchTimeReducer(types: any) {
  return (state = {}, { type, groupId }: any) => {
    let newState;
    switch (type) {
      case types.fetchSuccess:
        newState = {
          ...state,
        };
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        newState[groupId] = Date.now();
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

export default function getGlipPostsReducer(types: any, reducers = {}) {
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

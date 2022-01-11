import { combineReducers } from 'redux';

function getReducer(type, cleanType) {
  return (state = '', action) => {
    if (action.type === type) {
      return action.value;
    } else if (action.type === cleanType) {
      return '';
    }
    return state;
  };
}

export function getEmailReducer(actionTypes) {
  return getReducer(actionTypes.updateEmail, actionTypes.clean);
}

export function getTopicReducer(actionTypes) {
  return getReducer(actionTypes.updateTopic, actionTypes.clean);
}

export function getSubjectReducer(actionTypes) {
  return getReducer(actionTypes.updateSubject, actionTypes.clean);
}

export function getDescriptionReducer(actionTypes) {
  return getReducer(actionTypes.updateDescription, actionTypes.clean);
}

export default function getCacheReducer(actionTypes) {
  return combineReducers({
    email: getEmailReducer(actionTypes),
    topic: getTopicReducer(actionTypes),
    subject: getSubjectReducer(actionTypes),
    description: getDescriptionReducer(actionTypes),
  });
}

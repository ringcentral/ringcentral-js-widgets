'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmailReducer = getEmailReducer;
exports.getTopicReducer = getTopicReducer;
exports.getSubjectReducer = getSubjectReducer;
exports.getDescriptionReducer = getDescriptionReducer;
exports.default = getCacheReducer;

var _redux = require('redux');

function getReducer(type, cleanType) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments[1];

    if (action.type === type) {
      return action.value;
    } else if (action.type === cleanType) {
      return '';
    }
    return state;
  };
}

function getEmailReducer(actionTypes) {
  return getReducer(actionTypes.updateEmail, actionTypes.clean);
}

function getTopicReducer(actionTypes) {
  return getReducer(actionTypes.updateTopic, actionTypes.clean);
}

function getSubjectReducer(actionTypes) {
  return getReducer(actionTypes.updateSubject, actionTypes.clean);
}

function getDescriptionReducer(actionTypes) {
  return getReducer(actionTypes.updateDescription, actionTypes.clean);
}

function getCacheReducer(actionTypes) {
  return (0, _redux.combineReducers)({
    email: getEmailReducer(actionTypes),
    topic: getTopicReducer(actionTypes),
    subject: getSubjectReducer(actionTypes),
    description: getDescriptionReducer(actionTypes)
  });
}
//# sourceMappingURL=getCacheReducer.js.map

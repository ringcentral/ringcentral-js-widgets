"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCacheReducer;
exports.getDescriptionReducer = getDescriptionReducer;
exports.getEmailReducer = getEmailReducer;
exports.getSubjectReducer = getSubjectReducer;
exports.getTopicReducer = getTopicReducer;

var _redux = require("redux");

function getReducer(type, cleanType) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var action = arguments.length > 1 ? arguments[1] : undefined;

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

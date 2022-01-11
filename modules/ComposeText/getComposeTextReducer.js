"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getComposeTextReducer;
exports.getMessageText = getMessageText;
exports.getSenderNumber = getSenderNumber;
exports.getToNumberEntityReducer = getToNumberEntityReducer;
exports.getToNumbers = getToNumbers;
exports.getTypingToNumber = getTypingToNumber;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.slice");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getSenderNumber(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        number = _ref.number;

    switch (type) {
      case types.updateSenderNumber:
        return number;

      default:
        return state;
    }
  };
}

function getTypingToNumber(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        number = _ref2.number;

    switch (type) {
      case types.updateTypingToNumber:
        return number;

      case types.clean:
      case types.cleanTypingToNumber:
        return '';

      default:
        return state;
    }
  };
}

function getToNumberEntityReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        entityId = _ref3.entityId;

    switch (type) {
      case types.toNumberMatched:
        return entityId;

      case types.clean:
      case types.cleanTypingToNumber:
        return '';

      default:
        return state;
    }
  };
}

function getToNumbers(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        number = _ref4.number;

    var newState = state.slice();

    switch (type) {
      case types.addToNumber:
        // known entity id eg. from click2SMS
        if (number.id) {
          var idx = newState.findIndex(function (item) {
            return number.id === item.id || number.phoneNumber === item.phoneNumber;
          });

          if (idx > -1) {
            // replace old one if found
            newState[idx] = number;
            return newState;
          }
        } else {
          var oldNumber = newState.find(function (item) {
            return number.phoneNumber === item.phoneNumber;
          });

          if (oldNumber) {
            return newState;
          }
        }

        newState.push(number);
        return newState;

      case types.removeToNumber:
        return state.filter(function (item) {
          return item.phoneNumber !== number.phoneNumber;
        });

      case types.clean:
        return [];

      default:
        return state;
    }
  };
}

function getMessageText(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        text = _ref5.text;

    switch (type) {
      case types.updateMessageText:
        return text;

      case types.clean:
        return '';

      default:
        return state;
    }
  };
}

function getComposeTextReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    senderNumber: getSenderNumber(types),
    typingToNumber: getTypingToNumber(types),
    toNumbers: getToNumbers(types),
    messageText: getMessageText(types),
    toNumberEntity: getToNumberEntityReducer(types)
  });
}
//# sourceMappingURL=getComposeTextReducer.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSenderNumber = getSenderNumber;
exports.getTypingToNumber = getTypingToNumber;
exports.getToNumberEntityReducer = getToNumberEntityReducer;
exports.getToNumbers = getToNumbers;
exports.getMessageText = getMessageText;
exports.default = getComposeTextReducer;

require('core-js/fn/array/find');

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSenderNumber(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var _ref = arguments[1];
    var type = _ref.type,
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
    var _ref2 = arguments[1];
    var type = _ref2.type,
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
    var _ref3 = arguments[1];
    var type = _ref3.type,
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
    var _ref4 = arguments[1];
    var type = _ref4.type,
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
    var _ref5 = arguments[1];
    var type = _ref5.type,
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
    status: (0, _getModuleStatusReducer2.default)(types),
    senderNumber: getSenderNumber(types),
    typingToNumber: getTypingToNumber(types),
    toNumbers: getToNumbers(types),
    messageText: getMessageText(types),
    toNumberEntity: getToNumberEntityReducer(types)
  });
}
//# sourceMappingURL=getComposeTextReducer.js.map

"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCallStatusReducer = getCallStatusReducer;
exports.getToNumberEntitiesReducer = getToNumberEntitiesReducer;
exports.getLastPhoneNumberReducer = getLastPhoneNumberReducer;
exports.getLastRecipientReducer = getLastRecipientReducer;
exports.default = getCallReducer;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _callStatus = _interopRequireDefault(require("./callStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getCallStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _callStatus.default.idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.connect:
        return _callStatus.default.connecting;

      case types.connectSuccess:
      case types.connectError:
        return _callStatus.default.idle;

      default:
        return state;
    }
  };
}

function getToNumberEntitiesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        data = _ref2.data;

    switch (type) {
      case types.toNumberMatched:
        return [].concat(_toConsumableArray(state), [data]);

      case types.cleanToNumberEntities:
      case types.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}

function getLastPhoneNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        isConference = _ref3.isConference,
        _ref3$phoneNumber = _ref3.phoneNumber,
        phoneNumber = _ref3$phoneNumber === void 0 ? null : _ref3$phoneNumber;

    switch (type) {
      case types.connect:
        return isConference ? state : phoneNumber;

      default:
        return state;
    }
  };
}

function getLastRecipientReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        isConference = _ref4.isConference,
        _ref4$recipient = _ref4.recipient,
        recipient = _ref4$recipient === void 0 ? null : _ref4$recipient;

    switch (type) {
      case types.connect:
        return isConference ? state : recipient;

      default:
        return state;
    }
  };
}

function getCallReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer.default)(types),
    callStatus: getCallStatusReducer(types),
    toNumberEntities: getToNumberEntitiesReducer(types)
  });
}
//# sourceMappingURL=getCallReducer.js.map

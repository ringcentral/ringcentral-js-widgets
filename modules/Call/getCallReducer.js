"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCallReducer;
exports.getCallStatusReducer = getCallStatusReducer;
exports.getLastPhoneNumberReducer = getLastPhoneNumberReducer;
exports.getLastRecipientReducer = getLastRecipientReducer;
exports.getToNumberEntitiesReducer = getToNumberEntitiesReducer;

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _callStatus = require("./callStatus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getCallStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _callStatus.callStatus.idle;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.connect:
        return _callStatus.callStatus.connecting;

      case types.connectSuccess:
      case types.connectError:
        return _callStatus.callStatus.idle;

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
    status: (0, _getModuleStatusReducer["default"])(types),
    callStatus: getCallStatusReducer(types),
    toNumberEntities: getToNumberEntitiesReducer(types)
  });
}
//# sourceMappingURL=getCallReducer.js.map

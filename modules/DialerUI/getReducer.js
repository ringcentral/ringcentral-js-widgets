"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToNumberFieldReducer = getToNumberFieldReducer;
exports.getRecipientReducer = getRecipientReducer;
exports.getIsLastInputFromDialpadReducer = getIsLastInputFromDialpadReducer;
exports["default"] = getReducer;

require("core-js/modules/es6.object.define-property");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("@ringcentral-integration/commons/lib/getModuleStatusReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getToNumberFieldReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        phoneNumber = _ref.phoneNumber;

    switch (type) {
      case types.setToNumberField:
      case types.loadLastCallState:
      case types.call:
        return phoneNumber;

      case types.setRecipient:
      case types.clearToNumberField:
      case types.resetSuccess:
      case types.callSuccess:
        return '';

      default:
        return state;
    }
  };
}

function getRecipientReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        recipient = _ref2.recipient;

    switch (type) {
      case types.setRecipient:
      case types.loadLastCallState:
      case types.call:
        return recipient;

      case types.clearRecipient:
      case types.resetSuccess:
      case types.callSuccess:
        return null;

      default:
        return state;
    }
  };
}

function getIsLastInputFromDialpadReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        _ref3$fromDialPad = _ref3.fromDialPad,
        fromDialPad = _ref3$fromDialPad === void 0 ? false : _ref3$fromDialPad;

    switch (type) {
      case types.setToNumberField:
        return fromDialPad;

      case types.clearToNumberField:
      case types.setRecipient:
      case types.clearRecipient:
      case types.loadLastCallState:
      case types.call:
      case types.resetSuccess:
      case types.callSuccess:
        return false;

      default:
        return state;
    }
  };
}

function getReducer(types) {
  var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), {}, {
    status: (0, _getModuleStatusReducer["default"])(types),
    toNumberField: getToNumberFieldReducer(types),
    recipient: getRecipientReducer(types),
    isLastInputFromDialpad: getIsLastInputFromDialpadReducer(types)
  }));
}
//# sourceMappingURL=getReducer.js.map

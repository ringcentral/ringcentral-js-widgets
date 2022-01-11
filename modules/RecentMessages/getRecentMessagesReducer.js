"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es7.symbol.async-iterator");

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
exports["default"] = getRecentMessagesReducer;
exports.getContactsReducer = getContactsReducer;
exports.getMessageStatusReducer = getMessageStatusReducer;
exports.getMessagesReducer = getMessagesReducer;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.map");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _messageStatus = _interopRequireDefault(require("./messageStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getContactsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        contact = _ref.contact,
        sessionId = _ref.sessionId;

    var contactId = String(contact && contact.id);

    if (type === types.loadSuccess) {
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId, contact));
    } else if (type === types.loadReset) {
      var _ref2 = sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId,
          _ = state[_ref2],
          rest = _objectWithoutProperties(state, [_ref2].map(_toPropertyKey));

      return rest;
    }

    return state;
  };
}

function getMessagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        contact = _ref3.contact,
        messages = _ref3.messages,
        sessionId = _ref3.sessionId;

    var contactId = String(contact && contact.id);

    if (type === types.loadSuccess) {
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId, messages));
    } else if (type === types.loadReset) {
      var _ref4 = sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId,
          _ = state[_ref4],
          rest = _objectWithoutProperties(state, [_ref4].map(_toPropertyKey));

      return rest;
    }

    return state;
  };
}

function getMessageStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type;

    switch (type) {
      case types.initLoad:
        return _messageStatus["default"].loading;

      case types.loadReset:
      case types.loadSuccess:
        return _messageStatus["default"].loaded;

      default:
        return state;
    }
  };
}

function getRecentMessagesReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    contacts: getContactsReducer(types),
    messages: getMessagesReducer(types),
    messageStatus: getMessageStatusReducer(types)
  });
}
//# sourceMappingURL=getRecentMessagesReducer.js.map

"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortMessages = exports.markAsRemoteMessage = exports.flattenToMessageRecords = exports.filterPhoneNumber = exports.dedup = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var filterPhoneNumber = function filterPhoneNumber(message) {
  return function (_ref) {
    var phoneNumber = _ref.phoneNumber;
    return phoneNumber === message.from.phoneNumber || !!message.to.find(function (to) {
      return to.phoneNumber === phoneNumber;
    }) || phoneNumber === message.from.extensionNumber || !!message.to.find(function (to) {
      return to.extensionNumber === phoneNumber;
    });
  };
};
exports.filterPhoneNumber = filterPhoneNumber;
var flattenToMessageRecords = function flattenToMessageRecords(allMessages) {
  return allMessages.reduce(function (acc, _ref2) {
    var records = _ref2.records;
    return acc.concat(records);
  }, []);
};
exports.flattenToMessageRecords = flattenToMessageRecords;
var sortMessages = function sortMessages(recentMessages) {
  // Sort by time in descending order
  return recentMessages.sort(function (a, b) {
    return new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime();
  });
};
exports.sortMessages = sortMessages;
var markAsRemoteMessage = function markAsRemoteMessage(messages) {
  return messages.map(function (message) {
    return _objectSpread(_objectSpread({}, message), {}, {
      fromRemote: true
    });
  });
};
exports.markAsRemoteMessage = markAsRemoteMessage;
var dedup = function dedup(messages) {
  var hash = {};
  return messages.reduce(function (acc, cur) {
    if (hash[cur.id]) return acc;
    hash[cur.id] = true;
    return acc.concat(cur);
  }, []);
};
exports.dedup = dedup;
//# sourceMappingURL=recentMessagesHelper.js.map

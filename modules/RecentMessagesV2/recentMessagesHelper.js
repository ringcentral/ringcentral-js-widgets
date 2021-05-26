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

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedup = exports.markAsRemoteMessage = exports.sortMessages = exports.flattenToMessageRecords = exports.filterPhoneNumber = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.find");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

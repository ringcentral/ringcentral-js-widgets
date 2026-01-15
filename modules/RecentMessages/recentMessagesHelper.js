"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortMessages = exports.markAsRemoteMessage = exports.flattenToMessageRecords = exports.filterPhoneNumber = exports.dedup = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var filterPhoneNumber = exports.filterPhoneNumber = function filterPhoneNumber(message) {
  // @ts-expect-error TS(2537): Type 'EntityPhoneNumberItem[] | undefined' has no ... Remove this comment to see the full error message
  return function (_ref) {
    var phoneNumber = _ref.phoneNumber;
    return (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      phoneNumber === message.from.phoneNumber ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !!message.to.find(function (to) {
        return to.phoneNumber === phoneNumber;
      }) ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      phoneNumber === message.from.extensionNumber ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !!message.to.find(function (to) {
        return to.extensionNumber === phoneNumber;
      })
    );
  };
};
var flattenToMessageRecords = exports.flattenToMessageRecords = function flattenToMessageRecords(allMessages) {
  return allMessages.reduce(
  // @ts-expect-error TS(2769): No overload matches this call.
  function (acc, _ref2) {
    var records = _ref2.records;
    return acc.concat(records);
  }, []);
};
var sortMessages = exports.sortMessages = function sortMessages(recentMessages) {
  // Sort by time in descending order
  return recentMessages.sort(function (a, b) {
    return (
      // @ts-expect-error TS(2769): No overload matches this call.
      new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime()
    );
  });
};
var markAsRemoteMessage = exports.markAsRemoteMessage = function markAsRemoteMessage(messages) {
  return messages.map(function (message) {
    return _objectSpread(_objectSpread({}, message), {}, {
      fromRemote: true
    });
  });
};
var dedup = exports.dedup = function dedup(messages) {
  var hash = {};
  return messages.reduce(function (acc, cur) {
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    if (hash[cur.id]) return acc;
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    hash[cur.id] = true;
    // @ts-expect-error TS(2769): No overload matches this call.
    return acc.concat(cur);
  }, []);
};
//# sourceMappingURL=recentMessagesHelper.js.map

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
exports.getContactDisplayInfo = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.string.trim.js");
var _i18n = require("../i18n");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getContactDisplayInfo = exports.getContactDisplayInfo = function getContactDisplayInfo(options) {
  var callerId = options.callerId,
    serverName = options.serverName,
    queueName = options.queueName,
    _options$matches = options.matches,
    matches = _options$matches === void 0 ? [] : _options$matches,
    phoneNumber = options.phoneNumber,
    extensionNumber = options.extensionNumber,
    _options$phoneNumberD = options.phoneNumberDisplayMode,
    phoneNumberDisplayMode = _options$phoneNumberD === void 0 ? 'phoneNumber' : _options$phoneNumberD,
    displaySelection = options.displaySelection,
    selections = options.selections,
    alwaysShowFirstMatch = options.alwaysShowFirstMatch,
    getDefaultCrmMatch = options.getDefaultCrmMatch;
  var type = 'contact';
  var callerIdName = callerId || serverName;
  var callerIdNameGetter = function callerIdNameGetter() {
    type = 'callerIdName';

    // when name be Unknown from server, mark that be unknown type
    if (callerIdName === 'Unknown' || callerIdName === 'Anonymous') {
      return unknownGetter();
    }

    /**
     *
     * server will add queue name into the callerIdName directly, so we need to remove the queue name from the callerIdName
     * some how like `callQueueName - callerIdName`=> `callerIdName`
     * some how like `callQueueName - `=> '', assume as not have callerId
     * some how like `callQueueName -`=> '', assume as not have callerId
     * when be queue call, should remove the queue name from the callerIdName
     */
    if (queueName) {
      // in platform when have caller id set in queue will group with queue name and caller id
      if (callerIdName === null || callerIdName === void 0 ? void 0 : callerIdName.startsWith("".concat(queueName, " -"))) {
        return callerIdName.slice(queueName.length + 2)
        // trim the start and end space
        .trim();
      }
    }
    return callerIdName;
  };
  var phoneNumberGetter = function phoneNumberGetter() {
    type = 'phoneNumber';
    if (phoneNumberDisplayMode === 'unknown') {
      return unknownGetter();
    }
    return phoneNumber;
  };
  var extensionNumberGetter = function extensionNumberGetter() {
    type = 'extensionNumber';
    return extensionNumber;
  };
  var unknownGetter = function unknownGetter() {
    type = 'unknown';
    return (0, _i18n.t)('unknownNumber');
  };
  var contactGetter = function contactGetter() {
    if (matches.length === 0 && !(selections === null || selections === void 0 ? void 0 : selections.length)) return null;
    if (displaySelection) {
      return {
        contact: displaySelection,
        showMaybe: false
      };
    }

    // when single match, and have selection array pass in, but the data be empty, that means the use unselect this match, so we return null for show as non match
    if (matches.length === 1 && matches[0].resourceType && selections && selections.length === 0) {
      return null;
    }
    if (matches.length === 1 || alwaysShowFirstMatch) {
      return {
        contact: matches[0],
        showMaybe: false
      };
    }

    // use crm first matched contact as default match
    // if no crm contact, use rc directory as default match
    var defaultCrmMatch = (getDefaultCrmMatch === null || getDefaultCrmMatch === void 0 ? void 0 : getDefaultCrmMatch(matches)) || matches.find(function (match) {
      return !!match.resourceType;
    });
    var contact = defaultCrmMatch ? defaultCrmMatch : matches[0];
    if (contact) {
      return {
        contact: contact,
        showMaybe: true
      };
    }
    return null;
  };
  var contactNameGetter = function contactNameGetter(contactInfo) {
    type = 'contact';
    if (!contactInfo || !contactInfo.contact) return null;
    return contactInfo.contact.name;
  };
  var matchedContactMetadata = contactGetter();
  var displayName = (contactNameGetter(matchedContactMetadata) || callerIdNameGetter() || extensionNumberGetter() || phoneNumberGetter() || unknownGetter()

  // always time all space
  ).trim();
  var numberOfMatches = displaySelection ? selections === null || selections === void 0 ? void 0 : selections.length : matches.length;
  var returnResult = {
    /**
     * the render type of the result
     */
    type: type,
    displayName: displayName,
    matchedContact: displaySelection || (matchedContactMetadata === null || matchedContactMetadata === void 0 ? void 0 : matchedContactMetadata.contact) || matches[0],
    dialToPhoneNumber: (extensionNumber !== null && extensionNumber !== void 0 ? extensionNumber : phoneNumber) || undefined,
    metadata: _objectSpread(_objectSpread({}, matchedContactMetadata), {}, {
      selections: selections,
      matches: matches,
      queueName: queueName,
      serverName: serverName,
      numberOfMatches: numberOfMatches
    })
  };
  return returnResult;
};
//# sourceMappingURL=getContactDisplayInfo.js.map

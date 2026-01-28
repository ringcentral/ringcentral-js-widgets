"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRcFilteredContacts = exports.getPresenceStatus = exports.excludePhoneTypesFromContacts = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.flat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.unscopables.flat.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.for-each.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MaximizeDisplayLength = 100;
var getPresenceStatus = exports.getPresenceStatus = function getPresenceStatus(presence) {
  if (!presence) {
    return;
  }
  var dndStatus = presence.dndStatus,
    presenceStatus = presence.presenceStatus,
    userStatus = presence.userStatus;
  if (dndStatus === 'DoNotAcceptAnyCalls') {
    return 'DND';
  }
  return (presenceStatus || userStatus || '').toLowerCase();
};
var getRcFilteredContacts = exports.getRcFilteredContacts = function getRcFilteredContacts(_ref) {
  var lowCaseString = _ref.lowCaseString,
    contacts = _ref.contacts;
  var len = contacts.length;
  var result = [];
  var resultCount = 0;
  var _loop = function _loop(i) {
    var _contacts$i = contacts[i],
      id = _contacts$i.id,
      name = _contacts$i.name,
      phoneNumbers = _contacts$i.phoneNumbers,
      type = _contacts$i.type,
      profileImageUrl = _contacts$i.profileImageUrl,
      presence = _contacts$i.presence;
    var isNameInclude = name === null || name === void 0 ? void 0 : name.toLowerCase().includes(lowCaseString);
    var isPrimary = true;
    // eslint-disable-next-line no-loop-func
    phoneNumbers.forEach(function (_ref2) {
      var phoneType = _ref2.phoneType,
        phoneNumber = _ref2.phoneNumber;
      if (isNameInclude || phoneNumber.includes(lowCaseString)) {
        result.push({
          id: id,
          name: name,
          type: type,
          phoneType: phoneType,
          phoneNumber: phoneNumber,
          isPrimary: isPrimary,
          profileImageUrl: profileImageUrl,
          presenceStatus: getPresenceStatus(presence),
          contact: contacts[i]
        });
        if (isPrimary) {
          isPrimary = false;
          resultCount += 1;
        }
      }
    });
    if (resultCount === MaximizeDisplayLength) return 1; // break
  };
  for (var i = 0; i < len; i++) {
    if (_loop(i)) break;
  }
  return result;
};
var excludePhoneTypesFromContacts = exports.excludePhoneTypesFromContacts = function excludePhoneTypesFromContacts(contacts) {
  var excludePhoneTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var filteredNumbers = {};
  contacts.filter(function (contact) {
    return !excludePhoneTypes.includes(contact.phoneType);
  }).forEach(function (contact) {
    if (!filteredNumbers[contact.id]) {
      filteredNumbers[contact.id] = [_objectSpread(_objectSpread({}, contact), {}, {
        isPrimary: true
      })];
    } else {
      filteredNumbers[contact.id].push(contact);
    }
  });
  return Object.values(filteredNumbers).flat();
};
//# sourceMappingURL=ContactSearchHelper.js.map

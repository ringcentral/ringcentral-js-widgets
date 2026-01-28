"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
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
exports.produceContact = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _phoneTypeHelper = require("@ringcentral-integration/commons/lib/phoneTypeHelper");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var produceContact = exports.produceContact = function produceContact(_ref) {
  var item = _ref.item,
    profileImages = _ref.profileImages,
    presences = _ref.presences,
    sourceName = _ref.sourceName;
  var id = "".concat(item.id);
  var contact = Object.assign({}, item, {
    type: sourceName,
    id: id,
    name: item.name ? item.name : "".concat(item.firstName || '', " ").concat(item.lastName || ''),
    emails: [item.email],
    extensionNumber: item.extensionNumber,
    // TODO: after spring-ui full migrate should remove this, that be not need, just use `ContactAvatar` component
    hasProfileImage: !!item.profileImage,
    phoneNumbers: [{
      phoneNumber: item.extensionNumber,
      phoneType: _phoneTypes.phoneTypes.extension
    }],
    // TODO: after spring-ui full migrate should remove this, that be not need, just use `ContactAvatar` component
    profileImageUrl: profileImages[id] && profileImages[id].url,
    presence: presences[id] && presences[id].presence,
    contactStatus: item.status,
    isCallQueueNumber: item.type === 'Department'
  });
  if (item.phoneNumbers && item.phoneNumbers.length > 0) {
    item.phoneNumbers.forEach(function (phone) {
      (0, _phoneTypeHelper.isSupportedPhoneNumber)(phone) && contact.phoneNumbers.push(_objectSpread(_objectSpread({}, phone), {}, {
        phoneType: (0, _phoneTypeHelper.convertUsageTypeToPhoneType)(phone === null || phone === void 0 ? void 0 : phone.usageType)
      }));
    });
  }
  return contact;
};
//# sourceMappingURL=helper.js.map

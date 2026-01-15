"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _phoneTypes = require("@ringcentral-integration/commons/enums/phoneTypes");
var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _phoneTypes$extension;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = (_phoneTypes$extension = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_phoneTypes$extension, _phoneTypes.phoneTypes.extension, 'Ext.'), _phoneTypes.phoneTypes.direct, 'Direct'), _phoneTypes.phoneTypes.mobile, 'Mobile'), _phoneTypes.phoneTypes.contact, 'Contact phone'), _phoneTypes.phoneTypes.home, 'Home'), _phoneTypes.phoneTypes.business, 'Business'), _phoneTypes.phoneTypes.fax, 'Fax'), _phoneTypes.phoneTypes.company, 'Company'), _phoneTypes.phoneTypes.other, 'Other'), "emailLabel", 'Email'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_phoneTypes$extension, "call", 'Call'), "text", 'Text'), _presenceStatus.presenceStatus.available, 'Available'), _presenceStatus.presenceStatus.offline, 'Invisible'), _presenceStatus.presenceStatus.busy, 'Busy'), _Presence.dndStatus.doNotAcceptAnyCalls, 'Do not Disturb'), "notActivated", 'Inactive'), "jobTitle", 'Title'), "site", 'Site'));
//# sourceMappingURL=en-US.js.map

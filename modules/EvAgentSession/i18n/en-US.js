"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _enums = require("../../../enums");
var _loginTypes$RC_PHONE$;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_loginTypes$RC_PHONE$ = {}, _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.RC_PHONE, 'RingCentral Office phone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.externalPhone, 'Use external phone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.integratedSoftphone, 'Integrated softphone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.dropDownOptions.None, 'None'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsConfirm", 'Continue'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsCancel", 'Cancel'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsTitle", 'Multiple logins'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsContent", 'This username is still logged in. Press continue to end the existing session and start a new one.'), _loginTypes$RC_PHONE$);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map

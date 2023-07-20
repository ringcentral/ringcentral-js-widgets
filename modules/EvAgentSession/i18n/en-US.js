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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_loginTypes$RC_PHONE$ = {}, _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.RC_PHONE, 'RingCentral Office phone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.externalPhone, 'Use external phone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.integratedSoftphone, 'Integrated softphone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.dropDownOptions.None, 'None'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsConfirm", 'Continue'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsCancel", 'Cancel'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsTitle", 'Multiple logins'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsContent", 'This username is still logged in. Press continue to end the existing session and start a new one.'), _loginTypes$RC_PHONE$);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _enums = require("../../../enums");

var _loginTypes$RC_PHONE$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_loginTypes$RC_PHONE$ = {}, _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.RC_PHONE, 'RingCentral Office phone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.externalPhone, 'Use external phone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.loginTypes.integratedSoftphone, 'Integrated softphone'), _defineProperty(_loginTypes$RC_PHONE$, _enums.dropDownOptions.None, 'None'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsConfirm", 'Continue'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsCancel", 'Cancel'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsTitle", 'Multiple logins'), _defineProperty(_loginTypes$RC_PHONE$, "multipleLoginsContent", 'This username is still logged in. Press continue to end the existing session and start a new one.'), _loginTypes$RC_PHONE$);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map

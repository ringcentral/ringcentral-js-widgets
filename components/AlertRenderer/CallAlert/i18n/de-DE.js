"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _callErrors$emergency;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _callErrors["default"].emergencyNumber, "Der Notruf ist nicht erreichbar. Bitte benutzen Sie ein anderes Telefon, um den Notdienst zu kontaktieren"), _defineProperty(_callErrors$emergency, _callErrors["default"].noToNumber, "Geben Sie eine gültige Telefonnummer ein."), _defineProperty(_callErrors$emergency, _callErrors["default"].noAreaCode, "Legen Sie {areaCodeLink} fest, um lokale Telefonnummer mit 7 Ziffern verwenden zu können."), _defineProperty(_callErrors$emergency, _callErrors["default"].connectFailed, "Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später erneut."), _defineProperty(_callErrors$emergency, _callErrors["default"].internalError, "Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Bitte versuchen Sie es später erneut."), _defineProperty(_callErrors$emergency, _callErrors["default"].notAnExtension, "Die Durchwahlnummer ist nicht vorhanden."), _defineProperty(_callErrors$emergency, _callErrors["default"].networkError, "Verbindung aufgrund von Netzwerkproblemen fehlgeschlagen. Versuchen Sie es später erneut."), _defineProperty(_callErrors$emergency, _callErrors["default"].noInternational, "Sie verfügen nicht über die Berechtigung, internationale Anrufe zu tätigen. Wenden Sie sich an Ihren {brand}-Kontoadministrator, um ein Upgrade zu erhalten."), _defineProperty(_callErrors$emergency, _callErrors["default"].noRingoutEnable, "Mit Ihrer Durchwahl können Anrufe mit Desktop-Apps getätigt werden.\n    Wenden Sie sich an Ihren Kontoadministrator für ein Upgrade,\n    wenn Sie zu anderen Anrufoptionen wechseln möchten."), _defineProperty(_callErrors$emergency, "areaCode", "Vorwahl"), _defineProperty(_callErrors$emergency, "telus911", "Notrufe werden nicht unterstützt."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map

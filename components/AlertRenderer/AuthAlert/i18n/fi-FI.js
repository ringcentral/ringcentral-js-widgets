"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _authMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Auth/authMessages"));

var _authMessages$interna;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_authMessages$interna = {}, _defineProperty(_authMessages$interna, _authMessages["default"].internalError, "Kirjautuminen epäonnistui sisäisen virheen vuoksi. Yritä myöhemmin uudelleen."), _defineProperty(_authMessages$interna, _authMessages["default"].accessDenied, "Käyttö kielletty. Ota yhteyttä tukeen."), _defineProperty(_authMessages$interna, _authMessages["default"].sessionExpired, "Istunto on vanhentunut. Kirjaudu sisään."), _authMessages$interna); // @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@


exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map

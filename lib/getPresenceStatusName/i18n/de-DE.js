"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _presenceStatus = require("@ringcentral-integration/commons/enums/presenceStatus.enum");

var _dndStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Presence/dndStatus"));

var _presenceStatus$avail;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_presenceStatus$avail = {}, _defineProperty(_presenceStatus$avail, _presenceStatus.presenceStatus.available, "Verfügbar"), _defineProperty(_presenceStatus$avail, _presenceStatus.presenceStatus.offline, "Unsichtbar"), _defineProperty(_presenceStatus$avail, _presenceStatus.presenceStatus.busy, "Belegt"), _defineProperty(_presenceStatus$avail, _dndStatus["default"].doNotAcceptAnyCalls, "Nicht stören"), _presenceStatus$avail); // @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map

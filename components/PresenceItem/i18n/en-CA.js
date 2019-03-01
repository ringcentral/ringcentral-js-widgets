"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _presenceStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/presenceStatus"));

var _dndStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/dndStatus"));

var _presenceStatus$avail;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_presenceStatus$avail = {}, _defineProperty(_presenceStatus$avail, _presenceStatus.default.available, "Available"), _defineProperty(_presenceStatus$avail, _presenceStatus.default.busy, "Busy"), _defineProperty(_presenceStatus$avail, _presenceStatus.default.offline, "Invisible"), _defineProperty(_presenceStatus$avail, _dndStatus.default.doNotAcceptAnyCalls, "Do not Disturb"), _presenceStatus$avail); // @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@


exports.default = _default;
//# sourceMappingURL=en-CA.js.map

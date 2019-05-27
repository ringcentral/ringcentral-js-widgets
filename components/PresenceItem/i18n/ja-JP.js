"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _presenceStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/presenceStatus"));

var _dndStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/dndStatus"));

var _presenceStatus$avail;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_presenceStatus$avail = {}, _defineProperty(_presenceStatus$avail, _presenceStatus["default"].available, "応答可能"), _defineProperty(_presenceStatus$avail, _presenceStatus["default"].busy, "取り込み中"), _defineProperty(_presenceStatus$avail, _presenceStatus["default"].offline, "非表示"), _defineProperty(_presenceStatus$avail, _dndStatus["default"].doNotAcceptAnyCalls, "応答不可"), _presenceStatus$avail); // @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map

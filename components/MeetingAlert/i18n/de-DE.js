"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _meetingStatus = _interopRequireDefault(require("ringcentral-integration/modules/Meeting/meetingStatus"));

var _meetingStatus$emptyT;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.emptyTopic, "Geben Sie das Meetingthema ein."), _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.noPassword, "Geben Sie das Meetingkennwort ein."), _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.insufficientPermissions, "{application} haben keine Berechtigung für {permissionName}."), _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.scheduledSuccess, "Meeting ist geplant."), _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.internalError, "Interner Fehler, Besprechungszeitplan fehlgeschlagen. Versuchen Sie es später erneut."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting is scheduled."@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Internal error, meeting schedule failed. Try again later."@#@


exports.default = _default;
//# sourceMappingURL=de-DE.js.map

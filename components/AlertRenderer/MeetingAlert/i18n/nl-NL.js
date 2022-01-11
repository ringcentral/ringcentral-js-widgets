"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _meetingStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Meeting/meetingStatus"));

var _meetingStatus$emptyT;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "Voer het onderwerp voor de meeting in."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "Geef het wachtwoord voor de meeting op."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "{application} heeft geen {permissionName}-machtiging."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "Meeting toegevoegd"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].updatedSuccess, "Meeting bijgewerkt"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].meetingIsDeleted, "Meeting is verwijderd"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "Er is bij ons iets fout gegaan. Probeer het opnieuw."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map

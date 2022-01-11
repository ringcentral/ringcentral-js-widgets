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

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].emptyTopic, "Anna tapaamisen otsikko."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].noPassword, "Anna tapaamisen salasana."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].insufficientPermissions, "Seuraavilla sovelluksilla ei ole käyttölupaa {permissionName}: {application}."), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].scheduledSuccess, "Tapaaminen lisätty"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].updatedSuccess, "Tapaaminen päivitetty"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].meetingIsDeleted, "Tapaaminen on poistettu"), _defineProperty(_meetingStatus$emptyT, _meetingStatus["default"].internalError, "Jotakin meni vikaan palvelimellamme. Yritä uudelleen."), _meetingStatus$emptyT); // @key: @#@"[meetingStatus.emptyTopic]"@#@ @source: @#@"Please enter meeting topic."@#@
// @key: @#@"[meetingStatus.noPassword]"@#@ @source: @#@"Please provide meeting password."@#@
// @key: @#@"[meetingStatus.insufficientPermissions]"@#@ @source: @#@"{application} do not have {permissionName} permission."@#@
// @key: @#@"[meetingStatus.scheduledSuccess]"@#@ @source: @#@"Meeting added"@#@
// @key: @#@"[meetingStatus.updatedSuccess]"@#@ @source: @#@"Meeting updated"@#@
// @key: @#@"[meetingStatus.meetingIsDeleted]"@#@ @source: @#@"Meeting has been deleted"@#@
// @key: @#@"[meetingStatus.internalError]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again."@#@


exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map

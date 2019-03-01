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

var _default = (_meetingStatus$emptyT = {}, _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.emptyTopic, 'Please enter meeting topic.'), _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.noPassword, 'Please provide meeting password.'), _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.insufficientPermissions, '{application} do not have {permissionName} permission.'), _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.scheduledSuccess, 'Meeting is scheduled.'), _defineProperty(_meetingStatus$emptyT, _meetingStatus.default.internalError, 'Internal error, meeting schedule failed. Try again later.'), _meetingStatus$emptyT);

exports.default = _default;
//# sourceMappingURL=en-US.js.map

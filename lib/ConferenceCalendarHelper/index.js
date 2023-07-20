"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConferenceLocationField = getConferenceLocationField;
var _utils = require("@ringcentral-integration/utils");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function getConferenceLocationField(_ref) {
  var dialInNumber = _ref.dialInNumber,
    participantCode = _ref.participantCode;
  return (0, _utils.format)(_i18n["default"].getString('conferenceLocationField'), {
    participantCode: participantCode,
    dialInNumber: dialInNumber
  });
}
//# sourceMappingURL=index.js.map

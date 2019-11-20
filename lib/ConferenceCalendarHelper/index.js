"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConferenceLocationField = getConferenceLocationField;

var _formatMessage = _interopRequireDefault(require("format-message"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getConferenceLocationField(_ref) {
  var dialInNumber = _ref.dialInNumber,
      participantCode = _ref.participantCode;
  return (0, _formatMessage["default"])(_i18n["default"].getString('conferenceLocationField'), {
    participantCode: participantCode,
    dialInNumber: dialInNumber
  });
}
//# sourceMappingURL=index.js.map

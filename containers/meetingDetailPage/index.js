"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _MeetingDetailPanel = _interopRequireDefault(require("../../components/MeetingDetailPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      meeting = _ref$phone.meeting,
      locale = _ref$phone.locale;
  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale
  };
}

function mapToFunctions(_, _ref2) {
  var meetingEditorPath = _ref2.meetingEditorPath,
      routerInteraction = _ref2.phone.routerInteraction;
  return {
    goTomMeetingEditorPage: function goTomMeetingEditorPage() {
      routerInteraction.push(meetingEditorPath);
    }
  };
}

var MeetingDetailPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_MeetingDetailPanel["default"]));
exports["default"] = MeetingDetailPage;
//# sourceMappingURL=index.js.map

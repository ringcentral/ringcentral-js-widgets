"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackPage = void 0;

var _FeedbackPanel = _interopRequireDefault(require("../../components/FeedbackPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FeedbackPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.feedbackUI;
})(_FeedbackPanel["default"]);
exports.FeedbackPage = FeedbackPage;
//# sourceMappingURL=index.js.map

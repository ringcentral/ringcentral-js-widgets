"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackPage = void 0;
var _FeedbackPanel = _interopRequireDefault(require("../../components/FeedbackPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var FeedbackPage = exports.FeedbackPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.feedbackUI;
})(_FeedbackPanel["default"]);
//# sourceMappingURL=index.js.map

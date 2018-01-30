'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _FeedbackPanel = require('../../components/FeedbackPanel');

var _FeedbackPanel2 = _interopRequireDefault(_FeedbackPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      feedback = _ref$phone.feedback,
      brand = _ref$phone.brand;

  return {
    brandName: brand.name,
    currentLocale: locale.currentLocale,
    email: feedback.email,
    topic: feedback.topic,
    subject: feedback.subject,
    description: feedback.description
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      feedback = _ref2$phone.feedback,
      routerInteraction = _ref2$phone.routerInteraction,
      _sendFeedback = _ref2.sendFeedback;

  return {
    onBackClick: function onBackClick() {
      routerInteraction.goBack();
    },
    onEmailChange: function onEmailChange(value) {
      feedback.updateEmail(value);
    },
    onTopicChange: function onTopicChange(value) {
      feedback.updateTopic(value);
    },
    onSubjectChange: function onSubjectChange(value) {
      feedback.updateSubject(value);
    },
    onDescriptionChange: function onDescriptionChange(value) {
      feedback.updateDescription(value);
    },
    onRevertClick: function onRevertClick() {
      feedback.clean();
    },
    sendFeedback: function sendFeedback(mailToUrl) {
      if (_sendFeedback) {
        _sendFeedback(mailToUrl);
        return;
      }
      feedback.sendFeedback(mailToUrl);
    }
  };
}

var FeedbackPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_FeedbackPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = FeedbackPage;
//# sourceMappingURL=index.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Revert = require('../../assets/images/Revert.svg');

var _Revert2 = _interopRequireDefault(_Revert);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _InputField = require('../InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedbackPanel = function (_Component) {
  (0, _inherits3.default)(FeedbackPanel, _Component);

  function FeedbackPanel() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FeedbackPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FeedbackPanel.__proto__ || (0, _getPrototypeOf2.default)(FeedbackPanel)).call.apply(_ref, [this].concat(args))), _this), _this.onRevertClick = function () {
      _this.props.onRevertClick();
    }, _this.onEmailChange = function (e) {
      var value = e.currentTarget.value;

      _this.props.onEmailChange(value);
    }, _this.onTopicChange = function (option) {
      _this.props.onTopicChange(option);
    }, _this.onSubjectChange = function (e) {
      var value = e.currentTarget.value;

      _this.props.onSubjectChange(value);
    }, _this.onDescriptionChange = function (e) {
      var value = e.currentTarget.value;

      _this.props.onDescriptionChange(value);
    }, _this.onSendClick = function () {
      var SERVICE_MAIL = 'integration.service@ringcentral.com';
      var FEEDBACK_SUBJECT = 'Google User Feedback';

      var content = '' + ('Hi Integration Team,\n\n' + ('You\'ve got feedback from customer on ' + _this.props.brandName + ' for Google extension. This customer could be contacted via email ')) + (_this.props.email + '\n\nCustomer Feedback Topic\n' + _this.props.topic + '\n\n') + 'Subject\n' + _this.props.subject + '\n\n' + ('Description\n' + _this.props.description + '\n\n') + ('Regards,\n' + _this.props.brandName + ' for Google Extension');
      var mailToUrl = 'mailto:' + SERVICE_MAIL + '?subject=' + window.encodeURIComponent(FEEDBACK_SUBJECT) + '&body=' + window.encodeURIComponent(content);
      _this.props.sendFeedback(mailToUrl);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FeedbackPanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var currentLocale = this.props.currentLocale;

      this.topicOptions = [_i18n2.default.getString('bugReport', currentLocale), _i18n2.default.getString('featureRequest', currentLocale), _i18n2.default.getString('others', currentLocale)];
      var selectedTopicIndex = this.topicOptions.findIndex(function (topic) {
        return topic === _this2.props.topic;
      }) > -1 ? this.topicOptions.findIndex(function (topic) {
        return topic === _this2.props.topic;
      }) + 1 : -1;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          _BackHeader2.default,
          {
            onBackClick: this.props.onBackClick,
            buttons: [{
              label: _react2.default.createElement(_Revert2.default, { className: _styles2.default.rightBtn }),
              title: _i18n2.default.getString('revert', currentLocale),
              placement: 'right',
              onClick: this.onRevertClick
            }]
          },
          _i18n2.default.getString('feedbackHeader', currentLocale)
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.instruction },
            _react2.default.createElement(
              'div',
              null,
              _i18n2.default.getString('instruction', currentLocale)
            ),
            _react2.default.createElement(
              'div',
              null,
              _i18n2.default.getString('fillForm', currentLocale),
              _react2.default.createElement(
                'i',
                null,
                _i18n2.default.getString('send', currentLocale)
              ),
              _i18n2.default.getString('useMailBox', currentLocale),
              _react2.default.createElement(
                'i',
                null,
                'integration.service@ringcentral.com.'
              )
            )
          ),
          _react2.default.createElement(
            _InputField2.default,
            {
              label: _i18n2.default.getString('email', currentLocale),
              labelHint: _i18n2.default.getString('reply', currentLocale) },
            _react2.default.createElement(_TextInput2.default, {
              placeholder: _i18n2.default.getString('emailPlaceHolder', currentLocale),
              value: this.props.email,
              onChange: this.onEmailChange,
              maxLength: 60
            })
          ),
          _react2.default.createElement(
            _InputField2.default,
            {
              label: _i18n2.default.getString('feedbackTopic', currentLocale) },
            _react2.default.createElement(_DropdownSelect2.default, {
              className: _styles2.default.select,
              value: '' + selectedTopicIndex,
              options: this.topicOptions,
              dropdownAlign: 'left',
              placeholder: _i18n2.default.getString('topicPlaceHolder', currentLocale),
              onChange: this.onTopicChange,
              renderValue: function renderValue(idx) {
                return _this2.topicOptions[idx - 1];
              }
            })
          ),
          _react2.default.createElement(
            _InputField2.default,
            {
              label: _i18n2.default.getString('subject', currentLocale) },
            _react2.default.createElement(_TextInput2.default, {
              placeholder: _i18n2.default.getString('subjectPlaceHolder', currentLocale),
              value: this.props.subject,
              maxLength: 60,
              onChange: this.onSubjectChange
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.textAreaField },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.label },
              _i18n2.default.getString('description', currentLocale)
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.textArea },
              _react2.default.createElement('textarea', {
                placeholder: _i18n2.default.getString('descriptionPlaceHolder', currentLocale),
                value: this.props.description,
                maxLength: 1200,
                onChange: this.onDescriptionChange
              })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.bottom },
          _react2.default.createElement(
            _Button2.default,
            {
              onClick: this.onSendClick,
              className: _styles2.default.sendButton
            },
            _i18n2.default.getString('send', currentLocale)
          )
        )
      );
    }
  }]);
  return FeedbackPanel;
}(_react.Component);

exports.default = FeedbackPanel;

FeedbackPanel.propTypes = {
  brandName: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  onBackClick: _propTypes2.default.func.isRequired,
  onRevertClick: _propTypes2.default.func.isRequired,
  email: _propTypes2.default.string.isRequired,
  topic: _propTypes2.default.string.isRequired,
  subject: _propTypes2.default.string.isRequired,
  description: _propTypes2.default.string.isRequired,
  onEmailChange: _propTypes2.default.func.isRequired,
  onTopicChange: _propTypes2.default.func.isRequired,
  onSubjectChange: _propTypes2.default.func.isRequired,
  onDescriptionChange: _propTypes2.default.func.isRequired,
  sendFeedback: _propTypes2.default.func.isRequired
};
//# sourceMappingURL=index.js.map

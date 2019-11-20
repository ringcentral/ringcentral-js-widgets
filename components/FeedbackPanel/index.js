"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find-index");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Revert = _interopRequireDefault(require("../../assets/images/Revert.svg"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _InputField = _interopRequireDefault(require("../InputField"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _Button = _interopRequireDefault(require("../Button"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FeedbackPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(FeedbackPanel, _Component);

  function FeedbackPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FeedbackPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FeedbackPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onRevertClick = function () {
      _this.props.onRevertClick();
    };

    _this.onEmailChange = function (e) {
      var value = e.currentTarget.value;

      _this.props.onEmailChange(value);
    };

    _this.onTopicChange = function (option) {
      _this.props.onTopicChange(option);
    };

    _this.onSubjectChange = function (e) {
      var value = e.currentTarget.value;

      _this.props.onSubjectChange(value);
    };

    _this.onDescriptionChange = function (e) {
      var value = e.currentTarget.value;

      _this.props.onDescriptionChange(value);
    };

    _this.onSendClick = function () {
      var SERVICE_MAIL = 'integration.service@ringcentral.com';
      var FEEDBACK_SUBJECT = 'Google User Feedback';
      var content = "".concat('Hi Integration Team,\n\n' + "You've got feedback from customer on ".concat(_this.props.brandName, " for Google extension. This customer could be contacted via email "), "".concat(_this.props.email, "\n\nCustomer Feedback Topic\n").concat(_this.props.topic, "\n\n"), "Subject\n").concat(_this.props.subject, "\n\n") + "Description\n".concat(_this.props.description, "\n\n") + "Regards,\n".concat(_this.props.brandName, " for Google Extension");
      var mailToUrl = "mailto:".concat(SERVICE_MAIL, "?subject=").concat(window.encodeURIComponent(FEEDBACK_SUBJECT), "&body=").concat(window.encodeURIComponent(content));

      _this.props.sendFeedback(mailToUrl);
    };

    return _this;
  }

  _createClass(FeedbackPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var currentLocale = this.props.currentLocale;
      this.topicOptions = [_i18n["default"].getString('bugReport', currentLocale), _i18n["default"].getString('featureRequest', currentLocale), _i18n["default"].getString('others', currentLocale)];
      var selectedTopicIndex = this.topicOptions.findIndex(function (topic) {
        return topic === _this2.props.topic;
      }) > -1 ? this.topicOptions.findIndex(function (topic) {
        return topic === _this2.props.topic;
      }) + 1 : -1;
      return _react["default"].createElement("div", {
        className: _styles["default"].root
      }, _react["default"].createElement(_BackHeader["default"], {
        onBackClick: this.props.onBackClick,
        buttons: [{
          label: _react["default"].createElement(_Revert["default"], {
            className: _styles["default"].rightBtn
          }),
          title: _i18n["default"].getString('revert', currentLocale),
          placement: 'right',
          onClick: this.onRevertClick
        }]
      }, _i18n["default"].getString('feedbackHeader', currentLocale)), _react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, _react["default"].createElement("div", {
        className: _styles["default"].instruction
      }, _react["default"].createElement("div", null, _i18n["default"].getString('instruction', currentLocale)), _react["default"].createElement("div", null, _i18n["default"].getString('fillForm', currentLocale), _react["default"].createElement("i", null, _i18n["default"].getString('send', currentLocale)), _i18n["default"].getString('useMailBox', currentLocale), _react["default"].createElement("i", null, "integration.service@ringcentral.com."))), _react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('email', currentLocale),
        labelHint: _i18n["default"].getString('reply', currentLocale)
      }, _react["default"].createElement(_TextInput["default"], {
        placeholder: _i18n["default"].getString('emailPlaceHolder', currentLocale),
        value: this.props.email,
        onChange: this.onEmailChange,
        maxLength: 60
      })), _react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('feedbackTopic', currentLocale)
      }, _react["default"].createElement(_DropdownSelect["default"], {
        className: _styles["default"].select,
        value: "".concat(selectedTopicIndex),
        options: this.topicOptions,
        dropdownAlign: "left",
        placeholder: _i18n["default"].getString('topicPlaceHolder', currentLocale),
        onChange: this.onTopicChange,
        renderValue: function renderValue(idx) {
          return _this2.topicOptions[idx - 1];
        }
      })), _react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('subject', currentLocale)
      }, _react["default"].createElement(_TextInput["default"], {
        placeholder: _i18n["default"].getString('subjectPlaceHolder', currentLocale),
        value: this.props.subject,
        maxLength: 60,
        onChange: this.onSubjectChange
      })), _react["default"].createElement("div", {
        className: _styles["default"].textAreaField
      }, _react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('description', currentLocale)), _react["default"].createElement("div", {
        className: _styles["default"].textArea
      }, _react["default"].createElement("textarea", {
        placeholder: _i18n["default"].getString('descriptionPlaceHolder', currentLocale),
        value: this.props.description,
        maxLength: 1200,
        onChange: this.onDescriptionChange
      })))), _react["default"].createElement("div", {
        className: _styles["default"].bottom
      }, _react["default"].createElement(_Button["default"], {
        onClick: this.onSendClick,
        className: _styles["default"].sendButton
      }, _i18n["default"].getString('send', currentLocale))));
    }
  }]);

  return FeedbackPanel;
}(_react.Component);

exports["default"] = FeedbackPanel;
FeedbackPanel.propTypes = {
  brandName: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  onBackClick: _propTypes["default"].func.isRequired,
  onRevertClick: _propTypes["default"].func.isRequired,
  email: _propTypes["default"].string.isRequired,
  topic: _propTypes["default"].string.isRequired,
  subject: _propTypes["default"].string.isRequired,
  description: _propTypes["default"].string.isRequired,
  onEmailChange: _propTypes["default"].func.isRequired,
  onTopicChange: _propTypes["default"].func.isRequired,
  onSubjectChange: _propTypes["default"].func.isRequired,
  onDescriptionChange: _propTypes["default"].func.isRequired,
  sendFeedback: _propTypes["default"].func.isRequired
};
//# sourceMappingURL=index.js.map

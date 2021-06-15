"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var _Button = require("../Button");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FeedbackPanel = /*#__PURE__*/function (_Component) {
  _inherits(FeedbackPanel, _Component);

  var _super = _createSuper(FeedbackPanel);

  function FeedbackPanel() {
    var _this;

    _classCallCheck(this, FeedbackPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

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
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
        onBackClick: this.props.onBackClick,
        buttons: [{
          label: /*#__PURE__*/_react["default"].createElement(_Revert["default"], {
            className: _styles["default"].rightBtn
          }),
          title: _i18n["default"].getString('revert', currentLocale),
          placement: 'right',
          onClick: this.onRevertClick
        }]
      }, _i18n["default"].getString('feedbackHeader', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
        className: _styles["default"].content
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].instruction
      }, /*#__PURE__*/_react["default"].createElement("div", null, _i18n["default"].getString('instruction', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", null, _i18n["default"].getString('fillForm', currentLocale), /*#__PURE__*/_react["default"].createElement("i", null, _i18n["default"].getString('send', currentLocale)), _i18n["default"].getString('useMailBox', currentLocale), /*#__PURE__*/_react["default"].createElement("i", null, "integration.service@ringcentral.com."))), /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('email', currentLocale),
        labelHint: _i18n["default"].getString('reply', currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
        placeholder: _i18n["default"].getString('emailPlaceHolder', currentLocale),
        value: this.props.email,
        onChange: this.onEmailChange,
        maxLength: 60
      })), /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('feedbackTopic', currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_DropdownSelect["default"], {
        className: _styles["default"].select,
        value: "".concat(selectedTopicIndex),
        options: this.topicOptions,
        dropdownAlign: "left",
        placeholder: _i18n["default"].getString('topicPlaceHolder', currentLocale),
        onChange: this.onTopicChange,
        renderValue: function renderValue(idx) {
          return _this2.topicOptions[idx - 1];
        }
      })), /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
        label: _i18n["default"].getString('subject', currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
        placeholder: _i18n["default"].getString('subjectPlaceHolder', currentLocale),
        value: this.props.subject,
        maxLength: 60,
        onChange: this.onSubjectChange
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].textAreaField
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('description', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].textArea
      }, /*#__PURE__*/_react["default"].createElement("textarea", {
        placeholder: _i18n["default"].getString('descriptionPlaceHolder', currentLocale),
        value: this.props.description,
        maxLength: 1200,
        onChange: this.onDescriptionChange
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].bottom
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
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

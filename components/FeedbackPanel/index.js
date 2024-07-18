"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Revert = _interopRequireDefault(require("../../assets/images/Revert.svg"));
var _BackHeader = _interopRequireDefault(require("../BackHeader"));
var _Button = require("../Button");
var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));
var _InputField = _interopRequireDefault(require("../InputField"));
var _Panel = _interopRequireDefault(require("../Panel"));
var _TextInput = _interopRequireDefault(require("../TextInput"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
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
    _this.topicOptions = void 0;
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
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2322): Type '{ label: JSX.Element; title: string; placeme... Remove this comment to see the full error message
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
var _default = FeedbackPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

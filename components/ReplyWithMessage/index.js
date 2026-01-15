"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.timers.js");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _TimeInput = require("./TimeInput");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var CALL_YOU = 0;
var CALL_ME = 1;
var ON_MY_WAY = 2;
var CUSTOM_MESSAGE = 3;
var cleanRegex = /[^\d]/g;
var StyledMenuItem = (0, _juno.styled)(_juno.RcMenuItem)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  flex-wrap: wrap;\n"])));
StyledMenuItem.defaultProps = {
  disableRipple: true
};
var ReplyWithMessage = /*#__PURE__*/function (_Component) {
  function ReplyWithMessage(props) {
    var _this;
    _classCallCheck(this, ReplyWithMessage);
    _this = _callSuper(this, ReplyWithMessage, [props]);
    _this.callYouInputRef = void 0;
    _this.callMeInputRef = void 0;
    _this.customValueInput = void 0;
    _this.onSelectType = function (index) {
      _this.setState({
        type: index
      });
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      _this.props.onChange(_this._getValue());
    };
    _this.onCustomValueChange = function (e) {
      var value = e.target.value;
      _this.setState({
        customValue: value
      });
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      _this.props.onChange(_this._getValue());
    };
    _this.onCallYouTimeValueChange = function (e) {
      var value = e.target.value;
      _this.setState({
        callYouTimeValue: value.replace(cleanRegex, '')
      });
    };
    _this.onCallYouTimeUnitChange = function (unit) {
      _this.setState({
        callYouTimeUnit: unit
      });
    };
    _this.onCallMeTimeValueChange = function (e) {
      var value = e.target.value;
      _this.setState({
        callMeTimeValue: value.replace(cleanRegex, '')
      });
    };
    _this.onCallMeTimeUnitChange = function (unit) {
      _this.setState({
        callMeTimeUnit: unit
      });
    };
    _this.onReply = function () {
      _this.props.onReply(_this._getValue());
    };
    _this.onCallYouInputRef = function (input) {
      _this.callYouInputRef = input;
    };
    _this.onCallMeInputRef = function (input) {
      _this.callMeInputRef = input;
    };
    _this.state = {
      type: ON_MY_WAY,
      customValue: '',
      callYouTimeValue: '',
      callYouTimeUnit: _TimeInput.MINS,
      callMeTimeValue: '',
      callMeTimeUnit: _TimeInput.MINS
    };
    return _this;
  }
  _inherits(ReplyWithMessage, _Component);
  return _createClass(ReplyWithMessage, [{
    key: "_getValue",
    value: function _getValue() {
      var value = {
        replyType: 0
      };
      if (this.state.type === CUSTOM_MESSAGE) {
        value.replyText = this.state.customValue;
      }
      if (this.state.type === ON_MY_WAY) {
        value.replyText = 'On my way';
      }
      if (this.state.type < 2) {
        value.replyType = 1;
        value.callbackDirection = this.state.type;
        if (this.state.type === 0) {
          value.timeValue = this.state.callYouTimeValue;
          value.timeUnits = this.state.callYouTimeUnit;
          value.replyText = this.state.callYouTimeValue;
        } else {
          value.timeValue = this.state.callMeTimeValue;
          value.timeUnits = this.state.callMeTimeUnit;
          value.replyText = this.state.callMeTimeValue;
        }
      }
      return value;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        className = _this$props.className,
        onCancel = _this$props.onCancel,
        currentLocale = _this$props.currentLocale,
        disabled = _this$props.disabled;
      var disableButton = (0, _isBlank.isBlank)(this._getValue().replyText) || disabled;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, {
        className: _styles["default"].messages
      }, /*#__PURE__*/_react["default"].createElement(StyledMenuItem, {
        onClick: function onClick() {
          _this2.onSelectType(CALL_YOU);
          setTimeout(function () {
            _this2.callYouInputRef.focus();
          }, 100);
        },
        className: (0, _clsx["default"])(_styles["default"].messageItem, this.state.type === CALL_YOU ? _styles["default"].active : null),
        "data-sign": "willCallYouBackIn"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('willCallYouBackIn', currentLocale), "..."), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputField
      }, /*#__PURE__*/_react["default"].createElement(_TimeInput.TimeInput, {
        currentLocale: currentLocale,
        timeValue: this.state.callYouTimeValue,
        timeUnit: this.state.callYouTimeUnit,
        onTimeValueChange: this.onCallYouTimeValueChange,
        onSelectTimeUnit: this.onCallYouTimeUnitChange,
        inputRef: this.onCallYouInputRef
      }))), /*#__PURE__*/_react["default"].createElement(StyledMenuItem, {
        onClick: function onClick() {
          _this2.onSelectType(CALL_ME);
          setTimeout(function () {
            _this2.callMeInputRef.focus();
          }, 100);
        },
        className: (0, _clsx["default"])(_styles["default"].messageItem, this.state.type === CALL_ME ? _styles["default"].active : null),
        "data-sign": "callMeBackIn"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('callMeBackIn', currentLocale), "..."), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputField
      }, /*#__PURE__*/_react["default"].createElement(_TimeInput.TimeInput, {
        currentLocale: currentLocale,
        timeValue: this.state.callMeTimeValue,
        timeUnit: this.state.callMeTimeUnit,
        onTimeValueChange: this.onCallMeTimeValueChange,
        onSelectTimeUnit: this.onCallMeTimeUnitChange,
        inputRef: this.onCallMeInputRef
      }))), /*#__PURE__*/_react["default"].createElement(StyledMenuItem, {
        onClick: function onClick() {
          return _this2.onSelectType(ON_MY_WAY);
        },
        className: (0, _clsx["default"])(_styles["default"].messageItem, this.state.type === ON_MY_WAY ? _styles["default"].active : null),
        "data-sign": "onMyWay"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('onMyWay', currentLocale))), /*#__PURE__*/_react["default"].createElement(StyledMenuItem, {
        onClick: function onClick() {
          _this2.onSelectType(CUSTOM_MESSAGE);
          setTimeout(function () {
            _this2.customValueInput.focus();
          }, 100);
        },
        className: (0, _clsx["default"])(_styles["default"].messageItem, this.state.type === CUSTOM_MESSAGE ? _styles["default"].active : null),
        "data-sign": "customMessage"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].label
      }, _i18n["default"].getString('customMessage', currentLocale)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].inputField
      }, /*#__PURE__*/_react["default"].createElement("textarea", {
        value: this.state.customValue,
        maxLength: 50,
        onChange: this.onCustomValueChange,
        ref: function ref(input) {
          _this2.customValueInput = input;
        }
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonGroup
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        className: _styles["default"].cancelButton,
        onClick: onCancel,
        dataSign: "cancelReplyButton"
      }, _i18n["default"].getString('cancel', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        className: (0, _clsx["default"])(_styles["default"].replyButton, disableButton ? _styles["default"].disabled : null),
        onClick: this.props.disabled ? function () {} : this.onReply,
        disabled: disableButton,
        dataSign: "doReplyButton"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].buttonText
      }, _i18n["default"].getString('reply', currentLocale)))));
    }
  }]);
}(_react.Component);
ReplyWithMessage.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  onChange: undefined
};
var _default = exports["default"] = ReplyWithMessage;
//# sourceMappingURL=index.js.map

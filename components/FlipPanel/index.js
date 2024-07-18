"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _Flip = _interopRequireDefault(require("../../assets/images/Flip.svg"));
var _BackButton = _interopRequireDefault(require("../BackButton"));
var _BackHeader = _interopRequireDefault(require("../BackHeader"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _RadioBtnGroup = _interopRequireDefault(require("../RadioBtnGroup"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var FlipPanel = /*#__PURE__*/function (_Component) {
  _inherits(FlipPanel, _Component);
  var _super = _createSuper(FlipPanel);
  function FlipPanel(props) {
    var _this;
    _classCallCheck(this, FlipPanel);
    _this = _super.call(this, props);
    _this.onRadioSelect = function (value) {
      _this.setState({
        flipValue: value
      });
    };
    _this.onFlip = function () {
      _this.props.onFlip(_this.state.flipValue, _this.props.sessionId);
      _this.setState({
        flipEnabled: false
      });
    };
    _this.onComplete = function () {
      _this.props.onComplete(_this.props.sessionId);
    };
    _this.state = {
      flipValue: _this.props.flipNumbers.length === 0 ? '' : _this.props.flipNumbers[0].phoneNumber,
      flipEnabled: !_this.props.isOnFlip
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(FlipPanel, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
        session = _this$props.session,
        onCallEnd = _this$props.onCallEnd;
      if (session && !nextProps.session) {
        onCallEnd();
      }
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this$props2 = this.props,
        isOnFlip = _this$props2.isOnFlip,
        onBack = _this$props2.onBack,
        currentLocale = _this$props2.currentLocale,
        flipNumbers = _this$props2.flipNumbers,
        formatPhone = _this$props2.formatPhone;
      var flipEnabled = this.state.flipEnabled;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        "data-sign": "flipPanel"
      }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"]
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | null' is not ass... Remove this comment to see the full error message
      , {
        onBackClick: isOnFlip ? null : onBack,
        backButton: /*#__PURE__*/_react["default"].createElement(_BackButton["default"], {
          showIcon: !isOnFlip
        }),
        className: _styles["default"].backHeader
      }, /*#__PURE__*/_react["default"].createElement("span", {
        "data-sign": "flipTitle",
        className: _styles["default"].headerTitle
      }, _i18n["default"].getString('flipHeader', currentLocale))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].flipContainer
      }, /*#__PURE__*/_react["default"].createElement(_RadioBtnGroup["default"]
      // @ts-expect-error TS(2322): Type '{ dataSign: string; className: string; radio... Remove this comment to see the full error message
      , {
        dataSign: "flipNumber",
        className: _styles["default"].radioGroup,
        radioOptions: flipNumbers,
        disabled: !flipEnabled,
        formatPhone: formatPhone,
        onRadioSelect: this.onRadioSelect,
        currentLocale: currentLocale
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonGroup
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "flip",
        className: _styles["default"].button,
        title: _i18n["default"].getString('flip', currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        disabled: !flipEnabled,
        className: (0, _clsx["default"])(_styles["default"].flipButton, flipEnabled ? '' : _styles["default"].disabled),
        iconClassName: _styles["default"].flipIcon,
        onClick: this.onFlip,
        icon: _Flip["default"],
        showBorder: true
      })), /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "flipComplete",
        className: _styles["default"].button,
        title: _i18n["default"].getString('complete', currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        disabled: !isOnFlip,
        className: (0, _clsx["default"])(_styles["default"].completeButton, isOnFlip ? '' : _styles["default"].disabled),
        onClick: this.onComplete,
        icon: _End["default"],
        showBorder: true
      })))));
    }
  }]);
  return FlipPanel;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
FlipPanel.defaultProps = {
  session: null,
  isOnFlip: false
};
var _default = FlipPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

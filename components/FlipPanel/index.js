"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
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
var FlipPanel = /*#__PURE__*/function (_Component) {
  function FlipPanel(props) {
    var _this;
    _classCallCheck(this, FlipPanel);
    _this = _callSuper(this, FlipPanel, [props]);
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
  _inherits(FlipPanel, _Component);
  return _createClass(FlipPanel, [{
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
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
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
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
FlipPanel.defaultProps = {
  session: null,
  isOnFlip: false
};
var _default = exports["default"] = FlipPanel;
//# sourceMappingURL=index.js.map

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
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
var RadioOption = function RadioOption(props) {
  var dataSign = props.dataSign,
    currentIndex = props.currentIndex,
    selectedIndex = props.selectedIndex,
    phoneNumber = props.phoneNumber,
    label = props.label,
    currentLocale = props.currentLocale,
    onSelect = props.onSelect;
  var btnClassName = '';
  if (currentIndex === selectedIndex) {
    btnClassName = (0, _clsx["default"])(_styles["default"].radioBtn, _styles["default"].active);
  } else {
    btnClassName = _styles["default"].radioBtn;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    className: _styles["default"].radioOption,
    onClick: function onClick() {
      onSelect(currentIndex);
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: btnClassName
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].optionNumber,
    title: phoneNumber
  }, phoneNumber), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].optionLabel,
    title: label
  }, _i18n["default"].getString(label, currentLocale)));
};
RadioOption.propTypes = {
  currentIndex: _propTypes["default"].number.isRequired,
  phoneNumber: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  selectedIndex: _propTypes["default"].number.isRequired,
  onSelect: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  dataSign: _propTypes["default"].string
};
RadioOption.defaultProps = {
  label: '',
  dataSign: ''
};
var RadioButtonGroup = /*#__PURE__*/function (_Component) {
  _inherits(RadioButtonGroup, _Component);
  var _super = _createSuper(RadioButtonGroup);
  function RadioButtonGroup(props) {
    var _this;
    _classCallCheck(this, RadioButtonGroup);
    _this = _super.call(this, props);
    _this.chooseOption = void 0;
    var disabled = props.disabled,
      onRadioSelect = props.onRadioSelect,
      radioOptions = props.radioOptions;
    _this.state = {
      selectedIndex: 0
    };
    _this.chooseOption = function (index) {
      if (!disabled) {
        _this.setState({
          selectedIndex: index
        });
        onRadioSelect(radioOptions[index].phoneNumber);
      }
    };
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(RadioButtonGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      // @ts-expect-error TS(2339): Property 'dataSign' does not exist on type 'Readon... Remove this comment to see the full error message
      var _this$props = this.props,
        dataSign = _this$props.dataSign,
        className = _this$props.className,
        radioOptions = _this$props.radioOptions,
        formatPhone = _this$props.formatPhone,
        currentLocale = _this$props.currentLocale; // @ts-expect-error TS(2339): Property 'selectedIndex' does not exist on type 'R... Remove this comment to see the full error message
      var selectedIndex = this.state.selectedIndex;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, radioOptions.map(function (number, idx) {
        return /*#__PURE__*/_react["default"].createElement(RadioOption, {
          dataSign: dataSign,
          currentIndex: idx,
          selectedIndex: selectedIndex,
          key: number.id,
          phoneNumber: formatPhone(number.phoneNumber),
          label: number.label,
          onSelect: _this2.chooseOption,
          currentLocale: currentLocale
        });
      }));
    }
  }]);
  return RadioButtonGroup;
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
RadioButtonGroup.propTypes = {
  className: _propTypes["default"].string.isRequired,
  radioOptions: _propTypes["default"].array.isRequired,
  disabled: _propTypes["default"].bool.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  onRadioSelect: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  dataSign: _propTypes["default"].string
};
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
RadioButtonGroup.defaultProps = {
  dataSign: ''
};
var _default = RadioButtonGroup;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

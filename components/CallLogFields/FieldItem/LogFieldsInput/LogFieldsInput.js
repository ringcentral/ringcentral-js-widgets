"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogFieldsInput = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _bindDebounce = require("../../../../lib/bindDebounce");
var _bindNextPropsUpdate = require("../../../../lib/bindNextPropsUpdate");
var _styles = _interopRequireDefault(require("../styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
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
var LogFieldsInput = /*#__PURE__*/function (_Component) {
  _inherits(LogFieldsInput, _Component);
  var _super = _createSuper(LogFieldsInput);
  function LogFieldsInput(props) {
    var _this;
    _classCallCheck(this, LogFieldsInput);
    _this = _super.call(this, props);
    _this.inputRef = /*#__PURE__*/_react["default"].createRef();
    _this.checkPropsUpdate = (0, _bindNextPropsUpdate.bindNextPropsUpdate)(_assertThisInitialized(_this));
    _this.debounce = (0, _bindDebounce.bindDebounce)(_assertThisInitialized(_this), 500);
    var value = props.value;
    _this.state = {
      value: value || ''
    };
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  // eslint-disable-next-line react/no-deprecated
  _createClass(LogFieldsInput, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var isFocus = document.activeElement === this.inputRef.current;
      this.checkPropsUpdate(nextProps, 'value', isFocus);
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, onChange) {
      this.setState({
        value: value
      });
      this.debounce(function () {
        return onChange(value);
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        _onChange = _this$props.onChange,
        required = _this$props.required,
        error = _this$props.error,
        type = _this$props.type,
        onFocus = _this$props.onFocus,
        rest = _objectWithoutProperties(_this$props, ["onChange", "required", "error", "type", "onFocus"]);
      var value = this.state.value;
      var styleRequired = required ? _styles["default"].isRequired : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(styleRequired, _styles["default"].commonStyle)
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, _extends({}, rest, {
        inputRef: this.inputRef,
        type: type,
        required: required,
        error: error,
        value: value,
        gutterBottom: true,
        onChange: function onChange(e) {
          return _this2.updateValue(type === 'number' && e.target.value !== '' ? Number(e.target.value) : e.target.value, _onChange);
        },
        fullWidth: true,
        clearBtn: false,
        onFocus: onFocus
      })));
    }
  }]);
  return LogFieldsInput;
}(_react.Component);
exports.LogFieldsInput = LogFieldsInput;
LogFieldsInput.defaultProps = {
  type: 'text',
  required: false,
  placeholder: 'no label',
  value: undefined,
  multiline: false
};
//# sourceMappingURL=LogFieldsInput.js.map

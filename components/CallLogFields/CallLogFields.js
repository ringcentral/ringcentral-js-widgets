"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _bindDebounce = require("../../lib/bindDebounce");
var _CountdownTimer = require("../CountdownTimer");
var _FieldItem = require("./FieldItem");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
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
var DEFAULT_INPUT_SAVE_TIMEOUT = 2e3;
var CallLogFields = /*#__PURE__*/function (_Component) {
  _inherits(CallLogFields, _Component);
  var _super = _createSuper(CallLogFields);
  function CallLogFields() {
    var _this;
    _classCallCheck(this, CallLogFields);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.debounce = (0, _bindDebounce.bindDebounce)(_assertThisInitialized(_this), DEFAULT_INPUT_SAVE_TIMEOUT);
    _this.renderDelaySavingTimer = function () {
      var _this$props = _this.props,
        currentLocale = _this$props.currentLocale,
        currentDelaySavingState = _this$props.currentDelaySavingState;
      var _ref = currentDelaySavingState !== null && currentDelaySavingState !== void 0 ? currentDelaySavingState : {},
        delayUpdatingStartTime = _ref.delayUpdatingStartTime,
        delayUpdatingMinutes = _ref.delayUpdatingMinutes;
      return delayUpdatingStartTime && delayUpdatingMinutes && /*#__PURE__*/_react["default"].createElement(_CountdownTimer.CountdownTimer, {
        variant: "info",
        currentLocale: currentLocale,
        creationTime: delayUpdatingStartTime,
        duration: delayUpdatingMinutes
      });
    };
    _this.renderFields = function () {
      var _this$props2 = _this.props,
        _this$props2$currentL = _this$props2.currentLog,
        customLogFields = _this$props2$currentL.customLogFields,
        _this$props2$currentL2 = _this$props2$currentL.currentLogCall;
      _this$props2$currentL2 = _this$props2$currentL2 === void 0 ? {} : _this$props2$currentL2;
      var isAutoSave = _this$props2$currentL2.isAutoSave,
        call = _this$props2$currentL.call,
        _this$props2$currentL3 = _this$props2$currentL.task,
        task = _this$props2$currentL3 === void 0 ? {} : _this$props2$currentL3,
        refs = _this$props2.refs,
        onSaveCallLog = _this$props2.onSaveCallLog; // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      var onSave = function onSave() {
        return isAutoSave && task.id && onSaveCallLog(call);
      };
      return _toConsumableArray(customLogFields).sort(function (a, b) {
        return a.sort - b.sort;
      }).map(function (fieldOption, i) {
        return /*#__PURE__*/_react["default"].createElement(_FieldItem.FieldItem, _extends({}, _this.props, {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          fieldRef: refs[fieldOption.value],
          fieldOption: fieldOption,
          debounce: _this.debounce,
          "data-sign": "callLogField",
          key: "field-".concat(i),
          onSave: onSave,
          timeout: DEFAULT_INPUT_SAVE_TIMEOUT
        }));
      });
    };
    return _this;
  }
  _createClass(CallLogFields, [{
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this$props3 = this.props,
        currentLog = _this$props3.currentLog,
        classes = _this$props3.classes; // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (!currentLog.task) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "callLogFieldsSection"
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        ,
        className: (0, _clsx["default"])(_styles["default"].callLogFieldsSection, classes.root)
      }, this.renderDelaySavingTimer(), this.renderFields());
    }
  }]);
  return CallLogFields;
}(_react.Component);
exports["default"] = CallLogFields;
CallLogFields.defaultProps = {
  currentLog: {},
  onUpdateCallLog: undefined,
  onSelectViewVisible: function onSelectViewVisible() {
    return null;
  },
  onSaveCallLog: undefined,
  customInputDataStruct: undefined,
  subjectDropdownsTracker: undefined,
  startAdornmentRender: function startAdornmentRender() {
    return null;
  },
  contactSearch: undefined,
  classes: {},
  refs: {}
};
//# sourceMappingURL=CallLogFields.js.map

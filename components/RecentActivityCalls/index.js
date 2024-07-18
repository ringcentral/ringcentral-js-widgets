"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _formatDuration = require("@ringcentral-integration/commons/lib/formatDuration");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _Spinner = _interopRequireDefault(require("../Spinner"));
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
function getCurrentStatus(_ref, currentLocale) {
  var direction = _ref.direction,
    result = _ref.result;
  if (direction === 'Inbound') {
    if (result === 'Missed') {
      return {
        status: _i18n["default"].getString('missed', currentLocale),
        icon: _DynamicsFont["default"].missed,
        isMissedCall: true
      };
    }
    return {
      status: _i18n["default"].getString('inBound', currentLocale),
      icon: _DynamicsFont["default"].inbound
    };
  }
  return {
    status: _i18n["default"].getString('outBound', currentLocale),
    icon: _DynamicsFont["default"].outbound
  };
}
var CallItem = function CallItem(_ref2) {
  var call = _ref2.call,
    dateTimeFormatter = _ref2.dateTimeFormatter,
    currentLocale = _ref2.currentLocale;
  var duration = call.duration,
    startTime = call.startTime;
  var _getCurrentStatus = getCurrentStatus(call, currentLocale),
    status = _getCurrentStatus.status,
    icon = _getCurrentStatus.icon,
    isMissedCall = _getCurrentStatus.isMissedCall;
  startTime = dateTimeFormatter({
    utcTimestamp: new Date(startTime).getTime()
  });
  duration = (0, _formatDuration.formatDuration)(duration);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callItem
  }, /*#__PURE__*/_react["default"].createElement("dl", {
    className: (0, _clsx["default"])(_styles["default"].dl, isMissedCall ? _styles["default"].missedCall : '')
  }, /*#__PURE__*/_react["default"].createElement("dt", {
    className: _styles["default"].status,
    title: status
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].iconWrapper
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _clsx["default"])(icon, _styles["default"].callIcon),
    title: status
  })), /*#__PURE__*/_react["default"].createElement("span", {
    title: status
  }, status), /*#__PURE__*/_react["default"].createElement("small", {
    className: _styles["default"].duration,
    title: duration
  }, duration)), /*#__PURE__*/_react["default"].createElement("dd", {
    className: _styles["default"].time,
    title: startTime
  }, startTime)));
};
CallItem.propTypes = {
  call: _propTypes["default"].object.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};
var RecentActivityCalls = /*#__PURE__*/function (_Component) {
  _inherits(RecentActivityCalls, _Component);
  var _super = _createSuper(RecentActivityCalls);
  function RecentActivityCalls() {
    _classCallCheck(this, RecentActivityCalls);
    return _super.apply(this, arguments);
  }
  _createClass(RecentActivityCalls, [{
    key: "shouldComponentUpdate",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function shouldComponentUpdate(nextProps) {
      return (
        // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
        nextProps.currentLocale !== this.props.currentLocale ||
        // @ts-expect-error TS(2339): Property 'calls' does not exist on type 'Readonly<... Remove this comment to see the full error message
        nextProps.calls !== this.props.calls ||
        // @ts-expect-error TS(2339): Property 'isCallsLoaded' does not exist on type 'R... Remove this comment to see the full error message
        nextProps.isCallsLoaded !== this.props.isCallsLoaded
      );
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      var _this$props = this.props,
        currentLocale = _this$props.currentLocale,
        calls = _this$props.calls,
        isCallsLoaded = _this$props.isCallsLoaded,
        dateTimeFormatter = _this$props.dateTimeFormatter;
      var callListView = null;
      if (!isCallsLoaded) {
        callListView = /*#__PURE__*/_react["default"].createElement(_Spinner["default"], {
          className: _styles["default"].spinner,
          ringWidth: 4
        });
      } else if (calls.length > 0) {
        callListView = calls.map(function (call) {
          return /*#__PURE__*/_react["default"].createElement(CallItem, {
            key: call.id,
            call: call,
            currentLocale: currentLocale,
            dateTimeFormatter: dateTimeFormatter
          });
        });
      } else {
        callListView = /*#__PURE__*/_react["default"].createElement("p", {
          className: _styles["default"].noRecords
        }, _i18n["default"].getString('noRecords', currentLocale));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].calls
      }, callListView);
    }
  }]);
  return RecentActivityCalls;
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
RecentActivityCalls.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  calls: _propTypes["default"].array.isRequired,
  isCallsLoaded: _propTypes["default"].bool.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired
};
var _default = RecentActivityCalls;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

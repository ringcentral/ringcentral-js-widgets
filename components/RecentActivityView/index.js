"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));
var _RecentActivityNavigationButton = _interopRequireDefault(require("../RecentActivityNavigationButton"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
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
var RecentActivityView = /*#__PURE__*/function (_PureComponent) {
  _inherits(RecentActivityView, _PureComponent);
  var _super = _createSuper(RecentActivityView);
  function RecentActivityView(props) {
    var _this;
    _classCallCheck(this, RecentActivityView);
    _this = _super.call(this, props);
    // @ts-expect-error TS(2339): Property 'defaultTab' does not exist on type 'Read... Remove this comment to see the full error message
    _this.onTabChanged = function () {
      var tabName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.defaultTab;
      var currentTab = _this.getCurrentTab(tabName);
      if (currentTab) currentTab.getData();
      _this.setState({
        currentTab: tabName
      });
    };
    _this.state = {
      currentTab: props.defaultTab
    };
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(RecentActivityView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Switch to default tab and load all data
      this.onTabChanged();
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // @ts-expect-error TS(2339): Property 'currentContact' does not exist on type '... Remove this comment to see the full error message
      if (prevProps.currentContact.id !== this.props.currentContact.id) {
        // @ts-expect-error TS(2339): Property 'currentTab' does not exist on type 'Read... Remove this comment to see the full error message
        this.onTabChanged(this.state.currentTab);
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // @ts-expect-error TS(2339): Property 'tabs' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      var _iterator = _createForOfIteratorHelper(this.props.tabs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tab = _step.value;
          tab.cleanUp();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "getCurrentTabPanel",
    value: function getCurrentTabPanel() {
      // @ts-expect-error TS(2339): Property 'currentTab' does not exist on type 'Read... Remove this comment to see the full error message
      var currentTabPath = this.state.currentTab;
      var currentTab = this.getCurrentTab(currentTabPath);
      return currentTab ? currentTab.view : null;
    }
  }, {
    key: "getCurrentTab",
    value: function getCurrentTab(currentTabPath) {
      // @ts-expect-error TS(2339): Property 'tabs' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      var tabs = this.props.tabs;
      return tabs.find(function (tab) {
        return tab.path === currentTabPath;
      });
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      // @ts-expect-error TS(2339): Property 'showSpinner' does not exist on type 'Rea... Remove this comment to see the full error message
      var showSpinner = this.props.showSpinner;
      if (showSpinner) return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
      var props = {
        // @ts-expect-error TS(2339): Property 'currentTab' does not exist on type 'Read... Remove this comment to see the full error message
        currentPath: this.state.currentTab,
        goTo: function goTo(tabName) {
          var _this2$props$trackCli, _this2$props;
          // @ts-expect-error TS(2339): Property 'trackClickTab' does not exist on type 'R... Remove this comment to see the full error message
          (_this2$props$trackCli = (_this2$props = _this2.props).trackClickTab) === null || _this2$props$trackCli === void 0 ? void 0 : _this2$props$trackCli.call(_this2$props, tabName);
          _this2.onTabChanged(tabName);
        },
        // @ts-expect-error TS(2339): Property 'tabs' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        tabs: this.props.tabs
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].recentActivityView,
        "data-sign": "recentActivityView"
      }, /*#__PURE__*/_react["default"].createElement(_NavigationBar["default"], _extends({
        button: _RecentActivityNavigationButton["default"],
        className: _styles["default"].navigationBar
      }, props)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].listView
      }, this.getCurrentTabPanel()));
    }
  }]);
  return RecentActivityView;
}(_react.PureComponent); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
RecentActivityView.propTypes = {
  showSpinner: _propTypes["default"].bool.isRequired,
  currentContact: _propTypes["default"].object.isRequired,
  tabs: _propTypes["default"].array.isRequired,
  defaultTab: _propTypes["default"].string.isRequired,
  trackClickTab: _propTypes["default"].func
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
RecentActivityView.defaultProps = {
  trackClickTab: undefined
};
var _default = RecentActivityView;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

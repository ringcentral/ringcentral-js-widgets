"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));
var _RecentActivityNavigationButton = _interopRequireDefault(require("../RecentActivityNavigationButton"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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

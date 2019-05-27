"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _RecentActivityNavigationButton = _interopRequireDefault(require("../RecentActivityNavigationButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RecentActivityView =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RecentActivityView, _PureComponent);

  function RecentActivityView(props) {
    var _this;

    _classCallCheck(this, RecentActivityView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecentActivityView).call(this, props));

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

  _createClass(RecentActivityView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Switch to default tab and load all data
      this.onTabChanged();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.currentContact.id !== this.props.currentContact.id) {
        this.onTabChanged(this.state.currentTab);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tab = _step.value;
          tab.cleanUp();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "getCurrentTabPanel",
    value: function getCurrentTabPanel() {
      var currentTabPath = this.state.currentTab;
      var currentTab = this.getCurrentTab(currentTabPath);
      return currentTab ? currentTab.view : null;
    }
  }, {
    key: "getCurrentTab",
    value: function getCurrentTab(currentTabPath) {
      var tabs = this.props.tabs;
      return tabs.find(function (tab) {
        return tab.path === currentTabPath;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var showSpinner = this.props.showSpinner;
      if (showSpinner) return _react["default"].createElement(_SpinnerOverlay["default"], null);
      var props = {
        currentPath: this.state.currentTab,
        goTo: this.onTabChanged,
        tabs: this.props.tabs
      };
      return _react["default"].createElement("div", {
        className: _styles["default"].recentActivityView
      }, _react["default"].createElement(_NavigationBar["default"], _extends({
        button: _RecentActivityNavigationButton["default"],
        className: _styles["default"].navigationBar
      }, props)), _react["default"].createElement("div", {
        className: _styles["default"].listView
      }, this.getCurrentTabPanel()));
    }
  }]);

  return RecentActivityView;
}(_react.PureComponent);

exports["default"] = RecentActivityView;
RecentActivityView.propTypes = {
  showSpinner: _propTypes["default"].bool.isRequired,
  currentContact: _propTypes["default"].object.isRequired,
  tabs: _propTypes["default"].array.isRequired,
  defaultTab: _propTypes["default"].string.isRequired
};
//# sourceMappingURL=index.js.map

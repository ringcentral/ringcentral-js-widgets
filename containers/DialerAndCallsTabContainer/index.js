"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _withPhone = _interopRequireDefault(require("../../lib/withPhone"));

var _hasActiveCalls = _interopRequireDefault(require("../../lib/hasActiveCalls"));

var _TabContentPanel = _interopRequireDefault(require("../../components/TabContentPanel"));

var _SpinnerOverlay = require("../../components/SpinnerOverlay");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TabContentView = /*#__PURE__*/function (_Component) {
  _inherits(TabContentView, _Component);

  var _super = _createSuper(TabContentView);

  function TabContentView(props) {
    var _this;

    _classCallCheck(this, TabContentView);

    _this = _super.call(this, props);
    _this.getTabs = (0, _reselect.createSelector)(function () {
      return _this.props.currentLocale;
    }, function () {
      return _this.props.currentPath;
    }, function (currentLocale, currentPath) {
      return [{
        path: '/dialer',
        label: _i18n["default"].getString('dialer', currentLocale),
        isActive: function isActive() {
          return currentPath === '/dialer';
        }
      }, {
        path: '/calls',
        label: _i18n["default"].getString('allCalls', currentLocale),
        isActive: function isActive() {
          return currentPath === '/calls';
        }
      }];
    });
    return _this;
  }

  _createClass(TabContentView, [{
    key: "render",
    value: function render() {
      if (this.props.showSpinner) {
        return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
      }

      return /*#__PURE__*/_react["default"].createElement(_TabContentPanel["default"], _extends({}, this.props, {
        tabs: this.getTabs(),
        navClassName: _styles["default"].nav,
        tabContentClassName: _styles["default"].content
      }));
    }
  }]);

  return TabContentView;
}(_react.Component);

TabContentView.propTypes = {
  showTabs: _propTypes["default"].bool.isRequired,
  showSpinner: _propTypes["default"].bool.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  currentPath: _propTypes["default"].string.isRequired,
  goTo: _propTypes["default"].func.isRequired
};

function mapToProps(_, _ref) {
  var phone = _ref.phone,
      _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      routerInteraction = _ref$phone.routerInteraction;
  return {
    showTabs: (0, _hasActiveCalls["default"])(phone),
    currentLocale: locale.currentLocale,
    showSpinner: !locale.ready,
    currentPath: routerInteraction.currentPath
  };
}

function mapToFunctions(_, _ref2) {
  var routerInteraction = _ref2.phone.routerInteraction;
  return {
    goTo: function goTo(path) {
      routerInteraction.push(path);
    }
  };
}

var DialerAndCallsTabContainer = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(TabContentView));
exports["default"] = DialerAndCallsTabContainer;
//# sourceMappingURL=index.js.map

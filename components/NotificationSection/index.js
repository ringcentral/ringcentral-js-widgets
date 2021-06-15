"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _CloseIcon = _interopRequireDefault(require("../../assets/images/CloseIcon.svg"));

var _Button = require("../Button");

var _LogNotification = _interopRequireDefault(require("../LogNotification"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NotificationSection = /*#__PURE__*/function (_Component) {
  _inherits(NotificationSection, _Component);

  var _super = _createSuper(NotificationSection);

  function NotificationSection() {
    _classCallCheck(this, NotificationSection);

    return _super.apply(this, arguments);
  }

  _createClass(NotificationSection, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      var logNotification = nextProps.logNotification,
          onCloseNotification = nextProps.onCloseNotification,
          currentNotificationIdentify = nextProps.currentNotificationIdentify;

      if (currentNotificationIdentify) {
        var _logNotification$call = logNotification.call,
            call = _logNotification$call === void 0 ? {} : _logNotification$call;
        var result = call.result;

        if (result) {
          onCloseNotification();
        }
      }
    }
  }, {
    key: "renderLogSection",
    value: function renderLogSection() {
      var _this$props = this.props,
          formatPhone = _this$props.formatPhone,
          currentLocale = _this$props.currentLocale,
          logNotification = _this$props.logNotification,
          showNotiLogButton = _this$props.showNotiLogButton,
          onCloseNotification = _this$props.onCloseNotification,
          onSaveNotification = _this$props.onSaveNotification,
          onExpandNotification = _this$props.onExpandNotification,
          onDiscardNotification = _this$props.onDiscardNotification,
          currentNotificationIdentify = _this$props.currentNotificationIdentify,
          currentSession = _this$props.currentSession,
          _onReject = _this$props.onReject,
          _onHangup = _this$props.onHangup,
          disableLinks = _this$props.disableLinks;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, logNotification.notificationIsExpand ? _styles["default"].cover : null)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].notificationModal
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        dataSign: "closeButton",
        className: _styles["default"].closeBtn,
        onClick: onCloseNotification
      }, /*#__PURE__*/_react["default"].createElement(_CloseIcon["default"], null)), /*#__PURE__*/_react["default"].createElement(_LogNotification["default"], {
        showEndButton: true,
        showLogButton: showNotiLogButton,
        currentLocale: currentLocale,
        formatPhone: formatPhone,
        currentLog: logNotification,
        isExpand: logNotification.notificationIsExpand,
        onSave: onSaveNotification,
        onExpand: onExpandNotification,
        onDiscard: onDiscardNotification,
        onStay: onCloseNotification,
        onReject: function onReject() {
          return _onReject(currentNotificationIdentify);
        },
        onHangup: function onHangup() {
          return _onHangup(currentNotificationIdentify);
        },
        currentSession: currentSession,
        disableLinks: disableLinks
      })));
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderLogSection();
    }
  }]);

  return NotificationSection;
}(_react.Component);

exports["default"] = NotificationSection;
NotificationSection.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  // - Notification
  logNotification: _propTypes["default"].object,
  onCloseNotification: _propTypes["default"].func,
  onDiscardNotification: _propTypes["default"].func,
  onSaveNotification: _propTypes["default"].func,
  onExpandNotification: _propTypes["default"].func,
  showNotiLogButton: _propTypes["default"].bool,
  currentNotificationIdentify: _propTypes["default"].string,
  currentSession: _propTypes["default"].object,
  onReject: _propTypes["default"].func.isRequired,
  onHangup: _propTypes["default"].func.isRequired,
  disableLinks: _propTypes["default"].bool
};
NotificationSection.defaultProps = {
  // Notification
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showNotiLogButton: true,
  currentNotificationIdentify: '',
  currentSession: undefined,
  disableLinks: false
};
//# sourceMappingURL=index.js.map

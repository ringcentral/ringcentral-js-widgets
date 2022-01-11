"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _formatDuration = _interopRequireDefault(require("../../lib/formatDuration"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

function CallItem(_ref2) {
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
  duration = (0, _formatDuration["default"])(duration);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callItem
  }, /*#__PURE__*/_react["default"].createElement("dl", {
    className: (0, _classnames["default"])(_styles["default"].dl, isMissedCall ? _styles["default"].missedCall : '')
  }, /*#__PURE__*/_react["default"].createElement("dt", {
    className: _styles["default"].status,
    title: status
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].iconWrapper
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _classnames["default"])(icon, _styles["default"].callIcon),
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
}

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
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.currentLocale !== this.props.currentLocale || nextProps.calls !== this.props.calls || nextProps.isCallsLoaded !== this.props.isCallsLoaded;
    }
  }, {
    key: "render",
    value: function render() {
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
}(_react.Component);

RecentActivityCalls.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  calls: _propTypes["default"].array.isRequired,
  isCallsLoaded: _propTypes["default"].bool.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired
};
var _default = RecentActivityCalls;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

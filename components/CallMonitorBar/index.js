"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfoBar = CallInfoBar;
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _Button = _interopRequireDefault(require("../Button"));

var _CarrouselBar = _interopRequireDefault(require("../CarrouselBar"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function CallInfoBar(_ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      currentLocale = _ref.currentLocale,
      shouldDisplayViewCallsBtn = _ref.shouldDisplayViewCallsBtn;
  return _react.default.createElement("div", {
    className: _styles.default.bar
  }, _react.default.createElement("div", {
    className: _styles.default.currentCallInfo,
    onClick: onClick
  }, label), shouldDisplayViewCallsBtn ? _react.default.createElement(_Button.default, {
    className: _styles.default.viewCallsBtn,
    onClick: onClick
  }, _i18n.default.getString('viewCalls', currentLocale)) : null);
}

CallInfoBar.propTypes = {
  label: _propTypes.default.string,
  onClick: _propTypes.default.func,
  currentLocale: _propTypes.default.string,
  shouldDisplayViewCallsBtn: _propTypes.default.bool
};
CallInfoBar.defaultProps = {
  label: '',
  onClick: undefined,
  currentLocale: '',
  shouldDisplayViewCallsBtn: false
};

var CallMonitorBar =
/*#__PURE__*/
function (_Component) {
  _inherits(CallMonitorBar, _Component);

  function CallMonitorBar(props) {
    var _this;

    _classCallCheck(this, CallMonitorBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallMonitorBar).call(this, props));
    _this.state = {
      hoverBar: false
    };

    _this.showBtn = function () {
      if (_this.props.currentCalls.length > 0) {
        _this.setState({
          hoverBar: true
        });
      }
    };

    _this.hideBtn = function () {
      _this.setState({
        hoverBar: false
      });
    };

    return _this;
  }

  _createClass(CallMonitorBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          ringingCalls = _this$props.ringingCalls,
          onHoldCalls = _this$props.onHoldCalls,
          currentCalls = _this$props.currentCalls,
          currentLocale = _this$props.currentLocale,
          onCurrentCallBtnClick = _this$props.onCurrentCallBtnClick,
          onViewCallBtnClick = _this$props.onViewCallBtnClick,
          shouldDisplayCurrentCallBtn = _this$props.shouldDisplayCurrentCallBtn,
          shouldDisplayViewCallsBtn = _this$props.shouldDisplayViewCallsBtn;
      var numberOfIncomingCalls = ringingCalls.length;
      var numberOfOnHoldCalls = onHoldCalls.length;
      return _react.default.createElement("div", {
        className: _styles.default.bar,
        onMouseOver: this.showBtn,
        onMouseLeave: this.hideBtn
      }, _react.default.createElement("div", {
        className: _styles.default.box
      }, _react.default.createElement(_CarrouselBar.default, {
        hoverBar: this.state.hoverBar
      }, numberOfOnHoldCalls > 0 ? _react.default.createElement(CallInfoBar, {
        label: numberOfOnHoldCalls === 1 ? (0, _formatMessage.default)(_i18n.default.getString('callOnHold', currentLocale), {
          numberOf: numberOfOnHoldCalls
        }) : (0, _formatMessage.default)(_i18n.default.getString('callsOnHold', currentLocale), {
          numberOf: numberOfOnHoldCalls
        }),
        currentLocale: currentLocale,
        onClick: onViewCallBtnClick,
        shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn
      }) : null, numberOfIncomingCalls > 0 ? _react.default.createElement(CallInfoBar, {
        label: numberOfIncomingCalls === 1 ? (0, _formatMessage.default)(_i18n.default.getString('incomingCall', currentLocale), {
          numberOf: numberOfIncomingCalls
        }) : (0, _formatMessage.default)(_i18n.default.getString('incomingCalls', currentLocale), {
          numberOf: numberOfIncomingCalls
        }),
        currentLocale: currentLocale,
        onClick: onViewCallBtnClick,
        shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn
      }) : null, currentCalls.length > 0 ? _react.default.createElement("div", {
        className: _styles.default.bar
      }, _react.default.createElement("div", {
        className: _styles.default.duration,
        onClick: onCurrentCallBtnClick
      }, _react.default.createElement(_DurationCounter.default, {
        startTime: currentCalls[0].startTime
      })), shouldDisplayCurrentCallBtn && onCurrentCallBtnClick ? _react.default.createElement(_Button.default, {
        className: _styles.default.currentCallBtn,
        onClick: onCurrentCallBtnClick
      }, _i18n.default.getString('currentCall', currentLocale)) : null) : null)));
    }
  }]);

  return CallMonitorBar;
}(_react.Component);

exports.default = CallMonitorBar;
CallMonitorBar.propTypes = {
  ringingCalls: _propTypes.default.array,
  currentCalls: _propTypes.default.array,
  onHoldCalls: _propTypes.default.array,
  currentLocale: _propTypes.default.string.isRequired,
  onCurrentCallBtnClick: _propTypes.default.func,
  onViewCallBtnClick: _propTypes.default.func,
  shouldDisplayCurrentCallBtn: _propTypes.default.bool,
  shouldDisplayViewCallsBtn: _propTypes.default.bool
};
CallMonitorBar.defaultProps = {
  ringingCalls: [],
  currentCalls: [],
  onHoldCalls: [],
  onCurrentCallBtnClick: undefined,
  onViewCallBtnClick: undefined,
  shouldDisplayCurrentCallBtn: false,
  shouldDisplayViewCallsBtn: false
};
//# sourceMappingURL=index.js.map

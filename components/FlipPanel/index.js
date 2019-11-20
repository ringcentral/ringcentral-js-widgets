"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BackButton = _interopRequireDefault(require("../BackButton"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _RadioBtnGroup = _interopRequireDefault(require("../RadioBtnGroup"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _Flip = _interopRequireDefault(require("../../assets/images/Flip.svg"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FlipPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(FlipPanel, _Component);

  function FlipPanel(props) {
    var _this;

    _classCallCheck(this, FlipPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlipPanel).call(this, props));

    _this.onRadioSelect = function (value) {
      _this.setState({
        flipValue: value
      });
    };

    _this.onFlip = function () {
      _this.props.onFlip(_this.state.flipValue, _this.props.sessionId);

      _this.setState({
        flipEnabled: false
      });
    };

    _this.onComplete = function () {
      _this.props.onComplete(_this.props.sessionId);
    };

    _this.state = {
      flipValue: _this.props.flipNumbers.length === 0 ? '' : _this.props.flipNumbers[0].phoneNumber,
      flipEnabled: !_this.props.isOnFlip
    };
    return _this;
  }

  _createClass(FlipPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          session = _this$props.session,
          onCallEnd = _this$props.onCallEnd;

      if (session && !nextProps.session) {
        onCallEnd();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isOnFlip = _this$props2.isOnFlip,
          onBack = _this$props2.onBack,
          currentLocale = _this$props2.currentLocale,
          flipNumbers = _this$props2.flipNumbers,
          formatPhone = _this$props2.formatPhone;
      var flipEnabled = this.state.flipEnabled;
      return _react["default"].createElement("div", {
        className: _styles["default"].root
      }, _react["default"].createElement(_BackHeader["default"], {
        onBackClick: isOnFlip ? null : onBack,
        backButton: _react["default"].createElement(_BackButton["default"], {
          showIcon: !isOnFlip
        })
      }, _react["default"].createElement("span", {
        "data-sign": "flipTitle",
        className: _styles["default"].headerTitle
      }, _i18n["default"].getString('flipHeader', currentLocale))), _react["default"].createElement("div", {
        className: _styles["default"].flipContainer
      }, _react["default"].createElement(_RadioBtnGroup["default"], {
        dataSign: "flipNumber",
        className: _styles["default"].radioGroup,
        radioOptions: flipNumbers,
        disabled: !flipEnabled,
        formatPhone: formatPhone,
        onRadioSelect: this.onRadioSelect,
        currentLocale: currentLocale
      }), _react["default"].createElement("div", {
        className: _styles["default"].buttonGroup
      }, _react["default"].createElement("div", {
        "data-sign": "flip",
        className: _styles["default"].button,
        title: _i18n["default"].getString('flip', currentLocale)
      }, _react["default"].createElement(_CircleButton["default"], {
        disabled: !flipEnabled,
        className: (0, _classnames["default"])(_styles["default"].flipButton, flipEnabled ? '' : _styles["default"].disabled),
        iconClassName: _styles["default"].flipIcon,
        onClick: this.onFlip,
        icon: _Flip["default"],
        showBorder: true
      })), _react["default"].createElement("div", {
        "data-sign": "flipComplete",
        className: _styles["default"].button,
        title: _i18n["default"].getString('complete', currentLocale)
      }, _react["default"].createElement(_CircleButton["default"], {
        disabled: !isOnFlip,
        className: (0, _classnames["default"])(_styles["default"].completeButton, isOnFlip ? '' : _styles["default"].disabled),
        onClick: this.onComplete,
        icon: _End["default"],
        showBorder: true
      })))));
    }
  }]);

  return FlipPanel;
}(_react.Component);

exports["default"] = FlipPanel;
FlipPanel.propTypes = {
  isOnFlip: _propTypes["default"].bool,
  flipNumbers: _propTypes["default"].array.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  onBack: _propTypes["default"].func.isRequired,
  onFlip: _propTypes["default"].func.isRequired,
  onComplete: _propTypes["default"].func.isRequired,
  onCallEnd: _propTypes["default"].func.isRequired,
  session: _propTypes["default"].object,
  sessionId: _propTypes["default"].string.isRequired
};
FlipPanel.defaultProps = {
  session: null,
  isOnFlip: false
};
//# sourceMappingURL=index.js.map

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _End = _interopRequireDefault(require("../../assets/images/End.svg"));
var _Flip = _interopRequireDefault(require("../../assets/images/Flip.svg"));
var _BackButton = _interopRequireDefault(require("../BackButton"));
var _BackHeader = _interopRequireDefault(require("../BackHeader"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _RadioBtnGroup = _interopRequireDefault(require("../RadioBtnGroup"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var FlipPanel = /*#__PURE__*/function (_Component) {
  _inherits(FlipPanel, _Component);
  var _super = _createSuper(FlipPanel);
  function FlipPanel(props) {
    var _this;
    _classCallCheck(this, FlipPanel);
    _this = _super.call(this, props);
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
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(FlipPanel, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
        session = _this$props.session,
        onCallEnd = _this$props.onCallEnd;
      if (session && !nextProps.session) {
        onCallEnd();
      }
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this$props2 = this.props,
        isOnFlip = _this$props2.isOnFlip,
        onBack = _this$props2.onBack,
        currentLocale = _this$props2.currentLocale,
        flipNumbers = _this$props2.flipNumbers,
        formatPhone = _this$props2.formatPhone;
      var flipEnabled = this.state.flipEnabled;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root,
        "data-sign": "flipPanel"
      }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"]
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | null' is not ass... Remove this comment to see the full error message
      , {
        onBackClick: isOnFlip ? null : onBack,
        backButton: /*#__PURE__*/_react["default"].createElement(_BackButton["default"], {
          showIcon: !isOnFlip
        }),
        className: _styles["default"].backHeader
      }, /*#__PURE__*/_react["default"].createElement("span", {
        "data-sign": "flipTitle",
        className: _styles["default"].headerTitle
      }, _i18n["default"].getString('flipHeader', currentLocale))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].flipContainer
      }, /*#__PURE__*/_react["default"].createElement(_RadioBtnGroup["default"]
      // @ts-expect-error TS(2322): Type '{ dataSign: string; className: string; radio... Remove this comment to see the full error message
      , {
        dataSign: "flipNumber",
        className: _styles["default"].radioGroup,
        radioOptions: flipNumbers,
        disabled: !flipEnabled,
        formatPhone: formatPhone,
        onRadioSelect: this.onRadioSelect,
        currentLocale: currentLocale
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonGroup
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "flip",
        className: _styles["default"].button,
        title: _i18n["default"].getString('flip', currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        disabled: !flipEnabled,
        className: (0, _classnames["default"])(_styles["default"].flipButton, flipEnabled ? '' : _styles["default"].disabled),
        iconClassName: _styles["default"].flipIcon,
        onClick: this.onFlip,
        icon: _Flip["default"],
        showBorder: true
      })), /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "flipComplete",
        className: _styles["default"].button,
        title: _i18n["default"].getString('complete', currentLocale)
      }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
        disabled: !isOnFlip,
        className: (0, _classnames["default"])(_styles["default"].completeButton, isOnFlip ? '' : _styles["default"].disabled),
        onClick: this.onComplete,
        icon: _End["default"],
        showBorder: true
      })))));
    }
  }]);
  return FlipPanel;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
FlipPanel.defaultProps = {
  session: null,
  isOnFlip: false
};
var _default = FlipPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

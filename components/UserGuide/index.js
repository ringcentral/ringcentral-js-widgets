"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _reactTransitionGroup = require("react-transition-group");
var _Button = require("../Button");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var controlStyles = {
  entered: {
    transform: 'translateY(0)'
  }
};
var UserGuide = /*#__PURE__*/function (_React$Component) {
  _inherits(UserGuide, _React$Component);
  var _super = _createSuper(UserGuide);
  function UserGuide(props) {
    var _this;
    _classCallCheck(this, UserGuide);
    _this = _super.call(this, props);
    _this.slideTo = function (idx) {
      if (idx > _this.props.guides.length - 1) {
        _this.exit();
        return;
      }
      _this.setState({
        curIdx: idx
      });
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      _this.props.updateCarousel({
        curIdx: idx,
        entered: _this.state.entered,
        playing: _this.state.playing
      });
    };
    _this.exit = function () {
      if (_this.props.quickAccessEnter && _this.props.firstLogin) {
        _this.setState({
          playing: false
        });
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        _this.props.updateCarousel({
          curIdx: _this.state.curIdx,
          entered: _this.state.entered,
          playing: false
        });
        _this.props.quickAccessEnter();
      } else {
        _this.setState({
          playing: false
        });
        _this.onExited();
      }
    };
    _this.onExited = function () {
      _this.setState({
        entered: false
      });
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      _this.props.updateCarousel({
        curIdx: 0,
        entered: false,
        playing: false,
        firstLogin: false
      });
    };
    _this.state = {
      curIdx: props.curIdx || 0,
      entered: props.entered || false,
      playing: props.playing || false
    };
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(UserGuide, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var curIdx = nextProps.curIdx,
        entered = nextProps.entered,
        playing = nextProps.playing;
      if (this.state.curIdx !== curIdx) {
        this.setState({
          curIdx: curIdx
        });
      }
      if (this.state.entered !== entered) {
        this.setState({
          entered: entered
        });
      }
      if (this.state.playing !== playing) {
        this.setState({
          playing: playing
        });
      }
    }
  }, {
    key: "getIntroView",
    value: function getIntroView() {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].intro,
        "data-sign": "userGuide"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].introBg,
        style: {
          backgroundImage: "url(".concat(this.props.guides[0], ")")
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].buttonGroup
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        className: _styles["default"].primaryButton,
        onClick: function onClick() {
          _this2.slideTo(1);
        }
      }, _i18n["default"].getString('start', this.props.currentLocale)), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        onClick: function onClick() {
          _this2.exit();
        },
        className: _styles["default"].secondaryButton
      }, _i18n["default"].getString('skip', this.props.currentLocale))));
    }
  }, {
    key: "getCarouselView",
    value: function getCarouselView() {
      var _this3 = this;
      var guides = this.props.guides.slice(1, this.props.guides.length);
      var imageView = guides.map(function (guide, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i,
          className: _styles["default"].view,
          style: {
            backgroundImage: "url(".concat(guide, ")"),
            transform: "translateX(".concat((i + 1) * 100, "vw)")
          }
        });
      });
      var indicatorView = guides.map(function (_, i) {
        var highlight = i + 1 === _this3.state.curIdx ? _styles["default"].highlight : null;
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: i,
          className: (0, _clsx["default"])(_styles["default"].dot, highlight),
          onClick: function onClick() {
            _this3.slideTo(i + 1);
          }
        });
      });
      var onLastPage = this.state.curIdx === this.props.guides.length - 1;
      var skipButton = onLastPage ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].secondaryButton
      }) : /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        onClick: function onClick() {
          _this3.exit();
        },
        className: (0, _clsx["default"])(_styles["default"].secondaryButton),
        dataSign: "skipButton"
      }, _i18n["default"].getString('skip', this.props.currentLocale));
      var nextButton = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        onClick: function onClick() {
          _this3.slideTo(_this3.state.curIdx + 1);
        },
        className: (0, _clsx["default"])(_styles["default"].primaryButton)
      }, onLastPage ? _i18n["default"].getString('finish', this.props.currentLocale) : _i18n["default"].getString('next', this.props.currentLocale));
      var controlView = /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.Transition, {
        "in": this.state.curIdx > 0,
        timeout: 300
      }, function (state) {
        return (
          /*#__PURE__*/
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          _react["default"].createElement("div", {
            className: _styles["default"].control,
            style: _objectSpread({}, controlStyles[state])
          }, skipButton, /*#__PURE__*/_react["default"].createElement("ul", {
            className: _styles["default"].indicator
          }, indicatorView), nextButton)
        );
      });
      var carouselClassName = this.props.carouselClassName;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].carousel, carouselClassName)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].carouselBox,
        style: {
          transform: "translateX(-".concat(this.state.curIdx * 100, "vw)")
        }
      }, this.getIntroView(), imageView), controlView);
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      if (!this.props.guides || this.props.guides.length === 0 || !this.state.entered) return null;
      if (this.props.showSpinner) {
        return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
      }
      var view = this.getCarouselView();
      return /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.CSSTransition, {
        "in": this.state.playing,
        timeout: 400,
        classNames: {
          appear: _styles["default"].enter,
          appearActive: _styles["default"].enterActive,
          exit: _styles["default"].exit,
          exitActive: _styles["default"].exitActive
        },
        onExited: this.onExited,
        appear: true
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, view));
    }
  }]);
  return UserGuide;
}(_react["default"].Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
UserGuide.defaultProps = {
  curIdx: 0,
  entered: false,
  playing: false,
  firstLogin: false,
  updateCarousel: function updateCarousel() {
    return null;
  },
  quickAccessEnter: undefined,
  carouselClassName: null
};
var _default = UserGuide;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

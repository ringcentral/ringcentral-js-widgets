"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactTransitionGroup = require("react-transition-group");

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _Button = require("../Button");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  _createClass(UserGuide, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
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
        className: _styles["default"].intro
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
          className: (0, _classnames["default"])(_styles["default"].dot, highlight),
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
        className: (0, _classnames["default"])(_styles["default"].secondaryButton)
      }, _i18n["default"].getString('skip', this.props.currentLocale));

      var nextButton = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        onClick: function onClick() {
          _this3.slideTo(_this3.state.curIdx + 1);
        },
        className: (0, _classnames["default"])(_styles["default"].primaryButton)
      }, onLastPage ? _i18n["default"].getString('finish', this.props.currentLocale) : _i18n["default"].getString('next', this.props.currentLocale));

      var controlView = /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.Transition, {
        "in": this.state.curIdx > 0,
        timeout: 300
      }, function (state) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].control,
          style: _objectSpread({}, controlStyles[state])
        }, skipButton, /*#__PURE__*/_react["default"].createElement("ul", {
          className: _styles["default"].indicator
        }, indicatorView), nextButton);
      });

      var carouselClassName = this.props.carouselClassName;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].carousel, carouselClassName)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].carouselBox,
        style: {
          transform: "translateX(-".concat(this.state.curIdx * 100, "vw)")
        }
      }, this.getIntroView(), imageView), controlView);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.guides || this.props.guides.length === 0 || !this.state.entered) return null;

      if (this.props.showSpinner) {
        return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay["default"], null);
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
}(_react["default"].Component);

exports["default"] = UserGuide;
UserGuide.propTypes = {
  curIdx: _propTypes["default"].number,
  entered: _propTypes["default"].bool,
  playing: _propTypes["default"].bool,
  firstLogin: _propTypes["default"].bool,
  updateCarousel: _propTypes["default"].func,
  quickAccessEnter: _propTypes["default"].func,
  guides: _propTypes["default"].array.isRequired,
  showSpinner: _propTypes["default"].bool.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  carouselClassName: _propTypes["default"].string
};
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
//# sourceMappingURL=index.js.map

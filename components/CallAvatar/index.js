"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var uuid = _interopRequireWildcard(require("uuid"));

var _dataUrl = require("@ringcentral-integration/commons/lib/dataUrl");

var _Spinner = _interopRequireDefault(require("../../assets/images/Spinner.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallAvatar = /*#__PURE__*/function (_Component) {
  _inherits(CallAvatar, _Component);

  var _super = _createSuper(CallAvatar);

  function CallAvatar(props) {
    var _this;

    _classCallCheck(this, CallAvatar);

    _this = _super.call(this, props);
    _this.state = {
      avatarUrl: null
    };
    _this._mounted = false;
    return _this;
  }

  _createClass(CallAvatar, [{
    key: "loadImg",
    value: function loadImg() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var avatarUrl = props.avatarUrl;

      if ((0, _dataUrl.isBase64DataUrl)(avatarUrl)) {
        this.setState({
          avatarUrl: avatarUrl
        });
        return;
      } // means we have to load it


      if (!this._mounted) {
        return;
      }

      if (avatarUrl) {
        var $img = document.createElement('img');
        $img.src = avatarUrl;

        $img.onload = function () {
          if (!_this2._mounted) {
            return;
          }

          _this2.setState({
            avatarUrl: avatarUrl
          });
        };

        $img.onerror = function () {
          if (!_this2._mounted) {
            return;
          }

          _this2.setState({
            avatarUrl: null
          });
        };
      }
    }
  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.loadImg();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;

      if (!this.state.avatarUrl) {
        this.loadImg();
      }
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.avatarUrl !== this.props.avatarUrl) {
        this.loadImg(nextProps);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          extraNum = _this$props.extraNum,
          isOnConferenceCall = _this$props.isOnConferenceCall,
          spinnerMode = _this$props.spinnerMode,
          className = _this$props.className,
          onClick = _this$props.onClick;
      var avatarUrl = this.state.avatarUrl;
      var initialSize = 38;
      var margin = 4;
      var avatarCircleRadius = 15;
      var extraNumCircleRadius = 8.5;
      var extraNumCircleBorder = 1;
      var circleBorder = 1;
      var $snow = '#fff';
      var $blueLight = '#cee7f2';
      var $blue = '#066FAC';
      var $dark = '#e2e2e2';
      var $transparency = '0.8';
      var defaultAvatarStyle = {
        opacity: +$transparency
      };
      var hash = uuid.v4();
      var portraitChar = "\uE904"; // HACK: &#xe904; is the font code for the portrait icon

      var iconFont = 'dynamics_icon'; // Hard coding this for firefox to load iconfont

      var textId = "text-".concat(hash);
      var clipId = "circleClip-".concat(hash);
      var avatarStyle = {
        stroke: $dark,
        strokeWidth: "".concat(circleBorder, "px")
      };
      var showingSpinner = spinnerMode;
      var aspectRatio = 'xMidYMid meet';
      var xmlns = 'http://www.w3.org/2000/svg';
      var svgCls = (0, _classnames["default"])(_styles["default"].callAvatar, onClick ? _styles["default"].autoPointerEvents : _styles["default"].disabledPointerEvents, className); // spinner sizing

      var spinnerId = "spinner-".concat(hash);
      var spinnerScaleSize = 1.5;
      var spinnerSize = 12;
      var spinnerTranslateTo = (initialSize - spinnerSize * spinnerScaleSize) / 2;
      var isOnConferenceCallWithExtraNum = isOnConferenceCall && extraNum > 0;
      var spinnerTransform = "translate(".concat(spinnerTranslateTo - (isOnConferenceCallWithExtraNum ? margin : 0), ",").concat(spinnerTranslateTo, ") scale(").concat(spinnerScaleSize, ", ").concat(spinnerScaleSize, ")");

      if (isOnConferenceCallWithExtraNum) {
        return /*#__PURE__*/_react["default"].createElement("svg", {
          onClick: onClick ? function () {
            return onClick();
          } : null,
          className: svgCls,
          style: avatarUrl ? avatarStyle : null,
          viewBox: "0 0 ".concat(initialSize, " ").concat(initialSize),
          preserveAspectRatio: aspectRatio,
          xmlns: xmlns
        }, /*#__PURE__*/_react["default"].createElement("defs", null, /*#__PURE__*/_react["default"].createElement("g", {
          id: textId
        }, /*#__PURE__*/_react["default"].createElement("text", {
          x: "0",
          y: "0",
          dy: "".concat(initialSize - 10, "px"),
          style: {
            fontSize: "".concat(avatarCircleRadius * 2, "px"),
            fill: $blue,
            opacity: '.5'
          },
          fontFamily: iconFont
        }, portraitChar)), /*#__PURE__*/_react["default"].createElement(_Spinner["default"], {
          id: spinnerId
        })), /*#__PURE__*/_react["default"].createElement("circle", {
          cx: avatarCircleRadius,
          cy: margin + avatarCircleRadius,
          r: avatarCircleRadius,
          fill: $snow,
          stroke: showingSpinner ? $dark : 'inherit',
          strokeOpacity: showingSpinner ? $transparency : '1'
        }), /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("clipPath", {
          id: clipId
        }, /*#__PURE__*/_react["default"].createElement("circle", {
          cx: avatarCircleRadius,
          cy: margin + avatarCircleRadius,
          r: avatarCircleRadius,
          fill: $snow
        }))), showingSpinner && /*#__PURE__*/_react["default"].createElement("g", {
          transform: spinnerTransform
        }, /*#__PURE__*/_react["default"].createElement("use", {
          xlinkHref: "#".concat(spinnerId)
        })), avatarUrl && /*#__PURE__*/_react["default"].createElement("image", {
          clipPath: "url(#".concat(clipId, ")"),
          height: "100%",
          width: "100%",
          xlinkHref: avatarUrl
        }), !avatarUrl && !showingSpinner && /*#__PURE__*/_react["default"].createElement("use", {
          xlinkHref: "#".concat(textId),
          clipPath: "url(#".concat(clipId, ")"),
          style: defaultAvatarStyle
        }), /*#__PURE__*/_react["default"].createElement("circle", {
          cx: initialSize - extraNumCircleRadius,
          cy: extraNumCircleRadius,
          r: extraNumCircleRadius,
          fill: $snow
        }), /*#__PURE__*/_react["default"].createElement("circle", {
          cx: initialSize - extraNumCircleRadius,
          cy: extraNumCircleRadius,
          r: extraNumCircleRadius - extraNumCircleBorder,
          fill: $blueLight
        }), /*#__PURE__*/_react["default"].createElement("text", {
          x: initialSize - extraNumCircleRadius,
          y: extraNumCircleRadius,
          dy: "3px",
          textAnchor: "middle",
          style: {
            fontSize: '9px',
            stroke: 'none',
            fill: $blue,
            fontWeight: 'bolder',
            opacity: '.5'
          }
        }, "+".concat(extraNum)));
      }

      return /*#__PURE__*/_react["default"].createElement("svg", {
        className: svgCls,
        onClick: onClick ? function () {
          return onClick();
        } : null,
        style: avatarUrl ? avatarStyle : null,
        viewBox: "0 0 ".concat(initialSize, " ").concat(initialSize),
        preserveAspectRatio: aspectRatio,
        xmlns: xmlns
      }, /*#__PURE__*/_react["default"].createElement("defs", null, /*#__PURE__*/_react["default"].createElement("g", {
        id: textId
      }, /*#__PURE__*/_react["default"].createElement("text", {
        x: "0",
        y: "0",
        dy: "".concat(initialSize - 10, "px"),
        dx: "2",
        style: {
          fontSize: "".concat((initialSize / 2 - 2) * 2, "px"),
          fill: $blue,
          opacity: '.5'
        },
        fontFamily: iconFont
      }, portraitChar)), /*#__PURE__*/_react["default"].createElement(_Spinner["default"], {
        id: spinnerId
      })), /*#__PURE__*/_react["default"].createElement("circle", {
        cx: initialSize / 2,
        cy: initialSize / 2,
        r: initialSize / 2 - circleBorder,
        fill: $snow,
        stroke: showingSpinner ? $dark : 'inherit',
        strokeOpacity: showingSpinner ? $transparency : '1'
      }), /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("clipPath", {
        id: clipId
      }, /*#__PURE__*/_react["default"].createElement("circle", {
        cx: initialSize / 2,
        cy: initialSize / 2,
        r: initialSize / 2 - 1
      }))), showingSpinner && /*#__PURE__*/_react["default"].createElement("g", {
        transform: spinnerTransform
      }, /*#__PURE__*/_react["default"].createElement("use", {
        xlinkHref: "#".concat(spinnerId)
      })), showingSpinner && /*#__PURE__*/_react["default"].createElement("g", {
        transform: spinnerTransform
      }, /*#__PURE__*/_react["default"].createElement("use", {
        xlinkHref: "#".concat(spinnerId)
      })), avatarUrl && /*#__PURE__*/_react["default"].createElement("image", {
        clipPath: "url(#".concat(clipId, ")"),
        height: "100%",
        width: "100%",
        xlinkHref: avatarUrl,
        preserveAspectRatio: "xMinYMin slice"
      }), !avatarUrl && !showingSpinner && /*#__PURE__*/_react["default"].createElement("use", {
        xlinkHref: "#".concat(textId),
        clipPath: "url(#".concat(clipId, ")"),
        style: defaultAvatarStyle
      }));
    }
  }]);

  return CallAvatar;
}(_react.Component);

CallAvatar.defaultProps = {
  isOnConferenceCall: false,
  avatarUrl: null,
  extraNum: 0,
  spinnerMode: false,
  className: null,
  onClick: null
};
var _default = CallAvatar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CallAvatar = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/utils");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _uuid = require("uuid");
var _Spinner = _interopRequireDefault(require("../../assets/images/Spinner.svg"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var portraitChar = "\uE904"; // HACK: &#xe904; is the font code for the portrait icon
var iconFont = 'dynamics_icon'; // Hard coding this for firefox to load iconfont
var avatarStyle = {
  stroke: $dark,
  strokeWidth: "".concat(circleBorder, "px")
};
var spinnerScaleSize = 1.5;
var spinnerSize = 12;
var spinnerTranslateTo = (initialSize - spinnerSize * spinnerScaleSize) / 2;
var aspectRatio = 'xMidYMid meet';
var xmlns = 'http://www.w3.org/2000/svg';
var CallAvatar = function CallAvatar(_ref) {
  var _ref$extraNum = _ref.extraNum,
    extraNum = _ref$extraNum === void 0 ? 0 : _ref$extraNum,
    isOnConferenceCall = _ref.isOnConferenceCall,
    showingSpinner = _ref.spinnerMode,
    avatarUrlProp = _ref.avatarUrl,
    className = _ref.className,
    onClick = _ref.onClick;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    avatarUrl = _useState2[0],
    setAvatarUrl = _useState2[1];
  var svgCls = (0, _clsx["default"])(_styles["default"].callAvatar, onClick ? _styles["default"].autoPointerEvents : _styles["default"].disabledPointerEvents, className);
  var _useRef = (0, _react.useRef)((0, _uuid.v4)()),
    hash = _useRef.current;
  var textId = "text-".concat(hash);
  var clipId = "circleClip-".concat(hash);

  // spinner sizing
  var spinnerId = "spinner-".concat(hash);
  var isOnConferenceCallWithExtraNum = isOnConferenceCall && extraNum > 0;
  var translateValue = spinnerTranslateTo - (isOnConferenceCallWithExtraNum ? margin : 0);
  var spinnerTransform = "translate(".concat(translateValue, ", ").concat(spinnerTranslateTo, ") scale(").concat(spinnerScaleSize, ", ").concat(spinnerScaleSize, ")");
  (0, _react.useEffect)(function () {
    var loadImg = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (avatarUrlProp) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (!(0, _utils.isBase64DataUrl)(avatarUrlProp)) {
                  _context.next = 5;
                  break;
                }
                setAvatarUrl(avatarUrlProp);
                return _context.abrupt("return");
              case 5:
                _context.prev = 5;
                _context.next = 8;
                return (0, _utils.loadImage)(avatarUrlProp);
              case 8:
                setAvatarUrl(avatarUrlProp);
                _context.next = 14;
                break;
              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](5);
                setAvatarUrl(null);
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 11]]);
      }));
      return function loadImg() {
        return _ref2.apply(this, arguments);
      };
    }();
    loadImg();
  }, [avatarUrlProp]);
  if (isOnConferenceCallWithExtraNum) {
    return /*#__PURE__*/_react["default"].createElement("svg", {
      onClick: onClick,
      className: svgCls,
      style: avatarUrl ? avatarStyle : {},
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
    onClick: onClick,
    style: avatarUrl ? avatarStyle : {},
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
};
exports.CallAvatar = CallAvatar;
var _default = CallAvatar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

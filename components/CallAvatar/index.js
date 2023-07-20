"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CallAvatar = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _uuid = require("uuid");
var _utils = require("@ringcentral-integration/utils");
var _Spinner = _interopRequireDefault(require("../../assets/images/Spinner.svg"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
  var svgCls = (0, _classnames["default"])(_styles["default"].callAvatar, onClick ? _styles["default"].autoPointerEvents : _styles["default"].disabledPointerEvents, className);
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

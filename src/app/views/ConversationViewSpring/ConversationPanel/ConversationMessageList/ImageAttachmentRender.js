"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewMedia = exports.ImageAttachmentRender = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _components = require("@ringcentral-integration/next-widgets/components");
var _utils = require("@ringcentral-integration/utils");
var _constant = require("@ringcentral-integration/utils/src/utils/fileHandler/constant");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _excluded = ["maxWidth", "height", "width"],
  _excluded2 = ["attachment", "direction", "handleImageLoad"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); } /* eslint-disable jsx-a11y/alt-text */
var TiffViewer = /*#__PURE__*/_react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./TiffViewer'));
  });
});
var PreviewMedia = exports.PreviewMedia = function PreviewMedia(props) {
  var _props$maxWidth = props.maxWidth,
    maxWidthProp = _props$maxWidth === void 0 ? global.document.body.clientWidth : _props$maxWidth,
    height = props.height,
    width = props.width,
    rest = _objectWithoutProperties(props, _excluded);
  var _useState = (0, _react.useState)(maxWidthProp),
    _useState2 = _slicedToArray(_useState, 2),
    maxWidth = _useState2[0],
    setMaxWidth = _useState2[1];
  var heightRatio = (0, _react.useMemo)(function () {
    return height / width;
  }, [height, width]);
  var toWidth = (0, _react.useMemo)(function () {
    return Math.min(maxWidth, width);
  }, [maxWidth, width]);
  var imgRef = (0, _react.useRef)(null);
  var containerRef = (0, _react.useRef)(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _springUi.useResizeObserver)(containerRef, function () {
    var _containerRef$current;
    var parentElm = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.parentElement;
    if (parentElm) {
      setMaxWidth(parentElm.clientWidth);
    }
  }, {
    mode: 'throttle'
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: containerRef,
    style: {
      width: "".concat(toWidth, "px"),
      height: "".concat(toWidth * heightRatio, "px")
    }
  }, /*#__PURE__*/_react["default"].createElement("img", _extends({
    ref: imgRef,
    draggable: "false",
    className: "w-full h-full"
  }, rest)));
};
var ImageAttachmentRender = exports.ImageAttachmentRender = function ImageAttachmentRender(props) {
  var attachment = props.attachment,
    direction = props.direction,
    handleImageLoad = props.handleImageLoad,
    rest = _objectWithoutProperties(props, _excluded2);
  var uri = attachment.uri;
  var fileNameWithoutExt = attachment.fileName ? (0, _utils.removeExtension)(attachment.fileName) : attachment.id;
  var fileExt = attachment.fileName ? (0, _utils.getFileExtension)(attachment.fileName) : _constant.CONTENT_TYPE_TO_EXTENSION[attachment.contentType];
  var fileName = "".concat(fileNameWithoutExt, ".").concat(fileExt);
  var isTiff = fileExt.indexOf('tif') > -1;
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    key: attachment.id
  }, rest, {
    className: (0, _clsx["default"])('rounded-lg overflow-hidden relative outline-none z-10', direction === 'Outbound' ? 'last:rounded-br-none' : 'last:rounded-bl-none', _styles["default"].previewMedia)
  }), isTiff ? /*#__PURE__*/_react["default"].createElement(_react.Suspense, {
    fallback: null
  }, /*#__PURE__*/_react["default"].createElement(TiffViewer, {
    tiffUrl: uri,
    onLoad: handleImageLoad
  })) : /*#__PURE__*/_react["default"].createElement(PreviewMedia, {
    height: attachment.height || 100,
    width: attachment.width || 100,
    loading: "lazy",
    tabIndex: 0,
    src: uri,
    alt: fileName,
    title: fileName,
    draggable: "false",
    onLoad: handleImageLoad
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('bg-neutral-b4 h-8 p-2 flex items-center absolute left-0 bottom-0 translate-y-full transition-neutral-01-fast w-full', _styles["default"].hoverAction),
    "data-sign": "image-toolbar"
  }, fileName && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex typography-mainText overflow-hidden flex-auto pr-2",
    "data-sign": "image-name"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "truncate"
  }, fileNameWithoutExt), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex-none', _styles["default"].ext)
  }, ".", fileExt)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ml-auto"
  }, /*#__PURE__*/_react["default"].createElement(_components.DownloadButton, {
    size: "medium",
    url: "".concat(uri, "&contentDisposition=Attachment"),
    name: fileName
  }))));
};
//# sourceMappingURL=ImageAttachmentRender.js.map

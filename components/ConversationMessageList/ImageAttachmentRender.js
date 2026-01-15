"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.define-property");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.weak-map");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageAttachmentRender = void 0;
var _utils = require("@ringcentral-integration/utils");
var _constant = require("@ringcentral-integration/utils/src/utils/fileHandler/constant");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _DownloadButton = require("../DownloadButton");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
var TiffViewer = /*#__PURE__*/_react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./TiffViewer'));
  });
});
var ImageAttachmentRender = function ImageAttachmentRender(props) {
  var attachment = props.attachment,
    handleImageLoad = props.handleImageLoad,
    rest = _objectWithoutProperties(props, ["attachment", "handleImageLoad"]);
  var uri = attachment.uri;
  var fileNameWithoutExt = attachment.fileName ? (0, _utils.removeExtension)(attachment.fileName) : attachment.id;
  var fileExt = attachment.fileName ? (0, _utils.getFileExtension)(attachment.fileName) : _constant.CONTENT_TYPE_TO_EXTENSION[attachment.contentType];
  var fileName = "".concat(fileNameWithoutExt, ".").concat(fileExt);
  var isTiff = fileExt.indexOf('tif') > -1;
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    key: attachment.id
  }, rest, {
    className: (0, _clsx["default"])('rounded-lg overflow-hidden relative outline-none z-10', _styles["default"].previewMedia)
  }), isTiff ? /*#__PURE__*/_react["default"].createElement(_react.Suspense, {
    fallback: /*#__PURE__*/_react["default"].createElement("div", null)
  }, /*#__PURE__*/_react["default"].createElement(TiffViewer, {
    tiffUrl: uri,
    onLoad: handleImageLoad
  })) : /*#__PURE__*/_react["default"].createElement("img", {
    loading: "lazy"
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    ,
    tabIndex: 0,
    src: uri,
    alt: fileName,
    title: fileName,
    draggable: "false",
    className: "w-full",
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
  }, /*#__PURE__*/_react["default"].createElement(_DownloadButton.DownloadButton, {
    size: "medium",
    url: "".concat(uri, "&contentDisposition=Attachment"),
    name: fileName
  }))));
};
exports.ImageAttachmentRender = ImageAttachmentRender;
//# sourceMappingURL=ImageAttachmentRender.js.map

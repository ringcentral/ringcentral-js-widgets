"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttachButton = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _useFileUpload3 = require("use-file-upload");
var _excluded = ["acceptTypes", "multiple", "type", "label", "onUpload"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var handlePreventLeaveFocus = function handlePreventLeaveFocus(e) {
  return e.preventDefault();
};
var AttachButton = exports.AttachButton = function AttachButton(_ref) {
  var accept = _ref.acceptTypes,
    _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? false : _ref$multiple,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'icon' : _ref$type,
    label = _ref.label,
    onUpload = _ref.onUpload,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useFileUpload = (0, _useFileUpload3.useFileUpload)(),
    _useFileUpload2 = _slicedToArray(_useFileUpload, 2),
    selectFile = _useFileUpload2[1];
  var BaseComponent = function BaseComponent(props) {
    return type === 'icon' ? /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, _extends({
      color: "secondary",
      className: "text-neutral-b2",
      variant: "icon",
      symbol: _springIcon.LinkMd
    }, props)) : props.title ? /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
      title: props.title
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, _extends({
      variant: "outlined"
    }, props))) : /*#__PURE__*/_react["default"].createElement(_springUi.Button, _extends({
      variant: "outlined"
    }, props));
  };
  return /*#__PURE__*/_react["default"].createElement(BaseComponent, _extends({
    "data-sign": "attachButton",
    size: "large"
  }, rest, {
    onMouseDown: handlePreventLeaveFocus,
    onClick: function onClick() {
      return selectFile({
        accept: accept,
        multiple: multiple
      }, function (result) {
        var files = multiple ? result : [result];
        onUpload === null || onUpload === void 0 ? void 0 : onUpload(files.map(function (it) {
          return it.file;
        }));
      });
    }
  }), label);
};
//# sourceMappingURL=AttachButton.js.map

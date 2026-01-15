"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoTitleRendererID = exports.infoTitleRenderer = exports.defaultOKRendererID = exports.defaultOKRenderer = exports.defaultCancelRendererID = exports.defaultCancelRenderer = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _templateObject, _templateObject2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var defaultOKRendererID = exports.defaultOKRendererID = 'ModalUI.defaultOKRendererID';
var defaultCancelRendererID = exports.defaultCancelRendererID = 'ModalUI.defaultCancelRendererID';
var infoTitleRendererID = exports.infoTitleRendererID = 'ModalUI.infoTitleRendererID';
var defaultOKRenderer = exports.defaultOKRenderer = function defaultOKRenderer(_ref) {
  var currentLocale = _ref.currentLocale;
  return _i18n["default"].getString('ok', currentLocale);
};
var defaultCancelRenderer = exports.defaultCancelRenderer = function defaultCancelRenderer(_ref2) {
  var currentLocale = _ref2.currentLocale;
  return _i18n["default"].getString('cancel', currentLocale);
};
var Header = _juno.styled.header(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  height: 64px;\n"])));
var Title = (0, _juno.styled)(_juno.RcText)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin-right: ", ";\n"])), (0, _juno.spacing)(3));
var infoTitleRenderer = exports.infoTitleRenderer = function infoTitleRenderer(_ref3) {
  var currentLocale = _ref3.currentLocale,
    onConfirm = _ref3.onConfirm,
    title = _ref3.title;
  return /*#__PURE__*/_react["default"].createElement(Header, null, /*#__PURE__*/_react["default"].createElement(Title, {
    variant: "title2",
    component: "h2",
    flexFull: true
  }, title), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    title: _i18n["default"].getString('close', currentLocale),
    symbol: _junoIcon.Close,
    onClick: onConfirm
  })));
};
//# sourceMappingURL=ModalRenderer.js.map

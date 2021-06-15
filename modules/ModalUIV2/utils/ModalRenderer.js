"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoTitleRenderer = exports.defaultCancelRenderer = exports.defaultOKRenderer = exports.infoTitleRendererID = exports.defaultCancelRendererID = exports.defaultOKRendererID = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _juno = require("@ringcentral/juno");

var _Close = _interopRequireDefault(require("@ringcentral/juno/icon/Close"));

var _react = _interopRequireDefault(require("react"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin-right: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  height: 64px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var defaultOKRendererID = 'ModalUI.defaultOKRendererID';
exports.defaultOKRendererID = defaultOKRendererID;
var defaultCancelRendererID = 'ModalUI.defaultCancelRendererID';
exports.defaultCancelRendererID = defaultCancelRendererID;
var infoTitleRendererID = 'ModalUI.infoTitleRendererID';
exports.infoTitleRendererID = infoTitleRendererID;

var defaultOKRenderer = function defaultOKRenderer(_ref) {
  var currentLocale = _ref.currentLocale;
  return _i18n["default"].getString('ok', currentLocale);
};

exports.defaultOKRenderer = defaultOKRenderer;

var defaultCancelRenderer = function defaultCancelRenderer(_ref2) {
  var currentLocale = _ref2.currentLocale;
  return _i18n["default"].getString('cancel', currentLocale);
};

exports.defaultCancelRenderer = defaultCancelRenderer;

var Header = _juno.styled.header(_templateObject());

var Title = (0, _juno.styled)(_juno.RcText)(_templateObject2(), (0, _juno.spacing)(3));

var infoTitleRenderer = function infoTitleRenderer(_ref3) {
  var currentLocale = _ref3.currentLocale,
      onConfirm = _ref3.onConfirm,
      title = _ref3.title;
  return /*#__PURE__*/_react["default"].createElement(Header, null, /*#__PURE__*/_react["default"].createElement(Title, {
    variant: "title2",
    component: "h2",
    flexFull: true
  }, title), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    tooltipTitle: _i18n["default"].getString('close', currentLocale),
    symbol: _Close["default"],
    onClick: onConfirm
  })));
};

exports.infoTitleRenderer = infoTitleRenderer;
//# sourceMappingURL=ModalRenderer.js.map

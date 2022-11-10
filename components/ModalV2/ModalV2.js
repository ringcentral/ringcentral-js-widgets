"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalV2 = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _ramda = require("ramda");

var _juno = require("@ringcentral/juno");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PopupBox = (0, _juno.styled)(_juno.RcPopupBox)(_templateObject(), _juno.RcDialogContent, (0, _juno.palette2)('neutral', 'f06'));

var ModalV2 = function ModalV2(_ref) {
  var modals = _ref.modals,
      phone = _ref.phone,
      dialogProps = _objectWithoutProperties(_ref, ["modals", "phone"]);

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _ramda.map)(function (_ref2) {
    var key = _ref2.key,
        open = _ref2.open,
        modalProps = _objectWithoutProperties(_ref2, ["key", "open"]);

    var _ref3 = (0, _juno.combineProps)(dialogProps, modalProps),
        children = _ref3.children,
        rest = _objectWithoutProperties(_ref3, ["children"]);

    if (modalProps.size) {
      // throw error directly
      throw new Error('[ModalV2] that size props are be deprecated, please use maxWidth');
    }

    return /*#__PURE__*/_react["default"].createElement(PopupBox, _extends({
      open: open,
      key: key
    }, rest), children);
  }, modals));
};

exports.ModalV2 = ModalV2;
//# sourceMappingURL=ModalV2.js.map

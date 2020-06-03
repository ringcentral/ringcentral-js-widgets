"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientOption = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _RecipientInfo = require("./RecipientInfo");

var _RecipientPhone = require("./RecipientPhone");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RecipientOption = function RecipientOption(_ref) {
  var active = _ref.active,
      _ref$recipientInfoRen = _ref.recipientInfoRenderer,
      RecipientInfoRenderer = _ref$recipientInfoRen === void 0 ? _RecipientInfo.RecipientInfo : _ref$recipientInfoRen,
      _ref$recipientPhoneRe = _ref.recipientPhoneRenderer,
      RecipientPhoneRenderer = _ref$recipientPhoneRe === void 0 ? _RecipientPhone.RecipientPhone : _ref$recipientPhoneRe,
      onClick = _ref.onClick,
      onHover = _ref.onHover,
      baseProps = _objectWithoutProperties(_ref, ["active", "recipientInfoRenderer", "recipientPhoneRenderer", "onClick", "onHover"]);

  var className = (0, _classnames["default"])(_styles["default"].contactItem, active && _styles["default"].active);
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: className,
    onMouseOver: onHover
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].clickable,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(RecipientInfoRenderer, baseProps), /*#__PURE__*/_react["default"].createElement(RecipientPhoneRenderer, baseProps)));
};

exports.RecipientOption = RecipientOption;
//# sourceMappingURL=RecipientOption.js.map

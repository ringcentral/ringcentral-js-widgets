"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialPad = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _RcDialerPadSounds = _interopRequireDefault(require("@ringcentral/juno/RcDialerPadSounds.json"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @deprecated use juno RcDialPad directly */
var DialPad = function DialPad(_ref) {
  var className = _ref.className,
      dataSign = _ref.dataSign,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ["className", "dataSign", "onChange"]);

  var handleChange = function handleChange(e) {
    return onChange && onChange(e);
  };

  return /*#__PURE__*/_react["default"].createElement(_juno.RcDialPad, _extends({
    "data-sign": "".concat(dataSign || '', "DialPad"),
    className: (0, _classnames["default"])(_styles["default"].root, className),
    onChange: handleChange,
    sounds: _RcDialerPadSounds["default"]
  }, rest));
};

exports.DialPad = DialPad;
//# sourceMappingURL=DialPad.js.map

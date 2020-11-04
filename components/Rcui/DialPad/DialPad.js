"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialPad = void 0;

var _juno = require("@ringcentral/juno");

var _RcDialerPadSounds = _interopRequireDefault(require("@ringcentral/juno/RcDialerPadSounds.json"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DialPad = function DialPad(_ref) {
  var className = _ref.className,
      dataSign = _ref.dataSign,
      onChange = _ref.onChange,
      shouldHandleKeyboardEvts = _ref.shouldHandleKeyboardEvts;

  var dialEffect = function dialEffect(e) {
    return onChange && onChange(e);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "".concat(dataSign || '', "DialPad"),
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcDialPad, {
    mouseEffect: dialEffect,
    classes: {
      root: _styles["default"].dialPadRoot,
      icon: _styles["default"].dialPadIcon
    },
    shouldHandleKeyboardEvts: shouldHandleKeyboardEvts,
    sounds: _RcDialerPadSounds["default"]
  }));
};

exports.DialPad = DialPad;
//# sourceMappingURL=DialPad.js.map

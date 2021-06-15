"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _DialPad = require("ringcentral-widgets/components/Rcui/DialPad");

var _RecipientsInput = require("ringcentral-widgets/components/Rcui/RecipientsInput");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Dialer = function Dialer(_ref) {
  var value = _ref.value,
      setValue = _ref.setValue,
      children = _ref.children,
      placeholder = _ref.placeholder;
  var actionRef = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].dialerWrapper
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].recipient
  }, /*#__PURE__*/_react["default"].createElement(_RecipientsInput.RecipientsInput, {
    value: value,
    className: _styles["default"].recipientInput,
    onChange: function onChange(value) {
      var _actionRef$current;

      setValue(value);
      (_actionRef$current = actionRef.current) === null || _actionRef$current === void 0 ? void 0 : _actionRef$current.playAudio(value[value.length - 1]);
    },
    onDelete: function onDelete() {
      if (value === null || value === void 0 ? void 0 : value.length) {
        setValue(value.substring(0, value.length - 1));
      }
    },
    onClear: function onClear() {
      return setValue('');
    },
    placeholder: placeholder
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].dialerPad
  }, /*#__PURE__*/_react["default"].createElement(_DialPad.DialPad, {
    onChange: function onChange(addValue) {
      return setValue("".concat(value).concat(addValue));
    },
    action: actionRef
  })), children);
};

exports.Dialer = Dialer;
//# sourceMappingURL=Dialer.js.map

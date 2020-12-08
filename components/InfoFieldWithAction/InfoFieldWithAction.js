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
exports.InfoFieldWithAction = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

var _FormFieldContainer = require("../FormFieldContainer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  & {\n    display: flex;\n    flex-wrap: nowrap;\n    flex-direction: row;\n    max-width: 100%;\n    justify-content: flex-start;\n    align-items: center;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  & {\n    ", ";\n    white-space: ", ";\n    overflow: hidden;\n    text-overflow: ellipsis;\n    ", ";\n    margin: 0 ", " 0 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledInfo = (0, _juno.styled)('section')(_templateObject(), (0, _juno.typography)('body1'), function (_ref) {
  var breakSpace = _ref.breakSpace;
  return breakSpace ? 'break-spaces' : 'nowrap';
}, function (_ref2) {
  var fullSize = _ref2.fullSize;
  return fullSize ? "flex-grow: 1;" : '';
}, (0, _juno.spacing)(2));
var StyledContainer = (0, _juno.styled)('section')(_templateObject2());
var InfoFieldWithAction = /*#__PURE__*/(0, _react.memo)(function (_ref3) {
  var label = _ref3.label,
      value = _ref3.value,
      name = _ref3.name,
      tooltip = _ref3.tooltip,
      btn = _ref3.btn,
      children = _ref3.children,
      fullSize = _ref3.fullSize,
      breakSpace = _ref3.breakSpace,
      labelVariant = _ref3.labelVariant;
  return /*#__PURE__*/_react["default"].createElement(_FormFieldContainer.FormFieldContainer, {
    label: label,
    htmlFor: name,
    tooltip: tooltip,
    labelVariant: labelVariant
  }, /*#__PURE__*/_react["default"].createElement(StyledContainer, null, /*#__PURE__*/_react["default"].createElement(StyledInfo, {
    "data-sign": "".concat(name, "Field"),
    fullSize: fullSize,
    breakSpace: breakSpace
  }, value), btn, children));
});
exports.InfoFieldWithAction = InfoFieldWithAction;
InfoFieldWithAction.defaultProps = {
  btn: null,
  fullSize: true,
  breakSpace: false
};
//# sourceMappingURL=InfoFieldWithAction.js.map

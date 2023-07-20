"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
require("core-js/modules/es.regexp.constructor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextWithHighlight = void 0;
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var HighlightText = _juno.styled.span(_templateObject(), (0, _juno.palette2)('highlight', 'b02'));
var indexesOf = function indexesOf(string, highLightText) {
  var match;
  var indexes = [];
  var regex = new RegExp(highLightText.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(string)) !== null) {
    indexes.push(match.index);
  }
  return indexes;
};
var TextWithHighlight = function TextWithHighlight(_ref) {
  var text = _ref.text,
    highLightText = _ref.highLightText,
    rest = _objectWithoutProperties(_ref, ["text", "highLightText"]);
  var highlightTextLength = highLightText === null || highLightText === void 0 ? void 0 : highLightText.length;
  var matchIndexes = (0, _react.useMemo)(function () {
    return highlightTextLength > 0 ? indexesOf(text, highLightText) : [];
  }, [highLightText, highlightTextLength, text]);
  return /*#__PURE__*/_react["default"].createElement("span", _extends({
    title: text
  }, rest), matchIndexes.length > 0 ? matchIndexes.map(function (startIndex, index) {
    var endIndex = startIndex + highlightTextLength;
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
      key: startIndex
    }, index === 0 && text.substring(0, startIndex), /*#__PURE__*/_react["default"].createElement(HighlightText, {
      "data-sign": "highlight"
    }, text.substring(startIndex, endIndex)), text.substring(endIndex, matchIndexes[index + 1]));
  }) : text);
};
exports.TextWithHighlight = TextWithHighlight;
//# sourceMappingURL=TextWithHighlight.js.map

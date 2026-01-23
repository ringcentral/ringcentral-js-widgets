"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeOverlappingRanges = exports.indexesOf = exports.TextWithHighlight = void 0;
require("core-js/modules/es.array.flat-map.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.unscopables.flat-map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.replace.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["text", "highLightText", "classes"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var indexesOf = exports.indexesOf = function indexesOf(string, highLightText) {
  if (highLightText.length === 0) return [];
  var match;
  var indexes = [];
  var regex = new RegExp(highLightText.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(string)) !== null) {
    indexes.push(match.index);
  }
  return indexes;
};
var mergeOverlappingRanges = exports.mergeOverlappingRanges = function mergeOverlappingRanges(ranges) {
  if (ranges.length === 0) return [];

  // Sort by start index
  var sorted = ranges.sort(function (a, b) {
    return a.index - b.index;
  });
  var merged = [];
  var current = {
    index: sorted[0].index,
    length: sorted[0].length
  };
  for (var i = 1; i < sorted.length; i++) {
    var next = sorted[i];
    var currentEnd = current.index + current.length;
    var nextEnd = next.index + next.length;

    // If ranges overlap or are adjacent
    if (next.index <= currentEnd) {
      // Extend current range to cover the next range
      current.length = Math.max(currentEnd, nextEnd) - current.index;
    } else {
      // No overlap, add current to merged and start new current
      merged.push(current);
      current = {
        index: next.index,
        length: next.length
      };
    }
  }

  // Add the last range
  merged.push(current);
  return merged;
};
var TextWithHighlight = exports.TextWithHighlight = function TextWithHighlight(_ref) {
  var text = _ref.text,
    highLightText = _ref.highLightText,
    classes = _ref.classes,
    rest = _objectWithoutProperties(_ref, _excluded);
  var matches = (0, _react.useMemo)(function () {
    if (Array.isArray(highLightText)) {
      return highLightText.map(function (item) {
        return {
          indexes: indexesOf(text, item),
          length: item.length
        };
      });
    }
    return typeof highLightText === 'string' ? [{
      indexes: indexesOf(text, highLightText),
      length: highLightText.length
    }] : [];
  }, [highLightText, text]);
  var flatMatches = (0, _react.useMemo)(function () {
    if (matches.length === 0) {
      return [];
    }
    if (matches.length === 1) {
      var match = matches[0];
      return match.indexes.map(function (index) {
        return {
          index: index,
          length: match.length
        };
      });
    }
    return mergeOverlappingRanges(matches.flatMap(function (_ref2) {
      var indexes = _ref2.indexes,
        length = _ref2.length;
      return indexes.map(function (index) {
        return {
          index: index,
          length: length
        };
      });
    }));
  }, [matches]);
  return /*#__PURE__*/_react["default"].createElement("span", _extends({
    title: text
  }, rest), flatMatches.length > 0 ? flatMatches.map(function (_ref3, i) {
    var _flatMatches;
    var index = _ref3.index,
      length = _ref3.length;
    var startIndex = index;
    var endIndex = startIndex + length;
    var nextStartIndex = (_flatMatches = flatMatches[i + 1]) === null || _flatMatches === void 0 ? void 0 : _flatMatches.index;
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
      key: startIndex
    }, i === 0 && text.substring(0, startIndex), /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "highlight",
      className: (0, _clsx["default"])('font-bold', classes === null || classes === void 0 ? void 0 : classes.highlight)
    }, text.substring(startIndex, endIndex)), nextStartIndex !== undefined ? text.substring(endIndex, nextStartIndex) : text.substring(endIndex));
  }) : text);
};
//# sourceMappingURL=TextWithHighlight.js.map

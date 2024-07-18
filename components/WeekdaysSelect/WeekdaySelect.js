"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekdaysSelect = void 0;
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var WeekdaysSelect = function WeekdaysSelect(_ref) {
  var selected = _ref.selected,
    onSelect = _ref.onSelect,
    multiple = _ref.multiple,
    currentLocale = _ref.currentLocale;
  var onClick = function onClick(e) {
    e.preventDefault();
    var _selected = selected.slice(0);
    var maxLength = multiple ? 7 : 1;
    if (e.target.nodeName === 'LI') {
      var dataset = e.target.dataset;
      var dayIndex = _selected.indexOf(dataset.value);
      if (dayIndex !== -1) {
        _selected.splice(dayIndex, 1);
      }
      if (dayIndex === -1) {
        if (_selected.length < maxLength) {
          _selected.push(dataset.value);
        } else {
          _selected.shift();
          _selected.push(dataset.value);
        }
      }
    }
    onSelect(_selected);
  };
  var list = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(function (weekday) {
    var isActive = Array.isArray(selected) && selected.indexOf(weekday) !== -1;
    return /*#__PURE__*/_react["default"].createElement("li", {
      "data-value": weekday,
      key: weekday,
      className: (0, _clsx2["default"])(_styles["default"].weekdayItem, _defineProperty({}, _styles["default"].active, isActive))
    }, _i18n["default"].getString(weekday.toLowerCase(), currentLocale));
  });
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: _styles["default"].weekdaysSelect,
    onClick: onClick
  }, list);
};
exports.WeekdaysSelect = WeekdaysSelect;
WeekdaysSelect.defaultProps = {
  multiple: true,
  currentLocale: 'en-US'
};
//# sourceMappingURL=WeekdaySelect.js.map

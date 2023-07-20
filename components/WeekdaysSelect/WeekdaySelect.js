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
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
      className: (0, _classnames["default"])(_styles["default"].weekdayItem, _defineProperty({}, _styles["default"].active, isActive))
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

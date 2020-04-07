"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekdaysSelect = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    return _react["default"].createElement("li", {
      "data-value": weekday,
      key: weekday,
      className: (0, _classnames["default"])(_styles["default"].weekdayItem, _defineProperty({}, _styles["default"].active, isActive))
    }, _i18n["default"].getString(weekday.toLowerCase(), currentLocale));
  });
  return _react["default"].createElement("ul", {
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

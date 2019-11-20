"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports.ListViewItem = ListViewItem;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcui = require("@ringcentral-integration/rcui");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ListViewItem(_ref) {
  var renderFunction = _ref.renderFunction,
      startAdornment = _ref.startAdornment,
      filter = _ref.filter,
      valueFunction = _ref.valueFunction,
      value = _ref.value,
      option = _ref.option,
      onChange = _ref.onChange,
      index = _ref.index,
      onSelect = _ref.onSelect;
  var selectElm = (0, _react.useRef)();
  var currentValue = valueFunction(value);
  var thisValue = valueFunction(option);
  var isSelected = thisValue === currentValue;
  var type = option.type;
  (0, _react.useEffect)(function () {
    if (isSelected) {
      onSelect(selectElm.current);
    }
  }, []);

  var getFilterResult = function getFilterResult(option) {
    var text = renderFunction(option);

    if (filter && typeof text === 'string') {
      var i = text.toLowerCase().indexOf(filter.toLowerCase());
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("span", null, text.substring(0, i)), _react["default"].createElement("span", {
        style: {
          background: '#ffdfb1'
        }
      }, text.substring(i, i + filter.length)), _react["default"].createElement("span", null, text.substring(i + filter.length)));
    }

    return text;
  };

  return _react["default"].createElement("div", {
    ref: selectElm
  }, _react["default"].createElement(_rcui.RcListItem, {
    button: true,
    singleLine: true,
    onClick: function onClick() {
      return onChange(isSelected ? {} : option);
    },
    "data-sign": "match".concat(index),
    className: (0, _classnames["default"])(_styles["default"].listItem),
    selected: isSelected
  }, startAdornment && startAdornment(type), _react["default"].createElement(_rcui.RcListItemText, {
    primary: getFilterResult(option)
  })));
}

ListViewItem.propTypes = {
  option: _propTypes["default"].object,
  value: _propTypes["default"].any.isRequired,
  index: _propTypes["default"].number.isRequired,
  onChange: _propTypes["default"].func,
  valueFunction: _propTypes["default"].func.isRequired,
  startAdornment: _propTypes["default"].func,
  filter: _propTypes["default"].string,
  renderFunction: _propTypes["default"].func.isRequired,
  onSelect: _propTypes["default"].func.isRequired
};
ListViewItem.defaultProps = {
  option: {},
  filter: null,
  onChange: function onChange() {},
  startAdornment: function startAdornment() {}
};
//# sourceMappingURL=ListViewItem.js.map

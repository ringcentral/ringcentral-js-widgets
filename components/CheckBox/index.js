"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function CheckBox(_ref) {
  var data = _ref.data,
      selected = _ref.selected,
      onSelect = _ref.onSelect,
      valueField = _ref.valueField,
      textField = _ref.textField,
      className = _ref.className,
      dataSign = _ref.dataSign,
      props = _objectWithoutProperties(_ref, ["data", "selected", "onSelect", "valueField", "textField", "className", "dataSign"]);

  var isListObject = !!(textField && valueField);
  return _react["default"].createElement("div", {
    className: className,
    "data-sign": dataSign
  }, data.map(function (item, key) {
    var isSelected = selected === (isListObject ? item[valueField] : item);
    var checkStyle = isSelected ? _styles["default"].selectedCheckButton : null;

    var onClick = function onClick() {
      return onSelect(item);
    };

    var extraInfo = typeof item.renderExtraInfo === 'function' && isSelected ? item.renderExtraInfo(_objectSpread({}, props)) : null;
    return _react["default"].createElement("div", {
      key: key,
      "data-sign": isSelected ? 'selectedItem' : undefined
    }, _react["default"].createElement("div", {
      onClick: onClick,
      className: (0, _classnames["default"])(_styles["default"].item, item && item.disabled ? _styles["default"].disabled : null)
    }, _react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].checkButton, checkStyle)
    }), _react["default"].createElement("div", {
      className: _styles["default"].text,
      "data-sign": "text"
    }, isListObject ? item[textField] : item)), extraInfo);
  }));
}

CheckBox.propTypes = {
  valueField: _propTypes["default"].string,
  textField: _propTypes["default"].string,
  selected: _propTypes["default"].any.isRequired,
  data: _propTypes["default"].array.isRequired,
  onSelect: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string,
  dataSign: _propTypes["default"].string
};
CheckBox.defaultProps = {
  textField: null,
  valueField: null,
  className: null,
  dataSign: undefined
};
var _default = CheckBox;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

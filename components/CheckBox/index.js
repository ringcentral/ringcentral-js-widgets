"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
      type = _ref.type,
      checked = _ref.checked,
      onChecked = _ref.onChecked,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["data", "selected", "onSelect", "valueField", "textField", "className", "dataSign", "type", "checked", "onChecked", "children"]);

  var isListObject = !!(textField && valueField);

  switch (type) {
    case 'radio':
      {
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

    case 'checkbox':
      {
        var checkboxClassName = (0, _classnames["default"])(_styles["default"].checkbox, checked ? _styles["default"].checked : '');
        var checkboxWrapperClassNames = (0, _classnames["default"])(_styles["default"].checkboxWrapper, className);
        return _react["default"].createElement("div", {
          className: checkboxWrapperClassNames,
          "data-sign": dataSign,
          onClick: function onClick() {
            return onChecked && onChecked(!checked);
          }
        }, _react["default"].createElement("div", {
          className: checkboxClassName
        }, "\u2713"), children);
      }

    default:
      break;
  }
}

CheckBox.propTypes = {
  valueField: _propTypes["default"].string,
  textField: _propTypes["default"].string,
  selected: _propTypes["default"].any,
  data: _propTypes["default"].array,
  onSelect: _propTypes["default"].func,
  className: _propTypes["default"].string,
  dataSign: _propTypes["default"].string,
  type: _propTypes["default"].string,
  onChecked: _propTypes["default"].func,
  checked: _propTypes["default"].bool
};
CheckBox.defaultProps = {
  textField: null,
  valueField: null,
  className: null,
  dataSign: undefined,
  type: 'radio',
  onChecked: function onChecked() {},
  onSelect: function onSelect() {},
  data: [],
  selected: null,
  checked: false
};
var _default = CheckBox;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

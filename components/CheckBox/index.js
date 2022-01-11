"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CheckBox = function CheckBox(_ref) {
  var data = _ref.data,
      selected = _ref.selected,
      onSelect = _ref.onSelect,
      valueField = _ref.valueField,
      textField = _ref.textField,
      className = _ref.className,
      dataSign = _ref.dataSign,
      type = _ref.type,
      checked = _ref.checked,
      disabled = _ref.disabled,
      onChecked = _ref.onChecked,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["data", "selected", "onSelect", "valueField", "textField", "className", "dataSign", "type", "checked", "disabled", "onChecked", "children"]);

  var isListObject = !!(textField && valueField);

  switch (type) {
    case 'radio':
      {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: className,
          "data-sign": dataSign
        }, data.map(function (item, key) {
          var isSelected = selected === (isListObject ? item[valueField] : item);
          var checkStyle = isSelected ? _styles["default"].selectedCheckButton : null;

          var onClick = function onClick() {
            return disabled ? undefined : onSelect(item);
          };

          var extraInfo = typeof item.renderExtraInfo === 'function' && isSelected ? item.renderExtraInfo(_objectSpread({}, props)) : null;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            "data-sign": isSelected ? 'selectedItem' : undefined
          }, /*#__PURE__*/_react["default"].createElement("div", {
            onClick: onClick,
            className: (0, _classnames["default"])(_styles["default"].item, disabled || item && item.disabled ? _styles["default"].disabled : null)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _classnames["default"])(_styles["default"].checkButton, checkStyle)
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: _styles["default"].text,
            "data-sign": "text"
          }, isListObject ? item[textField] : item)), extraInfo);
        }));
      }

    case 'checkbox':
      {
        var checkboxWrapperClassNames = (0, _classnames["default"])(_styles["default"].checkboxWrapper, disabled ? _styles["default"].wrapperDisabled : '', className);
        var checkboxClassName = (0, _classnames["default"])(_styles["default"].checkbox, checked ? _styles["default"].checked : '', disabled ? _styles["default"].checkboxDisabled : '');
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: checkboxWrapperClassNames,
          "data-sign": dataSign,
          onClick: function onClick() {
            if (!disabled && onChecked) {
              onChecked(!checked);
            }
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: checkboxClassName
        }, checked && '✓'), children);
      }

    default:
      break;
  }
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
  checked: false,
  disabled: false
};
var _default = CheckBox;
exports["default"] = _default;
//# sourceMappingURL=index.js.map

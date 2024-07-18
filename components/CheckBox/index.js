"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.map");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
// @ts-expect-error TS(2322): Type '{ ({ data, selected, onSelect, valueField, t... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          var onClick = function onClick() {
            return disabled ? undefined : onSelect(item);
          };
          var extraInfo = typeof item.renderExtraInfo === 'function' && isSelected ? item.renderExtraInfo(_objectSpread({}, props)) : null;
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            "data-sign": isSelected ? 'selectedItem' : undefined
          }, /*#__PURE__*/_react["default"].createElement("div", {
            "data-sign": "checkbox-option-".concat(item.value),
            onClick: onClick,
            className: (0, _clsx["default"])(_styles["default"].item, disabled || item && item.disabled ? _styles["default"].disabled : null)
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _clsx["default"])(_styles["default"].checkButton, checkStyle)
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: _styles["default"].text,
            "data-sign": "text"
          }, isListObject ? item[textField] : item)), extraInfo);
        }));
      }
    case 'checkbox':
      {
        var checkboxWrapperClassNames = (0, _clsx["default"])(_styles["default"].checkboxWrapper, disabled ? _styles["default"].wrapperDisabled : '', className);
        var checkboxClassName = (0, _clsx["default"])(_styles["default"].checkbox, checked ? _styles["default"].checked : '', disabled ? _styles["default"].checkboxDisabled : '');
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  textField: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  valueField: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
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

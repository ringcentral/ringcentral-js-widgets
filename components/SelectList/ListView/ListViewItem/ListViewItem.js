"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListViewItem = void 0;
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _react = _interopRequireWildcard(require("react"));
var _TextWithHighlight = require("../../../TextWithHighlight");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ListViewItem = function ListViewItem(_ref) {
  var _ref$option = _ref.option,
    option = _ref$option === void 0 ? {} : _ref$option,
    _ref$filter = _ref.filter,
    filter = _ref$filter === void 0 ? null : _ref$filter,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? _utils.emptyFn : _ref$onChange,
    _ref$startAdornment = _ref.startAdornment,
    startAdornment = _ref$startAdornment === void 0 ? _utils.emptyFn : _ref$startAdornment,
    _ref$secondaryRenderF = _ref.secondaryRenderFunction,
    secondaryRenderFunction = _ref$secondaryRenderF === void 0 ? _utils.emptyFn : _ref$secondaryRenderF,
    _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? false : _ref$multiple,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    renderFunction = _ref.renderFunction,
    valueFunction = _ref.valueFunction,
    value = _ref.value,
    index = _ref.index,
    onSelect = _ref.onSelect;
  var selectElm = (0, _react.useRef)();
  var currentValue = valueFunction(value);
  var thisValue = valueFunction(option);
  var isSelected = multiple ? !!(currentValue === null || currentValue === void 0 ? void 0 : currentValue.includes(thisValue)) : thisValue === currentValue;
  var type = option.type;
  (0, _react.useEffect)(function () {
    if (isSelected) {
      onSelect(selectElm.current);
    }
  }, [isSelected, onSelect]);
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type 'MutableRefObject<HTMLDivElement | undefined>... Remove this comment to see the full error message
    _react["default"].createElement("div", {
      ref: selectElm
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
      button: true,
      size: "medium",
      singleLine: true,
      onClick: multiple ? function () {
        return onChange(_objectSpread(_objectSpread({}, option), {}, {
          isSelected: !isSelected
        }));
      } : function () {
        return onChange(isSelected ? {} : option);
      },
      "data-sign": "match".concat(index),
      "data-selected": isSelected,
      selected: isSelected,
      disabled: disabled
    }, startAdornment === null || startAdornment === void 0 ? void 0 : startAdornment(type), multiple && /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      checked: isSelected,
      "data-sign": isSelected ? 'selected' : 'unselected',
      disabled: disabled
    }), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: /*#__PURE__*/_react["default"].createElement(_TextWithHighlight.TextWithHighlight
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      , {
        highLightText: filter,
        text: renderFunction(option)
      }),
      secondary: secondaryRenderFunction(option),
      "data-sign": "matchedItemText"
    })))
  );
};
exports.ListViewItem = ListViewItem;
//# sourceMappingURL=ListViewItem.js.map

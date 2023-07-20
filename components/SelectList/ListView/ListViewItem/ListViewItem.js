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
var _react = _interopRequireWildcard(require("react"));
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _TextWithHighlight = require("../../../TextWithHighlight");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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

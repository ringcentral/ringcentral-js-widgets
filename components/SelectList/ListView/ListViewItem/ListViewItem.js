"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListViewItem = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.filter");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ListViewItem = function ListViewItem(_ref) {
  var renderFunction = _ref.renderFunction,
      secondaryRenderFunction = _ref.secondaryRenderFunction,
      startAdornment = _ref.startAdornment,
      filter = _ref.filter,
      valueFunction = _ref.valueFunction,
      value = _ref.value,
      option = _ref.option,
      onChange = _ref.onChange,
      index = _ref.index,
      onSelect = _ref.onSelect,
      multiple = _ref.multiple;
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

  var getFilterResult = function getFilterResult(option) {
    var text = renderFunction(option);

    if (filter && typeof text === 'string') {
      var i = text.toLowerCase().indexOf(filter.toLowerCase());
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, text.substring(0, i)), /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          background: '#ffdfb1'
        }
      }, text.substring(i, i + filter.length)), /*#__PURE__*/_react["default"].createElement("span", null, text.substring(i + filter.length)));
    }

    return text;
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
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
    selected: isSelected
  }, startAdornment && startAdornment(type), multiple && /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    checked: isSelected,
    "data-sign": isSelected ? 'selected' : 'unselected'
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
    primary: getFilterResult(option),
    secondary: secondaryRenderFunction(option),
    "data-sign": "matchedItemText"
  })));
};

exports.ListViewItem = ListViewItem;
ListViewItem.defaultProps = {
  option: {},
  filter: null,
  onChange: function onChange() {},
  startAdornment: function startAdornment() {},
  secondaryRenderFunction: function secondaryRenderFunction() {},
  multiple: false
};
//# sourceMappingURL=ListViewItem.js.map

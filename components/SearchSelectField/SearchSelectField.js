"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchSelectField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CallLogFields = require("@ringcentral-integration/widgets/components/CallLogFields");
var _SelectList = require("@ringcentral-integration/widgets/components/SelectList");
var _juno = require("@ringcentral/juno");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var SearchSelectField = function SearchSelectField(_ref) {
  var listRenderer = _ref.listRenderer,
    input = _ref.input,
    InputProps = _ref.InputProps,
    title = _ref.title,
    open = _ref.open,
    _onBackClick = _ref.onBackClick,
    currentLocale = _ref.currentLocale,
    rest = _objectWithoutProperties(_ref, ["listRenderer", "input", "InputProps", "title", "open", "onBackClick", "currentLocale"]);
  var _useState = (0, _react.useState)(open),
    _useState2 = _slicedToArray(_useState, 2),
    currentOpen = _useState2[0],
    setCurrentOpen = _useState2[1];
  var toggleOpen = function toggleOpen() {
    return setCurrentOpen(!currentOpen);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, input && /*#__PURE__*/_react["default"].createElement(_CallLogFields.SelectListTextField, _extends({}, InputProps, {
    label: title,
    onClick: function onClick() {
      return toggleOpen();
    }
  })), /*#__PURE__*/_react["default"].createElement(_SelectList.SelectListBasicWithScrollCheck, _extends({}, rest, {
    title: title,
    onBackClick: function onBackClick() {
      toggleOpen();
      _onBackClick();
    },
    placeholder: _i18n["default"].getString('search', currentLocale),
    currentLocale: currentLocale,
    open: currentOpen,
    selectListBasicClassName: _styles["default"].selectListBasic,
    classes: {
      searchInput: _styles["default"].searchInput,
      noResult: _styles["default"].noResult,
      placeholder: _styles["default"].placeholder
    },
    rightIcon: /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].fillRight
    }),
    backHeaderClassName: _styles["default"].backHeader,
    renderListView: function renderListView(options, type, filter, scrollCheck) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcList, null, listRenderer(options, scrollCheck, toggleOpen));
    }
  })));
};
exports.SearchSelectField = SearchSelectField;
SearchSelectField.defaultProps = {
  input: false,
  InputProps: {},
  onBackClick: function onBackClick() {}
};
//# sourceMappingURL=SearchSelectField.js.map

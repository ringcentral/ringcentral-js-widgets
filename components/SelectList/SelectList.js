"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListBasicWithScrollCheck = exports.SelectList = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SelectListBasic = require("../SelectListBasic");
var _ListView = require("./ListView");
var _styles = _interopRequireDefault(require("./styles.scss"));
var _WithScrollCheck = require("./WithScrollCheck");
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
var SelectListBasicWithScrollCheck = (0, _WithScrollCheck.WithScrollCheck)(_SelectListBasic.SelectListBasic);
exports.SelectListBasicWithScrollCheck = SelectListBasicWithScrollCheck;
var SelectList = function SelectList(props) {
  var field = props.field,
    appName = props.appName,
    children = props.children,
    disabled = props.disabled,
    _onChange = props.onChange,
    autoClose = props.autoClose,
    otherTitle = props.otherTitle,
    onBackClick = props.onBackClick,
    matchedTitle = props.matchedTitle,
    currentLocale = props.currentLocale,
    valueFunction = props.valueFunction,
    renderFunction = props.renderFunction,
    startAdornment = props.startAdornment,
    associatedTitle = props.associatedTitle,
    sourceValue = props.value,
    backHeaderClassName = props.backHeaderClassName,
    onSelectViewVisible = props.onSelectViewVisible,
    foundFromServerTitle = props.foundFromServerTitle,
    secondaryRenderFunction = props.secondaryRenderFunction,
    multiple = props.multiple;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  (0, _react.useEffect)(function () {
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onSelectViewVisible(open, field);
  }, [field, onSelectViewVisible, open]);
  var renderListView = function renderListView(data, type, filter, scrollCheck) {
    return /*#__PURE__*/_react["default"].createElement(_ListView.ListView, {
      filter: filter,
      options: data,
      value: sourceValue,
      onChange: function onChange(value) {
        if (document.activeElement) {
          document.activeElement.blur();
        }
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        _onChange(value);
        // auto close select section after selected a value
        if (autoClose) {
          setOpen(false);
          onBackClick();
        }
      },
      renderFunction: renderFunction,
      secondaryRenderFunction: secondaryRenderFunction,
      valueFunction: valueFunction,
      onSelect: function onSelect(elm) {
        return scrollCheck(elm, type);
      },
      startAdornment: startAdornment,
      multiple: multiple
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    className: disabled ? _styles["default"].disabled : null,
    "data-sign": "select-list-panel"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].field,
    "data-sign": "select-list-open",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) {
        return;
      }
      setOpen(true);
    }
  }, children), /*#__PURE__*/_react["default"].createElement(SelectListBasicWithScrollCheck, _extends({}, props, {
    matchedTitle: matchedTitle,
    otherTitle: otherTitle,
    associatedTitle: associatedTitle,
    foundFromServerTitle: foundFromServerTitle,
    renderListView: renderListView,
    open: open,
    setOpen: setOpen,
    backHeaderClassName: backHeaderClassName
  })));
};
exports.SelectList = SelectList;
SelectList.defaultProps = {
  options: [],
  otherOptions: [],
  associatedOptions: [],
  showAssociatedSection: false,
  placeholder: '',
  disabled: false,
  matchedTitle: '',
  otherTitle: '',
  associatedTitle: '',
  field: '',
  value: {},
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Element | u... Remove this comment to see the full error message
  rightIcon: null,
  onChange: function onChange() {},
  startAdornment: function startAdornment() {},
  onSelectViewVisible: function onSelectViewVisible() {},
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  backHeaderClassName: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type '((...args: ... Remove this comment to see the full error message
  contactSearch: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  appName: null,
  showFoundFromServer: false,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  foundFromServerTitle: null,
  foundFromServerEntities: [],
  autoClose: true,
  onBackClick: function onBackClick() {}
};
//# sourceMappingURL=SelectList.js.map

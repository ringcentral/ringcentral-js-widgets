"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectList = exports.SelectListBasicWithScrollCheck = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _react = _interopRequireWildcard(require("react"));

var _SelectListBasic = require("../SelectListBasic");

var _i18n = _interopRequireDefault(require("./i18n"));

var _ListView = require("./ListView");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _WithScrollCheck = require("./WithScrollCheck");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
      foundFromServerTitle = props.foundFromServerTitle;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  (0, _react.useEffect)(function () {
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

        _onChange(value); // auto close select section after selected a value


        if (autoClose) {
          setOpen(false);
          onBackClick();
        }
      },
      renderFunction: renderFunction,
      valueFunction: valueFunction,
      onSelect: function onSelect(elm) {
        return scrollCheck(elm, type);
      },
      startAdornment: startAdornment
    });
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: disabled ? _styles["default"].disabled : null,
    "data-sign": "select-list-panel"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].field,
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) {
        return;
      }

      setOpen(true);
    }
  }, children), /*#__PURE__*/_react["default"].createElement(SelectListBasicWithScrollCheck, _extends({}, props, {
    matchedTitle: matchedTitle || _i18n["default"].getString('matched', currentLocale),
    otherTitle: otherTitle || _i18n["default"].getString('other', currentLocale),
    associatedTitle: associatedTitle || _i18n["default"].getString('associated', currentLocale),
    foundFromServerTitle: foundFromServerTitle || (0, _formatMessage["default"])(_i18n["default"].getString('foundFromServer', currentLocale), {
      appName: appName
    }),
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
  rightIcon: null,
  onChange: function onChange() {},
  startAdornment: function startAdornment() {},
  onSelectViewVisible: function onSelectViewVisible() {},
  backHeaderClassName: null,
  contactSearch: null,
  appName: null,
  showFoundFromServer: false,
  foundFromServerTitle: null,
  foundFromServerEntities: [],
  autoClose: true,
  onBackClick: function onBackClick() {}
};
//# sourceMappingURL=SelectList.js.map

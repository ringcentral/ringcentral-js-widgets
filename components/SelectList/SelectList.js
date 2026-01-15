"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListBasicWithScrollCheck = exports.SelectList = void 0;
require("core-js/modules/es.array.is-array.js");
var _react = _interopRequireWildcard(require("react"));
var _SelectListBasic = require("../SelectListBasic");
var _ListView = require("./ListView");
var _WithScrollCheck = require("./WithScrollCheck");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable jsx-a11y/no-static-element-interactions */ /* eslint-disable jsx-a11y/click-events-have-key-events */
var SelectListBasicWithScrollCheck = exports.SelectListBasicWithScrollCheck = (0, _WithScrollCheck.WithScrollCheck)(_SelectListBasic.SelectListBasic);
var SelectList = exports.SelectList = function SelectList(props) {
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
    "data-sign": "select-list-panel-".concat(field),
    otherTitle: otherTitle,
    associatedTitle: associatedTitle,
    foundFromServerTitle: foundFromServerTitle,
    renderListView: renderListView,
    open: open,
    setOpen: setOpen,
    backHeaderClassName: backHeaderClassName
  })));
};
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
  contactSearch: undefined,
  appName: undefined,
  showFoundFromServer: false,
  serverEntitiesClientFilter: undefined,
  foundFromServerTitle: undefined,
  foundFromServerEntities: [],
  autoClose: true,
  onBackClick: function onBackClick() {}
};
//# sourceMappingURL=SelectList.js.map

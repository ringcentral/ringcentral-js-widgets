"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
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
exports.FakeBrowserURL = void 0;
require("core-js/modules/es.array.is-array.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springUi = require("@ringcentral/spring-ui");
var _observableHooks = require("observable-hooks");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var HIDE_FAKE_BROWSER_URL_KEY = 'hideFakeBrowserURL';

/**
 * for view current route path in fake browser url
 */
var FakeBrowserURL = exports.FakeBrowserURL = function FakeBrowserURL(_ref) {
  var valueProp = _ref.value,
    onCommitted = _ref.onCommitted;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(valueProp),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    value = _useAsyncState2[0],
    setValue = _useAsyncState2[1];
  var inputRef = (0, _react.useRef)(null);
  var showRef = (0, _springUi.useResultRef)(function () {
    return !localStorage.getItem(HIDE_FAKE_BROWSER_URL_KEY);
  });
  var forceUpdate = (0, _observableHooks.useForceUpdate)();
  var setFakeBrowserUrlDisplay = function setFakeBrowserUrlDisplay(display) {
    if (display) {
      localStorage.removeItem(HIDE_FAKE_BROWSER_URL_KEY);
    } else {
      localStorage.setItem(HIDE_FAKE_BROWSER_URL_KEY, 'true');
    }
    showRef.current = display;
    forceUpdate();
  };
  var message = "The fake browser URL be hidden, if you show that, exec that in console:\n\nsetFakeBrowserUrlDisplay(true)\n";
  (0, _springUi.useEventListener)(inputRef, 'search', function (e) {
    if (e.target.value === '') {
      setFakeBrowserUrlDisplay(false);
      // eslint-disable-next-line no-alert
      alert(message);
    }
  });
  var show = showRef.current;
  var prevShow = (0, _springUi.usePrevious)(function () {
    return show;
  });
  if (prevShow !== show && !show) {
    // eslint-disable-next-line no-console
    console.warn(message);
  }
  (0, _react.useEffect)(function () {
    window.setFakeBrowserUrlDisplay = setFakeBrowserUrlDisplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var isMainTab = (0, _nextCore.useConnector)(function () {
    return app.modules.PortManager.isMainTab;
  });
  return show ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full flex"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    "data-sign": "fakeBrowserURL",
    type: "search",
    ref: inputRef,
    className: "border-neutral-b2 border-2 px-4 py-2 bg-neutral-b4 w-full",
    value: value,
    onChange: function onChange(event) {
      setValue(event.target.value);
    },
    onKeyDown: function onKeyDown(event) {
      if (event.key === 'Enter') {
        onCommitted(value);
      }
    }
  }), isMainTab && /*#__PURE__*/_react["default"].createElement("div", {
    className: "border-neutral-b2 border-2 bg-neutral-b4 p-2",
    title: "main tab"
  }, "\uD83D\uDC51")) : null;
};
//# sourceMappingURL=FakeBrowserURL.js.map

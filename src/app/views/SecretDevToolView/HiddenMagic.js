"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HiddenMagic = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _observableHooks = require("observable-hooks");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _excluded = ["onShowChange", "times"],
  _excluded2 = ["className"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _HiddenMagic = function _HiddenMagic(_ref) {
  var onShowChange = _ref.onShowChange,
    _ref$times = _ref.times,
    times = _ref$times === void 0 ? 5 : _ref$times,
    rest = _objectWithoutProperties(_ref, _excluded);
  var hiddenRef = (0, _react.useRef)(null);
  var click$ = (0, _observableHooks.useObservable)(function () {
    return (0, _rxjs.defer)(function () {
      return (0, _rxjs.fromEvent)(hiddenRef.current, 'click').pipe((0, _rxjs.scan)(function (acc) {
        return acc + 1;
      }, 0), (0, _rxjs.mergeMap)(function (x, i) {
        return i === 0 ? (0, _rxjs.timer)(2000).pipe((0, _rxjs.tap)(function () {
          throw new Error();
        })) : (0, _rxjs.of)(x);
      }), (0, _rxjs.filter)(function (x) {
        return x === times;
      }), (0, _rxjs.tap)(function () {
        onShowChange();
        // throw error to end inner timer
        throw new Error();
      }), (0, _rxjs.retry)());
    });
  }, []);
  (0, _observableHooks.useSubscription)(click$);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, rest, {
    ref: hiddenRef
  }));
};

/**
 * that hiddenMagic to show something in viewport,
 */
var HiddenMagic = exports.HiddenMagic = function HiddenMagic(_ref2) {
  var className = _ref2.className,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/_react["default"].createElement(_HiddenMagic, _extends({}, rest, {
    className: (0, _clsx["default"])(className, 'fixed right-0 bottom-0 size-8 z-tooltip')
  }));
};
//# sourceMappingURL=HiddenMagic.js.map

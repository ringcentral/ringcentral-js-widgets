"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _immer = require("immer");
var _checkPatches = require("../checkPatches");
var _constant = require("../constant");
var _createStore = require("../createStore");
var _index = require("../utils/index");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable func-names */
var action = exports.action = function action(target, key, descriptor) {
  var fn = descriptor.value;
  if (typeof fn !== 'function') {
    throw new Error("".concat(String(key), " can only be decorated by '@action' as a class method."));
  }
  var value = function value() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var time;
    if (process.env.NODE_ENV === 'development') {
      time = Date.now();
    }
    if (typeof (0, _index.getStagedState)() === 'undefined') {
      try {
        var _this$_getLastState, _this$_getLastState2;
        var lastState = (_this$_getLastState = (_this$_getLastState2 = this._getLastState) === null || _this$_getLastState2 === void 0 ? void 0 : _this$_getLastState2.call(this)) !== null && _this$_getLastState !== void 0 ? _this$_getLastState : this[_constant.storeKey].getState();
        var state;
        var patches = [];
        var inversePatches = [];
        var recipe = function recipe(draftState) {
          (0, _index.setStagedState)(draftState);
          if (process.env.NODE_ENV !== 'production') {
            (0, _index.setStagedModule)(_this._modulePath);
          }
          fn.apply(_this, args);
        };
        var enablePatches = (0, _createStore.getPatchesToggle)();
        if (enablePatches) {
          var _produceWithPatches = (0, _immer.produceWithPatches)(lastState, recipe);
          var _produceWithPatches2 = _slicedToArray(_produceWithPatches, 3);
          state = _produceWithPatches2[0];
          patches = _produceWithPatches2[1];
          inversePatches = _produceWithPatches2[2];
        } else {
          state = (0, _immer.produce)(lastState, recipe);
        }
        (0, _index.setStagedState)(undefined);
        if (process.env.NODE_ENV !== 'production') {
          (0, _index.setStagedModule)(undefined);
        }
        var changed = lastState !== state;
        if (process.env.NODE_ENV === 'development') {
          if (!changed) {
            var _console;
            (_console = console).warn.apply(_console, ["There are no state updates to method '".concat(this[_constant.identifierKey], ".").concat(key.toString(), "' with arguments:")].concat(args));
          }
          // performance checking
          var executionTime = Date.now() - time;
          if (executionTime > 100) console.warn("The execution time of method '".concat(this[_constant.identifierKey], ".").concat(key.toString(), "' is ").concat(executionTime, " ms, it's recommended to use 'dispatch' API."));
          // performance detail: https://immerjs.github.io/immer/docs/performance
        }
        if (changed) {
          var _this$_handleState;
          (_this$_handleState = this._handleState) === null || _this$_handleState === void 0 ? void 0 : _this$_handleState.call(this, state);
          var _action = _objectSpread({
            type: this[_constant.identifierKey],
            method: key,
            params: args,
            _state: state,
            _usm: _constant.usm
          }, enablePatches ? {
            _patches: patches,
            _inversePatches: inversePatches
          } : {});
          if (process.env.NODE_ENV === 'development') {
            var requiredWarning = (0, _checkPatches.checkPatches)(lastState, _action);
            if (requiredWarning) {
              console.warn("The state update operation in the method '".concat(this[_constant.identifierKey].toString(), ".").concat(key.toString(), "'  is a replacement update operation. If there is a performance issue, be sure to use mutation updates to ensure the minimum set of update patches."));
            }
          }
          this[_constant.storeKey].dispatch(_action);
        }
      } finally {
        (0, _index.setStagedState)(undefined);
        if (process.env.NODE_ENV !== 'production') {
          (0, _index.setStagedModule)(undefined);
        }
      }
    } else {
      if (process.env.NODE_ENV !== 'production' && (0, _index.getStagedModule)() !== this._modulePath) {
        throw new Error("The method '".concat(this[_constant.identifierKey], ".").concat(key.toString(), "' is not allowed to call other @action methods in the same module."));
      }
      // enable staged state mode.
      fn.apply(this, args);
    }
  };
  return _objectSpread(_objectSpread({}, descriptor), {}, {
    value: value
  });
};
//# sourceMappingURL=action.js.map

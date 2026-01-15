"use strict";

require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPatchesToggle = exports.getPatchesToggle = exports.createStore = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.is-frozen.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _immer = _interopRequireWildcard(require("immer"));
var _redux = require("redux");
var _constant = require("./constant");
var _index = require("./utils/index");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var enablePatches;
var getPatchesToggle = exports.getPatchesToggle = function getPatchesToggle() {
  return enablePatches;
};
var setPatchesToggle = exports.setPatchesToggle = function setPatchesToggle(toggle) {
  enablePatches = toggle;
};
var createStore = exports.createStore = function createStore(options, preloadedState) {
  var _options$strict, _config$enablePatches;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var reduxEnhancer = config.reduxEnhancer,
    _config$handleReducer = config.handleReducers,
    handleReducers = _config$handleReducer === void 0 ? function (reducers) {
      return (0, _redux.combineReducers)(reducers);
    } : _config$handleReducer;
  if (_typeof(options) !== 'object' || !Array.isArray(options.modules)) {
    throw new Error("'createStore' options should be a object with a property 'modules'");
  }
  var enableAutoFreeze = (_options$strict = options.strict) !== null && _options$strict !== void 0 ? _options$strict : process.env.NODE_ENV === 'development';
  enablePatches = (_config$enablePatches = config.enablePatches) !== null && _config$enablePatches !== void 0 ? _config$enablePatches : false;
  if (enablePatches) (0, _immer.enablePatches)();
  (0, _immer.setAutoFreeze)(enableAutoFreeze);
  var identifiers = new Set();
  var reducers = {};
  var subscriptions = [];
  var store;
  options.modules.forEach(function (module, index) {
    var _service$identifierKe;
    if (_typeof(module) !== 'object' || module === null) return;
    var service = module;
    var className = Object.getPrototypeOf(service).constructor.name;
    if (typeof service[_constant.stateKey] === 'undefined' || service[_constant.bootstrappedKey]) {
      if (process.env.NODE_ENV === 'development') {
        if (service[_constant.bootstrappedKey]) {
          console.warn("The module with an index of ".concat(index, " and a name of ").concat(className, " in the module list is a duplicate module."));
        }
      }
    }
    var identifier = (_service$identifierKe = service[_constant.identifierKey]) !== null && _service$identifierKe !== void 0 ? _service$identifierKe : service.name;
    if (identifier === null || typeof identifier === 'undefined') {
      identifier = "@@usm-redux/".concat(className, "/").concat(Math.random().toString(36));
    }
    if (typeof identifier !== 'string') {
      if (process.env.NODE_ENV === 'development') {
        console.error("\n          Since '".concat(className, "' module has set the module state, '").concat(className, "' module must set a unique and valid class property 'name' to be used as the module index.\n          Example:\n            class FooBar {\n              name = 'FooBar'; // <- add the 'name' property.\n            }\n        "));
      } else {
        throw new Error("'".concat(className, "' module 'name' property should be defined as a valid 'string'."));
      }
    }
    if (identifiers.has(identifier)) {
      identifier += "".concat(index);
    }
    identifiers.add(identifier);
    var descriptors = _defineProperty({}, _constant.bootstrappedKey, {
      enumerable: false,
      configurable: false,
      value: true
    });
    if (service[_constant.stateKey]) {
      var _loop = function _loop(key) {
        var descriptor = Object.getOwnPropertyDescriptor(service, key);
        // eslint-disable-next-line no-continue
        if (typeof descriptor === 'undefined') return 1; // continue
        Object.assign(service[_constant.stateKey], _defineProperty({}, key, descriptor.value));
        Object.assign(descriptors, _defineProperty({}, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            return this[_constant.stateKey][key];
          },
          set: function set(value) {
            this[_constant.stateKey][key] = value;
          }
        }));
      };
      // eslint-disable-next-line guard-for-in
      for (var key in service[_constant.stateKey]) {
        if (_loop(key)) continue;
      }
      var initState = enableAutoFreeze ? (0, _immer["default"])(_objectSpread({}, service[_constant.stateKey]), function () {}) : service[_constant.stateKey];
      var serviceReducers = Object.entries(initState).reduce(function (serviceReducersMapObject, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        // support pure reducer
        if (typeof value === 'function') {
          return Object.assign(serviceReducersMapObject, _defineProperty({}, key, value));
        }
        var reducer = function reducer() {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : value;
          var action = arguments.length > 1 ? arguments[1] : undefined;
          if (action._usm !== _constant.usm) return state;
          if (!service._getLastState) return action._state[identifier][key];
          return identifier === action.type && Object.hasOwnProperty.call(action._state, key) ? action._state[key] : state;
        };
        return Object.assign(serviceReducersMapObject, _defineProperty({}, key, reducer));
      }, {});
      // support custom reducers
      service._reducers = serviceReducers;
      var reducer = (0, _redux.combineReducers)(serviceReducers);
      Object.assign(reducers, _defineProperty({}, identifier, reducer));
      Object.assign(descriptors, _defineProperty({}, _constant.stateKey, {
        enumerable: false,
        configurable: false,
        get: function get() {
          var _this$storeKey;
          var stagedState = (0, _index.getStagedState)();
          if (stagedState) return this._getLastState && (stagedState === null || stagedState === void 0 ? void 0 : stagedState.__identifier) === identifier ? stagedState.__state : stagedState[identifier];
          var currentState = (_this$storeKey = this[_constant.storeKey]) === null || _this$storeKey === void 0 ? void 0 : _this$storeKey.getState()[identifier];
          if (enableAutoFreeze && !Object.isFrozen(currentState)) {
            return Object.freeze(currentState);
          }
          return currentState;
        }
      }));
    }
    Object.assign(descriptors, _defineProperty(_defineProperty({}, _constant.identifierKey, {
      configurable: false,
      enumerable: false,
      value: identifier
    }), _constant.storeKey, {
      configurable: false,
      enumerable: false,
      get: function get() {
        return store;
      }
    }));
    Object.defineProperties(service, descriptors);
    if (Array.isArray(service[_constant.subscriptionsKey])) {
      Array.prototype.push.apply(subscriptions, service[_constant.subscriptionsKey]);
    }
  });
  var storeWithRedux = (0, _redux.createStore)(handleReducers(reducers), preloadedState, reduxEnhancer);
  store = {
    dispatch: storeWithRedux.dispatch,
    getState: storeWithRedux.getState,
    subscribe: storeWithRedux.subscribe
  };
  for (var _i = 0, _subscriptions = subscriptions; _i < _subscriptions.length; _i++) {
    var subscribe = _subscriptions[_i];
    subscribe();
  }
  return store;
};
//# sourceMappingURL=createStore.js.map

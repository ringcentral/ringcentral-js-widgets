"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.iterator");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.assign");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.entries");
require("core-js/modules/es.object.freeze");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.is-frozen");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPatchesToggle = exports.getPatchesToggle = exports.createStore = void 0;
var _immer = _interopRequireWildcard(require("immer"));
var _redux = require("redux");
var _constant = require("./constant");
var _index = require("./utils/index");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var enablePatches;
var getPatchesToggle = function getPatchesToggle() {
  return enablePatches;
};
exports.getPatchesToggle = getPatchesToggle;
var setPatchesToggle = function setPatchesToggle(toggle) {
  enablePatches = toggle;
};
exports.setPatchesToggle = setPatchesToggle;
var createStore = function createStore(options, preloadedState) {
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
    var _service$identifierKe, _Object$assign7;
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
        if (typeof descriptor === 'undefined') return "continue";
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
        var _ret = _loop(key);
        if (_ret === "continue") continue;
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
    Object.assign(descriptors, (_Object$assign7 = {}, _defineProperty(_Object$assign7, _constant.identifierKey, {
      configurable: false,
      enumerable: false,
      value: identifier
    }), _defineProperty(_Object$assign7, _constant.storeKey, {
      configurable: false,
      enumerable: false,
      get: function get() {
        return store;
      }
    }), _Object$assign7));
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
  for (var _i2 = 0, _subscriptions = subscriptions; _i2 < _subscriptions.length; _i2++) {
    var subscribe = _subscriptions[_i2];
    subscribe();
  }
  return store;
};
exports.createStore = createStore;
//# sourceMappingURL=createStore.js.map

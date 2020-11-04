"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

var _redux = require("redux");

var _usm = _interopRequireDefault(require("../../usm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Module = /*#__PURE__*/function (_BaseModule) {
  _inherits(Module, _BaseModule);

  var _super = _createSuper(Module);

  function Module() {
    _classCallCheck(this, Module);

    return _super.apply(this, arguments);
  }

  _createClass(Module, [{
    key: "_makeInstance",
    value: function _makeInstance(params) {
      var _this = this;

      if (Array.isArray(this._actionTypes)) {
        this._actionTypes.forEach(function (name) {
          _this._reducersMaps[name] = function (types) {
            return function () {
              var _state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._initialValue[name];

              var _ref = arguments.length > 1 ? arguments[1] : undefined,
                  type = _ref.type,
                  states = _ref.states,
                  __proxyState__ = _ref.__proxyState__;

              if (type.indexOf(types[name]) > -1 && __proxyState__) {
                return __proxyState__[name];
              } else if (type.indexOf(types[name]) > -1 && states) {
                var _this$__proxyState__;

                if (_this._transport && ((_this$__proxyState__ = _this.__proxyState__) === null || _this$__proxyState__ === void 0 ? void 0 : _this$__proxyState__[name])) {
                  // sync up state with async proxy callback
                  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this.__proxyState__[name](_this, states[name]);

                          case 2:
                            _this._dispatch({
                              type: _this.parentModule.__proxyAction__,
                              action: {
                                type: [types[name]],
                                __proxyState__: _defineProperty({}, name, states[name])
                              }
                            });

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }))();

                  return _state;
                }

                return states[name];
              }

              return _state;
            };
          };
        });
      }

      _get(_getPrototypeOf(Module.prototype), "_makeInstance", this).call(this, params);
    }
  }, {
    key: "_setStore",
    value: function _setStore(store) {
      if (this._store) return;
      this._store = store;

      if (typeof this._store.subscribe !== 'function' || typeof this._store.getState !== 'function' || typeof this._store.dispatch !== 'function') {
        console.warn("".concat(this.constructor.name, " Module did't correctly set custom 'Store'."));
      }
    }
  }, {
    key: "_dispatch",
    value: function _dispatch(action) {
      if (typeof this._store.dispatch === 'function') {
        return this._store.dispatch(action);
      }
    }
  }, {
    key: "_subscribe",
    value: function _subscribe(callback) {
      return this._store.subscribe(callback);
    }
  }, {
    key: "_getState",
    value: function _getState() {
      var key = this._proto._getModuleKey(this);

      return this.isFactoryModule || !this.getState ? this.isFactoryModule ? this._store.getState() : key ? this._store.getState()[key] : {} : this.getState();
    }
  }, {
    key: "_getReducers",
    value: function _getReducers(actionTypes) {
      var reducers = this.getReducers(actionTypes);
      var subReducers = !this.isFactoryModule ? {} : Object.entries(this._modules).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            module = _ref4[1];

        return module instanceof Module;
      }).reduce(function (reducers, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            key = _ref6[0],
            module = _ref6[1];

        return Object.assign(reducers, _defineProperty({}, key, module.reducers));
      }, {});
      return _objectSpread(_objectSpread({
        __$$default$$__: function __$$default$$__() {
          return null;
        }
      }, reducers), subReducers);
    }
  }, {
    key: "setStore",
    value: function setStore(store) {
      this._setStore(store);
    }
  }, {
    key: "getReducers",
    value: function getReducers(actionTypes) {
      var _this2 = this;

      return (this._actionTypes || []).reduce(function (map, name) {
        map[name] = _this2._reducersMaps[name](actionTypes);
        return map;
      }, {});
    }
  }, {
    key: "_proto",
    get: function get() {
      var prototype = Object.getPrototypeOf(this);
      return prototype.constructor;
    }
  }, {
    key: "_reducers",
    get: function get() {
      var reducers = this._getReducers(this.actionTypes);

      return this._proto.combineReducers(reducers);
    }
  }, {
    key: "state",
    get: function get() {
      return this.__$$state$$__ || this._getState() || {};
    }
  }, {
    key: "reducers",
    get: function get() {
      return this._reducers;
    }
  }, {
    key: "store",
    get: function get() {
      if (!this._store) {
        throw new Error("".concat(this.constructor.name, " Module has not been initialized..."));
      }

      return this._store;
    }
  }], [{
    key: "combineReducers",
    value: function combineReducers(reducers) {
      return (0, _redux.combineReducers)(reducers);
    }
  }, {
    key: "createStore",
    value: function createStore(reducer) {
      return (0, _redux.createStore)(reducer);
    }
  }]);

  return Module;
}(_usm["default"]);

exports["default"] = Module;
//# sourceMappingURL=module.js.map

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyClient;

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.define-property");

var uuid = _interopRequireWildcard(require("uuid"));

var _ensureExist = _interopRequireDefault(require("../ensureExist"));

var _RcModule2 = _interopRequireDefault(require("../RcModule"));

var _baseActionTypes = _interopRequireDefault(require("./baseActionTypes"));

var _getProxyClientReducer = _interopRequireDefault(require("./getProxyClientReducer"));

var _handleProxyAction = require("./handleProxyAction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var defaultVerifyModuleFunc = function defaultVerifyModuleFunc(module) {
  return module instanceof _RcModule2["default"];
};

function getProxyClient(createTarget) {
  var verifyModuleFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultVerifyModuleFunc;
  return /*#__PURE__*/function (_RcModule) {
    _inherits(_class, _RcModule);

    var _super = _createSuper(_class);

    function _class(_ref) {
      var _this;

      var transport = _ref.transport,
          options = _objectWithoutProperties(_ref, ["transport"]);

      _classCallCheck(this, _class);

      _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
        actionTypes: _baseActionTypes["default"]
      }));
      _this._id = uuid.v4();
      _this._target = createTarget(_objectSpread({}, options)); // Used by client to dispatch action.
      // this._target.__proxyAction__ = this.actionTypes.action;

      _this._target._getState = function () {
        return _this.state.target;
      };

      _this._target._getProxyState = function () {
        return _this.state.proxy;
      }; // this._target = new Target({
      //   ...options,
      //   getState: () => this.state.target,
      //   getProxyState: () => this.state.proxy,
      // });


      _this._transport = _ensureExist["default"].call(_assertThisInitialized(_this), transport, 'transport');

      _this._setTransport(_this._target);

      var _loop = function _loop(subModule) {
        if (Object.prototype.hasOwnProperty.call(_this._target, subModule) && verifyModuleFunc(_this._target[subModule])) {
          Object.defineProperty(_assertThisInitialized(_this), subModule, {
            configurable: false,
            enumerable: true,
            get: function get() {
              return this._target[subModule];
            }
          });

          _this[subModule]._getStateV2 = function (state, key) {
            return state.target[key];
          };
        }
      };

      for (var subModule in _this._target) {
        _loop(subModule);
      }

      _this._reducer = (0, _getProxyClientReducer["default"])({
        targetReducer: _this._target.reducer,
        proxyReducer: _this._target.proxyReducer,
        transport: transport,
        types: _this.actionTypes
      });
      return _this;
    }

    _createClass(_class, [{
      key: "_setTransport",
      value: function _setTransport(target) {
        target._transport = this._transport;
        target._proxyActionTypes = this.actionTypes;
        target._suppressInit = true;

        for (var subModule in target) {
          if (Object.prototype.hasOwnProperty.call(target, subModule) && verifyModuleFunc(target[subModule])) {
            target[subModule]._transport = this._transport;
            target[subModule]._proxyActionTypes = this.actionTypes;
            target[subModule]._suppressInit = true;
          }
        }
      }
    }, {
      key: "_sync",
      value: function () {
        var _sync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return this._transport.request({
                    payload: {
                      type: this.actionTypes.sync,
                      actionNumber: this.state.actionNumber
                    }
                  });

                case 3:
                  result = _context.sent;
                  this.store.dispatch(_objectSpread(_objectSpread({}, result), {}, {
                    type: this.actionTypes.sync
                  }));
                  _context.next = 9;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);

                case 9:
                  this._syncPromise = null;

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        function _sync() {
          return _sync2.apply(this, arguments);
        }

        return _sync;
      }()
    }, {
      key: "sync",
      value: function sync() {
        if (!this._syncPromise) {
          this._syncPromise = this._sync();
        }

        return this._syncPromise;
      }
    }, {
      key: "_initialize",
      value: function _initialize(target) {
        if (typeof target.initializeProxy === 'function' && !target._proxyInitialized) {
          target._proxyInitialized = true;
          target.initializeProxy();
        }

        for (var subModule in target) {
          if (Object.prototype.hasOwnProperty.call(target, subModule) && verifyModuleFunc(target[subModule]) && typeof target[subModule].initializeProxy === 'function' && !target[subModule]._proxyInitialized) {
            target[subModule]._proxyInitialized = true;
            target[subModule].initializeProxy();
          }
        }
      }
    }, {
      key: "initialize",
      value: function () {
        var _initialize2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var _this2 = this;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  // initialize the instance before sync to avoid history object from
                  // becoming out of sync
                  this._initialize(this._target);

                  this._transport.on(this._transport.events.push, /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
                      var action;
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              if (!(payload.type === _this2.actionTypes.action)) {
                                _context2.next = 11;
                                break;
                              }

                              if (!_this2._syncPromise) {
                                _context2.next = 4;
                                break;
                              }

                              _context2.next = 4;
                              return _this2._syncPromise;

                            case 4:
                              if (!(payload.actionNumber === _this2.state.actionNumber + 1)) {
                                _context2.next = 9;
                                break;
                              }

                              action = (0, _handleProxyAction.pushStates)(_this2._target, payload.action);

                              _this2.store.dispatch(_objectSpread(_objectSpread({}, payload), {}, {
                                action: action,
                                type: _this2.actionTypes.action
                              }));

                              _context2.next = 11;
                              break;

                            case 9:
                              _context2.next = 11;
                              return _this2.sync();

                            case 11:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));

                    return function (_x) {
                      return _ref2.apply(this, arguments);
                    };
                  }());

                  _context3.next = 4;
                  return this.sync();

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function initialize() {
          return _initialize2.apply(this, arguments);
        }

        return initialize;
      }()
    }]);

    return _class;
  }(_RcModule2["default"]);
}
//# sourceMappingURL=getProxyClient.js.map

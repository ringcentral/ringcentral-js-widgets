"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.bind");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.is-array");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.define-properties");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _moduleStatuses = _interopRequireDefault(require("./moduleStatuses"));

var _flatten = require("../utils/flatten");

var _property = _interopRequireDefault(require("../utils/property"));

var _event = _interopRequireDefault(require("../utils/event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * TypeScript interface Usage:
 * interface DepsModules = {
 *   foo: Foo;
 *   bar: Bar;
 * }
 * class Foobar<DepsModules> {}
 */
var Module = /*#__PURE__*/function () {
  function Module(params) {
    _classCallCheck(this, Module);

    this.__init__ = void 0;
    this.__reset__ = void 0;
    this._modules = void 0;
    this._arguments = void 0;
    this._modules = {};
    this._arguments = {};
    this._status = _moduleStatuses["default"].initial;
    this.__init__ = false;
    this.__reset__ = false;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this._makeInstance(this._handleArgs.apply(this, [params].concat(args)));
  }

  _createClass(Module, [{
    key: "_handleArgs",
    value: function _handleArgs(params) {
      if (typeof params === 'undefined') {
        return {
          modules: {}
        };
      }

      return params;
    }
  }, {
    key: "_makeInstance",
    value: function _makeInstance(params) {
      var _this = this;

      var getState = params.getState || function () {
        var key = _this._proto._getModuleKey(_this);

        if (typeof key === 'undefined' || key === null) {
          return {};
        }

        var states = _this._store.getState.call(_this);

        return states[key];
      };

      Object.defineProperties(this, {
        _arguments: _objectSpread(_objectSpread({}, _property["default"]), {}, {
          value: params
        }),
        _modules: _objectSpread(_objectSpread({}, _property["default"]), {}, {
          value: params.modules
        }),
        _status: _objectSpread(_objectSpread({}, _property["default"]), {}, {
          writable: true,
          value: _moduleStatuses["default"].initial
        }),
        getState: _objectSpread(_objectSpread({}, _property["default"]), {}, {
          value: getState
        })
      });
    }
  }, {
    key: "_moduleWillInitialize",
    value: function _moduleWillInitialize() {}
  }, {
    key: "_initialize",
    value: function () {
      var _initialize2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._moduleWillInitialize();

                _context.next = 3;
                return this.moduleWillInitialize();

              case 3:
                this.dispatch({
                  type: this.actionTypes.init
                });
                _context.next = 6;
                return this._moduleDidInitialize();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _initialize() {
        return _initialize2.apply(this, arguments);
      }

      return _initialize;
    }()
  }, {
    key: "_moduleDidInitialize",
    value: function () {
      var _moduleDidInitialize2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._moduleInitializeCheck()) {
                  _context2.next = 7;
                  break;
                }

                this.__init__ = true;
                _context2.next = 4;
                return this.moduleWillInitializeSuccess();

              case 4:
                this.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context2.next = 7;
                return this.moduleDidInitialize();

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _moduleDidInitialize() {
        return _moduleDidInitialize2.apply(this, arguments);
      }

      return _moduleDidInitialize;
    }()
  }, {
    key: "_moduleInitializeCheck",
    value: function _moduleInitializeCheck() {
      return !this.__init__ && Object.values(this._modules).filter(function (module) {
        return module instanceof Module;
      }).every(function (module) {
        return module.ready;
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (typeof this.onStateChange === 'function') {
        this.onStateChange();
      }

      if (this.pending && this._moduleInitializeCheck()) {
        this._moduleDidInitialize();
      } else if (this.ready && this._moduleResetCheck()) {
        this._moduleDidReset();
      }
    }
  }, {
    key: "_initModule",
    value: function _initModule() {
      var _this2 = this;

      _event["default"].on('module', this._onStateChange.bind(this));

      this._initialize();

      Object.values(this._modules).forEach(function (module) {
        if (module instanceof Module) {
          module.parentModule = _this2;

          if (typeof module.setStore === 'function') {
            module.setStore(_this2._store);
          }

          module._initModule();
        }
      });
    }
  }, {
    key: "_moduleWillReset",
    value: function () {
      var _moduleWillReset2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var key, dependentModule;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = regeneratorRuntime.keys(this._modules);

              case 1:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 10;
                  break;
                }

                key = _context3.t1.value;

                if (!(typeof this.parentModule === 'undefined')) {
                  _context3.next = 8;
                  break;
                }

                dependentModule = this._modules[key];

                if (!(dependentModule instanceof Module)) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 8;
                return dependentModule._resetModule();

              case 8:
                _context3.next = 1;
                break;

              case 10:
                _context3.next = 12;
                return this.moduleWillReset();

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _moduleWillReset() {
        return _moduleWillReset2.apply(this, arguments);
      }

      return _moduleWillReset;
    }()
  }, {
    key: "_resetModule",
    value: function () {
      var _resetModule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._moduleWillReset();

              case 2:
                this.dispatch({
                  type: this.actionTypes.reset
                });
                _context4.next = 5;
                return this._initialize();

              case 5:
                this.__init__ = false;
                this.__reset__ = true;

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _resetModule() {
        return _resetModule2.apply(this, arguments);
      }

      return _resetModule;
    }()
  }, {
    key: "_moduleResetCheck",
    value: function _moduleResetCheck() {
      return this.__reset__ && Object.values(this._modules).filter(function (module) {
        return module instanceof Module;
      }).every(function (module) {
        return module.ready;
      });
    }
  }, {
    key: "_moduleDidReset",
    value: function () {
      var _moduleDidReset2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._moduleResetCheck()) {
                  _context5.next = 4;
                  break;
                }

                this.__reset__ = false;
                _context5.next = 4;
                return this.moduleDidReset();

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _moduleDidReset() {
        return _moduleDidReset2.apply(this, arguments);
      }

      return _moduleDidReset;
    }()
  }, {
    key: "_getState",
    value: function _getState() {
      return this._state;
    }
  }, {
    key: "_getActionTypes",
    value: function _getActionTypes() {
      return (0, _actionTypes["default"])(this.getActionTypes(), this.__name__);
    }
  }, {
    key: "bootstrap",
    value: function bootstrap() {
      this._proto.boot(this._proto, this);
    }
  }, {
    key: "resetModule",
    value: function () {
      var _resetModule3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._resetModule();

              case 2:
                _context6.next = 4;
                return this._moduleDidReset();

              case 4:
                _context6.next = 6;
                return this._moduleDidInitialize();

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function resetModule() {
        return _resetModule3.apply(this, arguments);
      }

      return resetModule;
    }()
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      if (typeof action.type === 'string') {
        var _this$actionTypes$ini;

        var moduleStatus = (_this$actionTypes$ini = {}, _defineProperty(_this$actionTypes$ini, this.actionTypes.init, _moduleStatuses["default"].pending), _defineProperty(_this$actionTypes$ini, this.actionTypes.reset, _moduleStatuses["default"].resetting), _defineProperty(_this$actionTypes$ini, this.actionTypes.initSuccess, _moduleStatuses["default"].ready), _this$actionTypes$ini)[action.type];

        if (moduleStatus) {
          this._status = moduleStatus;

          if (Array.isArray(_event["default"]._events.module)) {
            return _event["default"].emit('module');
          }
        }
      }

      if (typeof this._dispatch === 'function') {
        return this._dispatch(action);
      }
    }
  }, {
    key: "getActionTypes",
    value: function getActionTypes() {
      return this._actionTypes;
    }
  }, {
    key: "moduleWillInitialize",
    value: function moduleWillInitialize() {}
  }, {
    key: "moduleWillInitializeSuccess",
    value: function moduleWillInitializeSuccess() {}
  }, {
    key: "moduleDidInitialize",
    value: function moduleDidInitialize() {}
  }, {
    key: "moduleWillReset",
    value: function moduleWillReset() {}
  }, {
    key: "moduleDidReset",
    value: function moduleDidReset() {}
  }, {
    key: "_proto",
    get: function get() {
      var prototype = Object.getPrototypeOf(this);
      return prototype.constructor;
    }
  }, {
    key: "store",
    get: function get() {
      var _this3 = this;

      return {
        subscribe: function subscribe(subscription) {
          return _event["default"].on('state', subscription);
        },
        getState: function getState() {
          return _this3._state || {};
        }
      };
    }
  }, {
    key: "actionTypes",
    get: function get() {
      return this._getActionTypes();
    }
  }, {
    key: "state",
    get: function get() {
      return this._getState() || {};
    }
  }, {
    key: "status",
    get: function get() {
      return this._status;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "resetting",
    get: function get() {
      return this.status === _moduleStatuses["default"].resetting;
    }
  }, {
    key: "modules",
    get: function get() {
      return this.isFactoryModule ? this._modules : {};
    }
  }], [{
    key: "_getModuleKey",
    value: function _getModuleKey(module) {
      if (typeof module.parentModule === 'undefined' || module.parentModule === null) {
        return;
      }

      for (var key in module.parentModule._modules) {
        if (module.parentModule._modules[key] === module) {
          return key;
        }
      }
    }
  }, {
    key: "create",
    value: function create(params) {
      var FactoryModule = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var factoryModule = _construct(FactoryModule, [params].concat(args));

      var proto = Object.getPrototypeOf(factoryModule).constructor;
      proto.boot(proto, factoryModule);
      return factoryModule;
    }
  }, {
    key: "boot",
    value: function boot(proto, module) {
      module.isFactoryModule = true;

      if (_typeof(module._modules) === 'object') {
        var flattenModules = (0, _flatten.flatten)(module);
        Object.assign(module._modules, flattenModules);
      }

      if (typeof module.setStore === 'function') {
        module.setStore(proto._generateStore(proto, module));
      }

      module._initModule();
    }
  }, {
    key: "_generateStore",
    value: function _generateStore(proto, module) {
      return proto.createStore(module.reducers);
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }, {
    key: "createStore",
    value: function createStore(_reducers) {
      throw new Error('`createStore` has not yet been implemented.');
    }
  }]);

  return Module;
}();

exports["default"] = Module;
//# sourceMappingURL=module.js.map

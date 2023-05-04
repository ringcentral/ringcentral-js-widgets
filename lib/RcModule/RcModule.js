"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.set");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcModuleV2 = exports.ModuleStatus = void 0;
Object.defineProperty(exports, "action", {
  enumerable: true,
  get: function get() {
    return _usmRedux.action;
  }
});
Object.defineProperty(exports, "applyPatches", {
  enumerable: true,
  get: function get() {
    return _usmRedux.applyPatches;
  }
});
exports.checkStatusChangeKey = void 0;
Object.defineProperty(exports, "computed", {
  enumerable: true,
  get: function get() {
    return _usmRedux.computed;
  }
});
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function get() {
    return _usmRedux.createStore;
  }
});
exports.enableCacheKey = void 0;
Object.defineProperty(exports, "enableES5", {
  enumerable: true,
  get: function get() {
    return _usmRedux.enableES5;
  }
});
exports.globalStorageStateKey = exports.enableGlobalCacheKey = void 0;
Object.defineProperty(exports, "identifierKey", {
  enumerable: true,
  get: function get() {
    return _usmRedux.identifierKey;
  }
});
exports.onceKey = exports.onInitOnceKey = exports.notReadyModulesKey = exports.ignoreReadyModulesKey = void 0;
Object.defineProperty(exports, "setAutoFreeze", {
  enumerable: true,
  get: function get() {
    return _usmRedux.setAutoFreeze;
  }
});
exports.spawnStorageReducersKey = exports.spawnReducersKey = void 0;
Object.defineProperty(exports, "state", {
  enumerable: true,
  get: function get() {
    return _usmRedux.state;
  }
});
Object.defineProperty(exports, "stateKey", {
  enumerable: true,
  get: function get() {
    return _usmRedux.stateKey;
  }
});
exports.storageStateKey = exports.storageKey = void 0;
Object.defineProperty(exports, "storeKey", {
  enumerable: true,
  get: function get() {
    return _usmRedux.storeKey;
  }
});
Object.defineProperty(exports, "subscribe", {
  enumerable: true,
  get: function get() {
    return _usmRedux.subscribe;
  }
});
Object.defineProperty(exports, "usmAction", {
  enumerable: true,
  get: function get() {
    return _usmRedux.usm;
  }
});
Object.defineProperty(exports, "watch", {
  enumerable: true,
  get: function get() {
    return _usmRedux.watch;
  }
});

require("regenerator-runtime/runtime");

var _redux = require("redux");

var _usmRedux = require("../usm-redux");

var _class, _descriptor;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

(0, _usmRedux.setAutoFreeze)(false);
(0, _usmRedux.setPatchesToggle)(!process.env.DISABLE_PATCHES);

if (!process.env.DISABLE_PATCHES) {
  (0, _usmRedux.enablePatches)();
}

var ModuleStatus;
exports.ModuleStatus = ModuleStatus;

(function (ModuleStatus) {
  ModuleStatus["Pending"] = "PENDING";
  ModuleStatus["Initializing"] = "INITIALIZING";
  ModuleStatus["Ready"] = "READY";
  ModuleStatus["Resetting"] = "RESETTING";
})(ModuleStatus || (exports.ModuleStatus = ModuleStatus = {}));

var onceKey = Symbol('once');
exports.onceKey = onceKey;
var onInitOnceKey = Symbol('onInitOnce');
exports.onInitOnceKey = onInitOnceKey;
var notReadyModulesKey = Symbol('notReadyModules');
exports.notReadyModulesKey = notReadyModulesKey;
var checkStatusChangeKey = Symbol('checkStatusChange');
exports.checkStatusChangeKey = checkStatusChangeKey;
var enableCacheKey = Symbol('enableCache');
exports.enableCacheKey = enableCacheKey;
var enableGlobalCacheKey = Symbol('enableGlobalCache');
exports.enableGlobalCacheKey = enableGlobalCacheKey;
var storageKey = Symbol('storage');
exports.storageKey = storageKey;
var storageStateKey = Symbol('storageState');
exports.storageStateKey = storageStateKey;
var globalStorageStateKey = Symbol('globalStorageState');
exports.globalStorageStateKey = globalStorageStateKey;
var spawnReducersKey = Symbol('spawnReducers');
exports.spawnReducersKey = spawnReducersKey;
var spawnStorageReducersKey = Symbol('spawnStorageReducers');
exports.spawnStorageReducersKey = spawnStorageReducersKey;
var ignoreReadyModulesKey = Symbol('ignoreReadyModules');
exports.ignoreReadyModulesKey = ignoreReadyModulesKey;

/**
 * Module system based on Dependency Injection and Redux
 *
 * life cycle:
 * - `constructor`
 * - `onInitOnce`: when deps are ready, only run once in whole life cycle
 * - `onInit`: when module init, module status will be set to `ready` after that event.
 * - `onInitSuccess`: when onInit be passed successfully, this event will be triggered.
 * - `onReset`: when one of deps be reset, this event will be triggered.
 */
var RcModuleV2 = (_class = /*#__PURE__*/function () {
  function RcModuleV2() {
    var _ref2,
        _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var deps = _ref.deps,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? false : _ref$enableCache,
        _ref$enableGlobalCach = _ref.enableGlobalCache,
        enableGlobalCache = _ref$enableGlobalCach === void 0 ? false : _ref$enableGlobalCach,
        options = _objectWithoutProperties(_ref, ["deps", "enableCache", "enableGlobalCache"]);

    _classCallCheck(this, RcModuleV2);

    this[onceKey] = false;
    this[storageKey] = void 0;
    this[enableCacheKey] = void 0;
    this[enableGlobalCacheKey] = void 0;
    this._transport = void 0;
    this[ignoreReadyModulesKey] = new Set();
    this._deps = void 0;

    _initializerDefineProperty(this, "status", _descriptor, this);

    this._modulePath = 'root';
    this._initialized = false;
    this._suppressInit = void 0;
    this._reducers = void 0;

    this._getStateV2 = function (state, key) {
      return state[key];
    };

    this._deps = (_ref2 = deps) !== null && _ref2 !== void 0 ? _ref2 : {};
    this[storageKey] = options.storageKey;
    this[enableCacheKey] = enableCache;
    this[enableGlobalCacheKey] = enableGlobalCache;
    (0, _usmRedux.subscribe)(this, function () {
      if (typeof _this.onStateChange === 'function') {
        _this.onStateChange();
      }

      _this[checkStatusChangeKey]();
    });

    if (!this[storageStateKey] || !this[enableCacheKey] || !this._deps.storage) {
      this[storageStateKey] = [];
    }

    this[storageStateKey].forEach(function (key) {
      return delete _this[_usmRedux.stateKey][key];
    });

    if (!this[globalStorageStateKey] || !this[enableGlobalCacheKey] || !this._deps.globalStorage) {
      this[globalStorageStateKey] = [];
    }

    this[globalStorageStateKey].forEach(function (key) {
      return delete _this[_usmRedux.stateKey][key];
    });
  }

  _createClass(RcModuleV2, [{
    key: "_setStatus",
    value: function _setStatus(status) {
      this.status = status;
    }
  }, {
    key: onInitOnceKey,
    value: function () {
      var _value = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this[onceKey]) {
                  _context.next = 5;
                  break;
                }

                this[onceKey] = true;

                if (!(typeof this.onInitOnce === 'function')) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this.onInitOnce();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function value() {
        return _value.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: checkStatusChangeKey,
    value: function () {
      var _value2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context2.next = 13;
                  break;
                }

                this._setStatus(ModuleStatus.Initializing);

                _context2.next = 4;
                return this[onInitOnceKey]();

              case 4:
                if (!(typeof this.onInit === 'function')) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 7;
                return this.onInit();

              case 7:
                this._setStatus(ModuleStatus.Ready);

                if (!(typeof this.onInitSuccess === 'function')) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 11;
                return this.onInitSuccess();

              case 11:
                _context2.next = 19;
                break;

              case 13:
                if (!this._shouldReset()) {
                  _context2.next = 19;
                  break;
                }

                this._setStatus(ModuleStatus.Resetting);

                if (!(typeof this.onReset === 'function')) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 18;
                return this.onReset();

              case 18:
                this._setStatus(ModuleStatus.Pending);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function value() {
        return _value2.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: "_ignoreModuleReadiness",
    value: function _ignoreModuleReadiness(dep) {
      this[ignoreReadyModulesKey].add(dep);
    }
  }, {
    key: "_getLastState",
    value: function _getLastState() {
      var _this$_deps$storage,
          _this2 = this,
          _this$_deps$globalSto;

      var lastState = {
        // for combineReducers check state with reducers
        __state: this._getStateV2(this[_usmRedux.storeKey].getState(), this[_usmRedux.identifierKey]),
        __identifier: this[_usmRedux.identifierKey]
      };

      if ((_this$_deps$storage = this._deps.storage) === null || _this$_deps$storage === void 0 ? void 0 : _this$_deps$storage.data) {
        this[storageStateKey].forEach(function (key) {
          var storageReducerKey = "".concat(_this2[storageKey], "-").concat(key);
          lastState[key] = _this2._deps.storage.data[storageReducerKey];
        });
      }

      if ((_this$_deps$globalSto = this._deps.globalStorage) === null || _this$_deps$globalSto === void 0 ? void 0 : _this$_deps$globalSto.data) {
        this[globalStorageStateKey].forEach(function (key) {
          var storageReducerKey = "".concat(_this2[storageKey], "-").concat(key);
          lastState[key] = _this2._deps.globalStorage.data[storageReducerKey];
        });
      }

      return lastState;
    }
  }, {
    key: "_handleState",
    value: function _handleState(state) {
      Object.assign(state, state.__state);
      delete state.__state;
      delete state.__identifier;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      var areAllReady = this[notReadyModulesKey].length === 0;
      return areAllReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      var areNotReady = this[notReadyModulesKey].length > 0;
      return areNotReady && this.ready;
    }
  }, {
    key: "_depsCheck",
    value: function _depsCheck() {
      var _this$_deps;

      var checkedModules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [this];
      var pickedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      Object.values((_this$_deps = this._deps) !== null && _this$_deps !== void 0 ? _this$_deps : {}).forEach(function (module) {
        if (module instanceof RcModuleV2 && !module.ready) {
          var _module$_deps;

          var notReadyModules = Object.values((_module$_deps = module._deps) !== null && _module$_deps !== void 0 ? _module$_deps : {}).filter(function (item) {
            return item instanceof RcModuleV2 && !item.ready;
          });

          if (notReadyModules.length > 0 && !checkedModules.includes(module)) {
            checkedModules.push(module);

            module._depsCheck(checkedModules, pickedModules);
          } else if (!pickedModules.includes(module) && notReadyModules.length === 0) {
            pickedModules.push(module);
          }
        }
      }); // please check `_shouldInit()` or `onInit()`.

      return pickedModules;
    }
  }, {
    key: "_changeState",
    value: function _changeState(callback) {
      callback();
    }
  }, {
    key: spawnStorageReducersKey,
    value: function value() {
      var _this3 = this;

      var descriptors = {};
      /**
       * make storage reducer and state
       */

      this[storageStateKey].forEach(function (key) {
        var descriptor = Object.getOwnPropertyDescriptor(_this3, key);
        if (typeof descriptor === 'undefined') return;
        var initialState = descriptor.value;
        var storageReducerKey = "".concat(_this3[storageKey], "-").concat(key);

        _this3._deps.storage.registerReducer({
          key: storageReducerKey,
          reducer: function reducer() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
            var action = arguments.length > 1 ? arguments[1] : undefined;
            return action._usm === _usmRedux.usm && action.type === _this3[_usmRedux.identifierKey] && Object.hasOwnProperty.call(action._state, key) ? action._state[key] : state;
          }
        });

        Object.assign(descriptors, _defineProperty({}, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            var stagedState = (0, _usmRedux.getStagedState)();
            return (stagedState === null || stagedState === void 0 ? void 0 : stagedState.__identifier) === this[_usmRedux.identifierKey] ? stagedState[key] : this._deps.storage.data[storageReducerKey];
          },
          set: function set(value) {
            var stagedState = (0, _usmRedux.getStagedState)();

            if (stagedState && stagedState.__identifier !== this[_usmRedux.identifierKey]) {
              throw new Error("RcModule does not support cross-module execution of the methods decorated by action");
            }

            if (stagedState) {
              stagedState[key] = value;
              return;
            }

            this._deps.storage.data[storageReducerKey] = value;
          }
        }));
      });
      /**
       * make global storage reducer and state
       */

      this[globalStorageStateKey].forEach(function (key) {
        var descriptor = Object.getOwnPropertyDescriptor(_this3, key);
        if (typeof descriptor === 'undefined') return;
        var initialState = descriptor.value;
        var storageReducerKey = "".concat(_this3[storageKey], "-").concat(key);

        _this3._deps.globalStorage.registerReducer({
          key: storageReducerKey,
          reducer: function reducer() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
            var action = arguments.length > 1 ? arguments[1] : undefined;
            return action._usm === _usmRedux.usm && action.type === _this3[_usmRedux.identifierKey] && Object.hasOwnProperty.call(action._state, key) ? action._state[key] : state;
          }
        });

        Object.assign(descriptors, _defineProperty({}, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            var stagedState = (0, _usmRedux.getStagedState)();
            return (stagedState === null || stagedState === void 0 ? void 0 : stagedState.__identifier) === this[_usmRedux.identifierKey] ? stagedState[key] : this._deps.globalStorage.data[storageReducerKey];
          },
          set: function set(value) {
            var stagedState = (0, _usmRedux.getStagedState)();

            if (stagedState && stagedState.__identifier !== this[_usmRedux.identifierKey]) {
              throw new Error("RcModule does not support cross-module execution of the methods decorated by action");
            }

            if (stagedState) {
              stagedState[key] = value;
              return;
            }

            this._deps.globalStorage.data[storageReducerKey] = value;
          }
        }));
      });
      Object.defineProperties(this, descriptors);
    } // TODO: Refactor without RcModuleV1
    // harmony with RcModule V1 for modules initialization

  }, {
    key: "_setStore",
    value: function _setStore() {
      return this._initModule();
    }
  }, {
    key: spawnReducersKey,
    value: function value() {
      var _this$stateKey,
          _this4 = this;

      var descriptors = _defineProperty({}, _usmRedux.stateKey, {
        enumerable: false,
        configurable: false,
        get: function get() {
          var _this$storeKey;

          var stagedState = (0, _usmRedux.getStagedState)();
          return (stagedState === null || stagedState === void 0 ? void 0 : stagedState.__identifier) === this[_usmRedux.identifierKey] ? stagedState.__state : this._getStateV2((_this$storeKey = this[_usmRedux.storeKey]) === null || _this$storeKey === void 0 ? void 0 : _this$storeKey.getState(), this[_usmRedux.identifierKey]);
        }
      });

      this._reducers = Object.keys((_this$stateKey = this[_usmRedux.stateKey]) !== null && _this$stateKey !== void 0 ? _this$stateKey : {}).reduce(function (serviceReducersMapObject, key) {
        var descriptor = Object.getOwnPropertyDescriptor(_this4, key);
        if (typeof descriptor === 'undefined') return serviceReducersMapObject;
        var initialState = descriptor.value;
        Object.assign(descriptors, _defineProperty({}, key, {
          enumerable: true,
          configurable: false,
          get: function get() {
            return this[_usmRedux.stateKey][key];
          },
          set: function set(value) {
            this[_usmRedux.stateKey][key] = value;
          }
        }));
        return Object.assign(serviceReducersMapObject, _defineProperty({}, key, function () {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
          var action = arguments.length > 1 ? arguments[1] : undefined;
          return action._usm === _usmRedux.usm && _this4[_usmRedux.identifierKey] === action.type && Object.hasOwnProperty.call(action._state, key) ? action._state[key] : state;
        }));
      }, {});
      var stateDescriptor = Object.getOwnPropertyDescriptor(this, _usmRedux.stateKey);
      if (stateDescriptor && typeof stateDescriptor.get === 'function') return;
      Object.defineProperties(this, descriptors);
    }
  }, {
    key: "_initModule",
    value: function () {
      var _initModule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this$subscriptionsKe, _iterator, _step, _subscribe, subModule, subRcModule;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._initialized = true;

                if (this.parentModule && !(this.parentModule instanceof RcModuleV2) || !this.parentModule && !(this instanceof RcModuleV2)) {
                  _iterator = _createForOfIteratorHelper((_this$subscriptionsKe = this[_usmRedux.subscriptionsKey]) !== null && _this$subscriptionsKe !== void 0 ? _this$subscriptionsKe : []);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      _subscribe = _step.value;

                      _subscribe();
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }

                  this[_usmRedux.subscriptionsKey] = [];
                }

                _context3.next = 4;
                return this[checkStatusChangeKey]();

              case 4:
                // eslint-disable-next-line guard-for-in
                for (subModule in this) {
                  subRcModule = this[subModule];

                  if (subRcModule && typeof subRcModule._initModule === 'function' && !subRcModule._initialized && !subRcModule._suppressInit) {
                    subRcModule._initModule();
                  }
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _initModule() {
        return _initModule2.apply(this, arguments);
      }

      return _initModule;
    }()
  }, {
    key: "addModule",
    value: function addModule(name, module) {
      if (Object.prototype.hasOwnProperty.call(this, name)) {
        throw new Error("Property '".concat(name, "' already exists..."));
      }

      Object.defineProperty(this, name, {
        get: function get() {
          return module;
        },
        enumerable: true
      });

      if (this[name]._modulePath === 'root') {
        this[name]._modulePath = "".concat(this.modulePath, ".").concat(name);
      }
    }
  }, {
    key: "actionTypes",
    value: function actionTypes() {
      return {};
    }
  }, {
    key: notReadyModulesKey,
    get: function get() {
      var _this5 = this;

      var modules = Object.values(this._deps || {}).filter( // In order to be compatible with RcModuleV1
      function (module) {
        return module && typeof module.ready !== 'undefined';
      });
      return modules.filter(function (module) {
        return !module.ready && !_this5[ignoreReadyModulesKey].has(module);
      });
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === ModuleStatus.Pending;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === ModuleStatus.Ready;
    }
  }, {
    key: "resetting",
    get: function get() {
      return this.status === ModuleStatus.Resetting;
    }
  }, {
    key: "initializing",
    get: function get() {
      return this.status === ModuleStatus.Initializing;
    }
  }, {
    key: "store",
    get: function get() {
      return this[_usmRedux.storeKey];
    }
  }, {
    key: "_store",
    get: function get() {
      return this.store;
    }
  }, {
    key: "reducer",
    get: function get() {
      if (this._reducers) return (0, _redux.combineReducers)(this._reducers);
      this[spawnStorageReducersKey]();
      this[spawnReducersKey]();

      if (!this._reducers) {
        throw new Error("Combine reducers error");
      }

      return (0, _redux.combineReducers)(this._reducers);
    }
  }, {
    key: "proxyReady",
    get: function get() {
      return this.ready;
    }
  }, {
    key: "modulePath",
    get: function get() {
      return this._modulePath;
    }
  }, {
    key: "state",
    get: function get() {
      return this[_usmRedux.stateKey];
    }
  }]);

  return RcModuleV2;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "status", [_usmRedux.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return ModuleStatus.Pending;
  }
}), _applyDecoratedDescriptor(_class.prototype, "_setStatus", [_usmRedux.action], Object.getOwnPropertyDescriptor(_class.prototype, "_setStatus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_changeState", [_usmRedux.action], Object.getOwnPropertyDescriptor(_class.prototype, "_changeState"), _class.prototype)), _class);
exports.RcModuleV2 = RcModuleV2;
//# sourceMappingURL=RcModule.js.map

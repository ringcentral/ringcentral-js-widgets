"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalStorage = globalStorage;
exports.storage = storage;
exports.track = track;
Object.defineProperty(exports, "state", {
  enumerable: true,
  get: function get() {
    return _usmRedux.state;
  }
});
Object.defineProperty(exports, "action", {
  enumerable: true,
  get: function get() {
    return _usmRedux.action;
  }
});
exports.RcModuleV2 = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

var _usmRedux = _interopRequireWildcard(require("../usm-redux"));

var _moduleStatuses = require("../../enums/moduleStatuses");

var _class, _descriptor, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * decorate global storage state with `GlobalStorage` Module
 */
function globalStorage(target, name, descriptor) {
  target._globalStorageSubKeys = [].concat(_toConsumableArray(target._globalStorageSubKeys || []), [name]);
  return descriptor;
}
/**
 * decorate storage state with `Storage` Module
 */


function storage(target, name, descriptor) {
  target._storageSubKeys = [].concat(_toConsumableArray(target._storageSubKeys || []), [name]);
  return descriptor;
}

/**
 * decorate a method with `Analytics` Module
 *
 * @param trackEvent define trackEvent for tracking
 */
function track(trackEvent) {
  return function (target, name, descriptor) {
    if (typeof descriptor.value !== 'function' && typeof descriptor.initializer !== 'function') {
      throw new Error("@track decorated '".concat(name, "' is not a method"));
    }

    var fn = descriptor.value;
    var initializer = descriptor.initializer;

    var trackedFn = function trackedFn() {
      var _ref = this.parentModule,
          analytics = _ref.analytics;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (typeof analytics !== 'undefined' && typeof analytics.track === 'function') {
        if (typeof trackEvent === 'string') {
          analytics.track(trackEvent);
        } else {
          var _trackEvent = trackEvent.apply(void 0, [this].concat(args)),
              _trackEvent2 = _slicedToArray(_trackEvent, 2),
              event = _trackEvent2[0],
              trackProps = _trackEvent2[1];

          analytics.track(event, trackProps);
        }
      }

      if (typeof initializer === 'function') {
        fn = initializer.call(this);
      }

      return fn.apply(this, args);
    }; // the any type is just to be compatible with babel and tsc.


    return {
      enumerable: true,
      configurable: true,
      value: trackedFn
    };
  };
}

var getStorageSubKey = function getStorageSubKey(storageKey, key) {
  return "".concat(storageKey, "-").concat(key);
};

var RcModuleV2 = (_class = (_temp = /*#__PURE__*/function (_BaseModule) {
  _inherits(RcModuleV2, _BaseModule);

  var _super = _createSuper(RcModuleV2);

  function RcModuleV2(options) {
    var _this;

    _classCallCheck(this, RcModuleV2);

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this, options].concat(args));
    _this.__$$state$$__ = void 0;
    _this._once = false;
    _this.__key__ = void 0;
    _this.__subscriptions__ = void 0;
    _this.storageKey = void 0;
    _this._modulePath = void 0;
    _this._initialized = false;
    _this._suppressInit = void 0;
    _this._deps = void 0;

    _initializerDefineProperty(_this, "__status__", _descriptor, _assertThisInitialized(_this));

    _this._modulePath = 'root';
    _this._deps = _this._modules;

    if (_this.enableStorage) {
      // TODO replace new way for `storageKey` definition
      _this.storageKey = options.storageKey;

      _this._storageSubKeys.forEach(function (key) {
        var reducer = function reducer() {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._initialValue[key];

          var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
              type = _ref2.type,
              states = _ref2.states;

          if (type && type.indexOf(_this.actionTypes[key]) > -1) {
            return states[key];
          }

          return state;
        };

        _this._modules.storage.registerReducer({
          key: getStorageSubKey(_this.storageKey, key),
          reducer: reducer
        });
      });

      var properties = _this._storageSubKeys.reduce(function (propertiesMap, key) {
        propertiesMap[key] = {
          enumerable: true,
          configurable: true,
          get: function get() {
            return this.state[key];
          },
          set: function set(value) {
            if (this._store) {
              this.state[key] = value;
            } else {
              // Support for synchronous updating of initialized state values while in the constructor.
              this._initialValue[key] = value;
            }
          }
        };
        return propertiesMap;
      }, {});

      Object.defineProperties(_assertThisInitialized(_this), properties);
    }

    if (_this.enableGlobalStorage) {
      _this.storageKey = options.storageKey;

      _this._globalStorageSubKeys.forEach(function (key) {
        var reducer = function reducer() {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._initialValue[key];

          var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
              type = _ref3.type,
              states = _ref3.states;

          if (type && type.indexOf(_this.actionTypes[key]) > -1) {
            return states[key];
          }

          return state;
        };

        _this._modules.globalStorage.registerReducer({
          key: getStorageSubKey(_this.storageKey, key),
          reducer: reducer
        });
      });

      var _properties = _this._globalStorageSubKeys.reduce(function (propertiesMap, key) {
        propertiesMap[key] = {
          enumerable: true,
          configurable: true,
          get: function get() {
            return this.state[key];
          },
          set: function set(value) {
            if (this._store) {
              this.state[key] = value;
            } else {
              // Support for synchronous updating of initialized state values while in the constructor.
              this._initialValue[key] = value;
            }
          }
        };
        return propertiesMap;
      }, {});

      Object.defineProperties(_assertThisInitialized(_this), _properties);
    }

    return _this;
  }

  _createClass(RcModuleV2, [{
    key: "_handleArgs",
    value: function _handleArgs(params) {
      if (typeof params === 'undefined') {
        return {
          modules: {}
        };
      }

      var deps = params.deps,
          rest = _objectWithoutProperties(params, ["deps"]);

      return _objectSpread({
        modules: deps
      }, rest);
    }
  }, {
    key: "addModule",

    /**
     * harmony with RcModule V1 for modules initialization
     * @param name module key
     * @param module RcModule
     */
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
    key: "getReducers",
    value: function getReducers(actionTypes) {
      var _this2 = this;

      var reducers = _get(_getPrototypeOf(RcModuleV2.prototype), "getReducers", this).call(this, actionTypes);

      if (!this.enableStorage && !this.enableGlobalStorage) return reducers;
      return Object.entries(reducers).reduce(function (reducers, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            key = _ref5[0],
            reducer = _ref5[1];

        if ((!Array.isArray(_this2._storageSubKeys) || _this2._storageSubKeys.indexOf(key) === -1 || !_this2.enableStorage) && (!Array.isArray(_this2._globalStorageSubKeys) || _this2._globalStorageSubKeys.indexOf(key) === -1 || !_this2.enableGlobalStorage)) {
          reducers[key] = reducer;
        }

        return reducers;
      }, {});
    }
  }, {
    key: "_getStorageState",
    value: function _getStorageState() {
      var _this3 = this;

      if (!this._storageSubKeys || !this.enableStorage) return {};
      return this._storageSubKeys.reduce(function (_state, key) {
        var value;

        if (_this3.enableStorage) {
          var _this3$_modules$stora;

          value = (_this3$_modules$stora = _this3._modules.storage.getItem(getStorageSubKey(_this3.storageKey, key))) !== null && _this3$_modules$stora !== void 0 ? _this3$_modules$stora : _this3._initialValue[key];
        } else {
          value = _this3.state[key];
        }

        return Object.assign(_state, _defineProperty({}, key, value));
      }, {});
    }
  }, {
    key: "_getGlobalStorageState",
    value: function _getGlobalStorageState() {
      var _this4 = this;

      if (!this._globalStorageSubKeys || !this.enableGlobalStorage) return {};
      return this._globalStorageSubKeys.reduce(function (_state, key) {
        var value;

        if (_this4.enableGlobalStorage) {
          var _this4$_modules$globa;

          value = (_this4$_modules$globa = _this4._modules.globalStorage.getItem(getStorageSubKey(_this4.storageKey, key))) !== null && _this4$_modules$globa !== void 0 ? _this4$_modules$globa : _this4._initialValue[key];
        } else {
          value = _this4.state[key];
        }

        return Object.assign(_state, _defineProperty({}, key, value));
      }, {});
    }
  }, {
    key: "_onInitOnce",
    value: function () {
      var _onInitOnce2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._once) {
                  _context.next = 5;
                  break;
                }

                this._once = true;

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

      function _onInitOnce() {
        return _onInitOnce2.apply(this, arguments);
      }

      return _onInitOnce;
    }()
  }, {
    key: "_checkStatusChange",
    value: function () {
      var _checkStatusChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context2.next = 13;
                  break;
                }

                this.__initModule__();

                _context2.next = 4;
                return this._onInitOnce();

              case 4:
                if (!(typeof this.onInit === 'function')) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 7;
                return this.onInit();

              case 7:
                this.__initSuccessModule__();

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

                this.__resetModule__();

                if (!(typeof this.onReset === 'function')) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 18;
                return this.onReset();

              case 18:
                this.__resetSuccessModule__();

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _checkStatusChange() {
        return _checkStatusChange2.apply(this, arguments);
      }

      return _checkStatusChange;
    }()
  }, {
    key: "initModule",
    value: function () {
      var _initModule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this5 = this;

        var subModule, subRcModule;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.parentModule.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (typeof _this5.onStateChange === 'function') {
                            _this5.onStateChange();
                          }

                          _context3.next = 3;
                          return _this5._checkStatusChange();

                        case 3:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })));

                if (Array.isArray(this.__subscriptions__)) {
                  this.__subscriptions__.forEach(function (subscribe) {
                    return subscribe();
                  });
                }

                _context4.next = 4;
                return this._checkStatusChange();

              case 4:
                if (!(typeof this.__key__ !== 'undefined')) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return");

              case 6:
                for (subModule in this) {
                  if (Object.prototype.hasOwnProperty.call(this, subModule) && this[subModule] instanceof RcModuleV2 && !this[subModule]._initialized && !this[subModule]._suppressInit) {
                    subRcModule = this[subModule];
                    subRcModule._initialized = true;
                    subRcModule.initModule();
                  }
                }

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function initModule() {
        return _initModule.apply(this, arguments);
      }

      return initModule;
    }()
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {}
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      var areAllReady = this.noReadyModulesLength === 0;
      return areAllReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      var areNotReady = this.noReadyModulesLength > 0;
      return areNotReady && this.ready;
    }
  }, {
    key: "_setStore",
    value: function _setStore(store) {
      // Compatibility about Factory ModuleV1 and ModuleV2
      if (typeof this.parentModule === 'undefined') {
        this.parentModule = {
          store: store
        };
      }
    }
  }, {
    key: "_getState",
    value: function _getState() {
      return this.parentModule._getState ? this.parentModule._getState()[this.__key__] : this.parentModule.store.getState();
    }
  }, {
    key: "__initModule__",
    value: function __initModule__() {
      this.state.__status__ = _moduleStatuses.moduleStatuses.initializing;
    }
  }, {
    key: "__initSuccessModule__",
    value: function __initSuccessModule__() {
      this.state.__status__ = _moduleStatuses.moduleStatuses.ready;
    }
  }, {
    key: "__resetModule__",
    value: function __resetModule__() {
      this.state.__status__ = _moduleStatuses.moduleStatuses.resetting;
    }
  }, {
    key: "__resetSuccessModule__",
    value: function __resetSuccessModule__() {
      this.state.__status__ = _moduleStatuses.moduleStatuses.pending;
    }
  }, {
    key: "modulePath",
    get: function get() {
      return this._modulePath;
    }
  }, {
    key: "enableStorage",
    get: function get() {
      if (this.enableCache && (typeof this._modules.storage === 'undefined' || this._modules.storage === null)) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Dependent 'Storage' module was not imported in the ".concat(this.__key__, " module."));
        }
      }

      return this.enableCache && !!this._modules.storage && Array.isArray(this._storageSubKeys) && this._storageSubKeys.length > 0;
    }
  }, {
    key: "enableCache",
    get: function get() {
      return this._arguments.enableCache;
    }
  }, {
    key: "enableGlobalStorage",
    get: function get() {
      if (this.enableGlobalCache && (typeof this._modules.globalStorage === 'undefined' || this._modules.globalStorage === null)) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Dependent 'GlobalStorage' module was not imported in the module.");
        }
      }

      return this.enableGlobalCache && !!this._modules.globalStorage && Array.isArray(this._globalStorageSubKeys) && this._globalStorageSubKeys.length > 0;
    }
  }, {
    key: "enableGlobalCache",
    get: function get() {
      return this._arguments.enableGlobalCache;
    }
  }, {
    key: "state",
    get: function get() {
      if (this.__$$state$$__) {
        return this.__$$state$$__;
      }

      if (!this.enableStorage && !this.enableGlobalStorage) {
        return _objectSpread({}, this._getState());
      }

      return _objectSpread(_objectSpread(_objectSpread({}, this._getState()), this._getStorageState()), this._getGlobalStorageState());
    }
  }, {
    key: "noReadyModules",
    get: function get() {
      var modules = Object.values(this._modules || {}).filter( // In order to be compatible with RcModuleV1
      function (module) {
        return module && typeof module.ready !== 'undefined';
      });
      return modules.filter(function (module) {
        return !module.ready;
      });
    }
  }, {
    key: "noReadyModulesLength",
    get: function get() {
      return this.noReadyModules.length;
    }
  }, {
    key: "_store",
    get: function get() {
      var _this$parentModule;

      return (_this$parentModule = this.parentModule) === null || _this$parentModule === void 0 ? void 0 : _this$parentModule.store;
    }
  }, {
    key: "reducer",
    get: function get() {
      return this.reducers;
    }
  }, {
    key: "_reducer",
    get: function get() {
      return this.reducer;
    }
  }, {
    key: "__name__",
    get: function get() {
      return this.__key__;
    }
  }, {
    key: "status",
    get: function get() {
      return this.__status__;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.__status__ === _moduleStatuses.moduleStatuses.pending;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.__status__ === _moduleStatuses.moduleStatuses.ready;
    }
  }, {
    key: "resetting",
    get: function get() {
      return this.__status__ === _moduleStatuses.moduleStatuses.resetting;
    }
    /**
     * @deprecated make it compatible with proxy state in RcModuleV1
     */

  }, {
    key: "proxyReady",
    get: function get() {
      return this.ready;
    }
  }]);

  return RcModuleV2;
}(_usmRedux["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "__status__", [_usmRedux.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _moduleStatuses.moduleStatuses.pending;
  }
}), _applyDecoratedDescriptor(_class.prototype, "__initModule__", [_usmRedux.action], Object.getOwnPropertyDescriptor(_class.prototype, "__initModule__"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "__initSuccessModule__", [_usmRedux.action], Object.getOwnPropertyDescriptor(_class.prototype, "__initSuccessModule__"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "__resetModule__", [_usmRedux.action], Object.getOwnPropertyDescriptor(_class.prototype, "__resetModule__"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "__resetSuccessModule__", [_usmRedux.action], Object.getOwnPropertyDescriptor(_class.prototype, "__resetSuccessModule__"), _class.prototype)), _class);
exports.RcModuleV2 = RcModuleV2;
//# sourceMappingURL=RcModule.js.map

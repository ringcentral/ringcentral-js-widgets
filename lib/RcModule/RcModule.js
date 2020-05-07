"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalStorage = globalStorage;
exports.storage = storage;
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
Object.defineProperty(exports, "computed", {
  enumerable: true,
  get: function get() {
    return _usmRedux.computed;
  }
});
exports.RcModuleV2 = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

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

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.reduce");

var _usmRedux = _interopRequireWildcard(require("usm-redux"));

var _redux = require("redux");

var _moduleStatuses = require("../../enums/moduleStatuses");

var _class, _descriptor, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * decorate global storage state with `GlobalStorage` Module
 * @param target rc module
 * @param name sate key
 * @param descriptor descriptor
 */
function globalStorage(target, name, descriptor) {
  target._globalStorageSubKeys = [].concat(_toConsumableArray(target._globalStorageSubKeys || []), [name]);
  return descriptor;
}
/**
 * decorate storage state with `Storage` Module
 * @param target RcModule
 * @param name state key
 * @param descriptor descriptor
 */


function storage(target, name, descriptor) {
  target._storageSubKeys = [].concat(_toConsumableArray(target._storageSubKeys || []), [name]);
  return descriptor;
}

var RcModuleV2 = (_class = (_temp =
/*#__PURE__*/
function (_BaseModule) {
  _inherits(RcModuleV2, _BaseModule);

  function RcModuleV2() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RcModuleV2);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RcModuleV2)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.__$$state$$__ = void 0;
    _this._once = false;
    _this.__key__ = void 0;
    _this.storageKey = void 0;
    _this._modulePath = void 0;

    _initializerDefineProperty(_this, "__status__", _descriptor, _assertThisInitialized(_this));

    _this._modulePath = 'root';

    if (_this.enableStorage) {
      // TODO replace new way for `storageKey` definition
      _this.storageKey = args[0].storageKey;
      var reducer = (0, _redux.combineReducers)(_this._storageSubKeys.reduce(function (reducerMap, key) {
        reducerMap[key] = function () {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._initialValue[key];

          var _ref = arguments.length > 1 ? arguments[1] : undefined,
              type = _ref.type,
              states = _ref.states;

          if (type && type.indexOf(_this.actionTypes[key]) > -1) {
            return states[key];
          }

          return state;
        };

        return reducerMap;
      }, {}));

      _this._modules.storage.registerReducer({
        key: _this.storageKey,
        reducer: reducer
      });

      var properties = _this._storageSubKeys.reduce(function (propertiesMap, key) {
        propertiesMap[key] = {
          enumerable: true,
          configurable: true,
          get: function get() {
            return this.enableStorage && this._modules.storage.getItem(this.storageKey) ? this._modules.storage.getItem(this.storageKey)[key] : this.state[key];
          }
        };
        return propertiesMap;
      }, {});

      Object.defineProperties(_assertThisInitialized(_this), properties);
    }

    if (_this.enableGlobalStorage) {
      _this.storageKey = args[0].storageKey;

      var _reducer = (0, _redux.combineReducers)(_this._globalStorageSubKeys.reduce(function (reducerMap, key) {
        reducerMap[key] = function () {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this._initialValue[key];

          var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
              type = _ref2.type,
              states = _ref2.states;

          if (type && type.indexOf(_this.actionTypes[key]) > -1) {
            return states[key];
          }

          return state;
        };

        return reducerMap;
      }, {}));

      _this._modules.globalStorage.registerReducer({
        key: _this.storageKey,
        reducer: _reducer
      });

      var _properties = _this._globalStorageSubKeys.reduce(function (propertiesMap, key) {
        propertiesMap[key] = {
          enumerable: true,
          configurable: true,
          get: function get() {
            return this.enableGlobalStorage && this._modules.globalStorage.getItem(this.storageKey) ? this._modules.globalStorage.getItem(this.storageKey)[key] : this.state[key];
          }
        };
        return propertiesMap;
      }, {});

      Object.defineProperties(_assertThisInitialized(_this), _properties);
    }

    return _this;
  }

  _createClass(RcModuleV2, [{
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
      return Object.entries(reducers).reduce(function (reducers, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            reducer = _ref4[1];

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
          value = _this3._modules.storage.getItem(_this3.storageKey) ? _this3._modules.storage.getItem(_this3.storageKey)[key] : _this3._initialValue[key];
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
          value = _this4._modules.globalStorage.getItem(_this4.storageKey) ? _this4._modules.globalStorage.getItem(_this4.storageKey)[key] : _this4._initialValue[key];
        } else {
          value = _this4.state[key];
        }

        return Object.assign(_state, _defineProperty({}, key, value));
      }, {});
    }
  }, {
    key: "_onInitOnce",
    value: function _onInitOnce() {
      return regeneratorRuntime.async(function _onInitOnce$(_context) {
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
              return regeneratorRuntime.awrap(this.onInitOnce());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "initModule",
    value: function initModule() {
      var _this5 = this;

      this.parentModule.store.subscribe(function _callee() {
        return regeneratorRuntime.async(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (typeof _this5.onStateChange === 'function') {
                  _this5.onStateChange();
                }

                if (!_this5._shouldInit()) {
                  _context2.next = 14;
                  break;
                }

                _this5.__initModule__();

                _context2.next = 5;
                return regeneratorRuntime.awrap(_this5._onInitOnce());

              case 5:
                if (!(typeof _this5.onInit === 'function')) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 8;
                return regeneratorRuntime.awrap(_this5.onInit());

              case 8:
                _this5.__initSuccessModule__();

                if (!(typeof _this5.onInitSuccess === 'function')) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 12;
                return regeneratorRuntime.awrap(_this5.onInitSuccess());

              case 12:
                _context2.next = 20;
                break;

              case 14:
                if (!_this5._shouldReset()) {
                  _context2.next = 20;
                  break;
                }

                _this5.__resetModule__();

                if (!(typeof _this5.onReset === 'function')) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 19;
                return regeneratorRuntime.awrap(_this5.onReset());

              case 19:
                _this5.__resetSuccessModule__();

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        });
      });
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      var modules = this._modules || {};
      var areAllReady = modules && Object.values(modules).filter(function (module) {
        return !module.ready;
      }).length === 0;
      return areAllReady && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      var modules = this._modules || {};
      var areNotReady = modules && Object.values(modules).filter(function (module) {
        return !module.ready;
      }).length > 0;
      return areNotReady && this.ready;
    }
  }, {
    key: "_getState",
    value: function _getState() {
      return this.parentModule._getState()[this.__key__];
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
        console.error("Dependent 'Storage' module was not imported in the ".concat(this.__key__, " module."));
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
        console.error("Dependent 'GlobalStorage' module was not imported in the module.");
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
        return this._getState() || {};
      }

      return _objectSpread({}, this._getState(), {}, this._getStorageState(), {}, this._getGlobalStorageState());
    }
  }, {
    key: "_store",
    get: function get() {
      return this.parentModule.store;
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

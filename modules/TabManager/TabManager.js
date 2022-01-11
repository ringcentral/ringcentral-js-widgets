"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TabManager = void 0;

require("regenerator-runtime/runtime");

var _redux = require("redux");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _Tabbie = require("../../lib/Tabbie");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var TabManager = (_dec = (0, _di.Module)({
  name: 'TabManager',
  deps: [{
    dep: 'TabManagerOptions',
    optional: true
  }, 'Prefix']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(TabManager, _RcModuleV);

  var _super = _createSuper(TabManager);

  function TabManager(deps) {
    var _deps$tabManagerOptio, _deps$tabManagerOptio2;

    var _this;

    _classCallCheck(this, TabManager);

    _this = _super.call(this, {
      deps: deps,
      enableGlobalCache: (_deps$tabManagerOptio = (_deps$tabManagerOptio2 = deps.tabManagerOptions) === null || _deps$tabManagerOptio2 === void 0 ? void 0 : _deps$tabManagerOptio2.enableCache) !== null && _deps$tabManagerOptio !== void 0 ? _deps$tabManagerOptio : false
    });
    _this.tabbie = void 0;

    _initializerDefineProperty(_this, "id", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "active", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "event", _descriptor3, _assertThisInitialized(_this));

    _this._eventReducer = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var action = arguments.length > 1 ? arguments[1] : undefined;

      if (action._usm === _core.usmAction) {
        var _this$_getStateV = _this._getStateV2(action._state, _this[_core.identifierKey]),
            event = _this$_getStateV.event;

        if (event && // It needs to match the exact modification event about `@action _setEvent()` in this module for Redux state.
        // And it is a one-time state in Redux store.
        action.method === '_setEvent' && action.type === _this[_core.identifierKey]) return event;
      }

      return null;
    };

    _this.tabbie = new _Tabbie.Tabbie({
      prefix: _this._deps.prefix
    });
    return _this;
  }

  _createClass(TabManager, [{
    key: "_setId",
    value: function _setId(id) {
      this.id = id;
    }
    /**
     * Default to true. If tabbie cannot be enabled due to env, the runtime
     * should assume active.
     */

  }, {
    key: "_setActive",
    value: function _setActive(active) {
      this.active = active;
    }
  }, {
    key: "_setEvent",
    value: function _setEvent(event, args) {
      this.event = {
        name: event,
        args: args
      };
    }
  }, {
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._setId(this.tabbie.id);

                if (!this.tabbie.enabled) {
                  _context2.next = 9;
                  break;
                }

                _context2.t0 = this;
                _context2.next = 5;
                return this.tabbie.checkIsMain();

              case 5:
                _context2.t1 = _context2.sent;

                _context2.t0._setActive.call(_context2.t0, _context2.t1);

                this.tabbie.on(this.tabbie.events.mainTabIdChanged, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.t0 = _this2;
                          _context.next = 3;
                          return _this2.tabbie.checkIsMain();

                        case 3:
                          _context.t1 = _context.sent;

                          _context.t0._setActive.call(_context.t0, _context.t1);

                        case 5:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));
                this.tabbie.on(this.tabbie.events.event, function (event) {
                  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                  }

                  _this2._setEvent(event, args);
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }

      return onInitOnce;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
        var _this$tabbie;

        var _len2,
            args,
            _key2,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                for (_len2 = _args3.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = _args3[_key2];
                }

                (_this$tabbie = this.tabbie).send.apply(_this$tabbie, [event].concat(args));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function send(_x) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "checkIsMain",
    value: function () {
      var _checkIsMain = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.tabbie.checkIsMain());

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function checkIsMain() {
        return _checkIsMain.apply(this, arguments);
      }

      return checkIsMain;
    }()
  }, {
    key: "checkTabAliveById",
    value: function () {
      var _checkTabAliveById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.tabbie.checkTabAliveById(id));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function checkTabAliveById(_x2) {
        return _checkTabAliveById.apply(this, arguments);
      }

      return checkTabAliveById;
    }()
  }, {
    key: "reducer",
    get: function get() {
      if (this._reducers) return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, this._reducers), {}, {
        event: this._eventReducer
      }));

      this[_core.spawnStorageReducersKey]();

      this[_core.spawnReducersKey]();

      return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, this._reducers), {}, {
        event: this._eventReducer
      }));
    }
  }, {
    key: "hasMultipleTabs",
    get: function get() {
      var _this$tabbie$hasMulti, _this$tabbie2;

      return (_this$tabbie$hasMulti = (_this$tabbie2 = this.tabbie) === null || _this$tabbie2 === void 0 ? void 0 : _this$tabbie2.hasMultipleTabs) !== null && _this$tabbie$hasMulti !== void 0 ? _this$tabbie$hasMulti : false;
    }
  }, {
    key: "tabs",
    get: function get() {
      var _this$tabbie$tabs, _this$tabbie3;

      return (_this$tabbie$tabs = (_this$tabbie3 = this.tabbie) === null || _this$tabbie3 === void 0 ? void 0 : _this$tabbie3.tabs) !== null && _this$tabbie$tabs !== void 0 ? _this$tabbie$tabs : [];
    }
  }, {
    key: "isFirstTab",
    get: function get() {
      var _this$tabbie$isFirstT, _this$tabbie4;

      return (_this$tabbie$isFirstT = (_this$tabbie4 = this.tabbie) === null || _this$tabbie4 === void 0 ? void 0 : _this$tabbie4.isFirstTab) !== null && _this$tabbie$isFirstT !== void 0 ? _this$tabbie$isFirstT : true;
    }
  }, {
    key: "enable",
    get: function get() {
      var _this$tabbie5;

      return (_this$tabbie5 = this.tabbie) === null || _this$tabbie5 === void 0 ? void 0 : _this$tabbie5.enabled;
    }
  }]);

  return TabManager;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setId"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "active", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setActive", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setActive"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "event", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setEvent", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setEvent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkIsMain", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkIsMain"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkTabAliveById", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkTabAliveById"), _class2.prototype)), _class2)) || _class); // For backward compatibility

exports.TabManager = TabManager;
var _default = TabManager;
exports["default"] = _default;
//# sourceMappingURL=TabManager.js.map

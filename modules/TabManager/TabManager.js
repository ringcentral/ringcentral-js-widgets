"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TabManager = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _redux = require("redux");
var _Tabbie = require("../../lib/Tabbie");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3; // @ts-nocheck
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
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
    var _deps$tabManagerOptio, _deps$tabManagerOptio2, _this$_deps$tabManage, _this$_deps$tabManage2;
    var _this;
    _classCallCheck(this, TabManager);
    _this = _super.call(this, {
      deps: deps,
      enableGlobalCache: (_deps$tabManagerOptio = (_deps$tabManagerOptio2 = deps.tabManagerOptions) === null || _deps$tabManagerOptio2 === void 0 ? void 0 : _deps$tabManagerOptio2.enableCache) !== null && _deps$tabManagerOptio !== void 0 ? _deps$tabManagerOptio : false
    });
    _this.tabbie = void 0;
    _initializerDefineProperty(_this, "id", _descriptor, _assertThisInitialized(_this));
    /**
     * Default to true. If tabbie cannot be enabled due to env, the runtime
     * should assume active.
     */
    _initializerDefineProperty(_this, "active", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "event", _descriptor3, _assertThisInitialized(_this));
    _this._eventReducer = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var action = arguments.length > 1 ? arguments[1] : undefined;
      if (action._usm === _core.usmAction && action.type === _this[_core.identifierKey] && Object.hasOwnProperty.call(action._state, 'event')) {
        var event = action._state.event;
        if (event &&
        // It needs to match the exact modification event about `@action _setEvent()` in this module for Redux state.
        // And it is a one-time state in Redux store.
        action.method === '_setEvent' && action.type === _this[_core.identifierKey]) return event;
      }
      return null;
    };
    _this.tabbie = new _Tabbie.Tabbie({
      prefix: _this._deps.prefix,
      autoMainTab: (_this$_deps$tabManage = _this._deps.tabManagerOptions) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.autoMainTab,
      isMainTab: (_this$_deps$tabManage2 = _this._deps.tabManagerOptions) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.isMainTab
    });
    return _this;
  }
  _createClass(TabManager, [{
    key: "_setId",
    value: function _setId(id) {
      this.id = id;
    }
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
    key: "actualTabIds",
    get: function get() {
      return this.tabbie.actualTabIds;
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

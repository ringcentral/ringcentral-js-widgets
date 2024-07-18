"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timezone = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
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
var CACHE_TTL = 60 * 60e3;
var Timezone = (_dec = (0, _di.Module)({
  name: 'Timezone',
  deps: ['Client', 'Storage', {
    dep: 'TimezoneOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var _localeTimezone = _ref._localeTimezone,
    timezones = _ref.timezones;
  return [_localeTimezone, timezones];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Timezone, _RcModuleV);
  var _super = _createSuper(Timezone);
  function Timezone(deps) {
    var _this;
    _classCallCheck(this, Timezone);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'Timezone'
    });
    _this._localeTimezone = void 0;
    _initializerDefineProperty(_this, "timezones", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "cacheExpiredIn", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(Timezone, [{
    key: "_updateCacheExpiredIn",
    value: function _updateCacheExpiredIn() {
      this.cacheExpiredIn = new Date().getTime() + CACHE_TTL;
    }
  }, {
    key: "_updateTimezones",
    value: function _updateTimezones(timezones) {
      this.timezones = timezones;
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.shouldUpdateTimezones) {
                  _context.next = 4;
                  break;
                }
                _context.next = 3;
                return this._initTimezones();
              case 3:
                this.updateCacheExpiredIn();
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "_initTimezones",
    value: function () {
      var _initTimezones2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$this$_deps$cli, _yield$this$_deps$cli2, records;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._deps.client.dictionary().timezone().list();
              case 2:
                _yield$this$_deps$cli = _context2.sent;
                _yield$this$_deps$cli2 = _yield$this$_deps$cli.records;
                records = _yield$this$_deps$cli2 === void 0 ? [] : _yield$this$_deps$cli2;
                this.updateTimezones(records);
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _initTimezones() {
        return _initTimezones2.apply(this, arguments);
      }
      return _initTimezones;
    }()
  }, {
    key: "updateTimezones",
    value: function () {
      var _updateTimezones2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(timezones) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._updateTimezones(timezones);
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function updateTimezones(_x) {
        return _updateTimezones2.apply(this, arguments);
      }
      return updateTimezones;
    }()
  }, {
    key: "updateCacheExpiredIn",
    value: function () {
      var _updateCacheExpiredIn2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._updateCacheExpiredIn();
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function updateCacheExpiredIn() {
        return _updateCacheExpiredIn2.apply(this, arguments);
      }
      return updateCacheExpiredIn;
    }()
  }, {
    key: "localeTimezone",
    get: function get() {
      if (!this._localeTimezone) {
        var bias = String(-new Date().getTimezoneOffset());
        this._localeTimezone = this.timezones.find(function (timezone) {
          return timezone.bias === bias;
        });
      }
      return this._localeTimezone;
    }
  }, {
    key: "shouldUpdateTimezones",
    get: function get() {
      return !this.cacheExpiredIn || this.cacheExpiredIn < Date.now();
    }
  }]);
  return Timezone;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timezones", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cacheExpiredIn", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateCacheExpiredIn", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateCacheExpiredIn"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateTimezones", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateTimezones"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initTimezones", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_initTimezones"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTimezones", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTimezones"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCacheExpiredIn", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCacheExpiredIn"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localeTimezone", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "localeTimezone"), _class2.prototype)), _class2)) || _class);
exports.Timezone = Timezone;
//# sourceMappingURL=Timezone.js.map

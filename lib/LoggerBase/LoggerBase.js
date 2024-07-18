"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.function.name");
require("core-js/modules/es.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggerBase = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _proxify = require("../proxy/proxify");
var _loggerBaseHelper = require("./loggerBaseHelper");
var _dec, _class, _descriptor;
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var LoggerBase = (_dec = (0, _core.computed)(function (that) {
  return [that.loggingList];
}), (_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(LoggerBase, _RcModuleV);
  var _super = _createSuper(LoggerBase);
  function LoggerBase(deps, options) {
    var _this;
    _classCallCheck(this, LoggerBase);
    _this = _super.call(this, _objectSpread({
      deps: deps
    }, options));
    _this._identityFunction = _loggerBaseHelper.defaultIdentityFunction;
    _this._logFunction = void 0;
    _this._readyCheckFunction = void 0;
    _this._logPromises = new Map();
    _initializerDefineProperty(_this, "loggingList", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(LoggerBase, [{
    key: "setLoggingList",
    value: function setLoggingList(id) {
      if (this.loggingList.indexOf(id) === -1) {
        this.loggingList.push(id);
      }
    }
  }, {
    key: "filterLoggingListById",
    value: function filterLoggingListById(id) {
      this.loggingList = this.loggingList.filter(function (item) {
        return item !== id;
      });
    }
  }, {
    key: "resetLoggingList",
    value: function resetLoggingList() {
      this.loggingList = [];
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(LoggerBase.prototype), "_shouldInit", this).call(this) && this._readyCheckFunction());
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(LoggerBase.prototype), "_shouldReset", this).call(this) || this.ready && !this._readyCheckFunction());
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.resetLoggingList();
    }
  }, {
    key: "_log",
    value: function () {
      var _log2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var item, options, id, promise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                item = _ref.item, options = _objectWithoutProperties(_ref, ["item"]);
                if (this.ready) {
                  _context.next = 3;
                  break;
                }
                throw new Error("".concat(this.constructor.name, "._log: module is not ready."));
              case 3:
                if (item) {
                  _context.next = 5;
                  break;
                }
                throw new Error("".concat(this.constructor.name, "._log: options.item is undefined."));
              case 5:
                id = this._identityFunction(item); // wait for the previous log action to finish
                if (!this._logPromises.has(id)) {
                  _context.next = 9;
                  break;
                }
                _context.next = 9;
                return this._logPromises.get(id);
              case 9:
                _context.prev = 9;
                this.setLoggingList(id);
                promise = this._logFunction(_objectSpread({
                  item: item
                }, options));
                this._logPromises.set(id, promise);
                _context.next = 15;
                return promise;
              case 15:
                this._logPromises["delete"](id);
                this.filterLoggingListById(id);
                _context.next = 24;
                break;
              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](9);
                this._logPromises["delete"](id);
                this.filterLoggingListById(id);
                throw _context.t0;
              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 19]]);
      }));
      function _log(_x) {
        return _log2.apply(this, arguments);
      }
      return _log;
    }()
  }, {
    key: "log",
    value: function () {
      var _log3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var item, options;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                item = _ref2.item, options = _objectWithoutProperties(_ref2, ["item"]);
                if (this.ready) {
                  _context2.next = 3;
                  break;
                }
                throw new Error("".concat(this.constructor.name, ".log: module is not ready."));
              case 3:
                if (item) {
                  _context2.next = 5;
                  break;
                }
                throw new Error("".concat(this.constructor.name, ".log: options.item is undefined."));
              case 5:
                _context2.next = 7;
                return this._log(_objectSpread({
                  item: item
                }, options));
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function log(_x2) {
        return _log3.apply(this, arguments);
      }
      return log;
    }()
  }, {
    key: "loggingMap",
    get: function get() {
      return (0, _loggerBaseHelper.convertListToMap)(this.loggingList);
    }
  }]);
  return LoggerBase;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "loggingList", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "setLoggingList", [_core.action], Object.getOwnPropertyDescriptor(_class.prototype, "setLoggingList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "filterLoggingListById", [_core.action], Object.getOwnPropertyDescriptor(_class.prototype, "filterLoggingListById"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetLoggingList", [_core.action], Object.getOwnPropertyDescriptor(_class.prototype, "resetLoggingList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_log", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class.prototype, "_log"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "log", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class.prototype, "log"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loggingMap", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "loggingMap"), _class.prototype)), _class));
exports.LoggerBase = LoggerBase;
//# sourceMappingURL=LoggerBase.js.map

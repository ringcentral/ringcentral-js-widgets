"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserLogger = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _loggerV = require("@ringcentral-integration/core/lib/logger/loggerV2");
var _mfeLogger = require("@ringcentral/mfe-logger");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _class, _class2, _descriptor, _descriptor2;
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
var BrowserLogger = (_dec = (0, _di.Module)({
  name: 'BrowserLogger',
  deps: ['GlobalStorage', {
    dep: 'Prefix',
    optional: true
  }, {
    dep: 'BrowserLoggerOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(BrowserLogger, _RcModuleV);
  var _super = _createSuper(BrowserLogger);
  function BrowserLogger(deps) {
    var _this;
    _classCallCheck(this, BrowserLogger);
    _this = _super.call(this, {
      deps: deps,
      storageKey: 'BrowserLogger',
      enableGlobalCache: true
    });
    _initializerDefineProperty(_this, "enabled", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "downloading", _descriptor2, _assertThisInitialized(_this));
    (0, _core.watch)(_assertThisInitialized(_this), function () {
      return [_this.enabled, _this.ready];
    }, function () {
      if (!_this.ready) return;
      try {
        if (_this.enabled) {
          _this.logger.enable();
          _this.logger.log('BrowserLogger enabled');
        } else {
          _this.logger.disable();
        }
      } catch (e) {
        console.error(e);
      }
    }, {
      multiple: true
    });
    return _this;
  }
  _createClass(BrowserLogger, [{
    key: "_enable",
    value: function _enable() {
      this.enabled = true;
    }
    /**
     * enable logger
     */
  }, {
    key: "enable",
    value: function () {
      var _enable2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.toggleLogger(true);
              case 2:
                this._enable();
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function enable() {
        return _enable2.apply(this, arguments);
      }
      return enable;
    }()
  }, {
    key: "_disable",
    value: function _disable() {
      this.enabled = false;
    }
    /**
     * disable logger
     */
  }, {
    key: "disable",
    value: function () {
      var _disable2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.toggleLogger(false);
              case 2:
                this._disable();
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function disable() {
        return _disable2.apply(this, arguments);
      }
      return disable;
    }()
  }, {
    key: "toggleLogger",
    value: function () {
      var _toggleLogger2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(enabled) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _loggerV.toggleLogger)(enabled);
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function toggleLogger(_x) {
        return _toggleLogger2.apply(this, arguments);
      }
      return toggleLogger;
    }()
  }, {
    key: "_setDownloading",
    value: function _setDownloading(val) {
      this.downloading = val;
    }
    /**
     * set downloading
     */
  }, {
    key: "setDownloading",
    value: function () {
      var _setDownloading2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(val) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._setDownloading(val);
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function setDownloading(_x2) {
        return _setDownloading2.apply(this, arguments);
      }
      return setDownloading;
    }()
  }, {
    key: "saveLog",
    value: function () {
      var _saveLog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var name;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.setDownloading(true);
              case 2:
                _context5.prev = 2;
                if (!this.storageTransport) {
                  _context5.next = 9;
                  break;
                }
                name = this._deps.prefix;
                _context5.next = 7;
                return this.storageTransport.downloadLogs({
                  name: name
                });
              case 7:
                _context5.next = 10;
                break;
              case 9:
                throw new Error('StorageTransport not found');
              case 10:
                _context5.prev = 10;
                _context5.next = 13;
                return this.setDownloading(false);
              case 13:
                return _context5.finish(10);
              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2,, 10, 14]]);
      }));
      function saveLog() {
        return _saveLog.apply(this, arguments);
      }
      return saveLog;
    }()
  }, {
    key: "logger",
    get: function get() {
      var _this$_deps$browserLo, _this$_deps$browserLo2;
      return (_this$_deps$browserLo = (_this$_deps$browserLo2 = this._deps.browserLoggerOptions) === null || _this$_deps$browserLo2 === void 0 ? void 0 : _this$_deps$browserLo2.logger) !== null && _this$_deps$browserLo !== void 0 ? _this$_deps$browserLo : _loggerV.loggerV2;
    }
  }, {
    key: "storageTransport",
    get: function get() {
      return this.logger.transports.find(function (transport) {
        return transport instanceof _mfeLogger.StorageTransport;
      });
    }
  }]);
  return BrowserLogger;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enabled", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this$_deps$browserLo3, _this$_deps$browserLo4;
    return (_this$_deps$browserLo3 = (_this$_deps$browserLo4 = this._deps.browserLoggerOptions) === null || _this$_deps$browserLo4 === void 0 ? void 0 : _this$_deps$browserLo4.enabled) !== null && _this$_deps$browserLo3 !== void 0 ? _this$_deps$browserLo3 : false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_enable", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_enable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_disable", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_disable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "disable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleLogger", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleLogger"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "downloading", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setDownloading", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDownloading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDownloading", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setDownloading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveLog"), _class2.prototype)), _class2)) || _class);
exports.BrowserLogger = BrowserLogger;
//# sourceMappingURL=BrowserLogger.js.map

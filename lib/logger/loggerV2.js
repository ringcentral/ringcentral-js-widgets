"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleLogger = exports.loggerV2 = exports.loggerEnabled = exports.SharedWorkerTransport = exports.MemoryStorage = void 0;
require("regenerator-runtime/runtime");
var _mfeLogger = require("@ringcentral/mfe-logger");
var _reactantShare = require("reactant-share");
var _global$localStorage;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var isSharedWorker = !!global.SharedWorkerGlobalScope;
var SharedWorkerTransport = /*#__PURE__*/function () {
  function SharedWorkerTransport() {
    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SharedWorkerTransport);
    this._options = _options;
    this.type = 'storage';
    this.transport = void 0;
  }
  _createClass(SharedWorkerTransport, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (isSharedWorker && this._options.enabled) {
                  this.transport = (0, _reactantShare.createTransport)('SharedWorkerInternal', {
                    prefix: 'logger'
                  });
                }
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "write",
    value: function () {
      var _write = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
        var _this$transport;
        var payload;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                payload = _ref.payload;
                (_this$transport = this.transport) === null || _this$transport === void 0 ? void 0 : _this$transport.emit({
                  name: 'syncLog',
                  respond: false
                }, {
                  payload: payload
                });
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function write(_x) {
        return _write.apply(this, arguments);
      }
      return write;
    }()
  }]);
  return SharedWorkerTransport;
}();
exports.SharedWorkerTransport = SharedWorkerTransport;
var MemoryStorage = /*#__PURE__*/function () {
  function MemoryStorage() {
    var _data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, MemoryStorage);
    this._data = _data;
  }
  _createClass(MemoryStorage, [{
    key: "getItem",
    value: function getItem(key) {
      return this._data[key];
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this._data[key] = value;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      delete this._data[key];
    }
  }]);
  return MemoryStorage;
}();
exports.MemoryStorage = MemoryStorage;
var toggleKey = 'RC_MFE_LOGGER';
var loggerEnabled = ((_global$localStorage = global.localStorage) === null || _global$localStorage === void 0 ? void 0 : _global$localStorage.getItem(toggleKey)) === 'true';
exports.loggerEnabled = loggerEnabled;
var toggleLogger = function toggleLogger(enabled) {
  var _global$localStorage2;
  (_global$localStorage2 = global.localStorage) === null || _global$localStorage2 === void 0 ? void 0 : _global$localStorage2.setItem(toggleKey, String(enabled));
};

/**
 * new logger
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
exports.toggleLogger = toggleLogger;
var loggerV2 = (0, _mfeLogger.useLogger)({
  name: isSharedWorker ? "worker-".concat(Date.now()) : 'root',
  transports: isSharedWorker ? [new _mfeLogger.ConsoleTransport({
    enabled: true,
    storage: new MemoryStorage({
      ROARR_LOG: true
    })
  }), new SharedWorkerTransport({
    enabled: true
  })] : _toConsumableArray(process.env.NODE_ENV === 'test' ? [] : [new _mfeLogger.ConsoleTransport({
    enabled: true,
    storage: new MemoryStorage({
      ROARR_LOG: true
    })
  }), new _mfeLogger.StorageTransport({
    enabled: true
  })]),
  integrations: process.env.NODE_ENV === 'test' ? [] : [new _mfeLogger.ScriptErrorIntegration({
    enabled: true
  })].concat(_toConsumableArray(process.env.NODE_ENV === 'production' ? [new _mfeLogger.ConsoleIntegration({
    enabled: true
  })] : [])),
  enabled: isSharedWorker ? isSharedWorker : loggerEnabled
});
exports.loggerV2 = loggerV2;
//# sourceMappingURL=loggerV2.js.map

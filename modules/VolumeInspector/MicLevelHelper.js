"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MicLevelHelper = void 0;
require("regenerator-runtime/runtime");
var _MicLevel = require("./MicLevel");
var _const = require("./const");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MicLevelHelper = /*#__PURE__*/function () {
  function MicLevelHelper() {
    _classCallCheck(this, MicLevelHelper);
    this.micLevel = new _MicLevel.MicLevel();
    this.micLevel.setInterval(_const.LEVEL_CHECK_INTERVAL);
  }
  _createClass(MicLevelHelper, [{
    key: "setupMicMedia",
    value: function () {
      var _setupMicMedia = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(deviceId) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.micLevel.setupMicMedia(deviceId);
              case 2:
                result = _context.sent;
                if (!(result instanceof Error)) {
                  _context.next = 6;
                  break;
                }
                console.warn('setup mic media error.', result);
                throw result;
              case 6:
                return _context.abrupt("return", result);
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function setupMicMedia(_x) {
        return _setupMicMedia.apply(this, arguments);
      }
      return setupMicMedia;
    }()
  }, {
    key: "listenToMic",
    value: function () {
      var _listenToMic = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dataCallback) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.micLevel.listenToMic(dataCallback);
              case 2:
                result = _context2.sent;
                if (!(result instanceof Error)) {
                  _context2.next = 6;
                  break;
                }
                console.warn('register mic listener error.', result);
                throw result;
              case 6:
                return _context2.abrupt("return", result);
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function listenToMic(_x2) {
        return _listenToMic.apply(this, arguments);
      }
      return listenToMic;
    }()
  }, {
    key: "clear",
    value: function clear() {
      this.micLevel.clear();
    }
  }]);
  return MicLevelHelper;
}();
exports.MicLevelHelper = MicLevelHelper;
//# sourceMappingURL=MicLevelHelper.js.map

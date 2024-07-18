"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioDetector = void 0;
require("regenerator-runtime/runtime");
var _DetectorListener = require("./DetectorListener");
var _RTCAudioMeter = require("./RTCAudioMeter");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AudioDetector = /*#__PURE__*/function () {
  function AudioDetector() {
    var _this = this;
    _classCallCheck(this, AudioDetector);
    this._audioMeter = new _RTCAudioMeter.RTCAudioMeter();
    this._listeners = [];
    this._audioInput = void 0;
    // manager listener for starting listening
    this._startListenCallback = function (intervalId) {
      _this._listeners.push(intervalId);
    };
    // disposer listener by intervalId
    this._disposeListenCallback = function (intervalId) {
      var idx = _this._listeners.indexOf(intervalId);
      if (idx >= 0) {
        _this._listeners.splice(idx, 1);
      }
    };
  }
  _createClass(AudioDetector, [{
    key: "connect",
    /**
     * connect to audio MediaStream or HTMLMediaElement for detecting
     * @param input MediaStream | HTMLMediaElement
     */
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!input || this._audioInput === input)) {
                  _context.next = 3;
                  break;
                }
                console.warn('The same audio input has connected.');
                return _context.abrupt("return");
              case 3:
                // disconnect an old audio input if exists.
                this.disconnect();
                console.warn('Connect to the new media input.');
                _context.prev = 5;
                _context.next = 8;
                return this._audioMeter.updateInputStream(input);
              case 8:
                _context.next = 14;
                break;
              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](5);
                console.error('update input stream error, msg:', _context.t0.message);
                return _context.abrupt("return");
              case 14:
                this._audioInput = input;
              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 10]]);
      }));
      function connect(_x) {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
    /**
     * Add a new listener for the specified audioSource,
     * The listener will call dataCallback(volume) cyclically after it calls start().
     * The volume will be a number from [0,1].
     * @param dataCallback (volume: number) => {}
     * @return DetectorListener |
     */
  }, {
    key: "registerListener",
    value: function registerListener(dataCallback) {
      return new _DetectorListener.DetectorListener(this._startListenCallback, this._genListenerHandle(dataCallback), this._disposeListenCallback);
    }
    /**
     * disconnect to the audioSource, and clear all listeners.
     */
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this._listeners.length > 0) {
        this._listeners.forEach(clearInterval);
        this._listeners = [];
      }
      if (this._audioInput) {
        delete this._audioInput;
      }
    }
  }, {
    key: "_genListenerHandle",
    // generate a listener handle by dataCallback
    value: function _genListenerHandle(dataCallback) {
      var _this2 = this;
      return function () {
        var volumeLevel;
        try {
          volumeLevel = _this2._audioMeter.getMicLevel();
        } catch (e) {
          console.warn('getVolume Error, return volume = 0, err:', e);
          volumeLevel = 0;
        }
        dataCallback(volumeLevel);
      };
    }
  }]);
  return AudioDetector;
}();
exports.AudioDetector = AudioDetector;
//# sourceMappingURL=AudioDetector.js.map
